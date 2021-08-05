const $menu = document.querySelector('.menu')
const $items = document.querySelectorAll('.menu--item')
const $images = document.querySelectorAll('.menu--item img')
const $buttons = document.querySelectorAll('.menu--item button')

let menuWidth = $menu.clientWidth
let itemWidth = $items[0].clientWidth
let wrapWidth = $items.length * itemWidth

let scrollSpeed = 0
let oldScrollY = 0
let scrollY = 0
let y = 0


/*--------------------
Lerp
--------------------*/
const lerp = (v0, v1, t) => {
  return v0 * ( 1 - t ) + v1 * t
}


/*--------------------
Dispose
--------------------*/
const dispose = (scroll) => {
  gsap.set($items, {
    x: (i) => {
      return i * itemWidth + scroll
    },
    modifiers: {
      x: (x, target) => {
        const s = gsap.utils.wrap(-itemWidth, wrapWidth - itemWidth, parseInt(x))
        return `${s}px`
      }
    }
  })
} 
dispose(0)


/*--------------------
Wheel
--------------------*/
const handleMouseWheel = (e) => {
  scrollY -= e.deltaY * 0.9
}


/*--------------------
Touch
--------------------*/
let touchStart = 0
let touchX = 0
let isDragging = false
const handleTouchStart = (e) => {
  touchStart = e.clientX || e.touches[0].clientX
  isDragging = true
 //$menu.classList.add('is-dragging')
}
const handleTouchMove = (e) => {
  if (!isDragging) return
  touchX = e.clientX || e.touches[0].clientX
  scrollY += (touchX - touchStart) * 2.5
  touchStart = touchX
}
const handleTouchEnd = () => {
  isDragging = false
}

const handleHoverEventcard = (e) => {
 if (e.path.length == 8){
  var card = e.path[0]
  var quote = card.getElementsByClassName('quote')[0]
  var image = card.getElementsByTagName('img')[0]
  var logo = card.getElementsByClassName('logo')[0]
  var button = card.getElementsByClassName('btn-events')[0]



  for (child of e.path[1].children) {
    var childimage = child.getElementsByTagName('img')[0]
    var childquote = child.getElementsByClassName('quote')[0]
    var childlogo = child.getElementsByClassName('logo logomoved')[0]
    var childbutton = child.getElementsByClassName('btn-events')[0]

   childquote.classList.add("hidden")
   childbutton.classList.add("hidden")

   if (childlogo){
   childlogo.classList.remove("logomoved")
   }
   	childimage.classList.remove("gray")
    childimage.style.opacity = 1
  }
  if (e.path[0].classList.contains("past-event")){
  	image.classList.add("gray")
  }

  image.style.opacity = 0.3 
  let p = document.createElement('p')
  quote.classList.remove("hidden")
  button.classList.remove("hidden")
  logo.classList.add("logomoved")
}
}

const handleLeaveEventcard = (e) => {
  for (child of e.path[1].children) {
    var childimage = child.getElementsByTagName('img')[0]
    var childquote = child.getElementsByClassName('quote')[0]
    var childbutton = child.getElementsByClassName('btn-events')[0]

    var logo = child.getElementsByClassName('logo')[0]
    childquote.classList.add("hidden")
    childbutton.classList.add("hidden")

    logo.classList.remove("logomoved")


    childimage.style.opacity = 1
    childimage.classList.remove("gray")
  }
  }

  const handleTicketClick = (e) => {
    e.preventDefault();
    //to complete
    }


/*--------------------
Listeners
--------------------*/
$menu.addEventListener('mousewheel', handleMouseWheel)

$menu.addEventListener('touchstart', handleTouchStart)
$menu.addEventListener('touchmove', handleTouchMove)
$menu.addEventListener('touchend', handleTouchEnd)

$menu.addEventListener('mousedown', handleTouchStart)
$menu.addEventListener('mousemove', handleTouchMove)
$menu.addEventListener('mouseleave', handleTouchEnd)
$menu.addEventListener('mouseup', handleTouchEnd)


$items.forEach(function(item){
  item.addEventListener('mouseover', handleHoverEventcard)
}
)

$items.forEach(function(item){
  item.addEventListener('mouseleave', handleLeaveEventcard)
}
)


$buttons.forEach(function(item){
  item.addEventListener('click', handleTicketClick)
}
)


$menu.addEventListener('selectstart', () => { return false })


/*--------------------
Resize
--------------------*/
window.addEventListener('resize', () => {
  menuWidth = $menu.clientWidth
  itemWidth = $items[0].clientWidth
  wrapWidth = $items.length * itemWidth
})


/*--------------------
Render
--------------------*/
const render = () => {
  requestAnimationFrame(render)
  y = lerp(y, scrollY, .1)
  dispose(y)
  
  scrollSpeed = y - oldScrollY
  oldScrollY = y
  
  gsap.to($items, {
    //skewX: -scrollSpeed * .2,
   // rotate: scrollSpeed * .01,
    scale: 1 - Math.min(100, Math.abs(scrollSpeed)) * 0.003
  })
}
render()

