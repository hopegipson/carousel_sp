const $menu = document.querySelector(".menu");
const $items = document.querySelectorAll(".menu--item");
const $quotemenu = document.querySelector(".quotemenu");
const $quoteitems = document.querySelectorAll(".quotemenu--item");
const $buttons = document.querySelectorAll(".menu--item a");
const $newslettermodal = document.querySelector(".modal-wrapper");

class Carousel {
  constructor(menu, items) {
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
    this.menu.addEventListener("selectstart", () => {
      return false;
    });
    this.setWindowListener();
  }

  lerp = (v0, v1, t) => {
    return v0 * (1 - t) + v1 * t;
  };

  dispose = (scroll) => {
    gsap.set(this.items, {
      x: (i) => {
        return i * this.itemWidth + scroll;
      },
      modifiers: {
        x: (x, target) => {
          const s = gsap.utils.wrap(
            -this.itemWidth,
            this.wrapWidth - this.itemWidth,
            parseInt(x)
          );
          return `${s}px`;
        },
      },
    });
  };

  handleMouseWheel = (e) => {
    this.scrollY -= e.deltaY * 0.9;
  };

  handleTouchStart = (e) => {
    this.touchStart = e.clientX || e.touches[0].clientX;
    this.isDragging = true;
  };

  handleTouchMove = (e) => {
    if (!this.isDragging) return;
    this.touchX = e.clientX || e.touches[0].clientX;
    this.scrollY += (this.touchX - this.touchStart) * 2.5;
    this.touchStart = this.touchX;
  };
  handleTouchEnd = () => {
    this.isDragging = false;
  };

  setWindowListener = () =>
    window.addEventListener("resize", () => {
      this.menuWidth = this.menu.clientWidth;
      this.itemWidth = this.items[0].clientWidth;
      this.wrapWidth = this.items.length * this.itemWidth;
    });

  render = () => {
    requestAnimationFrame(this.render);
    this.y = this.lerp(this.y, this.scrollY, 0.1);
    this.dispose(this.y);
    this.scrollSpeed = this.y - this.oldScrollY;
    this.oldScrollY = this.y;
    gsap.to(this.items, {
      scale: 1 - Math.min(100, Math.abs(this.scrollSpeed)) * 0.003,
    });
  };
}
const handlePastEventClick = (event) => {
  event.preventDefault();
  console.log("here");
};

const unfade = (element) => {
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

const addPastEventButtonsEventListeners = () => {
  $buttons.forEach((button) => {
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
