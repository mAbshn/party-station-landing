~(function () {
  const MIN_STYCKY_SCROLL = 0
  const MODAL_CLASS = 'modal'
  const STICKY_CLASS = 'sticky'
  const NOSCROLL_CLASS = 'no-scroll'

  const header = document.querySelector('.header')
  const logo = document.querySelector('.header__logo')
  const burger = document.querySelector('.header__burger-wrapper')
  const body = document.querySelector('body')
  const menuItems = document.querySelectorAll('.header__menu a')

  burger.addEventListener('click', () => {
    header.classList.toggle(MODAL_CLASS)
    body.classList.toggle(NOSCROLL_CLASS)
  })

  menuItems.forEach((menuItem) => {
    menuItem.addEventListener('click', () => {
      header.classList.remove(MODAL_CLASS)
      body.classList.remove(NOSCROLL_CLASS)
    })
  })

  logo.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  })

  document.addEventListener('scroll', (e) => {
    const scrollTop = e.target.documentElement.scrollTop
    const hasStickyClass = header.classList.contains(STICKY_CLASS)

    if (scrollTop > MIN_STYCKY_SCROLL && !hasStickyClass) {
      header.classList.add(STICKY_CLASS)
    }

    if (scrollTop <= MIN_STYCKY_SCROLL && hasStickyClass) {
      header.classList.remove(STICKY_CLASS)
    }
  })
})()
