
document.addEventListener("DOMContentLoaded", function () {
	
	toggleMenu();
	animationHeader();
	accordionFunction();
	handlePopup();
});

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