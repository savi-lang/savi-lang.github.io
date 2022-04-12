---
name: Your First Program
layout: docs
description: >
  Step-by-step guide to writing your first Savi program: an echo server.
---

Now that we have a Savi compiler installed, it's time to put it through the paces of building a simple application.

Let's build an echo server - a TCP listener that simply echoes whatever bytes it receives from its clients back to them.

---

We'll start by creating a simple git repository. This is not strictly necessary for using Savi, but it's a good development practice to have somewhere to commit your work incrementally.

```sh
git init savi-echo-server
cd savi-echo-server
git status
```

```
Initialized empty Git repository in ~/Documents/code/savi/savi-echo-server/.git/
On branch main

No commits yet

nothing to commit (create/copy files and use "git add" to track)
```

---

Now let's use Savi to initialize a small bit of boilerplate code for a new executable binary, to be named `echo-server`.

```sh
savi init bin echo-server
```

```
Creating manifest.savi
Creating src/Main.savi
```

---

Let's take a look at `manifest.savi`, which was created to declare the `echo-server` executable binary and specify where to find the source files for it.

```savi
:manifest bin "echo-server"
  :sources "src/*.savi"
```

---

And we can look at `src/Main.savi`, which was created to declare what the `Main` actor of the program should do.

The `Main` actor is the entry point of the program. When created, it is given an object of type `Env` as its constructor argument, giving it the capability to take actions that have side effects.

So far, we only use the `Env` object to print `"Hello, World!"`.

```savi
:actor Main
  :new (env Env)
    env.out.print("Hello, World!")
```

---

Now let's build it, using the Savi compiler.

There's only one manifest so far, so we don't need to specify `echo-server` explicitly.

```sh
savi build
```

---

Savi created an executable binary called `bin/echo-server`, which we can now run.

```sh
bin/echo-server
```

```
Hello, World!
```

---

Great, so now we know that we can build and run a basic program, but it's not a TCP server yet.

