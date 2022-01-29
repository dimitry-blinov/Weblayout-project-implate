window.addEventListener('DOMContentLoaded', () => {
  // SmoothScrollPolyfill
  window.__forceSmoothScrollPolyfill__ = true;

  const root = document.documentElement;
  const darkBackground = '#2b2b2b';
  const lightBackground = '#fafafa';
  const lightText = '#fff';
  const darkText = '#424242';

  // VIDEO PLAYING

  const videoPlay = document.querySelector('.video-controller--play');
  const videoPause = document.querySelector('.video-controller--pause')
  const video = document.querySelectorAll('.video');
  const barLine = document.querySelector('.bar__line')
  const btnPrev = document.querySelector('.swiper-button-prev');
  const btnNext = document.querySelector('.swiper-button-next');

  videoPlay.addEventListener('click', () => {
    video.forEach(item => {
      if (item.closest('.swiper-slide').classList.contains('swiper-slide-active')) {
        item.play()
      }
    });
    videoPlay.style.display = 'none';
    videoPause.style.display = 'block';
  })

  videoPause.addEventListener('click', () => {
    video.forEach(item => {
      if (item.closest('.swiper-slide').classList.contains('swiper-slide-active')) {
        item.pause();
      }
    });
    videoPause.style.display = 'none';
    videoPlay.style.display = 'block';
  })

  function pauseVideo() {
    video.forEach((item) => {
      item.pause();
    })
    videoPause.style.display = 'none';
    videoPlay.style.display = 'block';
  }

  btnPrev.addEventListener('click', pauseVideo)
  btnNext.addEventListener('click', pauseVideo)

  video.forEach(item => {
   item.ontimeupdate = function () {
      let percentage = (item.currentTime / item.duration) * 100
      barLine.style.width = percentage + '%';
    }
  })


  // MENU

  const burger = document.querySelector('.header__burger');
  const close = document.querySelector('.btn__close');
  const menu = document.querySelector('.menu');
  const menuLink = document.querySelectorAll('.menu-nav__link');
  const header = document.querySelector('.header');
  const body = document.body;

  menu.inert = true;
  let previousActiveElement;

  function showMenu() {
    menu.classList.add('menu--showed');
    bodyScrollLock.disableBodyScroll(menu)
    previousActiveElement = document.activeElement;
    Array.from(body.children).forEach((child) => {
      if (child !== header) {
        child.inert = true;
      }
      menu.inert = false;
      close.focus()
    })

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') {
        closeMenu();
      }
    })
  }

  function closeMenu() {
    menu.classList.remove('menu--showed')
    Array.from(body.children).forEach((child) => {
      if (child !== menu) {
        child.inert = false;
      }
      menu.inert = true;
      burger.focus()
    })
    bodyScrollLock.enableBodyScroll(menu)
  }

  burger.addEventListener('click', showMenu)
  close.addEventListener('click', closeMenu)

  menuLink.forEach((item) => {
    item.addEventListener('click', closeMenu);
  })

  // THEME

  const btnRecolor = document.querySelector('.btn-theme');
  btnRecolor.addEventListener('click', () => {
    if (document.body.classList.contains('dark-theme')) {
      root.style.setProperty('--theme-background', lightBackground);
      root.style.setProperty('--theme-text', darkText);
      document.body.classList.add('light-theme');
      document.body.classList.remove('dark-theme');
    } else {
      root.style.setProperty('--theme-background', darkBackground);
      root.style.setProperty('--theme-text', lightText);
      document.body.classList.add('dark-theme');
      document.body.classList.remove('light-theme');
    }
  })

  // SWIPER

  new Swiper('.swiper', {
    longSwipes: false,
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    breakpoints: {
      400: {
        pagination: {
          el: '.swiper-pagination',
          type: 'fraction'
        },
      }
    }
  });


});
