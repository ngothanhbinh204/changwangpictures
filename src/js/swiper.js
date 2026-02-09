import Swiper from "swiper";
import {
	Autoplay,
	Grid,
	Mousewheel,
	Navigation,
	Pagination,
	Thumbs,
	EffectFade,
	Scrollbar,
} from "swiper/modules";

/**
 * @param swiperInit
 */
export function swiperInit() {
	$(".swiper-column-auto").each(function (index) {
		const $this = $(this);
		// Configuration flagsvideoSetting
		const config = {
			loop: $this.hasClass("swiper-loop"),
			touchMove: $this.hasClass("allow-touchMove") || true,
			mouseWheel: $this.hasClass("allow-mouseWheel") ? { forceToAxis: true } : false,
			autoHeight: $this.hasClass("auto-height"),
			hasVideo: $this.hasClass("auto-detect-video"),
			paginationDot: $this.hasClass("pagination-dot"),
			center: $this.hasClass("center"),
			time: $this.attr("data-time") || 3500,
			autoplay: $this.hasClass("autoplay"),
			infinite: $this.hasClass("swiper-infinite"),
			scrollbar: $this.hasClass("swiper-scrollbar"),
			effect: $this.hasClass("effect"),
		};

		const configInfinite = {
			loop: true,
			time: 3500,
			grabCursor: true,
			freeMode: true,
			speed: 2000,
			slidesPerView: 4,
			breakpoints: {
				768: {
					slidesPerView: 4,
				},
				1024: {
					slidesPerView: 8,
				},
			},
			autoplay: {
				delay: 0.5,
				disableOnInteraction: false,
			},
		};

		// Add unique identifier class
		$this.addClass(`swiper-column-auto-id-${index}`);

		// Create swiper with optimized options
		new Swiper(`.swiper-column-auto-id-${index} .swiper`, {
			modules: [Navigation, Pagination, Mousewheel, Autoplay, EffectFade],
			speed: 500,
			observer: true,
			observeParents: true,
			...(config.effect && {
				effect: "fade",
			}),
			spaceBetween: 0,
			loop: config.loop,
			...(config.autoplay && {
				autoplay: {
					delay: config.time,
				},
			}),
			...(config.scrollbar && {
				scrollbar: {
					el: `.swiper-column-auto-id-${index} .swiper-scrollbar-slide`,
					// hide: false,
					draggable: true,
				},
			}),
			...(config.center && {
				centeredSlides: true,
			}),
			slidesPerView: "auto",
			pagination: {
				el: `.swiper-column-auto-id-${index} .swiper-pagination`,
				clickable: true,
				type: "fraction",
				...(config.paginationDot && {
					type: "bullets",
				}),
			},
			...(config.infinite && {
				...configInfinite,
			}),
			mousewheel: config.mouseWheel,
			allowTouchMove: config.touchMove,
			navigation: {
				prevEl: `.swiper-column-auto-id-${index} .btn-prev`,
				nextEl: `.swiper-column-auto-id-${index} .btn-next`,
			},
			watchSlidesProgress: true,
			autoHeight: config.autoHeight,
			on: {
				init: function () { },
				slideChange: function () { },
			},
		});
	});
	swiperBanner();
	swiperProductDetail();
	swiperFieldOp();
	swiperWork();
	swiperRelatedVideos();

	const about_5 = new Swiper(`.about-5 .swiper`, {
		modules: [Autoplay, Navigation],
		spaceBetween: 0,
		slidesPerView: "auto",
		speed: 500,
		// autoplay: {
		// 	delay: 3500,
		// 	disableOnInteraction: false,
		// },
		centeredSlides: true,
		navigation: {
			prevEl: `.about-5 .btn-prev`,
			nextEl: `.about-5 .btn-next`,
		},
		loop: true,
		on: {
			init: function () {
				handlePD15VisibleSlide(this);

			},
			slideChange: function () {
				handlePD15VisibleSlide(this);

			},
		},
	});

	function handlePD15VisibleSlide(swiper) {

		const slideBeforePrev = swiper.slides[swiper.activeIndex - 1];
		const slideBeforePrev2 = swiper.slides[swiper.activeIndex - 2];
		const slideAfterNext = swiper.slides[swiper.activeIndex + 1];
		const slideAfterNext2 = swiper.slides[swiper.activeIndex + 2];
		const allSlides = swiper.slides;
		allSlides.forEach((slide) => {
			slide.classList.remove(
				"previous-slide",
				"next-slide",
				"before-previous-slide",
				"after-next-slide"
			);
		});
		if (slideBeforePrev) {
			slideBeforePrev.classList.add("previous-slide");
		}
		if (slideAfterNext) {
			slideAfterNext.classList.add("next-slide");
		}
		if (slideBeforePrev2) {
			slideBeforePrev2.classList.add("before-previous-slide");
		}
		if (slideAfterNext2) {
			slideAfterNext2.classList.add("after-next-slide");
		}
	}


	// function setContentWidth(swiper) {
	// 	if (!swiper.activeIndex) {
	// 		requestAnimationFrame(() => setContentWidth(swiper));
	// 		return;
	// 	}
	// 	const index = swiper.activeIndex || 0;
	// 	const activeSlide = swiper.slides[index];
	// 	const image = activeSlide.querySelector(".img");
	// 	if (!image) return;
	// 	const { transform } = window.getComputedStyle(image);
	// 	const dataScale = transform.split("(")[1].split(")")[0].split(",")[0];
	// 	const isNumber = !isNaN(dataScale);
	// 	if (!isNumber) return;
	// 	image.addEventListener("transitionend", (event) => {
	// 		const scaleWidth = Math.round(image.offsetWidth * dataScale);
	// 		const bigWrapper = $(swiper.el).closest(".big-wrapper");
	// 		bigWrapper.find(">.content").css("width", `${scaleWidth}px`);
	// 	});
	// 	requestAnimationFrame(() => setContentWidth(swiper));
	// }
	// setContentWidth(about_5);


}
function swiperBanner() {
	const swiperEl = document.querySelector(".home-1 .swiper");
	if (!swiperEl) return;

	const swiper = new Swiper(swiperEl, {
		modules: [Pagination, Navigation, EffectFade, Autoplay],
		loop: true,
		effect: "fade",
		autoplay: {
			delay: 3500,
			disableOnInteraction: false,
		},
		slidesPerView: 1,
		speed: 700,
		pagination: { el: ".home-1 .swiper-pagination", clickable: true },
		navigation: { nextEl: ".home-1 .btn-next", prevEl: ".home-1 .btn-prev" },
	});

	function handleVideo(slide) {
		if (!slide) return false;
		const video = slide.querySelector("video");
		if (!video) return false;

		swiper.autoplay.stop();

		if (video.readyState < 2) {
			video.addEventListener("loadedmetadata", () => video.play());
		} else {
			video.play();
		}

		video.onended = () => swiper.slideNext();
		return true;
	}

	swiper.on("slideChangeTransitionEnd", () => {
		swiper.slides.forEach((slide, index) => {
			const v = slide.querySelector("video");
			if (v && index !== swiper.activeIndex) {
				v.pause();
				v.currentTime = 0;
				v.onended = null;
			}
		});

		const currentSlide = swiper.slides[swiper.activeIndex];
		const isVideo = handleVideo(currentSlide);
		if (!isVideo) swiper.autoplay.start();
	});

	if (swiper.slides[swiper.activeIndex]) {
		handleVideo(swiper.slides[swiper.activeIndex]);
	}
}



