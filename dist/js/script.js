document.addEventListener("DOMContentLoaded", function () {

	let headerFix = document.querySelector('.header');
	let btnSearch = document.querySelector('.btn-search');
	let searchModal = document.querySelector('.search-modal');
	let headerSearch = document.querySelector('.header__search');

	window.onscroll = function () {
		if (window.pageYOffset > 200) {
			headerFix.classList.add('fixed');
		}
		if (window.pageYOffset > 50) {
			btnSearch.classList.remove('active');
			searchModal.classList.remove('active');
			headerSearch.classList.remove('active-375');
		}
		else {
			headerFix.classList.remove('fixed');
		}
	};

	//Desktop catalog menu

    $(".desc-catalog-btn").click(function (e) {
        e.preventDefault();
		$(this).toggleClass('active');
		$('.desc-catalog-menu').toggleClass('active');
		return false;
	});

    $(document).on('mouseup', function (e) {
        let catMenu = $('.desc-catalog-menu');
        let catBtn = $('.desc-catalog-btn');
        if (!catMenu.is(e.target) && !catBtn.is(e.target) && catMenu.has(e.target).length === 0) {
            catMenu.removeClass('active');
            $(".desc-catalog-btn").removeClass('active');
        }
	});

	$(".btn-search").click(function () {
		$(this).toggleClass('active');
		$('.search-modal').toggleClass('active');
		$('.header__search').toggleClass('active-375');
		return false;
	});

	$(".btn-caralog").click(function () {
		$('.catalog-menu_mobil').addClass('active');
		$('.header__search').addClass('catalog-active');
		$('body').addClass('body-hidden');
		return false;
	});

    $(".catalog-menu__close").click(function () {
        $('.catalog-menu_mobil').removeClass('active');
        $('.header__search').removeClass('catalog-active');
        $('body').removeClass('body-hidden');
        return false;
    });

	$(".btn-mobil-menu").click(function () {
		$('.mobil-main-menu').addClass('active');
		$('.header__search').addClass('menu-active');
		$('.btn-caralog').addClass('body-hidden');
		$('body').addClass('body-hidden');
		return false;
	});

	$(".mobil-main-menu__close").click(function () {
		$('.mobil-main-menu').removeClass('active');
		$('.header__search').removeClass('menu-active');
		$('.btn-caralog').removeClass('menu-active');
		$('body').removeClass('body-hidden');
		return false;
	});

	$(".mobil-main-menu__catalog").click(function () {
		$('.mobil-main-menu').removeClass('active');
		$('.header__search').removeClass('menu-active');
		$('.btn-caralog').removeClass('menu-active');
		$('.catalog-menu_mobil').addClass('active');
		$('.header__search').addClass('catalog-active');
		$('body').addClass('body-hidden');
		return false;
	});

	$(".requisites-drop-link").click(function () {
		$(this).toggleClass('active').siblings('.requisites__item .requisites__drop').toggleClass('active');
		return false;
	});

	$(".drop-btn").click(function () {
		$(this).toggleClass('active').siblings('.drop-content-wrapper .drop-content').toggleClass('active');
		return false;
	});

    if ($(window).width() < 992) {
        $('.top-filters__btn-inner').on('click', function () {
            if (!$(this).parent().hasClass('top-filters__btn--disabled')) {
                $(this).parent().siblings().removeClass('top-filters__btn--active');
                $(this).parent().siblings().find('.drop-filters').slideUp('300');
                $(this).parent().toggleClass('top-filters__btn--active');
                $(this).next().slideToggle('300');
            }
        });
    } else {
        $('.top-filters__btn-inner').on('click', function () {
            if (!$(this).parent().hasClass('top-filters__btn--disabled')) {
                $(this).parent().toggleClass('top-filters__btn--active');
                $(this).next().slideToggle('300');
            }
        });

        $('.drop-filters__btn').on('click', function () {
            $(this).parent().parent().parent().slideUp('300');
            $(this).parent().parent().parent().parent().removeClass('top-filters__btn--active');
        });
    }

    $(document).on('mouseup', function (e) {
        let filters = $('.top-filters__btn');
        let filtersBtn = filters.find('.top-filters__btn-inner');
        let filtersBtnArrow = filtersBtn.find('svg');
        let filtersBody = $('.drop-filters');
        if (!filtersBtn.is(e.target) && !filtersBtnArrow.is(e.target) && !filtersBody.is(e.target) && filtersBody.has(e.target).length === 0) {
            filters.removeClass('top-filters__btn--active');
            filtersBody.slideUp('300');
        }
	});

    // ??????????????
    $('.drop-filters input[type="checkbox"]').on('click', function () {
        if ($(this).is(':checked')) {
            let value = $(this).val();
            console.log(value);
            let newFilter = `
                <div class="top-filters__checked-item">
                    <span>${value}</span>
                    <button class="delete-filter" type="button">
                        <img src="img/icons/filter-close.svg" alt="??????????????">
                    </button>
                </div>
            `;
            console.log(newFilter);
            $('.top-filters__checked-items').append(newFilter);
        }
    });
    /* $('.delete-filter').on('click', function () {
        $(this).parent().remove();
    }); */

    $('.top-filters__reset-btn').on('click', function () {
        $('.top-filters__checked-item').remove();
    });


    // ?????????? ??????????
    $('input[name="popup_color"]').on('change', function () {
        //$.fancybox.close();
        $('.overlay').fadeOut('slow');
        $('#colors-popup').fadeOut('slow');
        var checkedColorValue = $(this).val();
        var checkedColorBg = $(this).next().css('background-color');
        var newColorItem = `
        <div class="product-color__item flex flex-aic">
            <span class="radio-style" style="background-color: ${checkedColorBg}"></span>
            <span class="radio-text">RAL ${checkedColorValue}</span>
        </div>
        `;
        console.log(newColorItem);
        $('.product-color__item:last-child').after(newColorItem);
    }); 

    $('.minus-btn').on('click', function(e) {
        e.preventDefault();
        var $this = $(this);
        var $input = $this.next();
        var value = parseInt($input.val());

        while(value > 0) {
            value -= 1;
            break;
        }
    
    $input.val(value);
    
    });

    $('.plus-btn').on('click', function(e) {
        e.preventDefault();
        var $this = $(this);
        var $input = $this.prev();
        var value = parseInt($input.val());

        while(value < 10) {
            value += 1;
            break;
        }
    
        $input.val(value);
    });

    $('.basket-form').submit(function (e) {
        e.preventDefault();
        $('.basket__content').hide();
        $('#order-success').fadeIn('slow');
        $('html, body').animate({scrollTop: '0px'}, 300);
    });

    $('.contacts__btn').on('click', function () {
        $('body').addClass('_lock');
        $('.overlay').fadeIn('slow');
        $('#feedback').fadeIn('slow');
    });

    $('.product-color__link').on('click', function () {
        $('.overlay').fadeIn('slow');
        $('#colors-popup').fadeIn('slow');
    });

    $('.close-popup').on('click', function () {
        $('body').removeClass('_lock');
        $(this).parent().fadeOut('slow');
        $('.overlay').fadeOut('slow');
    });

    $('#feedback-form').submit(function (e) {
        e.preventDefault();
        $(this).find('input').val('');
        $(this).parent().hide();
        $('#feedback-success').fadeIn('slow');
    });

    $('.feedback-success__close').on('click', function () {
        $(this).parent().fadeOut('slow');
    });

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
});



