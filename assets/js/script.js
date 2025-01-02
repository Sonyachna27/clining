
document.addEventListener("DOMContentLoaded", function () {
	
	toggleMenu();
	animationHeader();
	accordionFunction();
	handlePopup();
	windowLoad();
	animateAboutText();
});

setTimeout(function () {
	let aosOffset = 120;
	if (window.innerWidth < 480) {
		aosOffset = 30;
	}
	AOS.init({
		duration: 400,
		easing: 'ease-out-quart',
		offset: aosOffset
	});
}, 100);
const animateAboutText = () =>{
	const aboutText = document.querySelectorAll('.about__content p, .footer nav li, .footer__block');
	aboutText.forEach((text) => {
		text.setAttribute('data-aos', 'fade-up');
	})
}
const animationHeader = () =>{
	let lastScrollTop = 0;

  window.addEventListener("scroll", function () {
		const headerNav = document.querySelector(".header__bottom");
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
		let windowInnerWidth = window.innerWidth;
    if (windowInnerWidth >= 1024) {
      if (scrollTop > lastScrollTop) {
        if (scrollTop > 100) {
          headerNav.classList.add("fixed-header-nav");
          headerNav.style.animationName = "smoothScroll";
        }
      } else if (scrollTop <= 0) {
        headerNav.classList.remove("fixed-header-nav");
        headerNav.style.animationName = "removeSmoothScroll";
      }
      lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
    }
  });
}
const toggleMenu = () =>{
	const htmlElement = document.querySelector("html");
	const burgerMenu = document.querySelector(".burger");
  const navLinks = document.querySelectorAll("nav a");
  burgerMenu.addEventListener("click", () =>
    htmlElement.classList.toggle("open")
  );

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      htmlElement.classList.remove("open");
    });
  });
}

$(document).ready(function () {
  $('.ba-slider').each(function () {
    $(this).beforeAfter();
  });
});
const accordionFunction = () => {
  const accordionItems = document.querySelectorAll(".accord-item");

  accordionItems.forEach((item) => {
    item.addEventListener("click", function () {
      item.classList.toggle("active");
    });

    const buttons = item.querySelectorAll("button");
    buttons.forEach((button) => {
      button.addEventListener("click", (event) => {
        event.stopPropagation();
      });
    });
  });
};

const handlePopup = () => {
	const openPopup = () => {
			document.querySelectorAll('[data-open="open"]').forEach(element => {
					element.addEventListener('click', () => {
							document.documentElement.classList.add('open-popup');
					});
			});
	};

	const closePopup = () => {
			document.querySelectorAll('[data-close="close"]').forEach(element => {
					element.addEventListener('click', () => {
							document.documentElement.classList.remove('open-popup');
					});
			});
	};

	openPopup();
	closePopup();
};
function windowLoad() {
	const animationDuration = 3000;
	const frameDuration = 1000 / 60;
	const totalFrames = Math.round(animationDuration / frameDuration);
	const easeOutQuad = t => t * (2 - t);

	const numScroll = statValue => {
			const countTo = parseInt(statValue.dataset.target.replace(/,/g, ''), 10);
			let frame = 0;

			const counter = setInterval(() => {
					frame++;
					const progress = easeOutQuad(frame / totalFrames);
					const currentCount = Math.round(countTo * progress);

					statValue.innerHTML = currentCount;

					if (frame === totalFrames) {
							clearInterval(counter);
							statValue.innerHTML = countTo;
					}
			}, frameDuration);
	};

	const statValueInit = (statValues = document.querySelectorAll('.stat-value')) => {
			statValues.forEach(numScroll);
	};

	const observer = new IntersectionObserver(entries => {
			entries.forEach(entry => {
					if (entry.isIntersecting) {
							const statValues = entry.target.querySelectorAll('.stat-value');
							if (statValues.length) {
									statValueInit(statValues);
							}
					}
			});
	}, { threshold: 0.7 });

	document.querySelectorAll('.count__container').forEach(section => {
			observer.observe(section);
	});

	if (document.readyState === 'complete') {
			statValueInit();
	} else {
			window.addEventListener('DOMContentLoaded', () => {
					statValueInit();
			});
	}
}
