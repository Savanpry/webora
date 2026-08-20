/* Loader JS Start */

if ('scrollRestoration' in history) {
  history.scrollRestoration = 'manual';
}

window.scrollTo(0, 0);

/* Loader JS End */


/* Sun Face JS Start */

if (document.querySelectorAll('.sun__face-svg').length) {
  const suns = document.querySelectorAll('.sun__face-svg');

  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let currentX = mouseX;
  let currentY = mouseY;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  function animateSunFace() {
    currentX += (mouseX - currentX) * 0.1;
    currentY += (mouseY - currentY) * 0.1;

    suns.forEach((sun) => {
      const parent = sun.closest('.sun--icon') || sun.closest('.footer--bottom--sun') || sun.parentElement;
      if (!parent) return;

      const rect = parent.getBoundingClientRect();
      const sunCenterX = rect.left + rect.width / 2;
      const sunCenterY = rect.top + rect.height / 2;

      const scaleFactor = Math.min(rect.width, 200) / 200;
      const maxOffset = 5 * scaleFactor;

      let diffX = (currentX - sunCenterX) * 0.06;
      let diffY = (currentY - sunCenterY) * 0.06;

      diffX = Math.max(-maxOffset, Math.min(maxOffset, diffX));
      diffY = Math.max(-maxOffset, Math.min(maxOffset, diffY));

      sun.style.transform = `translate(calc(-50% + ${diffX.toFixed(2)}px), calc(-50% + ${diffY.toFixed(2)}px))`;
    });

    requestAnimationFrame(animateSunFace);
  }

  animateSunFace();
}

/* Sun Face JS End */


/* Card Shuffle JS Start */

document.addEventListener("DOMContentLoaded", () => {

  if (document.querySelector('.banner--card')) {

    let swipeDirection = 1;

    function setupCards() {
      const allCards = document.querySelectorAll(".stack--card--item");

      allCards.forEach((card, index) => {

        if (!card.dataset.rotate) {
          const style = window.getComputedStyle(card);
          const matrix = new DOMMatrixReadOnly(style.transform);

          let angle = 0;
          if (matrix.a !== 1 || matrix.b !== 0) {
            angle = Math.round(Math.atan2(matrix.b, matrix.a) * (180 / Math.PI));
          }

          card.dataset.rotate = angle;
        }

        gsap.set(card, {
          zIndex: index,
          x: 0,
          y: 0,
          rotation: card.dataset.rotate,
          scale: 1
        });
      });

      makeTopDraggable();
    }

    function makeTopDraggable() {
      const allCards = document.querySelectorAll(".stack--card--item");
      const topCard = allCards[allCards.length - 1];

      if (!topCard) return;

      Draggable.create(topCard, {
        type: "x,y",
        edgeResistance: 0.65,
        inertia: true,

        onDrag: function () {
          const rotate = this.x / 10;
          gsap.to(topCard, {
            rotation: rotate,
            duration: 0.1
          });
        },

        onRelease: function () {
          handleSwipe(this.x);
        }
      });
    }

    function handleSwipe(xValue = 150) {
      const allCards = document.querySelectorAll(".stack--card--item");
      const topCard = allCards[allCards.length - 1];

      if (!topCard) return;

      if (Math.abs(xValue) > 100) {

        const isRight = xValue > 0;

        gsap.to(topCard, {
          x: isRight ? 500 : -500,
          rotation: isRight ? 30 : -30,
          duration: 0.5,
          ease: "power2.out",
          onComplete: () => {

            topCard.parentNode.insertBefore(topCard, topCard.parentNode.firstChild);

            gsap.set(topCard, {
              x: 0,
              y: 0,
              rotation: topCard.dataset.rotate
            });

            setupCards();
          }
        });

      } else {
        gsap.to(topCard, {
          x: 0,
          y: 0,
          rotation: topCard.dataset.rotate,
          duration: 0.3
        });
      }
    }

    const shuffleBtn = document.querySelector(".btn--shuffle");

    if (shuffleBtn) {
      shuffleBtn.addEventListener("click", () => {

        const direction = swipeDirection * 150;

        handleSwipe(direction);

        swipeDirection *= -1;
      });
    }

    setupCards();
  }
});