// Product Detail
function swiperProductDetail() {
	const swiperThumb = new Swiper(".product-detail-1 .thumb .swiper", {
		modules: [Mousewheel],
		speed: 700,
		observer: true,
		observeParents: true,
		slideToClickedSlide: true,
		rewind: true,
		allowTouchMove: false,
		direction: "vertical",
		slidesPerView: 4,
		spaceBetween: 12,
		breakpoints: {
			576: {
				slidesPerView: 4,
				spaceBetween: 12,
			},
			768: {
				slidesPerView: 4,
				spaceBetween: 12,
			},
			1024: {
				slidesPerView: 4,
				spaceBetween: 8,
			},

			1920: {
				slidesPerView: 4,
				spaceBetween: 20,
			},
		},
	});

	const swiperDetail = new Swiper(".product-detail-1 .main .swiper", {
		modules: [Thumbs, Navigation, Autoplay],
		spaceBetween: 12,
		slidesPerView: "auto",
		rewind: true,
		thumbs: {
			swiper: swiperThumb,
		},
		autoplay: {
			delay: 4500,
			disableOnInteraction: false,
		},
		speed: 700,
		observer: true,
		observeParents: true,
		navigation: {
			prevEl: ".product-detail-1 .btn-prev",
			nextEl: ".product-detail-1 .btn-next",
		},
	});

	// Gán ra window để sử dụng bên ngoài
	window.productDetailSwiper = {
		swiperThumb,
		swiperDetail,
	};
}

