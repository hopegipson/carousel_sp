// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"js/carousel.js":[function(require,module,exports) {
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var $menu = document.querySelector(".menu");
var $items = document.querySelectorAll(".menu--item");
var $quotemenu = document.querySelector(".quotemenu");
var $quoteitems = document.querySelectorAll(".quotemenu--item");
var $buttons = document.querySelectorAll(".menu--item a");
var $newslettermodal = document.querySelector(".modal-wrapper");

var Carousel = function Carousel(menu, items) {
  var _this = this;

  _classCallCheck(this, Carousel);

  _defineProperty(this, "lerp", function (v0, v1, t) {
    return v0 * (1 - t) + v1 * t;
  });

  _defineProperty(this, "dispose", function (scroll) {
    gsap.set(_this.items, {
      x: function x(i) {
        return i * _this.itemWidth + scroll;
      },
      modifiers: {
        x: function x(_x, target) {
          var s = gsap.utils.wrap(-_this.itemWidth, _this.wrapWidth - _this.itemWidth, parseInt(_x));
          return "".concat(s, "px");
        }
      }
    });
  });

  _defineProperty(this, "handleMouseWheel", function (e) {
    _this.scrollY -= e.deltaY * 0.9;
  });

  _defineProperty(this, "handleTouchStart", function (e) {
    _this.touchStart = e.clientX || e.touches[0].clientX;
    _this.isDragging = true;
  });

  _defineProperty(this, "handleTouchMove", function (e) {
    if (!_this.isDragging) return;
    _this.touchX = e.clientX || e.touches[0].clientX;
    _this.scrollY += (_this.touchX - _this.touchStart) * 2.5;
    _this.touchStart = _this.touchX;
  });

  _defineProperty(this, "handleTouchEnd", function () {
    _this.isDragging = false;
  });

  _defineProperty(this, "setWindowListener", function () {
    return window.addEventListener("resize", function () {
      _this.menuWidth = _this.menu.clientWidth;
      _this.itemWidth = _this.items[0].clientWidth;
      _this.wrapWidth = _this.items.length * _this.itemWidth;
    });
  });

  _defineProperty(this, "render", function () {
    requestAnimationFrame(_this.render);
    _this.y = _this.lerp(_this.y, _this.scrollY, 0.1);

    _this.dispose(_this.y);

    _this.scrollSpeed = _this.y - _this.oldScrollY;
    _this.oldScrollY = _this.y;
    gsap.to(_this.items, {
      scale: 1 - Math.min(100, Math.abs(_this.scrollSpeed)) * 0.003
    });
  });

  this.menu = menu;
  this.items = items;
  this.menuWidth = this.menu.clientWidth;
  this.itemWidth = this.items[0].clientWidth;
  this.wrapWidth = this.items.length * this.itemWidth;
  this.scrollSpeed = 0;
  this.oldScrollY = 0;
  this.scrollY = 0;
  this.y = 0;
  this.touchStart = 0;
  this.touchX = 0;
  this.isDragging = false;
  this.menu.addEventListener("mousewheel", this.handleMouseWheel);
  this.menu.addEventListener("touchstart", this.handleTouchStart);
  this.menu.addEventListener("touchmove", this.handleTouchMove);
  this.menu.addEventListener("touchend", this.handleTouchEnd);
  this.menu.addEventListener("mousedown", this.handleTouchStart);
  this.menu.addEventListener("mousemove", this.handleTouchMove);
  this.menu.addEventListener("mouseleave", this.handleTouchEnd);
  this.menu.addEventListener("mouseup", this.handleTouchEnd);
  this.menu.addEventListener("selectstart", function () {
    return false;
  });
  this.setWindowListener();
};

var handlePastEventClick = function handlePastEventClick(event) {
  event.preventDefault();
  console.log("here");
};

var unfade = function unfade(element) {
  var op = 0.1; // initial opacity

  element.style.display = "inline-block";
  var timer = setInterval(function () {
    if (op >= 1) {
      clearInterval(timer);
    }

    element.style.opacity = op;
    element.style.filter = "alpha(opacity=" + op * 100 + ")";
    op += op * 0.1;
  }, 10);
};

var addPastEventButtonsEventListeners = function addPastEventButtonsEventListeners() {
  $buttons.forEach(function (button) {
    if (button.innerText === "Past Event") {
      button.addEventListener("click", function (event) {
        event.preventDefault();
        unfade($newslettermodal);
      });
    }
  });
};

carousel1 = new Carousel($menu, $items);
carousel2 = new Carousel($quotemenu, $quoteitems);
carousel1.render();
carousel2.render();
addPastEventButtonsEventListeners();
},{}],"../node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "60479" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../node_modules/parcel-bundler/src/builtins/hmr-runtime.js","js/carousel.js"], null)
//# sourceMappingURL=/carousel.92954385.js.map