/* Card Shuffle JS Start */


/* Rainbox SVG animation JS Start */

// window.addEventListener("load", () => {
//   const container = document.querySelector(".rainbox--sides");
//   const bannerTitle = document.querySelector(".banner--title");

//   if (!container || !bannerTitle) {
//     document.body.classList.add("is--loaded");
//     return;
//   }

//   setTimeout(() => {
//     document.body.classList.add("is--loaded");
//   }, 4000);

//   const paths = container.querySelectorAll("path");
//   const lengths = [];

//   paths.forEach((path, i) => {
//     const len = path.getTotalLength();

//     lengths[i] = len;

//     path.style.strokeDasharray = `${len}px`;
//     path.style.strokeDashoffset = len;
//   });

//   let progress = 0;
//   let target = 0;
//   let isLoaded = false;
//   let reverseEnabled = false;

//   function loadAnim() {
//     progress += 0.01;

//     if (progress > 1) {
//       progress = 1;
//     }

//     paths.forEach((path, i) => {
//       path.style.strokeDashoffset =
//         lengths[i] * (1 - progress);
//     });

//     if (progress < 1) {
//       requestAnimationFrame(loadAnim);
//     } else {
//       target = 1;
//       isLoaded = true;
//       window.scrollTo(0, 0);
//       document.body.classList.add("is--loaded");
//       smoothLoop();
//     }
//   }

//   const observer = new IntersectionObserver(
//     (entries) => {
//       entries.forEach((entry) => {
//         reverseEnabled = entry.isIntersecting;
//       });
//     },
//     {
//       threshold: 0.1
//     }
//   );

//   observer.observe(bannerTitle);

//   window.addEventListener(
//     "wheel",
//     (e) => {
//       if (!isLoaded) return;

//       if (!reverseEnabled) return;

//       const speed = 0.0015;

//       target -= e.deltaY * speed;

//       target = Math.min(Math.max(target, 0), 1);
//     },
//     { passive: true }
//   );

//   function smoothLoop() {
//     progress += (target - progress) * 0.25;

//     if (Math.abs(target - progress) < 0.0001) {
//       progress = target;
//     }

//     paths.forEach((path, i) => {
//       path.style.strokeDashoffset =
//         lengths[i] * (1 - progress);
//     });

//     requestAnimationFrame(smoothLoop);
//   }

//   loadAnim();
// });


window.addEventListener("load", () => {
  const container = document.querySelector(".rainbox--sides");
  const bannerTitle = document.querySelector(".banner--title");

  if (!container || !bannerTitle) {
    document.body.classList.add("is--loaded");
    return;
  }

  // Initially hide rainbow
  container.classList.remove("is--animate");

  setTimeout(() => {
    document.body.classList.add("is--loaded");
  }, 4000);

  const paths = container.querySelectorAll("path");
  const lengths = [];

  paths.forEach((path, i) => {
    const len = path.getTotalLength();

    lengths[i] = len;

    path.style.strokeDasharray = `${len}px`;
    path.style.strokeDashoffset = len;
  });

  let progress = 0;
  let target = 0;
  let isLoaded = false;
  let reverseEnabled = false;

  function loadAnim() {
    if (progress === 0) {
      container.classList.add("is--animate");
    }

    progress += 0.01;

    if (progress > 1) {
      progress = 1;
    }

    paths.forEach((path, i) => {
      path.style.strokeDashoffset =
        lengths[i] * (1 - progress);
    });

    if (progress < 1) {
      requestAnimationFrame(loadAnim);
    } else {
      target = 1;
      isLoaded = true;

      window.scrollTo(0, 0);
      document.body.classList.add("is--loaded");

      smoothLoop();
    }
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        reverseEnabled = entry.isIntersecting;
      });
    },
    {
      threshold: 0.1
    }
  );

  observer.observe(bannerTitle);

  window.addEventListener(
    "wheel",
    (e) => {
      if (!isLoaded) return;
      if (!reverseEnabled) return;

      const speed = 0.0015;

      target -= e.deltaY * speed;

      target = Math.min(Math.max(target, 0), 1);
    },
    { passive: true }
  );

  function smoothLoop() {
    progress += (target - progress) * 0.25;

    if (Math.abs(target - progress) < 0.0001) {
      progress = target;
    }

    paths.forEach((path, i) => {
      path.style.strokeDashoffset =
        lengths[i] * (1 - progress);
    });

    requestAnimationFrame(smoothLoop);
  }

  // Start animation
  loadAnim();
});