// Related Videos Swiper (Popup)
function swiperRelatedVideos() {
	const swiperEl = document.querySelector(".related-videos .swiper");
	if (!swiperEl) return;

	new Swiper(swiperEl, {
		modules: [Navigation],
		slidesPerView: "auto",
		spaceBetween: 20,
		speed: 600,
		navigation: {
			nextEl: ".related-videos .swiper-button-next",
			prevEl: ".related-videos .swiper-button-prev",
		},
		breakpoints: {
			320: {
				slidesPerView: "auto",
				spaceBetween: 10,
			},
			768: {
				slidesPerView: "auto",
				spaceBetween: 20,
			},
		},
	});
}

// Field Operation Swiper - Sustainability Section
function swiperFieldOp() {
	const backgroundContainer = document.querySelector('.section-field-op-img');
	const swiperEl = document.querySelector('.field-op .swiper');

	if (!backgroundContainer || !swiperEl) return;

	// Function to set background
	const setBackground = (background) => {
		if (background) {
			backgroundContainer.setAttribute('setBackground', background);
			backgroundContainer.style.setProperty('background-image', `url(${background})`, 'important');
			backgroundContainer.style.setProperty('background-size', 'cover', 'important');
			backgroundContainer.style.setProperty('background-position', 'center center', 'important');
			backgroundContainer.style.setProperty('background-repeat', 'no-repeat', 'important');
		}
	};

	// Get all field-op-items for fallback
	const allFieldOpItems = document.querySelectorAll('.field-op-item');
	console.log('Total field-op-items found:', allFieldOpItems.length);

	// Initialize Swiper with responsive breakpoints
	const swiper = new Swiper(swiperEl, {
		modules: [Navigation, Pagination, Mousewheel],
		speed: 600,
		observer: true,
		observeParents: true,
		slidesPerView: 'auto',
		spaceBetween: 0,
		direction: 'horizontal',
		mousewheel: {
			forceToAxis: true,
		},
		breakpoints: {
			// Mobile: ≤767px - 1 slide full width
			320: {
				slidesPerView: 1,
				spaceBetween: 0,
			},
			// Tablet: 768px - 1199px - auto width
			768: {
				slidesPerView: 'auto',
				spaceBetween: 0,
			},
			// Desktop: ≥1200px - auto width
			1200: {
				slidesPerView: 'auto',
				spaceBetween: 0,
			},
		},
		navigation: {
			nextEl: '.field-op .btn-next',
			prevEl: '.field-op .btn-prev',
		},
		pagination: {
			el: '.field-op .swiper-pagination',
			clickable: true,
			type: 'bullets',
		},
		on: {
			init: function () {
				console.log('Swiper initialized, total slides:', this.slides.length);
				console.log('Active slide index:', this.activeIndex);

				// Set initial background
				const activeSlide = this.slides[this.activeIndex];
				let activeItem = null;
				let background = null;

				if (activeSlide) {
					activeItem = activeSlide.querySelector('.field-op-item');
					console.log('Active item found in slide:', !!activeItem);

					if (activeItem) {
						background = activeItem.getAttribute('data-background');
						console.log('Initial background from slide:', background);
					} else {
						console.warn('⚠️ No .field-op-item in initial slide, using fallback');
						// Fallback: Use first item
						if (allFieldOpItems[this.activeIndex]) {
							activeItem = allFieldOpItems[this.activeIndex];
							background = activeItem.getAttribute('data-background');
							console.log('Initial background from fallback:', background);
						}
					}

					if (background) {
						setBackground(background);
						// Update active class
						document.querySelectorAll('.field-op-item').forEach(item => {
							item.classList.remove('active');
						});
						if (activeItem) {
							activeItem.classList.add('active');
						}
					} else {
						console.warn('❌ No background found for initial slide');
					}
				}
			},
			slideChange: function () {
				console.log('Slide change triggered, new index:', this.activeIndex);
				const activeSlide = this.slides[this.activeIndex];
				let activeItem = null;
				let background = null;

				if (activeSlide) {
					// Try to find .field-op-item in the slide
					activeItem = activeSlide.querySelector('.field-op-item');
					console.log('Active item in slide:', !!activeItem);

					if (activeItem) {
						background = activeItem.getAttribute('data-background');
						console.log('Background from slide:', background);
					} else {
						console.warn('⚠️ No .field-op-item found in slide, using fallback');
						console.log('Slide HTML:', activeSlide.innerHTML.substring(0, 200));

						// Fallback: Use index to get from all items
						if (allFieldOpItems[this.activeIndex]) {
							activeItem = allFieldOpItems[this.activeIndex];
							background = activeItem.getAttribute('data-background');
							console.log('Background from fallback (index ' + this.activeIndex + '):', background);
						}
					}

					if (background) {
						setBackground(background);
						console.log('✅ Background changed to:', background);

						// Update active class
						document.querySelectorAll('.field-op-item').forEach(item => {
							item.classList.remove('active');
						});
						if (activeItem) {
							activeItem.classList.add('active');
						}
					} else {
						console.error('❌ No background found for slide index:', this.activeIndex);
					}
				}
			},
			slideChangeTransitionEnd: function () {
				console.log('Slide transition ended at index:', this.activeIndex);
			}
		}
	});

	// Handle click on slides (for all devices)
	swiper.slides.forEach((slideEl, index) => {
		const slideItem = slideEl.querySelector('.field-op-item');
		if (slideItem) {
			slideItem.style.cursor = 'pointer';
			slideItem.addEventListener('click', () => {
				swiper.slideTo(index);
			});

			// For desktop: add hover effect to change background
			if (window.innerWidth >= 1200) {
				slideItem.addEventListener('mouseenter', () => {
					const background = slideItem.getAttribute('data-background');
					if (background) {
						setBackground(background);
						// Update active class
						document.querySelectorAll('.field-op-item').forEach(item => {
							item.classList.remove('active');
						});
						slideItem.classList.add('active');
					}
				});
			}
		}
	});
}

