---
name: Concurrency Safety
layout: docs
description: >
  Learn about approaches for making programs safe from data races,
  and how Savi incorporates these ideas to guarantee safety.
---

Parallel programs run on many threads of execution at the same time.

To make them safe and predictable, we need to ensure they're not conflicting with each other as they operate on data.

```html demo
<link rel="stylesheet" href="{{ '/assets/css/i/concepts/concurrency-safety.css' | relative_url }}" />
<link rel="stylesheet" href="{{ '/assets/css/i-shared/gears.css' | relative_url }}" />
{% include i/concepts/concurrency-safety-1.svg %}
```

---

Preventing data races can be boiled down to two simple rules:

---

## Rule 1: Safe Reads

If *I'm reading* data, *no other thread can write* to that data at the same time.

```html demo
{% include i/concepts/concurrency-safety-2.svg %}
```

---

## Rule 2: Safe Writes

If *I'm writing* data, *no other thread can write* to that data at the same time.

```html demo
{% include i/concepts/concurrency-safety-3.svg %}
```

---

Soon we'll see how Savi's type system exists to prove at compile time that your programs satisfy these two fundamental rules. But first, let's see some other common ways to address these concerns.

---

## Share Nothing

A parallel program can be made safe by simply never sharing any data among threads. Data is strictly partitioned so that each thread is an exclusive owner of its data, and no other thread can read or write to that data, so they will never break the two rules.

```
TODO: Illustration
```

---

## Transfer Ownership

We can extend the "share nothing" model to allow for transferring ownership of mutable data from one thread to another. As long as we can guarantee that the old thread fully stops reading or writing the data before the new ones starts using it, we satisfy the two rules. However, in many programming languages upholding this guarantee is a matter of personal discipline, without enforcement at the language level.

```
TODO: Illustration
```

---

## No Mutability

Functional programming languages usually aim to satisfy these rules by preventing writes at the language level, enforcing that a program is composed only of immutable data structures. Data can be shared among threads freely without breaking the two rules, because both of the safety rules are about preventing concurrent writes (which are not possible in the language).

```
TODO: Illustration
```

---

## All of the Above

Savi's concurrency-aware type system allows us to write programs using all of the above patterns, coexisting in the same program with a static guarantee of safety by enforcing those concurrency patterns at compile time.

```
TODO: Illustration
```

---

In *strongly typed* languages, values have types that describe the shape of the data and restrictions on what functions they are compatible with, and these are checked at compile time to guarantee *type safety* of your program.

Savi takes this idea further: Savi types have an additional notation called *reference capabilities* (or *caps*, for short) that describe restrictions on reading and writing to the associated data, and these are checked at compile time to guarantee *concurrency safety* of your program.

```
TODO: Illustration
```