/* Rainbox SVG animation JS End */


/* Banner Card Animation JS Start */

window.addEventListener("load", () => {
  const container = document.querySelector(".banner--card--shape");
  const banner = document.querySelector(".banner-main-sec");
  if (!container || !banner) return;

  const paths = container.querySelectorAll("path");
  const lengths = [];

  paths.forEach((path, i) => {
    const len = path.getTotalLength();
    lengths[i] = len;

    path.style.strokeDasharray = len;
    path.style.strokeDashoffset = len;
  });

  let progress = 0;
  let target = 0;

  const elementTop = container.offsetTop;
  const elementHeight = container.offsetHeight;
  const windowHeight = window.innerHeight;

  const startScroll = elementTop - windowHeight;
  const endScroll = elementTop + elementHeight;

  window.addEventListener("scroll", () => {
    const scrollY = window.scrollY;

    let scrollProgress = (scrollY - startScroll) / (endScroll - startScroll);
    scrollProgress = Math.min(Math.max(scrollProgress, 0), 1);

    const bannerRect = banner.getBoundingClientRect();

    if (bannerRect.top >= 0) {
      target = 0;
    } else {
      target = scrollProgress;
    }
  });

  const delayStep = 0.08;
  const groupSize = paths.length / 2;

  function animate() {
    progress += (target - progress) * 0.12;

    paths.forEach((path, i) => {
      const groupIndex = i % groupSize;

      const dynamicDelay = groupIndex * delayStep * (1 - progress);

      let delayedProgress = progress - dynamicDelay;

      delayedProgress = Math.min(Math.max(delayedProgress, 0), 1);

      path.style.strokeDashoffset =
        lengths[i] * (1 - delayedProgress);
    });

    requestAnimationFrame(animate);
  }

  animate();
});

/* Banner Card Animation JS End */


/* Banner Text Animation JS Start */

document.addEventListener("DOMContentLoaded", () => {
  const textElement = document.querySelector(".loader--sun--text p");

  const texts = [
    "We are Back...",
    "Friday 8th August, Manchester, UK"
  ];

  let textIndex = 0;
  let charIndex = 0;

  function typeText() {
    if (charIndex < texts[textIndex].length) {
      textElement.textContent += texts[textIndex].charAt(charIndex);
      charIndex++;
      setTimeout(typeText, 60);
    } else {
      setTimeout(() => {
        textIndex++;
        charIndex = 0;

        if (textIndex < texts.length) {
          textElement.textContent = "";
          typeText();
        }
      }, 1000);
    }
  }

  textElement.textContent = "";
  typeText();
});

/* Banner Text Animation JS Start */


/* Marquee JS Start */

document.addEventListener("DOMContentLoaded", function () {

  const track = document.querySelector(".marquee--track");
  const slides = gsap.utils.toArray(".marquee--item");

  slides.forEach(slide => {
    const clone = slide.cloneNode(true);
    track.appendChild(clone);
  });

  let totalWidth = 0;
  slides.forEach(slide => {
    totalWidth += slide.offsetWidth + 10;
  });

  const loop = gsap.to(track, {
    x: `-=${totalWidth}`,
    duration: 60,
    ease: "none",
    repeat: -1,
  });

});

/* Marquee JS End */


/* Speaker Card Cursor JS Start */

const wrappers = document.querySelectorAll(".speaker--item");

