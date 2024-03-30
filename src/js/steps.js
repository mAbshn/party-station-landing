~function () {
  const selectorsToObserve = ['.steps__first', '.steps__second', '.steps__third', '.steps__play-btn']
  const stepsContainer = document.querySelector('.steps')

  const observerCb = (entries) => {
    entries.forEach((entry) => {
      const stepElem = entry.target

      if (entry.isIntersecting) {
        stepElem.classList.add('step-animation')
      }
    })
  }

  selectorsToObserve.forEach((selector) => {
    const observer = new IntersectionObserver(observerCb)
    observer.observe(document.querySelector(selector))
  })

  // сброс анимации
  document.addEventListener('scroll', () => {
    const scrollTop = document.documentElement.scrollTop
    const firstStep = document.querySelector('.steps__first')

    if (firstStep.classList.contains('step-animation') && scrollTop + window.innerHeight < stepsContainer.offsetTop) {
      selectorsToObserve.forEach((selector) => {
        const elem = document.querySelector(selector)
        elem.classList.remove('step-animation')
      })
    }
  })
}()
