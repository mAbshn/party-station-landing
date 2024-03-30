~function() {
  const progress1 = document.getElementById('progress-hr-1')
  const progress2 = document.getElementById('progress-hr-2')
  const progress3 = document.getElementById('progress-hr-3')
  const progress4 = document.getElementById('progress-hr-4')
  
  const swiper = new Swiper('.games__popular', {
    slidesPerView: 'auto',
    spaceBetween: 30,
    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
    },
    on: {
      autoplayTimeLeft: handleAutoplayTimeLeft,
    }
  })

  function clearProgress (elements) {
    elements.forEach((elem) => {
      elem.style.setProperty("width", 0);
    })
  }

  function fillProgress (elements) {
    elements.forEach((elem) => {
      elem.style.setProperty("width", '100%');
    })
  }

  function handleAutoplayTimeLeft ({ activeIndex }, _time, progress) {
    switch (activeIndex) {
      case 0:
        progress1.style.setProperty("width", (1 - progress) * 100 + '%');
        clearProgress([progress2, progress3, progress4])
        break
      case 1:
        progress2.style.setProperty("width", (1 - progress) * 100 + '%');
        fillProgress([progress1])
        clearProgress([progress3, progress4])
        break
      case 2:
        progress3.style.setProperty("width", (1 - progress) * 100 + '%');
        fillProgress([progress1, progress2])
        clearProgress([progress4])
        break
      case 3:
        progress4.style.setProperty("width", (1 - progress) * 100 + '%');
        fillProgress([progress1, progress2, progress3])
        break
      default:
        break
    }
  }

  document.querySelectorAll('.games__next-btn').forEach((button) => {
    button.addEventListener('click', () => {
      swiper.slideNext()
    })
  })

  document.querySelectorAll('.games__description').forEach((description, pageNumber) => {
    description.addEventListener('click', () => {
      swiper.slideTo(pageNumber)
    })
  })
}()
