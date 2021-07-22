---
name: Mutability
layout: docs
description: >
  Learn about how mutable and immutable access patterns are represented and enforced in Savi, and how they can coexist without compromising safety guarantees.
---

Let's look at reference capabilities, starting with the most basic one: `ref`.

Here we declare a type `Person'ref`, with two fields, a `ref` constructor, and a `ref` function called `birthday` that increments the age field by one year.

The `birthday` function is able to modify the age field because `ref` denotes a *mutable* type - mutation must be explicitly permitted in the type system by using a mutable reference capability, and a function declared as `ref` means that the value that receives the function call is required to be in a mutable state.

```savi
:class ref Person
  :var name String
  :var age U8

  :new ref (@name, @age = 0)

  :fun ref birthday
    @age += 1
```
```html demo
<div class="center struct old">
  <code class="big with-bg plain">ref</code>
  <code class="big with-bg plain">"Alice"</code>
  <code class="big with-bg plain inc-number"></code>
</div>
<code class="center big flash-opaque" style="opacity: 0">birthday</code>
```

---

If instead we want to declare `Person` as an *immutable* type and take an approach more familiar to functional programmers, we can use `val`.

Here we declare the type as `Person'val`, with a `val` constructor, and a `val` function. The `val` version of the `birthday` must return a new value that has an incremented age instead of modifying the original.

And indeed, the type system will not allow a `val` function to modify anything - any attempt at mutation will meet with a type error, because only a `ref` function can mutate its data.

```savi
:class val Person
  :var name String
  :var age U8: 0

  :new val (@name, @age = 0)

  :fun val birthday
    Person.new(@name, @age + 1)
```
```html demo
<div class="center struct old seq-a">
  <code class="big with-bg plain">val</code>
  <code class="big with-bg plain">"Alice"</code>
  <code class="big with-bg plain inc-number-2a"></code>
</div>
<div class="center struct new seq-b" style="opacity: 0; transform: translateX(80px);">
  <code class="big with-bg plain">val</code>
  <code class="big with-bg plain">"Alice"</code>
  <code class="big with-bg plain inc-number-2b"></code>
</div>
<code class="center big flash-opaque" style="opacity: 0">birthday</code>
```

---

For many functions, we don't care whether the value is mutable or immutable - if we just need to read its fields we can use a `box` function.

These two functions can be used to compare `Person` values by age, regardless of whether we're comparing mutable (`ref`) or immutable (`val`) values.

In other words, `box` is a read-only lens through which we can look at any readable value. Every function on a class uses `box` by default if you do not specify an explicit reference capability for it - both mutability and immutability guarantees must be explicitly specified.

```savi
:fun box is_older_than(other Person'box)
  @age > other.age

:fun box is_younger_than(other Person'box)
  @age < other.age
```
```html demo
<div class="center struct old">
  <code class="big with-bg plain">box</code>
  <code class="big with-bg plain">"Alice"</code>
  <code class="big with-bg plain">32</code>
</div>
<code class="center big">TODO</code>
```
