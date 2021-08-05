'use strict';

var $menu = document.querySelector('.menu');
var $items = document.querySelectorAll('.menu--item');

var $images = document.querySelectorAll('.menu--item img');
var $buttons = document.querySelectorAll('.menu--item .btn-events');
console.log($buttons);
var menuWidth = $menu.clientWidth;
var itemWidth = $items[0].clientWidth;
var wrapWidth = $items.length * itemWidth;

var scrollSpeed = 0;
var oldScrollY = 0;
var scrollY = 0;
var y = 0;

/*--------------------
Lerp
--------------------*/
var lerp = function lerp(v0, v1, t) {
  return v0 * (1 - t) + v1 * t;
};

/*--------------------
Dispose
--------------------*/
var dispose = function dispose(scroll) {
  gsap.set($items, {
    x: function x(i) {
      return i * itemWidth + scroll;
    },
    modifiers: {
      x: function x(_x, target) {
        var s = gsap.utils.wrap(-itemWidth, wrapWidth - itemWidth, parseInt(_x));
        return s + 'px';
      }
    }
  });
};
dispose(0);

/*--------------------
Wheel
--------------------*/
var handleMouseWheel = function handleMouseWheel(e) {
  scrollY -= e.deltaY * 0.9;
};

/*--------------------
Touch
--------------------*/
var touchStart = 0;
var touchX = 0;
var isDragging = false;
var handleTouchStart = function handleTouchStart(e) {
  touchStart = e.clientX || e.touches[0].clientX;
  isDragging = true;
  //$menu.classList.add('is-dragging')
};
var handleTouchMove = function handleTouchMove(e) {
  if (!isDragging) return;
  touchX = e.clientX || e.touches[0].clientX;
  scrollY += (touchX - touchStart) * 2.5;
  touchStart = touchX;
};
var handleTouchEnd = function handleTouchEnd() {
  isDragging = false;
};

/*--------------------
Listeners
--------------------*/
$menu.addEventListener('mousewheel', handleMouseWheel);

$menu.addEventListener('touchstart', handleTouchStart);
$menu.addEventListener('touchmove', handleTouchMove);
$menu.addEventListener('touchend', handleTouchEnd);

$menu.addEventListener('mousedown', handleTouchStart);
$menu.addEventListener('mousemove', handleTouchMove);
$menu.addEventListener('mouseleave', handleTouchEnd);
$menu.addEventListener('mouseup', handleTouchEnd);

$menu.addEventListener('selectstart', function () {
  return false;
});

/*--------------------
Resize
--------------------*/
window.addEventListener('resize', function () {
  menuWidth = $menu.clientWidth;
  itemWidth = $items[0].clientWidth;
  wrapWidth = $items.length * itemWidth;
});

/*--------------------
Render
--------------------*/
var render = function render() {
  requestAnimationFrame(render);
  y = lerp(y, scrollY, .1);
  dispose(y);

  scrollSpeed = y - oldScrollY;
  oldScrollY = y;

  gsap.to($items, {
    //skewX: -scrollSpeed * .2,
    // rotate: scrollSpeed * .01,
    scale: 1 - Math.min(100, Math.abs(scrollSpeed)) * 0.003
  });
};
render();