---
name: Aliasing
layout: docs
description: >
  Learn about how uniqueness of ownership is preserved for isolated values, and how to alias or extract such values from a variable.
---

A variable is a container for a value of a particular type.

```html demo
<div class="cup" style="transform: translateX(140px);"></div>
```

---

When initialized, the variable is known to be holding a value of that type.

```html demo
<div class="extra cup" style="transform: translateX(140px);"></div>
<div class="circle old" style="transform: translateX(140px);"></div>
```

---

We can read a value from it when we refer to it by name.

But if it's an *isolated* type, the isolated root is still held by the variable, so the value we read is only an *alias*, heavily restricting what we are allowed to do with it.

```html demo
<div class="extra circle old shadow outgoing" style="transform: translateX(140px);"></div>
<div class="extra cup" style="transform: translateX(140px);"></div>
<div class="circle old" style="transform: translateX(140px);"></div>
<code class="extra big old shadow">iso'aliased</code>
<code class="big" style="transform: translateX(141px);">
  <code class="old shadow">(</code>x<code class="old shadow">)</code>
</code>
```

---

To extract an isolated value from a variable, we must *consume* it.
This leaves the variable holding nothing, so reading from it is no longer allowed.

```html demo
<div class="extra cup" style="transform: translateX(140px);"></div>
<div class="circle old outgoing" style="transform: translateX(140px);"></div>
<code class="extra big old">iso</code>
<code class="big" style="transform: translateX(123px);">
  <code class="old">(</code>--x<code class="old">)</code>
</code>
```

---

To fill an empty variable, we can *assign* a new value to it.
The result value that comes out of such an expression is the *alias of the new value*.

```html demo
<div class="extra circle new shadow outgoing" style="transform: translateX(280px);"></div>
<div class="extra cup" style="transform: translateX(140px);"></div>
<div class="circle new incoming" style="transform: translateX(280px);"></div>
<code class="extra big new shadow">iso'aliased</code>
<code class="big" style="transform: translateX(142px);">
  <code class="new shadow">(</code>x =
  <code class="new">Thing.new</code><code class="new shadow">)</code>
</code>
```

---

This is also true for a variable that is already holding a value.
The alias of the new value is returned and *the old value is lost.*

```html demo
<div class="extra circle new shadow outgoing" style="transform: translateX(280px);"></div>
<div class="extra circle old" style="transform: translateX(140px);"></div>
<div class="extra cup" style="transform: translateX(140px);"></div>
<div class="circle new incoming" style="transform: translateX(280px);"></div>
<code class="extra big new shadow">iso'aliased</code>
<code class="big" style="transform: translateX(142px);">
  <code class="new shadow">(</code>x =
  <code class="new">Thing.new</code><code class="new shadow">)</code>
</code>
```

---

To capture the old value we can use *displacing assignment*.
The fully isolated old value is returned, because the new value has taken its place in the variable.*

```html demo
<div class="extra circle old outgoing" style="transform: translateX(140px);"></div>
<div class="extra cup" style="transform: translateX(140px);"></div>
<div class="circle new incoming" style="transform: translateX(280px);"></div>
<code class="extra big old">iso</code>
<code class="big" style="transform: translateX(142px);">
  <code class="old">(</code>x <<=
  <code class="new">Thing.new</code><code class="old">)</code>
</code>
```
