$(function () {

    $('.popup-link').fancybox();

    if ($(window).width() < 992) {
        $('.top-filters__btn-inner').on('click', function () {
            $(this).parent().siblings().removeClass('top-filters__btn--active');
            $(this).parent().siblings().find('.drop-filters').slideUp('300');
            $(this).parent().toggleClass('top-filters__btn--active');
            $(this).next().slideToggle('300');
        });
    } else {
        $('.top-filters__btn-inner').on('click', function () {
            $(this).parent().toggleClass('top-filters__btn--active');
            $(this).next().slideToggle('300');
        });

        $('.drop-filters__btn').on('click', function () {
            $(this).parent().parent().parent().slideUp('300');
            $(this).parent().parent().parent().parent().removeClass('top-filters__btn--active');
        });
    }

    $('#main-filters input[type="checkbox"]').on('change', function () {
        console.log($(this).val());
        var $value = $(this).val();
        $('.top-filters__checked-items').append('<div class="top-filters__checked-item"></div>');
        $('.top-filters__checked-item').prepend('span').text($(this).val());
        $('.top-filters__checked-item').append('<button class="delete-filter"><img src="img/icons/filter-close.svg" alt="крестик"></button>');
    });

    $('.delete-filter').on('click', function () {
        $(this).parent().hide();
    });

    $('.minus-btn').on('click', function(e) {
        e.preventDefault();
        var $this = $(this);
        var $input = $this.next();
        var value = parseInt($input.val());

        while(value > 0) {
            value -= 1;
            //$('.count-btn').removeClass('count-btn--disabled');
            break;
        }
    
        /* if (value == 1) {
            $('.minus-btn').addClass('count-btn--disabled');
        } */
    
    $input.val(value);
    
    });

    $('.plus-btn').on('click', function(e) {
        e.preventDefault();
        var $this = $(this);
        var $input = $this.prev();
        var value = parseInt($input.val());

        while(value < 10) {
            value += 1;
            //$('.count-btn').removeClass('count-btn--disabled');
            break;
        }

        /* if (value == 10) {
            $('.plus-btn').addClass('count-btn--disabled');
        } */
    
        $input.val(value);
    });


    const productThumbsSlider = new Swiper(".gallery-nav", {
        slidesPerView: 3,
        spaceBetween: 5,
        direction: "vertical",
        freeMode: true,
		watchSlidesProgress: true,
        breakpoints: {
            320: {
                slidesPerView: "auto",
                direction: "horizontal",
                navigation: {
                    nextEl: ".gallery-nav-next",
                    prevEl: ".gallery-nav-prev",
                },
            },
            768: {
                direction: "horizontal",
                slidesPerView: 3,
                spaceBetween: 10,
			},
			1200: {
                direction: "vertical",
                slidesPerView: 3,
                spaceBetween: 12,
			},
		}
    });

    const productSlider = new Swiper(".product-card__slider", {
        //loop: true,
        navigation: {
            nextEl: ".gallery-next",
            prevEl: ".gallery-prev",
        },
        thumbs: {
            swiper: productThumbsSlider,
        },
    });

    function DynamicAdapt(type) {
    this.type = type;
}

DynamicAdapt.prototype.init = function () {
    const _this = this;
    // массив объектов
    this.оbjects = [];
    this.daClassname = "_dynamic_adapt_";
    // массив DOM-элементов
    this.nodes = document.querySelectorAll("[data-da]");

    // наполнение оbjects объктами
    for (let i = 0; i < this.nodes.length; i++) {
        const node = this.nodes[i];
        const data = node.dataset.da.trim();
        const dataArray = data.split(",");
        const оbject = {};
        оbject.element = node;
        оbject.parent = node.parentNode;
        оbject.destination = document.querySelector(dataArray[0].trim());
        оbject.breakpoint = dataArray[1] ? dataArray[1].trim() : "767";
        оbject.place = dataArray[2] ? dataArray[2].trim() : "last";
        оbject.index = this.indexInParent(оbject.parent, оbject.element);
        this.оbjects.push(оbject);
    }

    this.arraySort(this.оbjects);

    // массив уникальных медиа-запросов
    this.mediaQueries = Array.prototype.map.call(this.оbjects, function (item) {
        return '(' + this.type + "-width: " + item.breakpoint + "px)," + item.breakpoint;
    }, this);
    this.mediaQueries = Array.prototype.filter.call(this.mediaQueries, function (item, index, self) {
        return Array.prototype.indexOf.call(self, item) === index;
    });

    // навешивание слушателя на медиа-запрос
    // и вызов обработчика при первом запуске
    for (let i = 0; i < this.mediaQueries.length; i++) {
        const media = this.mediaQueries[i];
        const mediaSplit = String.prototype.split.call(media, ',');
        const matchMedia = window.matchMedia(mediaSplit[0]);
        const mediaBreakpoint = mediaSplit[1];

        // массив объектов с подходящим брейкпоинтом
        const оbjectsFilter = Array.prototype.filter.call(this.оbjects, function (item) {
            return item.breakpoint === mediaBreakpoint;
        });
        matchMedia.addListener(function () {
            _this.mediaHandler(matchMedia, оbjectsFilter);
        });
        this.mediaHandler(matchMedia, оbjectsFilter);
    }
};

DynamicAdapt.prototype.mediaHandler = function (matchMedia, оbjects) {
    if (matchMedia.matches) {
        for (let i = 0; i < оbjects.length; i++) {
            const оbject = оbjects[i];
            оbject.index = this.indexInParent(оbject.parent, оbject.element);
            this.moveTo(оbject.place, оbject.element, оbject.destination);
        }
    } else {
        for (let i = 0; i < оbjects.length; i++) {
            const оbject = оbjects[i];
            if (оbject.element.classList.contains(this.daClassname)) {
                this.moveBack(оbject.parent, оbject.element, оbject.index);
            }
        }
    }
};

// Функция перемещения
DynamicAdapt.prototype.moveTo = function (place, element, destination) {
    element.classList.add(this.daClassname);
    if (place === 'last' || place >= destination.children.length) {
        destination.insertAdjacentElement('beforeend', element);
        return;
    }
    if (place === 'first') {
        destination.insertAdjacentElement('afterbegin', element);
        return;
    }
    destination.children[place].insertAdjacentElement('beforebegin', element);
}

// Функция возврата
DynamicAdapt.prototype.moveBack = function (parent, element, index) {
    element.classList.remove(this.daClassname);
    if (parent.children[index] !== undefined) {
        parent.children[index].insertAdjacentElement('beforebegin', element);
    } else {
        parent.insertAdjacentElement('beforeend', element);
    }
}

// Функция получения индекса внутри родителя
DynamicAdapt.prototype.indexInParent = function (parent, element) {
    const array = Array.prototype.slice.call(parent.children);
    return Array.prototype.indexOf.call(array, element);
};

// Функция сортировки массива по breakpoint и place 
// по возрастанию для this.type = min
// по убыванию для this.type = max
DynamicAdapt.prototype.arraySort = function (arr) {
    if (this.type === "min") {
        Array.prototype.sort.call(arr, function (a, b) {
            if (a.breakpoint === b.breakpoint) {
                if (a.place === b.place) {
                    return 0;
                }

                if (a.place === "first" || b.place === "last") {
                    return -1;
                }

                if (a.place === "last" || b.place === "first") {
                    return 1;
                }

                return a.place - b.place;
            }

            return a.breakpoint - b.breakpoint;
        });
    } else {
        Array.prototype.sort.call(arr, function (a, b) {
            if (a.breakpoint === b.breakpoint) {
                if (a.place === b.place) {
                    return 0;
                }

                if (a.place === "first" || b.place === "last") {
                    return 1;
                }

                if (a.place === "last" || b.place === "first") {
                    return -1;
                }

                return b.place - a.place;
            }

            return b.breakpoint - a.breakpoint;
        });
        return;
    }
};

const da = new DynamicAdapt("max");
da.init();

    /* $('.burger-btn').on('click', function () {
    $('.burger-btn').toggleClass('burger-btn--active');
    $('.burger-menu').toggleClass('burger-menu--active');
});

$('.burger-btn').on('click', function () {
    $('.burger-btn').addClass('burger-btn--active');
    $('.burger-menu').addClass('burger-menu--active');
});

$('.burger-menu__close-btn').on('click', function () {
    $('.burger-btn').removeClass('burger-btn--active');
    $('.burger-menu').removeClass('burger-menu--active');
});

$('.header__menu-link').on('click', function () {
    $('.burger-menu').removeClass('burger-menu--active');
});  */

    /* $('.open-video').magnificPopup({
    type: 'iframe',
    preloader: false,
});

$('.popup-link').magnificPopup({
    type: 'inline' // к попапу добавить класс mfp-hide // Через кнопку data-mfp-src="#call_me" добавить кнопке
});

$('.popup-gallery').magnificPopup({
    delegate: 'a',
    type: 'image',
    tLoading: 'Loading image #%curr%...',
    mainClass: 'mfp-img-mobile',
    gallery: {
        enabled: true,
        navigateByImgClick: true,
        preload: [0, 1]
    },
    image: {
        tError: '<a href="%url%">The image #%curr%</a> could not be loaded',
    }
}); */

    /* $('.tab').on('click', function (e) {
    e.preventDefault();

    $($(this).siblings()).removeClass('tab--active');
    $('.tabs-content').removeClass('tabs-content--active');

    $(this).addClass('tab--active');
    $($(this).attr('href')).addClass('tabs-content--active');

    //$('.slider').slick('setPosition'); // Инициализация слайдера
}); */

    /* $('.accordion__item-summary').on('click', function () {
    $(this).parent().siblings().removeClass('accordion__item--active');
    $(this).parent().siblings().find('div.accordion__item-details').slideUp('300');
    $(this).parent().toggleClass('accordion__item--active');
    $(this).next().slideToggle('300');
}); */

    /* $('.slider').slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    prevArrow: '<button class="slider__btn slider__btn--prev"></button>',
    nextArrow: '<button class="slider__btn slider__btn--next"></button>',
    dots: true,
    //centerMode: true,
    //centerPadding: '60px',
    //variableWidth: true,
    //autoplay: true,
    //autoplaySpeed: 2000,
    //fade: true,
    //appendArrows: ,
    //appendDots: ,
    //rtl: true,
    //mobileFirst: true,
    //rows: 2,
    //slidesPerRow: 1,
    responsive: [
        {
            //breakpoint: ,
            settings: {

            }
        },
    ]
});

$(window).on('resize', function (e) {
        // Переменная, по которой узнаем запущен слайдер или нет.
        // Храним её в data
        var init = $(".").data('init-slider');
        // Если мобильный
        if (window.innerWidth < 991) {
            // Если слайдер не запущен
            if (init != 1) {
                // Запускаем слайдер и записываем в data init-slider = 1
                $('.').slick({
                    slidesToShow: 1,
                    arrows: false,
                    dots: true,
                    variableWidth: true,
                    responsive: [
                        {
                            breakpoint: 575,
                            settings: {
                                centerMode: true,
                            },
                        }
                    ]
                }).data({ 'init-slider': 1 });
            }
        }
        // Если не мобайл
        else {
            // Если слайдер запущен
            if (init == 1) {
                // Разрушаем слайдер и записываем в data init-slider = 0
                $('.').slick('unslick').data({ 'init-slider': 0 });
            }
        }
    }).trigger('resize'); */

    /* $("input[name=price_range]").ionRangeSlider({
    type: "double",
    grid: false,
    //min: ,
    //max: ,
    //from: ,
    //to: ,
}); */

    /* $.validator.addMethod("minlenghtphone", function (value, element) {
    return value.replace(/\D+/g, '').length > 10;
});
$.validator.addMethod("requiredphone", function (value, element) {
    return value.replace(/\D+/g, '').length > 1;
});


function validateForms(form) {
    $(form).validate({
        rules: {
            name: "required",
            phone: {
                requiredphone: true,
                minlenghtphone: true,
            },
            email: "required",
            password: "required",
            repeat_password: {
                required: true,
                equalTo: "#reg_pass",
            }
        },
        submitHandler: function () {
            $.magnificPopup.open({
                items: {
                    src: '#success',
                }
            });
        },
    });
}

validateForms('#order-popup form');
validateForms('#product-card form');


$('form').submit(function (e) {
    e.preventDefault();

    $.ajax({
        type: "POST",
        url: "send.php",
        data: $(this).serialize(),
    });
    $('.form__input').removeClass('valid');
    $(this).find("input").val("");
    $('form').trigger('reset');
    return false;
});

$.fn.setCursorPosition = function (pos) {
    if ($(this).get(0).setSelectionRange) {
        $(this).get(0).setSelectionRange(pos, pos);
    } else if ($(this).get(0).createTextRange) {
        var range = $(this).get(0).createTextRange();
        range.collapse(true);
        range.moveEnd('character', pos);
        range.moveStart('character', pos);
        range.select();
    }
};

$("input[name=phone]").click(function () {
    $(this).setCursorPosition(4);
}).mask("+7 (999) 999-99-99"); */

    /* $("a[href^='#']").not('.tab').click(function () {
    const href = $(this).attr("href");
    $("html, body").animate({ scrollTop: $(href).offset().top + "px" });
    return false;
}); */
});



