/* =====================================================
   DOCUMENT READY (jQuery FEATURES)
===================================================== */
$(document).ready(function () {

  /* ================== BURGER MENU ================== */
  $('#nav-toggle').on('click', function () {
    $('#nav-menu').toggleClass('show-menu');
    $('body').toggleClass('nav-open');
  });


  /* ================== MOBILE ACCORDION DROPDOWNS ================== */
  $('.dropdown__item > .nav__link').on('click', function (e) {
    if (window.innerWidth <= 900) {
      e.preventDefault();

      const $menu = $(this).siblings('.dropdown__menu');
      const isOpen = $menu.hasClass('show-menu');

      // Close all main dropdowns
      $('.dropdown__menu').removeClass('show-menu');
      $('.dropdown__item > .nav__link').removeClass('open');

      if (!isOpen) {
        $menu.addClass('show-menu');
        $(this).addClass('open');
      }
    }
  });

  $('.dropdown__subitem > .dropdown__link').on('click', function (e) {
    if (window.innerWidth <= 900) {
      e.preventDefault();

      const $submenu = $(this).siblings('.dropdown__submenu');
      const isOpen = $submenu.hasClass('show-menu');

      // Close sibling submenus
      $(this).closest('.dropdown__menu')
        .find('.dropdown__submenu').removeClass('show-menu');

      $(this).closest('.dropdown__menu')
        .find('.dropdown__link').removeClass('open');

      if (!isOpen) {
        $submenu.addClass('show-menu');
        $(this).addClass('open');
      }
    }
  });


  /* ================== COUNTERS ================== */
  let countersStarted = false;

  function animateCounters() {
    $('.counter').each(function () {
      const $counter = $(this);
      const target = parseInt($counter.attr('data-target'), 10);
      const suffix = $counter.data('suffix') || '';

      $({ count: 0 }).animate(
        { count: target },
        {
          duration: 1600,
          easing: 'swing',
          step: function () {
            $counter.text(Math.floor(this.count));
          },
          complete: function () {
            $counter.text(target + suffix);
          }
        }
      );
    });
  }


  /* ================== SCROLL REVEAL (KEPT) ================== */
  function reveal() {
    const windowHeight = $(window).height();
    const scrollTop = $(window).scrollTop();
    const revealPoint = 150;

    $('.reveal').each(function () {
      const elementTop = $(this).offset().top;

      if (elementTop < scrollTop + windowHeight - revealPoint) {
        $(this).addClass('active');
      }
    });
  }


  /* ================== COMBINED SCROLL HANDLER ================== */
  $(window).on('scroll load', function () {

    // Reveal
    reveal();

    // Counters trigger
    if (!countersStarted) {
      const statsTop = $('.stats').offset().top;
      const scrollBottom = $(window).scrollTop() + $(window).height();

      if (scrollBottom > statsTop + 100) {
        animateCounters();
        countersStarted = true;
      }
    }

  });


  /* ================== EVENTS SWIPER ================== */
  let eventsSwiper = null;

  function initSwiper() {
    if (typeof Swiper === 'undefined') return;

    if (eventsSwiper) {
      eventsSwiper.destroy(true, true);
    }

    eventsSwiper = new Swiper('.events-swiper', {
      slidesPerView: 1,
      spaceBetween: 24,
      loop: true,
      loopAdditionalSlides: 3,
      speed: 700,
      grabCursor: true,
      loopAdditionalSlides: 3,

      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev'
      },

      breakpoints: {
        640: { slidesPerView: 1 },
        768: { slidesPerView: 2 },
        1024: { slidesPerView: 3 }
      }
    });
  }

  initSwiper();

  $(window).on('resize', function () {
    clearTimeout(window.__swiperResizeTimer);
    window.__swiperResizeTimer = setTimeout(initSwiper, 300);
  });

});


/* =====================================================
   STICKY NAVBAR (PURE VANILLA JS)
===================================================== */
const header = document.getElementById('header');
let lastScrollTop = 0;

window.addEventListener('scroll', function () {
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

  // Sticky after 80px
  if (scrollTop > 80) {
    header.classList.add('sticky');
  } else {
    header.classList.remove('sticky');
  }

  // Hide on scroll down, show on scroll up
  if (scrollTop > lastScrollTop && scrollTop > 120) {
    header.classList.add('hide');
  } else {
    header.classList.remove('hide');
  }

  lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
});