If we look at [the Savi library index](https://github.com/savi-lang/library-index/blob/main/all.md), we see that in the "Standard Library" section there is a library named `TCP` that probably can do what we want.

So let's add `TCP` as a dependency.

```sh
savi deps add TCP
```

```
Finding a remote location for the TCP library...
Found a known location: github:savi-lang/TCP
Downloading new library versions from GitHub...
Downloaded TCP v0.20220405.0
Downloading new library versions from GitHub...
Downloaded ByteStream v0.20220304.0
Downloaded IO v0.20220405.0
Downloaded OSError v0.20220325.0
Downloaded IPAddress v0.20220404.1
```

---

We also want to add a simple logger that we can easily pass around our application.

So let's add `Logger` as a dependency as well.

```sh
savi deps add Logger
```

```
Finding a remote location for the Logger library...
Found a known location: github:savi-lang/Logger
Downloading new library versions from GitHub...
Downloaded Logger v0.20220401.0
Downloading new library versions from GitHub...
Downloaded Time v0.20220325.0
```

---

If we look again at our `manifest.savi` file we can see it has been automatically modified by Savi to show the `TCP` dependency, as well as the transitive dependencies that it depends on (`ByteStream`, `IO`, `OSError`, and `IPAddress`). Then we see the `Logger` dependency and its transitive dependency (`Time`).

In the manifest, Savi shows us where each of these libraries is sourced from and how they depend on one another. When this file is committed to a shared repository along with other source code changes, code reviewers will be able to see the dependency structure and how it changes over time.

Like all other declarative constructs in Savi, each declaration line begins with a `:`-prefixed keyword that lets the parser know to treat the line as a declaration.

The order of declarations doesn't matter, and Savi won't reorder existing declarations in the manifest when changing dependencies, so you can feel free to reorder the declarations in whatever order you think is easiest to audit. You can also add comments - those will be preserved as well. Or just leave it alone and let the Savi compiler manage this file by itself.

```savi
:manifest bin "echo-server"
  :sources "src/*.savi"

  :dependency TCP v0
    :from "github:savi-lang/TCP"
    :depends on ByteStream
    :depends on IO
    :depends on OSError
    :depends on IPAddress

  :transitive dependency ByteStream v0
    :from "github:savi-lang/ByteStream"

  :transitive dependency IO v0
    :from "github:savi-lang/IO"
    :depends on ByteStream
    :depends on OSError

  :transitive dependency OSError v0
    :from "github:savi-lang/OSError"

  :transitive dependency IPAddress v0
    :from "github:savi-lang/IPAddress"

  :dependency Logger v0
    :from "github:savi-lang/Logger"
    :depends on Time

  :transitive dependency Time v0
    :from "github:savi-lang/Time"
```

---

We notice that the `Logger` library suggests creating a type alias with the preferred formatter module declared for our project. So let's do that first.

Create a new file named `src/_Log.savi` and put the `:alias` declaration there.

In truth, it doesn't matter what you name the file (we never need to refer to specific files by name in Savi) as long as it matches the `src/*.savi` pattern that was set up in the manifest. But by convention we name the file with the name of the type declared within it, adding the `.savi` filename suffix, making it easy to find things.

```savi
:alias _Log: Logger(
  Logger.Formatter.StringWithLevelAndTimestamp
)
```

---

Now let's implement our echo server!

In a file named `src/EchoServer.savi`, we declare an actor named `EchoServer` that uses the `IO.Actor` trait and a `TCP.Engine` field to act as a TCP connection actor. It also holds a `_Log` instance so it can log messages.

The constructor takes two arguments: a `_Log` instance (written directly into the `log` field), as well a "ticket" that represents a pending TCP connection waiting to be accepted (which is used to set up the `io` field). It's always required to initialize all fields before the constructor is finished.

The actor reacts to `IO.Action.Read` by reading all available bytes from the `@io.read_stream` and sending them to the `@io.write_stream` (as well as logging them, if the logger is configured to show debug logs). This is the echo behavior of our echo server.

```savi
:actor EchoServer
  :is IO.Actor(IO.Action)
  :let log _Log
  :let io TCP.Engine

  :new (@log, ticket)
    @io = TCP.Engine.accept(@, --ticket)
    @log.info -> ("Accepted connection")

  :fun ref io_react(action IO.Action)
    case action == (
    | IO.Action.Read |
      @io.pending_reads -> (
        bytes val =
          @io.read_stream.extract_all

        @io.write_stream << bytes
        try @io.flush!

        @log.debug -> (
          "Echoed: \(Inspect[bytes])"
        )
      )
    | IO.Action.Closed |
      @log.info -> ("Closed connection")
    )
    @
```

---

If we try to compile this program now with `savi build` we see an error telling us it couldn't find the `IO.Actor` type, which may seem strange, because we saw earlier that the `IO` library is already in our manifest.

```
This type couldn't be resolved:
from ./src/Main.savi:15:
  :is IO.Actor(IO.Action) // TODO: remove type argument?
      ^~~~~~~~~~~~~~~~~~~
```

---

However, we note that it's currently there as a _transitive_ dependency. Only direct dependencies will be in scope for type resolution, so if we want to use the `IO` type we need to load it in as a direct dependency.

After this, our code should compile successfully again.

```
savi deps add IO
```

---

Now that we have an actor that can handle echoing on a TCP connection, we need a TCP listener actor that can listen for new TCP connections.

Let's create `src/EchoServer.Listener.savi` with a new `EchoServer.Listener` actor.

It is also an `IO.Actor`, and it takes a logger and a ticket, but it uses `TCP.Listen.Engine` instead of `TCP.Engine` for its `io` field, which means that it deals with IO actions differently.

When it's begun listening (on `IO.Action.Opened`), our actor will log its port number. For every new pending connection (on `IO.Action.Read`), it creates a new `EchoServer` actor to accept and manage the connection, by passing the ticket for the connection to that actor.

```savi
:actor EchoServer.Listener
  :is IO.Actor(IO.Action)
  :let log _Log
  :let io TCP.Listen.Engine

  :new (@log, ticket)
    @io = TCP.Listen.Engine.new(@, --ticket)

  :fun ref io_react(action IO.Action)
    case action == (
    | IO.Action.Opened |
      @log.info -> (
        port = try @io.listen_port_number!
        "Listening on port: \(port)"
      )
    | IO.Action.OpenFailed |
      @log.error -> (
        "Failed to listen: \(@io.listen_error)"
      )
    | IO.Action.Read |
      @io.pending_connections -> (ticket |
        EchoServer.new(@log, --ticket)
      )
    | IO.Action.Closed |
      @log.info -> ("Stopped listening")
    )
    @
```

---

That's pretty much it!

The last step is to hook into the main entrypoint of the program in `src/Main.savi` so that it creates the listener (instead of just printing "Hello, World!" as it does now).

Our `Main` actor is responsible for kicking off the program and delegating the right amount of authority to the actors in it. By holding the `Env` it has the authority to do anything, but it can (and should) attenuate that authority according to the principle of least privilege.

In this case, we use the `env` to create a `_Log` instance that can log to standard error output (`env.err`), and we create a TCP listen ticket that can listen on a particular host and port.

In this example, the `host` is hard-coded and the `port` is taken from the first CLI argument (if present). The CLI user may specify a number (such as `80`) or a name (such as `http`) or leave the argument so that the program uses the default empty string, which allows the listener to choose any arbitrary open port.

```savi
:actor Main
  :new (env Env)
    host = "0.0.0.0"
    port = try (env.args[1]! | "")
    EchoServer.Listener.new(
      _Log.new(env.err, Logger.Level.Debug)
      TCP.auth(env.root).listen.on(host, port)
    )
```

---

Now we can build and run again, specifying a particular listen port if we wish.

We'll see it log when it's started listening.

```
savi build
bin/echo-server 50512
```

```
INFO  2022-04-12 16:03:47.549 | Listening on port: 50512
```

---

We can connect to our echo server with the `telnet` command in a separate terminal.

```
telnet localhost 50512
```

```
Trying ::1...
Trying 127.0.0.1...
Connected to localhost.
Escape character is '^]'.
```

---

Once connected, if we type something in the `telnet` terminal we'll see it echoed back to us, and we'll also see it logged in the server as debug-level log messages.

```
Hello, World!
Hello, World!
```

```
INFO  2022-04-12 16:06:47.505 | Accepted connection
DEBUG 2022-04-12 16:08:39.455 | Echoed: b"Hello, World!\r\n"
```

---

That's it for this tutorial!

If you enjoyed this, please consider committing the source code as a public repository on GitHub. It will help us get GitHub to recognize our language and enable syntax highlighting (they require a threshold number of repositories before they will allow our language to be detected).
