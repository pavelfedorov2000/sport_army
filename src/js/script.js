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

    @@include('dinamic-adapt.js')

    /* @@include('../blocks/modules/burger/burger.js') */

    /* @@include('../blocks/modules/popups/popups.js') */

    /* @@include('tabs.js') */

    /* @@include('accordion.js') */

    /* @@include('sliders.js') */

    /* @@include('range-slider.js') */

    /* @@include('validate.js') */

    /* @@include('scroll.js') */
});



