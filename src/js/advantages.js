~function () {
    new Swiper(`.advantages .swiper`, {
        slidesPerView: 1,
        spaceBetween: 64,
        grabCursor: true,
        autoplay: true,
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
          },
      })
}()