// function swiperGrid() {
// 	const swiperEl = document.querySelector(".home-7 .swiper");

// 	if (!swiperEl) return;

// 	const nextEl = document.querySelector(".home-7 .swiper-button-next");
// 	const prevEl = document.querySelector(".home-7 .swiper-button-prev");
// 	const scrollbarEl = document.querySelector(".home-7 .swiper-scrollbar");

// 	new Swiper(swiperEl, {
// 		modules: [Autoplay, Navigation, Grid, Scrollbar],
// 		slidesPerView: 2,
// 		spaceBetween: 0,
// 		rewind: true,
// 		observer: true,
// 		observeParents: true,

// 		grid: {
// 			fill: "row",
// 			rows: 1,
// 		},

// 		navigation: {
// 			nextEl,
// 			prevEl,
// 		},

// 		scrollbar: {
// 			el: scrollbarEl,
// 			draggable: true,
// 		},

// 		breakpoints: {
// 			768: { slidesPerView: 3, spaceBetween: 0, grid: { rows: 1 } },
// 			1200: { slidesPerView: 3, spaceBetween: 0 },
// 			1920: {
// 				slidesPerView: 4,
// 				spaceBetween: 0,
// 				grid: {
// 					fill: "row",
// 					rows: 2,
// 				},
// 			},
// 		},

