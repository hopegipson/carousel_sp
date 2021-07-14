'use strict';

var $menu = document.querySelector('.menu');
var $items = document.querySelectorAll('.menu--item');
var $images = document.querySelectorAll('.menu--item img');
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

var handleHoverEventcard = function handleHoverEventcard(e) {
  var card = e.path[0];
  var quote = card.getElementsByClassName('quote')[0];
  var image = card.getElementsByTagName('img')[0];

  console.log(card);

  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = e.path[1].children[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      child = _step.value;

      var childimage = child.getElementsByTagName('img')[0];
      var childquote = child.getElementsByClassName('quote')[0];
      childquote.classList.add("hidden");
      childimage.style.opacity = 1;
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  image.style.opacity = 0.5;
  var p = document.createElement('p');
  quote.classList.remove("hidden");
};

var handleLeaveEventcard = function handleLeaveEventcard(e) {
  var _iteratorNormalCompletion2 = true;
  var _didIteratorError2 = false;
  var _iteratorError2 = undefined;

  try {

    for (var _iterator2 = e.path[1].children[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
      child = _step2.value;

      var childimage = child.getElementsByTagName('img')[0];
      var childquote = child.getElementsByClassName('quote')[0];
      childquote.classList.add("hidden");
      childimage.style.opacity = 1;
    }
  } catch (err) {
    _didIteratorError2 = true;
    _iteratorError2 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion2 && _iterator2.return) {
        _iterator2.return();
      }
    } finally {
      if (_didIteratorError2) {
        throw _iteratorError2;
      }
    }
  }
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

$items.forEach(function (item) {
  item.addEventListener('mouseover', handleHoverEventcard);
});

$items.forEach(function (item) {
  item.addEventListener('mouseleave', handleLeaveEventcard);
});

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