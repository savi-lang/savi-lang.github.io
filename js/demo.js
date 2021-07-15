anime({
  targets: ".incoming",
  loop: true,
  keyframes: [{ translateX: 140 }, { translateX: 140 }],
  duration: 2500,
  endDelay: 500,
  easing: "easeInSine",
});

anime({
  targets: ".outgoing",
  loop: true,
  keyframes: [
    { translateX: 140, easing: "easeInSine" },
    { translateX: 0, easing: "easeOutSine" },
  ],
  duration: 2500,
  endDelay: 500,
});