// 		on: {
// 			resize(sw) {
// 				sw.update();
// 			},
// 			breakpoint(sw) {
// 				sw.update();
// 			},
// 		},
// 	});
// }

// Indicator slide

// function swiperValue() {
// 	const swiper = new Swiper(".home-3 .swiper", {
// 		modules: [Autoplay, Scrollbar],
// 		spaceBetween: 12,
// 		slidesPerView: 2,
// 		freeMode: true,
// 		watchSlidesProgress: true,
// 		loop: true,
// 		grabCursor: true,
// 		scrollbar: {
// 			el: ".swiper-scrollbar",
// 			hide: false,
// 			draggable: true,
// 		},
// 		breakpoints: {
// 			768: {
// 				slidesPerView: 3,
// 				spaceBetween: 24,
// 			},
// 			1024: {
// 				spaceBetween: 12,
// 				slidesPerView: 4,
// 			},
// 		},
// 	});
// }

// function swipePartnerTop() {
// 	const swiperPartner = new Swiper(".sectionn-parter .slide-top .swiper", {
// 		modules: [Autoplay],
// 		loop: true,
// 		slidesPerView: 3,
// 		spaceBetween: 12,

// 		breakpoints: {
// 			768: {
// 				slidesPerView: 3,
// 				spaceBetween: 12,
// 			},
// 			1024: {
// 				slidesPerView: 4,
// 				spaceBetween: 20,
// 			},
// 			1920: {
// 				slidesPerView: 7,
// 				spaceBetween: 20,
// 			},
// 		},
// 		speed: 2000,
// 		autoplay: {
// 			delay: 0.5,
// 			disableOnInteraction: false,
// 			reverseDirection: false, // ← chạy từ phải sang trái
// 		},
// 		freeMode: true,
// 	});
// }

// function swipePartnerBottom() {
// 	const swiperPartner = new Swiper(".sectionn-parter .slide-bottom .swiper", {
// 		modules: [Autoplay],
// 		loop: true,
// 		slidesPerView: 3,
// 		spaceBetween: 12,

// 		breakpoints: {
// 			768: {
// 				slidesPerView: 3,
// 				spaceBetween: 12,
// 			},
// 			1024: {
// 				slidesPerView: 4,
// 				spaceBetween: 20,
// 			},
// 			1920: {
// 				slidesPerView: 7,
// 				spaceBetween: 20,
// 			},
// 		},
// 		speed: 2000,
// 		autoplay: {
// 			delay: 0.5,
// 			disableOnInteraction: false,
// 			reverseDirection: true, // ← chạy từ phải sang trái
// 		},
// 		freeMode: true,
// 	});
// }

// function swiperHistory() {
// 	const AUTO_PLAY_DELAY = 3500;

// 	// // Helper function to update slide numbers
// 	// const updateSlideNumbers = (swiper) => {
// 	// 	// Get total slides excluding duplicates (for loop mode)
// 	// 	const totalSlides = swiper.slides.filter(
// 	// 		(slide) => !slide.classList.contains("swiper-slide-duplicate")
// 	// 	).length;

// 	// 	// Update each slide with its number
// 	// 	swiper.slides.forEach((slide, index) => {
// 	// 		// Skip duplicate slides
// 	// 		if (slide.classList.contains("swiper-slide-duplicate")) return;

// 	// 		const numberEl = slide.querySelector(".number");
// 	// 		if (numberEl) {
// 	// 			// Calculate actual slide number (accounting for loop mode)
// 	// 			const slideNumber = swiper.params.loop ? index - swiper.loopedSlides + 1 : index + 1;

