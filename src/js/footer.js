~(function () {
    const logo = document.querySelector('.footer__logo')

    logo.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      })
    })
  })()