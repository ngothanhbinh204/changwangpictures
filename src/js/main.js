import AOS from "aos";
import lozad from "lozad";
import {
	setBackgroundElement,
	detectCloseElement,
	buttonToTop,
	clickScrollToDiv,
	appendCaptchaASP,
	menuSpy,
	ToggleItem,
	stickElementToEdge,
	replaceSvgImages,
	setOffsetToParent,
} from "./helper";
import Lenis from "lenis";
import { header } from "./header";
import { swiperInit } from "./swiper";
import { homePage } from "./homePage";
$(document).ready(function () {
	setBackgroundElement();
	stickElementToEdge();
	menuSpy();
	swiperInit();
	ToggleItem();
	replaceSvgImages();
	homePage.init();
	buttonToTop();
	header.init();
	removerAllActiveFieldOp();
	setOffsetToParent(
		".product-item .block-info .info-name",
		".product-item .block-info",
	);
	const lenis = new Lenis({
		duration: 0.5, // thay vì 0.3
		easing: (t) => 1 - Math.pow(1 - t, 3), // easing mượt hơn
		smooth: true,
		direction: "vertical",
		gestureDirection: "vertical",
		smoothTouch: true,
	});

	// RAF loop for Lenis
	function raf(time) {
		lenis.raf(time);
		requestAnimationFrame(raf);
	}
	requestAnimationFrame(raf);

	// Expose lenis to window for debugging
	window.lenis = lenis;

	setTimeout(() => {
		AOS.init({
			offset: 80,
			once: true,
			disable: function () {
				return window.innerWidth < 1200;
			},
		});
	}, 100);
	setTimeout(() => {
		AOS.refresh();
	}, 1000);
});


// function getHeightChild() {
// 	$(".item-var-height").each(function () {
// 		const height = $(this).outerHeight();
// 		$(this)
// 			.closest(".wrap-item-height")
// 			.css("--height-ele", height + "px");
// 	});
// }


function removerAllActiveFieldOp() {
	const fieldOpItem = $(".section-field-op .field-op .swiper-field-op .field-op-item");
	const sectionFieldOp = $(".section-field-op");

	fieldOpItem.on("mouseenter", function () {
		const $this = $(this);
		const $parent = $this.closest(".section-field-op");

		// Remove active từ tất cả items
		$parent.find(".field-op-item").removeClass("active");
		$this.addClass("active");

		// Nếu là service-detail-4 thì slider nhảy đến slide tương ứng
		if ($parent.hasClass("service-detail-4")) {
			const swiperEl = $this.closest(".swiper-field-op")[0];
			if (swiperEl?.swiper) {
				const swiper = swiperEl.swiper;
				const index = $this.index();
				swiper.slideTo(index);

				setTimeout(() => {
					swiper.updateSlides();
					swiper.updateSlidesClasses();
				}, 0);
			}
		}
	});

	// Nếu không phải service-detail-4: active item đầu tiên mặc định
	if (!sectionFieldOp.hasClass("service-detail-4")) {
		fieldOpItem.first().addClass("active");
	}
}

/*==================== Aos Init ====================*/
AOS.init({
	offset: 100,
});
/*==================== Lazyload JS ====================*/
const observer = lozad(); // lazy loads elements with default selector as '.lozad'
observer.observe();
window.lozad = observer;