// 	// 			numberEl.textContent = `${String(slideNumber).padStart(2, "0")}/${String(
// 	// 				totalSlides
// 	// 			).padStart(2, "0")}`;
// 	// 		}
// 	// 	});
// 	// };

// 	// Swiper cho thumbnail
// 	const thumbSwiper = new Swiper(".about-4 .thumb .swiper", {
// 		modules: [Navigation, Mousewheel],
// 		speed: 1000,
// 		allowTouchMove: false, // Cho phép di chuyển bằng cảm ứng
// 		observer: true,
// 		observeParents: true,
// 		initialSlide: 2,
// 		centeredSlides: true,
// 		slidesPerView: "auto",
// 		slideToClickedSlide: true,
// 		rewind: true,

// 		on: {
// 			init: function (swiper) {
// 				handleVisibleSlide(swiper);
// 				// updateSlideNumbers(swiper);
// 			},
// 			slideChange: function (swiper) {
// 				handleVisibleSlide(swiper);
// 			},
// 		},
// 	});

// 	// Swiper chính cho phần chi tiết
// 	const mainSwiper = new Swiper(".about-4 .main .swiper", {
// 		modules: [Navigation, Thumbs, Autoplay],
// 		slidesPerView: 1,
// 		rewind: true,
// 		speed: 1000,
// 		observer: true,
// 		observeParents: true,
// 		autoHeight: true,
// 		initialSlide: 2, // Đồng bộ với thumbSwiper để slide active ở giữa
// 		navigation: {
// 			nextEl: ".about-4 .btn-next",
// 			prevEl: ".about-4 .btn-prev",
// 		},
// 		thumbs: {
// 			swiper: thumbSwiper,
// 		},
// 		loop: true, // Quay lại slide đầu khi đến slide cuối
// 		on: {
// 			init: function (swiper) {
// 				handleVisibleSlide(swiper); // Gọi hàm khi Swiper chính được khởi tạo
// 				// Đảm bảo thumbSwiper cũng update đúng
// 				if (thumbSwiper) {
// 					thumbSwiper.slideTo(1, 0);
// 				}
// 			},
// 			slideChange: function (swiper) {
// 				handleVisibleSlide(swiper); // Gọi hàm khi slide chính thay đổi
// 			},
// 		},
// 	});

// 	// Handle autoplay (if needed)
// 	handleAutoplay(AUTO_PLAY_DELAY, mainSwiper);

// 	// Handle the visible slide effect
// 	function handleVisibleSlide(swiper) {
// 		const activeIndex = swiper.activeIndex;
// 		const allSlides = swiper.slides;

// 		// Clear existing "show-slide" classes
// 		allSlides.forEach((slide) => {
// 			slide.classList.remove("show-slide");
// 		});

// 		// Get the surrounding slides
// 		const slideBeforePrev = swiper.slides[activeIndex - 1];
// 		const slideBeforePrev2 = swiper.slides[activeIndex - 2];
// 		const slideBeforePrev3 = swiper.slides[activeIndex - 3];
// 		const slideAfterNext = swiper.slides[activeIndex + 1];
// 		const slideAfterNext2 = swiper.slides[activeIndex + 2];
// 		const slideAfterNext3 = swiper.slides[activeIndex + 3];
// 		const activeSlide = swiper.slides[activeIndex];

// 		// Add the "show-slide" class to surrounding and active slides
// 		if (slideBeforePrev) slideBeforePrev.classList.add("show-slide");
// 		if (slideBeforePrev2) slideBeforePrev2.classList.add("show-slide");
// 		if (slideBeforePrev3) slideBeforePrev3.classList.add("show-slide");
// 		if (slideAfterNext) slideAfterNext.classList.add("show-slide");
// 		if (slideAfterNext2) slideAfterNext2.classList.add("show-slide");
// 		if (slideAfterNext3) slideAfterNext3.classList.add("show-slide");
// 		if (activeSlide) activeSlide.classList.add("show-slide");
// 	}
// }

