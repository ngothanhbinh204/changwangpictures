import { animate, createSpring, onScroll, stagger, utils } from "animejs";
import { getRem } from "./utils";
import { SplitText } from "gsap/SplitText";

const homeSection = utils.$("section[class*='home-']");

export const homePage = {
	home_2: () => {
		// Tạo IntersectionObserver để theo dõi khi section xuất hiện trong viewport
		const observer = new IntersectionObserver(
			(entries, obs) => {
				entries.forEach((entry) => {
					// === ANIMATION CHO MAP ===
					const map = utils.$(entry.target.querySelector(".map"));
					// Set trạng thái ban đầu: ẩn và dịch sang phải
					utils.set(map, {
						opacity: 0, // Ẩn hoàn toàn
						x: getRem(300), // Dịch sang phải 300rem (ngoài màn hình)
					});

					const subTitle = utils.$(entry.target.querySelector(".sub-title"));
					utils.set(subTitle, {
						opacity: 0,
						y: getRem(100),
						duration: 300,
					});

					// === ANIMATION CHO BOX ===
					const box = utils.$(entry.target.querySelector(".box"));
					// Set trạng thái ban đầu: ẩn và dịch xuống dưới xa
					utils.set(box, {
						opacity: 0, // Ẩn hoàn toàn
						y: getRem(200), // Di chuyển xuống dưới 200rem
						duration: 300, // Thời gian setup: 300ms
						ease: "easeInOutSine", // Hiệu ứng chuyển động
					});

					// Khi section xuất hiện 50% trong viewport -> chạy animation
					if (entry.intersectionRatio > 0.6) {
						animate(subTitle, {
							opacity: 1,
							y: 0,
							duration: 500,
							ease: "easeInOutSine",
						});

						// ANIMATE MAP: bay từ phải vào (delay 600ms trước khi chạy)
						animate(map, {
							opacity: 1, // Hiện rõ hoàn toàn
							x: 0, // Bay từ phải về vị trí ban đầu
							duration: 1200, // Animation kéo dài 1200ms (chậm hơn)
							delay: 600, // Đợi 600ms trước khi animation bắt đầu
							ease: "outCirc", // Easing circular - chậm dần ở cuối (mượt)
						});

						// ANIMATE BOX: bay từ dưới lên (delay 400ms trước khi chạy)
						animate(box, {
							opacity: 1, // Hiện rõ hoàn toàn
							y: 0, // Bay từ dưới lên vị trí ban đầu
							duration: 1000, // Animation kéo dài 1000ms
							delay: 400, // Đợi 400ms trước khi animation bắt đầu
							ease: "outCirc", // Easing circular - chậm dần mượt mà
						});

						// Ngừng theo dõi element sau khi animate (chỉ chạy 1 lần)
						obs.unobserve(entry.target);
					}
				});
			},
			{
				threshold: 0.6, // Kích hoạt khi 50% element xuất hiện trong viewport
			}
		);

		// Áp dụng observer cho tất cả sections có class .home-2
		utils.$(".home-2").forEach((section) => {
			observer.observe(section);
		});
	},

	home_3: () => {
		const observer = new IntersectionObserver(
			(entries, obs) => {
				entries.forEach((entry) => {
					const items = utils.$(entry.target.querySelectorAll(".product-item"));
					items.forEach((item) => {
						// Set trạng thái ban đầu: thu nhỏ và dịch xuống dưới
						utils.set(item, {
							scale: 0, // Thu nhỏ hoàn toàn (invisible)
							translateY: getRem(40), // Di chuyển xuống 40rem
							ease: "easeInOutSine", // Hiệu ứng chuyển động mượt
							duration: 300, // Thời gian setup: 300ms
						});
					});

					// Khi section xuất hiện 50% trong viewport -> chạy animation
					if (entry.intersectionRatio > 0.5) {
						// ANIMATE ITEMS: phóng to và di chuyển lên
						animate(items, {
							scale: 1, // Phóng to về kích thước bình thường
							translateY: 0, // Trở về vị trí ban đầu
							delay: stagger(120), // Mỗi item delay 50ms (hiệu ứng lần lượt)
						});
						// Ngừng theo dõi element sau khi animate (chỉ chạy 1 lần)
						obs.unobserve(entry.target);
					}
				});
			},
			{
				threshold: 0.5, // Kích hoạt khi 50% element xuất hiện trong viewport
			}
		);

		// Áp dụng observer cho tất cả sections có class .home-2
		utils.$(".home-3").forEach((section) => {
			observer.observe(section);
		});
	},
	home_4: () => {
		const observer = new IntersectionObserver(
			(entries, obs) => {
				entries.forEach((entry) => {
					const items = utils.$(entry.target.querySelectorAll(".lists"));
					items.forEach((item) => {
						// Set trạng thái ban đầu: thu nhỏ và dịch xuống dưới
						utils.set(item, {
							scale: 0, // Thu nhỏ hoàn toàn (invisible)
							ease: "easeInOutSine", // Hiệu ứng chuyển động mượt
							duration: 300, // Thời gian setup: 300ms
						});
					});

					// Khi section xuất hiện 50% trong viewport -> chạy animation
					if (entry.intersectionRatio > 0.5) {
						// ANIMATE ITEMS: phóng to và di chuyển lên
						animate(items, {
							scale: 1, // Phóng to về kích thước bình thường
							delay: stagger(120), // Mỗi item delay 50ms (hiệu ứng lần lượt)
						});
						// Ngừng theo dõi element sau khi animate (chỉ chạy 1 lần)
						obs.unobserve(entry.target);
					}
				});
			},
			{
				threshold: 0.5, // Kích hoạt khi 50% element xuất hiện trong viewport
			}
		);

		// Áp dụng observer cho tất cả sections có class .home-2
		utils.$(".home-4").forEach((section) => {
			observer.observe(section);
		});
	},
	home_5: () => {
		const DURATION = 1000;
		const observer = new IntersectionObserver(
			(entries, obs) => {
				entries.forEach((entry) => {
					if (entry.intersectionRatio > 0.5) {
						const items = entry.target.querySelectorAll(".swiper-slide");
						items.forEach((item, index) => {
							animate(item, {
								opacity: 1,
								x: [getRem(80), 0],
								duration: DURATION,
								ease: "outQuart",
								delay: index * 200,
							});
						});
						obs.unobserve(entry.target);
					}
				});
			},
			{
				threshold: 0.5,
			}
		);

		utils.$(".home-5").forEach((section) => {
			section.querySelectorAll(".swiper-slide").forEach((item) => {
				utils.set(item, {
					opacity: 0,
				});
			});
			observer.observe(section);
		});
	},
	home_items_animation: () => {
		const observer = new IntersectionObserver(
			(entries, obs) => {
				entries.forEach((entry, index) => {
					if (entry.intersectionRatio > 0.5) {
						animate(entry.target.querySelectorAll(".item"), {
							opacity: [0, 1],
							y: [getRem(40), 0],
							ease: createSpring({
								stiffness: 150,
							}),
							delay: stagger(100),
							duration: 600,
						});
						obs.unobserve(entry.target);
					}
				});
			},
			{ threshold: 0.5 }
		);

		utils.$(".home-item-animation").forEach((el) => {
			utils.set(el.querySelectorAll(".item"), {
				opacity: 0,
				y: getRem(40),
			});
			observer.observe(el);
		});
	},
	homeBlockTitles: () => {
		const observer = new IntersectionObserver(
			(entries, obs) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						const title = entry.target;
						const position = window.getComputedStyle(title).textAlign;
						let animateFrom = "first";
						if (position === "center") {
							animateFrom = "center";
						}
						if (position === "right") {
							animateFrom = "last";
						}

						const splitText = SplitText.create(title, {
							type: "chars,words",
						});
						entry.target.closest(".block-title").style.opacity = 1;
						const chars = splitText.chars;
						animate(chars, {
							opacity: [0, 1],
							y: [getRem(20), 0],
							duration: 400,
							ease: createSpring({
								stiffness: 150,
							}),
							delay: stagger(20, {
								from: animateFrom,
							}),
						});
						obs.unobserve(title); // Only animate once
					}
				});
			},
			{
				threshold: 0.2, // Adjust as needed (20% visible)
			}
		);

		homeSection.forEach((home) => {
			const title = home.querySelector(".block-title");
			if (!title) return;
			title.style.opacity = 0;
			observer.observe(title);
		});
	},
	homeTitle: () => {
		const observer = new IntersectionObserver(
			(entries, obs) => {
				entries.forEach((entry) => {
					if (entry.intersectionRatio > 0.5) {
						const title = entry.target;
						const animateStyle = title.getAttribute("animate-title") || "fade-up";
						const position = window.getComputedStyle(title).textAlign;
						let animateFrom = "first";
						if (position === "center") {
							animateFrom = "center";
						}
						if (position === "right") {
							animateFrom = "last";
						}

						const splitText = SplitText.create(title, {
							type: "words",
						});

						title.style.overflow = "hidden";

						if (animateStyle === "fade-up") {
							animate(splitText.words, {
								opacity: [0, 1],
								y: ["100%", 0],
								duration: 600,
								ease: createSpring({
									stiffness: 150,
								}),
								delay: stagger(25, {
									from: animateFrom,
								}),
							});
						}
						if (animateStyle === "slide-up") {
							animate(splitText.words, {
								opacity: [0, 1],
								x: ["100%", 0],
								duration: 600,
								ease: createSpring({
									stiffness: 150,
								}),
								delay: stagger(25, {
									from: animateFrom,
								}),
							});
						}

						obs.unobserve(title); // Only animate once
					}
				});
			},
			{
				threshold: 0.5,
			}
		);

		homeSection.forEach((home) => {
			const title = home.querySelectorAll("[animate-title]");
			if (!title) return;
			title.forEach((item) => {
				observer.observe(item);
			});
		});
	},
	homeDescription: () => {
		const observer = new IntersectionObserver(
			(entries, obs) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						const description = entry.target;
						let animateFrom = "first";
						// const position =
						// 	window.getComputedStyle(description).textAlign;
						// if (position === "center") {
						// 	animateFrom = "center";
						// } else if (position === "right") {
						// 	animateFrom = "last";
						// }

						const splitText = SplitText.create(description, {
							type: "words,lines",
						});
						description.style.opacity = 1;
						const words = splitText.words;
						const line = splitText.lines;
						line.forEach((line) => {
							line.style.height = line.offsetHeight + "px";
							line.style.overflow = "hidden";
						});
						animate(words, {
							opacity: [0, 1],
							translateY: [getRem(20), 0],
							duration: 500,
							delay: stagger(15, {
								from: animateFrom,
							}),
						});
						obs.unobserve(description); // Only animate once
					}
				});
			},
			{
				threshold: 0.2, // Adjust as needed (20% visible)
			}
		);

		homeSection.forEach((home) => {
			const description = home.querySelector(".desc");
			if (!description) return;
			description.style.opacity = 0;
			observer.observe(description);
		});
	},
	homeButtons: () => {
		const observer = new IntersectionObserver(
			(entries, obs) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						const wrap = entry.target;
						animate(wrap, {
							opacity: [0, 1],
							y: [45, 0],
							duration: 500,
						});
						obs.unobserve(wrap); // Only animate once
					}
				});
			},
			{
				threshold: 0.2, // Adjust as needed (20% visible)
			}
		);
	},
	primaryNav: () => {
		const observer = new IntersectionObserver(
			(entries, obs) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						animate(entry.target.querySelectorAll("li"), {
							opacity: 1,
							x: 0,
							duration: 600,
							delay: stagger(100),
							ease: createSpring({
								stiffness: 150,
								damping: 10,
							}),
						});
						obs.unobserve(entry.target);
					}
				});
			},
			{ threshold: 0.2 }
		);

		utils.$(".primary-nav").forEach((el) => {
			utils.set(el.querySelectorAll("li"), {
				opacity: 0,
				x: getRem(20),
			});
			observer.observe(el);
		});
	},

	init: () => {
		if ($("body.home").length === 0) return;
		if ($(window).width() < 1200) return;
		// homePage.primaryNav();
		homePage.home_2();
		homePage.home_3();
		homePage.home_4();
		homePage.home_5();
		homePage.home_items_animation();
		homePage.homeButtons();
		document.fonts.ready.then((e) => {
			homePage.homeBlockTitles();
			homePage.homeTitle();
			homePage.homeDescription();
		});
	},
};
