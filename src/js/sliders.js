~function () {
  const slidesGap = window.innerWidth >= 700 ? 24 : 8

  const swiperSettings = {
    slidesPerView: 'auto',
    spaceBetween: slidesGap,
    freeMode: true,
    grabCursor: true,
  }

  window,addEventListener('resize', configureAllSwipers)

  configureAllSwipers()

  function configureAllSwipers() {
    configureSwiper('#slider-1')
    configureSwiper('#slider-2')
    configureSwiper('#slider-3')
  }

  function configureSwiper(sliderSelector) {
    const slider = document.querySelector(`${sliderSelector} .sliders__slider`)
    const marginSlide = document.querySelector(`${sliderSelector} .game-card.invisible`)
    const backButton = document.querySelector(`${sliderSelector} .sliders__button_back`)
    const forwardButton = document.querySelector(`${sliderSelector} .sliders__button_forward`)
    const padding = (window.outerWidth - slider.clientWidth) / 2

    slider.setAttribute('style', `width: calc(100% + ${padding}px)`)
    marginSlide.setAttribute('style', `width: ${padding - slidesGap}px`)

    const swiper = new Swiper(`${sliderSelector} .swiper`, swiperSettings)

    backButton.addEventListener('click', () => {
      swiper.slidePrev()
    })

    forwardButton.addEventListener('click', () => {
      swiper.slideNext()
    })
  }
}()