// function handleAutoplay(timeout, swiper, preventMouseEnter = false, thumbSwiper = null) {
// 	if (!swiper || !swiper.el || !$(swiper.el).length) return;

// 	let stopSlideImmediate = $(swiper.el[0]).parent().hasClass("auto-detect-video");
// 	if (stopSlideImmediate) return;

// 	// Configure autoplay
// 	swiper.params.autoplay = {
// 		delay: timeout,
// 		disableOnInteraction: !preventMouseEnter,
// 		pauseOnMouseEnter: !preventMouseEnter,
// 	};

// 	swiper.autoplay.start();

// 	const navigationEl = swiper.params.navigation;
// 	if (navigationEl) {
// 		let isReachEnd = false;
// 		let isReachStart = false;

// 		swiper.on("beforeSlideChangeStart", function () {
// 			isReachEnd = swiper.isEnd;
// 			isReachStart = swiper.isBeginning;
// 		});

// 		$(navigationEl.prevEl).on("click", function () {
// 			if (isReachStart) return;

// 			swiper.autoplay.stop();
// 			swiper.autoplay.start();
// 			$(swiper.el).attr("data-auto-play", "stop");
// 		});

// 		$(navigationEl.nextEl).on("click", function () {
// 			if (isReachEnd) return;

// 			swiper.autoplay.stop();
// 			swiper.autoplay.start();
// 			$(swiper.el).attr("data-auto-play", "stop");
// 		});
// 	}

// 	if (thumbSwiper) {
// 		thumbSwiper.el.addEventListener("mouseenter", () => {
// 			swiper.autoplay.stop();
// 			$(swiper.el).attr("data-auto-play", "stop");
// 		});

// 		});
// 	}
// }

function swiperWork() {
	const workCards = document.querySelectorAll('.work-card');
	if (!workCards.length) return;

	workCards.forEach((card, index) => {
		const swiperEl = card.querySelector('.swiper');
		if (!swiperEl) return;
		
		card.classList.add(`work-card-${index}`);
		
		const nextEl = card.querySelector('.btn-next');
		const prevEl = card.querySelector('.btn-prev');

		const swiper = new Swiper(swiperEl, {
			modules: [Navigation, Pagination, EffectFade, Autoplay],
			loop: true,
			effect: 'fade',
			fadeEffect: { crossFade: true },
			autoplay: {
				delay: 3500,
				disableOnInteraction: false,
			},
			slidesPerView: 1,
			speed: 700,
			navigation: {
				nextEl: nextEl,
				prevEl: prevEl,
			},
			on: {
				init: function() {
					// Handle initial slide
					// We need to wait for DOM to be ready sometimes
					setTimeout(() => {
						if (this.slides && this.slides.length > 0) {
							const currentSlide = this.slides[this.activeIndex];
							handleVideo(currentSlide, this);
						}
					}, 100);
				},
				slideChangeTransitionEnd: function() {
					// Pause all videos first
					if (this.slides) {
						this.slides.forEach((slide) => {
							const v = slide.querySelector("video");
							if (v) {
								v.pause(); // Pause
								v.currentTime = 0; // Reset
							}
						});
						const currentSlide = this.slides[this.activeIndex];
						handleVideo(currentSlide, this);
					}
				}
			}
		});

		function handleVideo(slide, swiperInstance) {
			if (!slide) return;
			const video = slide.querySelector("video");
			
			if (video) {
				swiperInstance.autoplay.stop();
				video.muted = true; // Always muted for autoplay
				video.play().catch(e => console.log("Video play error:", e));
				
				// When video ends, go to next slide
				video.onended = () => {
					swiperInstance.slideNext();
				};
			} else {
				// If image, just start autoplay
				if (swiperInstance.autoplay && !swiperInstance.autoplay.running) {
					swiperInstance.autoplay.start();
				}
			}
		}
	});
}
