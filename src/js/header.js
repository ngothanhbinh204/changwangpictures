import { headerSearch } from "../../plugins/ComponentsUi/HeaderSearch/HeaderSearch";
import { detectCloseElement } from "./helper";
/*==================== Header ====================*/
/**
 * @param header
 */
const vw = $(window).width();
export const header = {
	lastScroll: 0,
	scrollActive: function () {
		let height = $("header").height();
		if ($(window).scrollTop() > height) {
			$("header").addClass("active");
		} else {
			$("header").removeClass("active");
		}
	},
	scrollDirection: function () {
		let st = $(window).scrollTop();
		if (st > header.lastScroll && st > 100) {
			$("header").addClass("scrolldown").removeClass("scrollup");
		} else if (st < header.lastScroll) {
			$("header").addClass("scrollup").removeClass("scrolldown");
		}
		if (st <= 0) {
			$("header").removeClass("scrolldown scrollup");
		}
		header.lastScroll = st;
	},
	mobile: function () {
		$(".header-bar").on("click", function () {
			$(this).toggleClass("active");
			$("body").toggleClass("isOpenMenu");
		});
		$(".header-close").on("click", function () {
			$(".header-bar").removeClass("active");
			$("body").removeClass("isOpenMenu");
		});
		$(".header-overlay").on("click", function () {
			$(".header-bar").removeClass("active");
			$("body").removeClass("isOpenMenu");
		});
		if (window.matchMedia("(max-width: 1199.98px)").matches) {
			$(".header-wrap-menu .menu-mobile li[class*='has-children']>a").each(function () {
				$(this)
					.wrap('<div class="menu-item"></div>')
					.parent()
					.append('<div class="icon-arrow"></div>');
			});
			$(".header-wrap-menu .menu-mobile li[class*='has-children'] .icon-arrow").on("click", function () {
				$(this).closest("li").toggleClass("active");
				$(this).closest("li").find("ul").slideToggle();
			});
		}
	},
	initVariable: function () {
		const $header = document.querySelector("header");
		if (!$header) return;

		// Hàm cập nhật chiều cao header
		function updateHeaderHeight() {
			const height = $header.offsetHeight;
			document.documentElement.style.setProperty("--header-height", `${height}px`);
		}

		// Cập nhật ban đầu
		updateHeaderHeight();

		// Theo dõi mọi thay đổi chiều cao của header
		const ro = new ResizeObserver(updateHeaderHeight);
		ro.observe($header);

		// Phòng trường hợp ảnh hoặc font chưa load xong
		window.addEventListener("load", () => {
			setTimeout(updateHeaderHeight, 100);
		});
	},
	init: function () {
		headerSearch();
		header.scrollActive();
		header.scrollDirection();
		header.mobile();
		header.initVariable();
	},
};
document.addEventListener(
	"scroll",
	function (e) {
		header.scrollActive();
		header.scrollDirection();
	},
	true
);