wrappers.forEach(wrapper => {
  const cursor = wrapper.querySelector(".speaker--item--cursor___inner");
  if (!cursor) return;

  let mouse = { x: 0, y: 0 };
  let pos = { x: 0, y: 0 };

  wrapper.addEventListener("mousemove", (e) => {
    const rect = wrapper.getBoundingClientRect();

    let x = e.clientX - rect.left - cursor.offsetWidth / 2;
    let y = e.clientY - rect.top - cursor.offsetHeight;

    const maxX = rect.width - cursor.offsetWidth;
    const maxY = rect.height - cursor.offsetHeight;

    mouse.x = Math.max(0, Math.min(x, maxX));
    mouse.y = Math.max(0, Math.min(y, maxY));
  });

  gsap.ticker.add(() => {
    pos.x += (mouse.x - pos.x) * 0.2;
    pos.y += (mouse.y - pos.y) * 0.2;

    gsap.set(cursor, {
      x: pos.x,
      y: pos.y
    });
  });

  wrapper.addEventListener("mouseleave", () => {
    mouse.x = 0;
    mouse.y = 0;
    pos.x = 0;
    pos.y = 0;

    gsap.set(cursor, { x: 0, y: 0 });
  });
});

/* Speaker Card Cursor JS End */


/* FAQ JS Start */

function initAccordion() {
  const wrapper = document.querySelector(".accordion--wrapper");
  if (!wrapper) return;

  const items = wrapper.querySelectorAll(".accordion--item");

  items.forEach(item => {
    item.addEventListener("click", () => {
      const isOpen = item.classList.contains("is--open");

      items.forEach(el => el.classList.remove("is--open"));

      if (!isOpen) {
        item.classList.add("is--open");
      }
    });
  });
}

window.addEventListener("load", initAccordion);

/* FAQ JS End */


/* About Bottom Shape JS Start */

window.addEventListener("load", () => {
  const container = document.querySelector(".about--bottom--shape");
  const banner = document.querySelector(".about--main");
  const aboutBottom = document.querySelector(".about--bottom");

  if (!container || !banner || !aboutBottom) return;

  const paths = container.querySelectorAll("path");

  if (!paths.length) return;

  const lengths = [];

  const SCROLL_SPEED = 1.8;
  const SMOOTHNESS = 0.18;
  const delayStep = 0.08;

  paths.forEach((path, i) => {
    const len = path.getTotalLength();

    lengths[i] = len;

    path.style.strokeDasharray = `${len}px`;
    path.style.strokeDashoffset = `${len}px`;
  });

  let progress = 0;
  let target = 0;
  let isActive = false;

  const groupSize = paths.length / 2;

  function updateScroll() {
    if (!isActive) return;

    const scrollY = window.scrollY;

    const elementTop =
      container.getBoundingClientRect().top + scrollY;

    const elementHeight = container.offsetHeight;
    const windowHeight = window.innerHeight;

    const startScroll = elementTop - windowHeight;

    const endScroll =
      startScroll +
      (elementHeight + windowHeight) / SCROLL_SPEED;

    let scrollProgress =
      (scrollY - startScroll) /
      (endScroll - startScroll);

    scrollProgress = Math.min(
      Math.max(scrollProgress, 0),
      1
    );

    const bannerRect = banner.getBoundingClientRect();

    if (bannerRect.top >= 0) {
      target = 0;
    } else {
      target = scrollProgress;
    }
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          isActive = true;
          updateScroll();
        }
      });
    },
    {
      threshold: 0
    }
  );

  observer.observe(aboutBottom);

  window.addEventListener(
    "scroll",
    updateScroll,
    {
      passive: true
    }
  );

  function animate() {
    if (isActive) {
      progress +=
        (target - progress) * SMOOTHNESS;

      paths.forEach((path, i) => {
        const groupIndex =
          i % groupSize;

        const dynamicDelay =
          groupIndex *
          delayStep *
          (1 - progress);

        let delayedProgress =
          progress - dynamicDelay;

        delayedProgress = Math.min(
          Math.max(delayedProgress, 0),
          1
        );

        path.style.strokeDashoffset =
          lengths[i] *
          (1 - delayedProgress);
      });
    }

    requestAnimationFrame(animate);
  }

  animate();
});

/* About Bottom Shape JS End */


/* Header Link JS Start */

