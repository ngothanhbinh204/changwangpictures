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
			offset: 200,
			once: true,
			disable: function () {
				return window.innerWidth < 1200;
			},
		});
	}, 100);
	setTimeout(() => {
		AOS.refresh();
	}, 1000);

	initVideoPopup();
	initBlogFilter();
});


function initBlogFilter() {
	const $tabs = $('.blog-tabs .tab-item');
	const $container = $('.blog-list');

	if ($tabs.length > 0 && $container.length > 0 && window.blogListData) {
		const renderItems = (filter) => {
			const filteredData = filter === 'all' 
				? window.blogListData 
				: window.blogListData.filter(item => item.category === filter);

			let html = '';
			filteredData.forEach((item, index) => {
				const isExpand = index % 4 === 0;
				const cardClass = isExpand ? 'blog-card is-expand' : 'blog-card';
				const ratioClass = isExpand ? 'ratio:pt-[529_652]' : 'ratio:pt-[272_315]';

				html += `
					<div class="${cardClass}" data-category="${item.category}" data-aos="fade-up" data-aos-delay="${(index % 4) * 100}">
						<div class="img-ratio ${ratioClass}">
							<img data-src="${item.img}" alt="" class="lozad">
						</div>
						<div class="content">
							<div class="category">${item.category}</div>
							<h3 class="title">
								<a href="./BlogDetail.html">${item.title}</a>
							</h3>
							<div class="desc">
								<p>${item.desc}</p>
							</div>
							<a class="btn-view-more" href="./BlogDetail.html">
								<span>VIEW MORE</span>
								<i class="fa-regular fa-arrow-right-long"></i>
							</a>
						</div>
					</div>
				`;
			});

			// Fade out current items, update content, and fade in
			$container.fadeOut(300, function() {
				$container.html(html);
				$container.fadeIn(300);

				// Initialize Lozad for new images
				if (window.lozad) {
					window.lozad.observe();
				}

				// Refresh AOS
				setTimeout(() => {
					if (window.AOS) {
						window.AOS.refresh();
					}
				}, 200);
			});
		};

		$tabs.on('click', function (e) {
			e.preventDefault();
			const filter = $(this).attr('data-filter');

			if ($(this).hasClass('active')) return;

			$tabs.removeClass('active');
			$(this).addClass('active');

			renderItems(filter);
		});
	}
}


function initVideoPopup() {
	const popup = document.getElementById('video-popup');
	if (!popup) return;

	const closeBtn = popup.querySelector('.close-popup');
	const triggerBtns = document.querySelectorAll('.play-button');
	const videoContainer = popup.querySelector('.video-container');
	const video = popup.querySelector('video');
	const source = video.querySelector('source');
	const thumbItems = popup.querySelectorAll('.video-thumb-item');
	const playBtnPopup = popup.querySelector('.btn-play-popup');
	const overlayTitle = popup.querySelector('.overlay-title');

	// Helper to reset state
	const resetVideoState = (src, title) => {
		videoContainer.classList.remove('is-playing');
		video.pause();
		video.currentTime = 0;
		if (src) source.src = src;
		video.load();
		if (title && overlayTitle) overlayTitle.textContent = title;
	};

	// Open Popup
	if (triggerBtns) {
		triggerBtns.forEach(btn => {
			btn.addEventListener('click', () => {
				const src = "https://avtshare01.rz.tu-ilmenau.de/avt-vqdb-uhd-1/test_1/segments/bigbuck_bunny_8bit_15000kbps_1080p_60.0fps_h264.mp4";
				// Reset state -> Show overlay, don't auto play
				resetVideoState(src, "LUNA LOPEZ");
				
				popup.classList.add('active');
				document.body.style.overflow = 'hidden';
			});
		});
	}

	// Close Popup
	if (closeBtn) {
		closeBtn.addEventListener('click', () => {
			popup.classList.remove('active');
			video.pause();
			videoContainer.classList.remove('is-playing');
			document.body.style.overflow = '';
		});
	}

	// Play from Overlay Button
	if (playBtnPopup) {
		playBtnPopup.addEventListener('click', () => {
			videoContainer.classList.add('is-playing');
			video.play();
		});
	}

	// Switch Video from Thumbnail
	if (thumbItems) {
		thumbItems.forEach(item => {
			item.addEventListener('click', () => {
				const newSrc = item.getAttribute('data-src');
				const newTitle = item.getAttribute('data-title');

				// Reset state -> show overlay with new title
				resetVideoState(newSrc, newTitle);

				// Update Side Info (Mock update)
				const titleEl = popup.querySelector('.video-title');
				if (titleEl) titleEl.textContent = newTitle;
			});
		});
	}
}


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
