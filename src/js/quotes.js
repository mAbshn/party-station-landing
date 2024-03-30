~function () {
    const backButton = document.querySelector('.quotes__button_back')
    const forwardButton = document.querySelector('.quotes__button_forward')

    const swiper = new Swiper(`.quotes .swiper`, {
      slidesPerView: 'auto',
      spaceBetween: 24,
      grabCursor: true,
    })
  
    backButton.addEventListener('click', () => {
      swiper.slidePrev()
    })

    forwardButton.addEventListener('click', () => {
      swiper.slideNext()
    })
  }()