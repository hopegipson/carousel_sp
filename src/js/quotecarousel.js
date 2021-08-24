// const $quotemenu = document.querySelector(".quotemenu");
// const $quoteitems = document.querySelectorAll(".quotemenu--item");
// const $quoterotator = document.querySelector(".quote-rotator-holder");

// let quotemenuWidth = $quotemenu.clientWidth;
// let quoteitemWidth = $quoteitems[0].clientWidth;
// let quotewrapWidth = $quoteitems.length * quoteitemWidth;
// let scrollSpeed = 0;
// let oldScrollY = 0;
// let scrollY = 0;
// let y = 0;
// /*--------------------
// Lerp
// --------------------*/
// const lerp = (v0, v1, t) => {
//   return v0 * (1 - t) + v1 * t;
// };
// /*--------------------
// Dispose
// --------------------*/
// const dispose = (scroll) => {
//   gsap.set($quoteitems, {
//     x: (i) => {
//       return i * quoteitemWidth + scroll;
//     },
//     modifiers: {
//       x: (x, target) => {
//         const s = gsap.utils.wrap(
//           -quoteitemWidth,
//           quotewrapWidth - quoteitemWidth,
//           parseInt(x)
//         );
//         return `${s}px`;
//       },
//     },
//   });
// };
// dispose(0);
// /*--------------------
// Wheel
// --------------------*/
// const handleMouseWheel = (e) => {
//   scrollY -= e.deltaY * 0.9;
// };
// /*--------------------
// Touch
// --------------------*/
// let touchStart = 0;
// let touchX = 0;
// let isDragging = false;
// const handleTouchStart = (e) => {
//   touchStart = e.clientX || e.touches[0].clientX;
//   isDragging = true;
// };
// const handleTouchMove = (e) => {
//   if (!isDragging) return;
//   touchX = e.clientX || e.touches[0].clientX;
//   scrollY += (touchX - touchStart) * 2.5;
//   touchStart = touchX;
// };
// const handleTouchEnd = () => {
//   isDragging = false;
// };
// /*--------------------
// Listeners
// --------------------*/
// $quotemenu.addEventListener("mousewheel", handleMouseWheel);
// $quotemenu.addEventListener("touchstart", handleTouchStart);
// $quotemenu.addEventListener("touchmove", handleTouchMove);
// $quotemenu.addEventListener("touchend", handleTouchEnd);
// $quotemenu.addEventListener("mousedown", handleTouchStart);
// $quotemenu.addEventListener("mousemove", handleTouchMove);
// $quotemenu.addEventListener("mouseleave", handleTouchEnd);
// $quotemenu.addEventListener("mouseup", handleTouchEnd);
// $quotemenu.addEventListener("selectstart", () => {
//   return false;
// });
// /*--------------------
// Resize
// --------------------*/
// window.addEventListener("resize", () => {
//   quotemenuWidth = $quotemenu.clientWidth;
//   quoteitemWidth = $quoteitems[0].clientWidth;
//   quotewrapWidth = $quoteitems.length * quoteitemWidth;
// });
// /*--------------------
// Render
// --------------------*/
// const render = () => {
//   requestAnimationFrame(render);
//   y = lerp(y, scrollY, 0.1);
//   dispose(y);
//   scrollSpeed = y - oldScrollY;
//   oldScrollY = y;
//   gsap.to($quoteitems, {
//     //skewX: -scrollSpeed * .2,
//     // rotate: scrollSpeed * .01,
//     scale: 1 - Math.min(100, Math.abs(scrollSpeed)) * 0.003,
//   });
// };
// render();
