import { getTestPixel } from "@rspack-repro/package-a";

import "./render.css";

export function render() {
  const el = document.createElement("div");
  el.classList.add("text");
  document.getElementsByTagName("body")[0].appendChild(el);
  el.innerHTML = "hello, world";

  const img = document.createElement("img");
  img.src = getTestPixel();
  el.appendChild(img);
}
