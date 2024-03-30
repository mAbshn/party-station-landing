~function () {
  // Изменение placeholder в зависимости от размера окна
  const LONG_PLACEHOLDER = "Введите email чтобы войти в аккаунт или создать новый"
  const SHORT_PLACEHOLDER = "Введите email"
  const CHANGE_PLACEHOLDERS_SIZE = 760

  const mailInput = document.getElementById('mail-field')

  function cutInputPlaceholder(windowWidth) {
    const isWindowSmall = windowWidth <= CHANGE_PLACEHOLDERS_SIZE
    const isTextLong = mailInput.placeholder === LONG_PLACEHOLDER

    if (isWindowSmall && isTextLong) {
      mailInput.placeholder = SHORT_PLACEHOLDER
      return
    }

    if (!isWindowSmall && !isTextLong) {
      mailInput.placeholder = LONG_PLACEHOLDER
    }
  }

  window.addEventListener('load', () => cutInputPlaceholder(document.body.clientWidth))
  window.addEventListener('resize', (e) => cutInputPlaceholder(e.target.innerWidth))

  // Изменение размера видео проигрывателя в зависимости от scrollTop и ширины окна
  const wrapper = document.querySelector('.introducing')
  const videoWrapper = document.querySelector('.introducing__video')
  const video = document.querySelector('.introducing__video video')

  const getElemInViewPart = (elem) => {
    if (!elem) {
      return null
    }

    const elemTop = elem.offsetTop
    const elemHeight = elem.clientHeight
    const windowHeight = window.innerHeight
    const scrollTop = document.documentElement.scrollTop

    const inViewPart = (scrollTop + windowHeight - elemTop) / elemHeight

    if (inViewPart < 0) {
      return 0
    }

    if (inViewPart > 1) {
      return 1
    }

    return inViewPart
  }

  const windowEventsCb = () => {
    const windowWidth = window.innerWidth
    const ratio = video.clientHeight / video.clientWidth
    const marginForVideo = windowWidth * ratio

    videoWrapper.style.marginBottom = marginForVideo + 'px'
  }

  window.addEventListener('load', windowEventsCb)
  window.addEventListener('resize', windowEventsCb)

  document.addEventListener('scroll', () => {
    const videoInViewPart = getElemInViewPart(video)
    const THRESHOLD = 0.3

    if (videoInViewPart && videoInViewPart > THRESHOLD) {
      const expandPart = (videoInViewPart - THRESHOLD) / (1 - THRESHOLD)
      const expandPx = (window.innerWidth - wrapper.clientWidth) * expandPart

      video.style.width = wrapper.clientWidth + expandPx + 'px'
      video.style.transform = `translateX(-${expandPx / 2}px)`
      video.style.borderRadius = 24 * (1 - expandPart) + 'px'
    }
  })
}()
