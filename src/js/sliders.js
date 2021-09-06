//Slider
const swiperBannerSlider = new Swiper(".banner-slider", {
	pagination: {
		el: ".swiper-pagination",
		type: "fraction",
	},
	navigation: {
		nextEl: ".swiper-button-next",
		prevEl: ".swiper-button-prev",
	},
	//effect: "coverflow",
	//coverflowEffect: {
	//	rotate: 50,
	//	stretch: 0,
	//	depth: 100,
	//	modifier: 1,
	//	slideShadows: false,
	//},
	speed: 500,
});

const swiperProductCarusel = new Swiper(".product-carusel", {
	pagination: {
		el: ".product-pagination",
		type: "fraction",
	},
	navigation: {
		nextEl: ".product-button-next",
		prevEl: ".product-button-prev",
	},
	slidesPerView: "auto",
	spaceBetween: 20,
	speed: 500,
	breakpoints: {
        320: {
            slidesPerView: "1",
			spaceBetween: 20,
		},
		768: {
            slidesPerView: "auto",
			spaceBetween: 10,
		},
		992: {
            slidesPerView: "auto",
			spaceBetween: 20,
		},
        1921: {
            slidesPerView: "auto",
			spaceBetween: 30,
		}
	}
});

const swiperMobilSlider = new Swiper(".mobil-slider", {
	slidesPerView: "1",
	spaceBetween: 20,
	speed: 500,
	navigation: {
		nextEl: ".mobil-slider-button-next",
		prevEl: ".mobil-slider-button-prev",
	},
});

const swiperPageSlider = new Swiper(".page-slider", {
	slidesPerView: "1",
	spaceBetween: 50,
	speed: 500,
	pagination: {
		el: ".page-slider-pagination",
		type: "fraction",
	},
	navigation: {
		nextEl: ".page-slider-next",
		prevEl: ".page-slider-prev",
	},
});

const swiperProductsSlider1 = new Swiper(".products-slider-1", {
	speed: 500,
	navigation: {
		nextEl: ".products-slider-next-1",
		prevEl: ".products-slider-prev-1",
	},
	breakpoints: {
		320: {
			slidesPerView: 1,
			spaceBetween: 20,
		},
		576: {
			slidesPerView: 4,
			spaceBetween: 20,
		},
		993: {
			slidesPerView: "4",
			spaceBetween: 20,
		},
		1921: {
			slidesPerView: 4,
            spaceBetween: 30,
            loop: true,
		}
	}
});

const swiperProductsSlider2 = new Swiper(".products-slider-2", {
	slidesPerView: 1,
	spaceBetween: 20,
	speed: 500,
	navigation: {
		nextEl: ".products-slider-next-2",
		prevEl: ".products-slider-prev-2",
	},
	breakpoints: {
		576: {
			slidesPerView: 3,
			spaceBetween: 20,
		},
		992: {
			slidesPerView: 4,
			spaceBetween: 20,
		},
		1921: {
			slidesPerView: 4,
			spaceBetween: 30,
		}
	}
});

const swiperGalleryNav = new Swiper(".gallery-nav", {
	spaceBetween: 5,
	slidesPerView: "auto",
	freeMode: true,
	//watchSlidesVisibility: true,
	watchSlidesProgress: true,
	navigation: {
		nextEl: ".gallery-nav-next",
		prevEl: ".gallery-nav-prev",
	},
    breakpoints: {
        768: {
            slidesPerView: 3,
            spaceBetween: 10,
		},
        1200: {
            loop: true,
            slidesPerView: 3,
            direction: "vertical",
            navigation: {
                nextEl: ".gallery-nav-next",
                prevEl: ".gallery-nav-prev",
            },
            //spaceBetween: 12,
		},
	}
});

const swiperGallery = new Swiper(".project-gallery", {
	spaceBetween: 20,
	navigation: {
		nextEl: ".gallery-next",
		prevEl: ".gallery-prev",
	},
	thumbs: {
		swiper: swiperGalleryNav,
	},
});

/* const productThumbsSlider = new Swiper(".product-card__gallery-nav", {
    slidesPerView: "auto",
    spaceBetween: 5,
    direction: "horizontal",
    navigation: {
        nextEl: ".gallery-nav-next",
        prevEl: ".gallery-nav-prev",
    },
    freeMode: true,
	watchSlidesProgress: true,
    breakpoints: {
        768: {
            //direction: "horizontal",
            //slidesPerView: 3,
            spaceBetween: 10,
		},
		1200: {
            direction: "vertical",
            slidesPerView: 3,
            //spaceBetween: 12,
		},
	}
}); */

const productSlider = new Swiper(".product-card__slider", {
    navigation: {
        nextEl: ".gallery-next",
        prevEl: ".gallery-prev",
    },
    thumbs: {
        swiper: swiperGalleryNav,
        //swiper: productThumbsSlider,
    },
    breakpoints: {
        1200: {
            loop: true,
		},
	}
});

const colorsSlider = new Swiper(".colors-slider", {
    loop: true,
	spaceBetween: 15,
	navigation: {
		nextEl: ".gallery-next",
		prevEl: ".gallery-prev",
    },
    breakpoints: {
        320: {
            slidesPerView: 1,
        },
        576: {
            slidesPerView: 2,
        },
		768: {
            slidesPerView: 3,
        },
	}
});

const metalSlider = new Swiper(".metal-slider", {
    loop: true,
    slidesPerView: 1,
	navigation: {
		nextEl: ".gallery-next",
		prevEl: ".gallery-prev",
	},
});

const viewedProducts = new Swiper(".viewed-products__slider", {
	navigation: {
		nextEl: ".product-button-next",
		prevEl: ".product-button-prev",
	},
	slidesPerView: 4,
	spaceBetween: 20,
    speed: 500,
    loop: true,
	breakpoints: {
        320: {
            slidesPerView: "1",
			spaceBetween: 20,
        },
        576: {
            slidesPerView: 2,
        },
		768: {
            slidesPerView: 3,
			spaceBetween: 20,
        },
        1200: {
            slidesPerView: 4,
        },
		1921: {
			spaceBetween: 30,
		}
	}
});