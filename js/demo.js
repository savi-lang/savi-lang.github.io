anime({
  targets: ".demo .incoming",
  loop: true,
  keyframes: [{ translateX: 140 }, { translateX: 140 }],
  duration: 2500,
  endDelay: 500,
  easing: "easeInSine",
});

anime({
  targets: ".demo .outgoing",
  loop: true,
  keyframes: [
    { translateX: 140, easing: "easeInSine" },
    { translateX: 0, easing: "easeOutSine" },
  ],
  duration: 2500,
  endDelay: 500,
});

anime({
  targets: ".demo .seq-a",
  loop: true,
  keyframes: [
    { opacity: 1, translateX: 0, easing: "linear" },
    { opacity: 0, translateX: -80, easing: "linear" },
    { opacity: 0, translateX: 80, easing: "linear" },
    { opacity: 1, translateX: 0, easing: "linear" },
  ],
  duration: 2500 * 2,
});

anime({
  targets: ".demo .seq-b",
  loop: true,
  keyframes: [
    { opacity: 0, translateX: 80, easing: "linear" },
    { opacity: 1, translateX: 0, easing: "linear" },
    { opacity: 1, translateX: 0, easing: "linear" },
    { opacity: 0, translateX: -80, easing: "linear" },
  ],
  duration: 2500 * 2,
});

anime({
  targets: ".demo .flash-opaque",
  loop: true,
  keyframes: [
    { opacity: 0, easing: "linear" },
    { opacity: 0, easing: "linear" },
    { opacity: 1, easing: "easeInSine" },
    { opacity: 0, easing: "easeOutSine" },
    { opacity: 0, easing: "linear" },
    { opacity: 0, easing: "linear" },
  ],
  duration: 2500,
});

anime({
  targets: ".demo .inc-number",
  loop: true,
  textContent: [0, 100],
  round: 1,
  easing: "linear",
  duration: 2500 * 100,
});

const incNumber2A = document.querySelector(".demo .inc-number-2a");
if (incNumber2A) {
  anime({
    targets: incNumber2A,
    loop: true,
    update: function (anim) {
      incNumber2A.textContent = Math.round(anim.currentTime / 5000) * 2;
    },
    easing: "linear",
    duration: 2500 * 100,
  });
}

const incNumber2B = document.querySelector(".demo .inc-number-2b");
if (incNumber2B) {
  anime({
    targets: incNumber2B,
    loop: true,
    update: function (anim) {
      incNumber2B.textContent =
        Math.round((anim.currentTime + 2500) / 5000) * 2 - 1;
    },
    easing: "linear",
    duration: 2500 * 100,
  });
}
