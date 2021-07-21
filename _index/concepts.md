---
name: Concepts
index_for: concepts
layout: docs-index
---

In this section, you'll be introduced to the core concepts in Savi that we'll refer to throughout the rest of the documentation.

Your goal here should be to get a broad mental map of these concepts, then refine and solidify your understanding by reading the other sections.

You may already be familiar with some of these concepts from your experience with other languages, but it's still important to start to map out how they relate to Savi in particular.

```html demo
<svg width="304" height="230" viewBox="0 0 304 230" fill="none" xmlns="http://www.w3.org/2000/svg">
<path id="i-concepts-path" d="M52 216C132 148 11.0001 120 9.00003 71C7 22 72.0001 -51 140 110C208 271 303 183 254 120C205 57 248 25 282 36" stroke="#0D0C0E" stroke-opacity="0.01" stroke-width="8"/>
<path id="i-concepts-path-stroke" d="M49.4838 212.795L46.4299 215.378L51.5967 221.486L54.6505 218.902L49.4838 212.795ZM280.789 39.8124L284.602 41.0231L287.023 33.3983L283.211 32.1876L280.789 39.8124ZM54.6505 218.902C58.6065 215.556 62.0997 212.288 65.1597 209.091L59.3803 203.56C56.5387 206.529 53.2544 209.605 49.4838 212.795L54.6505 218.902ZM76.4138 194.641C82.592 184.257 84.1522 174.518 82.2717 165.3L74.4331 166.899C75.8718 173.951 74.8175 181.678 69.5386 190.55L76.4138 194.641ZM74.5857 147.944C69.5236 140.442 62.6548 133.437 55.4772 126.737L50.0186 132.586C57.0978 139.193 63.418 145.696 67.954 152.419L74.5857 147.944ZM42.4414 114.904C35.3559 108.489 28.6672 102.196 23.3351 95.6969L17.1502 100.771C22.8952 107.774 29.9805 114.414 37.0723 120.834L42.4414 114.904ZM14.6253 81.8917C12.9793 77.9901 12.0546 74.033 11.9996 69.9462L4.00035 70.0538C4.07109 75.3124 5.26553 80.2871 7.25441 85.0014L14.6253 81.8917ZM11.9996 69.9462C11.9438 65.7993 12.3111 61.5144 13.0783 57.2397L5.20412 55.8265C4.35231 60.5727 3.9373 65.3673 4.00035 70.0538L11.9996 69.9462ZM17.7193 41.7058C21.2311 33.5114 26.1917 26.3685 32.2166 21.4L27.1268 15.2279C19.9058 21.1828 14.2603 29.4679 10.3661 38.5544L17.7193 41.7058ZM45.7098 14.6364C52.4672 13.1661 60.3076 14.0446 69.1515 18.6564L72.8505 11.563C62.5773 6.20582 52.8345 4.89899 44.009 6.81926L45.7098 14.6364ZM82.3867 27.8924C88.0209 32.7946 93.9322 39.154 100.066 47.2152L106.433 42.3707C100.034 33.9616 93.7577 27.1818 87.6379 21.8571L82.3867 27.8924ZM109.717 61.0623C114.109 67.8978 118.586 75.5938 123.131 84.224L130.209 80.4967C125.57 71.6866 120.978 63.7887 116.447 56.7372L109.717 61.0623ZM130.701 99.3528C132.573 103.282 134.455 107.371 136.345 111.624L143.656 108.376C141.738 104.061 139.827 99.9072 137.923 95.9114L130.701 99.3528ZM136.345 111.624C138.455 116.374 140.585 120.916 142.733 125.258L149.904 121.711C147.807 117.472 145.723 113.029 143.656 108.376L136.345 111.624ZM151.728 142.14C157.247 151.731 162.84 160.103 168.446 167.354L174.775 162.461C169.415 155.528 164.021 147.462 158.662 138.15L151.728 142.14ZM181.128 181.891C189.457 190.256 197.744 196.324 205.78 200.363L209.372 193.214C202.231 189.626 194.628 184.111 186.797 176.246L181.128 181.891ZM224.999 206.349C236.998 207.735 247.657 204.377 255.821 197.707L250.76 191.512C244.3 196.789 235.807 199.544 225.918 198.402L224.999 206.349ZM268.099 181.248C272.081 172.095 273.414 161.235 271.497 149.854L263.608 151.183C265.287 161.149 264.082 170.427 260.763 178.056L268.099 181.248ZM265.346 130.911C263.172 126.44 260.47 121.985 257.207 117.609L250.793 122.391C253.766 126.378 256.204 130.404 258.151 134.409L265.346 130.911ZM257.207 117.609C254.473 113.943 252.03 110.408 249.858 107.004L243.114 111.307C245.398 114.887 247.952 118.581 250.793 122.391L257.207 117.609ZM242.007 92.9026C237.704 83.7448 235.668 75.8619 235.264 69.2134L227.279 69.6981C227.757 77.5753 230.137 86.451 234.766 96.3044L242.007 92.9026ZM237.451 54.6874C240.51 47.4021 246.5 42.4127 254.001 39.7869L251.358 32.2361C242.088 35.4809 234.151 41.8829 230.075 51.5904L237.451 54.6874ZM268.913 37.7048C272.883 37.8746 276.903 38.5781 280.789 39.8124L283.211 32.1876C278.649 30.739 273.93 29.9121 269.255 29.7121L268.913 37.7048Z" fill="#0D0C0E"/>
<path id="i-concepts-6" d="M282 60L285.497 72.7382L297.637 67.5302L289.858 78.2065L301.499 84.4504L288.302 85.0253L290.678 98.0194L282 88.06L273.322 98.0194L275.698 85.0253L262.501 84.4504L274.142 78.2065L266.363 67.5302L278.503 72.7382L282 60Z" fill="#BF43D3"/>
<path id="i-concepts-5" d="M212 123L218.526 129.449L227.637 130.53L226.663 139.653L231.499 147.45L223.759 152.377L220.678 161.019L212 158.04L203.322 161.019L200.241 152.377L192.501 147.45L197.337 139.653L196.363 130.53L205.474 129.449L212 123Z" fill="#5627BA"/>
<path id="i-concepts-4" d="M120 147L124.695 162.305L140 167L124.695 171.695L120 187L115.305 171.695L100 167L115.305 162.305L120 147Z" fill="#DF4D82"/>
<path id="i-concepts-3" d="M144 11L153.899 21.1005L164 31L153.899 40.8995L144 51L134.101 40.8995L124 31L134.101 21.1005L144 11Z" fill="#6C4187"/>
<path id="i-concepts-2" d="M54 39L58.538 56.38L71.3205 69L54 64.24L36.6795 69L49.462 56.38L54 39Z" fill="#BA2158"/>
<path id="i-concepts-1" d="M20 143L37.3205 173H2.67949L20 143Z" fill="#513B80"/>
<circle id="i-concepts-end" cx="282" cy="36" r="5" fill="#322435"/>
<circle id="i-concepts-start" cx="52" cy="216" r="5" fill="#322435"/>
<circle id="i-concepts-cursor" cx="0" cy="0" r="10" fill="#c18de0"/>
</svg>

<style type="text/css" media="screen">

#i-concepts-cursor {
  offset-path: path("M52 216C132 148 11.0001 120 9.00003 71C7 22 72.0001 -51 140 110C208 271 303 183 254 120C205 57 248 25 282 36");
  offset-distance: 0%;
  animation: i-concepts-cursor 10s linear infinite;
}
@keyframes i-concepts-cursor {
  0%   { fill: #c18de0; transform: scale(1);    offset-distance: 0%; }
  5%   { fill: #322435; transform: scale(0.38); }
  10%  { fill: #c18de0; transform: scale(1);    }
  15%  { fill: #322435; transform: scale(0.38); }
  20%  { fill: #c18de0; transform: scale(1);    }
  25%  { fill: #322435; transform: scale(0.38); }
  30%  { fill: #c18de0; transform: scale(1);    }
  35%  { fill: #322435; transform: scale(0.38); }
  40%  { fill: #c18de0; transform: scale(1);    }
  45%  { fill: #322435; transform: scale(0.38); }
  50%  { fill: #c18de0; transform: scale(1);    }
  55%  { fill: #322435; transform: scale(0.38); }
  60%  { fill: #c18de0; transform: scale(1);    }
  65%  { fill: #322435; transform: scale(0.38); }
  70%  { fill: #c18de0; transform: scale(1);    }
  75%  { fill: #322435; transform: scale(0.38); }
  80%  { fill: #c18de0; transform: scale(1);    }
  85%  { fill: #322435; transform: scale(0.38); }
  90%  { fill: #c18de0; transform: scale(1);    offset-distance: 100%; }
  92%  { fill: #f6f4f2; transform: scale(1.38); }
  94%  { fill: #c18de0; transform: scale(1); }
  100% { fill: #c18de0; transform: scale(1);   offset-distance: 100%; }
}

#i-concepts-1 {
  transform-origin: 20px 163px;
  animation: i-concepts-1 10s ease-out infinite;
}
@keyframes i-concepts-1 {
  0%    { opacity: 0; transform: rotate(720deg) }
  5%    { opacity: 1 }
  10%   { opacity: 1; transform: rotate(0deg) }
  100%  { opacity: 1; transform: rotate(0deg) }
}

#i-concepts-2 {
  transform-origin: 54px 59px;
  animation: i-concepts-2 10s ease-out infinite;
}
@keyframes i-concepts-2 {
  0%    { opacity: 0; transform: rotate(720deg)}
  15%   { opacity: 0; transform: rotate(720deg) }
  20%   { opacity: 1 }
  25%   { opacity: 1; transform: rotate(0deg) }
  100%  { opacity: 1; transform: rotate(0deg) }
}

#i-concepts-3 {
  transform-origin: 144px 31px;
  animation: i-concepts-3 10s ease-out infinite;
}
@keyframes i-concepts-3 {
  0%    { opacity: 0; transform: rotate(720deg)}
  30%   { opacity: 0; transform: rotate(720deg) }
  35%   { opacity: 1 }
  40%   { opacity: 1; transform: rotate(0deg) }
  100%  { opacity: 1; transform: rotate(0deg) }
}

#i-concepts-4 {
  transform-origin: 120px 167px;
  animation: i-concepts-4 10s ease-out infinite;
}
@keyframes i-concepts-4 {
  0%    { opacity: 0; transform: rotate(720deg)}
  45%   { opacity: 0; transform: rotate(720deg) }
  50%   { opacity: 1 }
  55%   { opacity: 1; transform: rotate(0deg) }
  100%  { opacity: 1; transform: rotate(0deg) }
}

#i-concepts-5 {
  transform-origin: 212px 143px;
  animation: i-concepts-5 10s ease-out infinite;
}
@keyframes i-concepts-5 {
  0%    { opacity: 0; transform: rotate(720deg)}
  60%   { opacity: 0; transform: rotate(720deg) }
  65%   { opacity: 1 }
  70%   { opacity: 1; transform: rotate(0deg) }
  100%  { opacity: 1; transform: rotate(0deg) }
}

#i-concepts-6 {
  transform-origin: 282px 80px;
  animation: i-concepts-6 10s ease-out infinite;
}
@keyframes i-concepts-6 {
  0%    { opacity: 0; transform: rotate(720deg)}
  75%   { opacity: 0; transform: rotate(720deg) }
  80%   { opacity: 1 }
  85%   { opacity: 1; transform: rotate(0deg) }
  100%  { opacity: 1; transform: rotate(0deg) }
}

</style>
```