document.addEventListener("DOMContentLoaded", function () {
  const anchorLinks = document.querySelectorAll("[data-anchor-target]");

  anchorLinks.forEach(function (link) {
    link.addEventListener("click", function (e) {
      e.preventDefault();

      const targetId = this.getAttribute("data-anchor-target");
      const targetSection = document.getElementById(targetId);

      if (!targetSection) return;

      const header = document.querySelector(".header--main");
      const headerHeight = header ? header.offsetHeight : 0;

      const targetPosition =
        targetSection.getBoundingClientRect().top +
        window.pageYOffset -
        headerHeight;

      window.scrollTo({
        top: targetPosition,
        behavior: "smooth"
      });
    });
  });
});

/* Header Link JS End */


/* Sunny Fixed JS Start */

document.addEventListener("DOMContentLoaded", () => {
  const sunChatCombo = document.querySelector(".sun-chat-combo");
  const chatCloud = document.querySelector(".chat-cloud");
  const chatText = document.querySelector(".chat-cloud__p");

  if (!sunChatCombo || !chatCloud || !chatText) return;

  const fixedPoint = 300;
  const fullText = "Friday 8th August, Manchester, UK";

  const showDelay = 300;
  const typingSpeed = 45;
  const removeSpeed = 25;

  let typingTimer = null;
  let removeTimer = null;
  let delayTimer = null;

  let isTyping = false;
  let isRemoving = false;

  chatCloud.classList.remove("is--show");
  chatText.textContent = "...";

  function clearAllTimers() {
    clearTimeout(delayTimer);
    clearInterval(typingTimer);
    clearInterval(removeTimer);

    delayTimer = null;
    typingTimer = null;
    removeTimer = null;

    isTyping = false;
    isRemoving = false;
  }

  function typeText() {
    clearInterval(typingTimer);
    clearInterval(removeTimer);

    isTyping = true;
    isRemoving = false;

    chatText.textContent = "";

    let index = 0;

    typingTimer = setInterval(() => {
      if (!sunChatCombo.matches(":hover")) {
        clearInterval(typingTimer);
        typingTimer = null;
        isTyping = false;

        removeText();
        return;
      }

      chatText.textContent += fullText.charAt(index);
      index++;

      if (index >= fullText.length) {
        clearInterval(typingTimer);
        typingTimer = null;
        isTyping = false;
      }
    }, typingSpeed);
  }

  function removeText() {
    clearInterval(typingTimer);
    clearInterval(removeTimer);
    clearTimeout(delayTimer);

    typingTimer = null;
    delayTimer = null;

    isTyping = false;
    isRemoving = true;

    removeTimer = setInterval(() => {
      const currentText = chatText.textContent;

      if (currentText.length > 0) {
        chatText.textContent = currentText.slice(0, -1);
      }

      if (chatText.textContent.length === 0) {
        clearInterval(removeTimer);
        removeTimer = null;
        isRemoving = false;

        chatText.textContent = "...";

        setTimeout(() => {
          if (!sunChatCombo.matches(":hover")) {
            chatCloud.classList.remove("is--show");
          }
        }, 150);
      }
    }, removeSpeed);
  }

  function showChatCloud() {
    clearAllTimers();

    chatCloud.classList.add("is--show");

    chatText.textContent = "...";

    delayTimer = setTimeout(() => {
      if (sunChatCombo.matches(":hover")) {
        typeText();
      }
    }, showDelay);
  }

  function hideChatCloud() {
    clearTimeout(delayTimer);
    clearInterval(typingTimer);

    delayTimer = null;
    typingTimer = null;

    isTyping = false;

    removeText();
  }

  sunChatCombo.addEventListener("mouseenter", showChatCloud);

  sunChatCombo.addEventListener("mouseleave", hideChatCloud);

  function handleScroll() {
    if (window.scrollY >= fixedPoint) {
      sunChatCombo.classList.add("is--fixed");
    } else {
      sunChatCombo.classList.remove("is--fixed");

      if (!sunChatCombo.matches(":hover")) {
        clearAllTimers();

        chatText.textContent = "...";
        chatCloud.classList.remove("is--show");
      }
    }
  }

  window.addEventListener("scroll", handleScroll, {
    passive: true
  });

  handleScroll();
});

/* Sunny Fixed JS End */