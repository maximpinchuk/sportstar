// Инициализация слайдера на главной странице (баннер)
var bannerSlider = new Swiper('.banner-slider', {
    loop: true,
    navigation: {
        prevEl: '.banner-slider__prev-btn',
        nextEl: '.banner-slider__next-btn'
    },
    pagination: {
        el: '.banner-slider__pagination',
        type: 'fraction',
        currentClass: 'pagination-current',
        totalClass: 'pagination-total'
    },
    renderFraction: function (currentClass, totalClass) {
        return '<span class="' + currentClass + '"></span>' +
            ' : ' +
            '<span class="' + totalClass + '"></span>';
    }
});

// Инициализация слайдера на главной странице (Лидеры продаж)
var catalogLeaders = new Swiper('.catalog-leaders', {
    loop: true,
    navigation: {
        prevEl: '.catalog-leaders--prev',
        nextEl: '.catalog-leaders--next'
    },
    spaceBetween: 30,
    slidesPerView: 4,
    breakpoints: {
        992: {
            slidesPerView: 3
        },
        768: {
            slidesPerView: 2
        },
        576: {
            slidesPerView: 1
        }
    }
});

// Инициализация слайдера на главной странице (Распродажа)
var catalogStoke = new Swiper('.catalog-stoke', {
    loop: true,
    navigation: {
        prevEl: '.catalog-stoke--prev',
        nextEl: '.catalog-stoke--next'
    },
    spaceBetween: 30,
    slidesPerView: 4,
    breakpoints: {
        992: {
            slidesPerView: 3
        },
        768: {
            slidesPerView: 2
        },
        576: {
            slidesPerView: 1
        }
    },
    observer: true,
    observeParents: true
});

// Инициализация слайдера на главной странице (Новинки)
var catalogNovelty = new Swiper('.catalog-novelty', {
    loop: true,
    navigation: {
        prevEl: '.catalog-novelty--prev',
        nextEl: '.catalog-novelty--next'
    },
    spaceBetween: 30,
    slidesPerView: 4,
    breakpoints: {
        992: {
            slidesPerView: 3
        },
        768: {
            slidesPerView: 2
        },
        576: {
            slidesPerView: 1
        }
    }
});

// Инициализация слайдера на главной странице (Партнеры)
var partnersSlider = new Swiper('.partners-slider', {
    loop: true,
    navigation: {
        prevEl: '.partners--prev',
        nextEl: '.partners--next'
    },
    // spaceBetween: 30,
    slidesPerView: 4,
    slidesPerColumn: 1,
    breakpoints: {
        992: {
            slidesPerView: 3,
            slidesPerColumn: 1
        },
        768: {
            slidesPerView: 2,
            slidesPerColumn: 2
        }
    }
});

// Инициализация слайдера на главной странице (Новости)
var newsSlider = new Swiper('.news-slider', {
    watchSlidesVisibility: true,
    lazy: {
        loadPrevNext: true,
        loadOnTransitionStart: true
    },
    navigation: {
        prevEl: '.news-slider__prev-btn',
        nextEl: '.news-slider__next-btn'
    },
    slidesPerView: 'auto',
    breakpoints: {
        992: {
            spaceBetween: 0
        },
        768: {
            spaceBetween: 30
        },
        576: {
            spaceBetween: 30
        }
    }
});

// Инициализация слайдера на главной странице (Статьи)
var articlesSlider = new Swiper('.articles-slider', {
    watchSlidesVisibility: true,
    lazy: {
        loadPrevNext: true,
        loadOnTransitionStart: true
    },
    navigation: {
        prevEl: '.articles-slider__prev-btn',
        nextEl: '.articles-slider__next-btn'
    },
    slidesPerView: 'auto',
    breakpoints: {
        992: {
            spaceBetween: 0
        },
        768: {
            spaceBetween: 30
        },
        576: {
            spaceBetween: 30
        }
    },
    observer: true,
    observeParents: true
});



function renderProductSlider(images) {
    if (document.querySelector('.product-item-slider')) {

        if (document.querySelector('.product-item-slider .swiper-wrapper .swiper-slide')) {
            var slides = document.querySelectorAll('.product-item-slider .swiper-wrapper .swiper-slide');
            for (var i = 0; i < slides.length; i++) {
                document.querySelector('.product-item-slider .swiper-wrapper').removeChild(slides[i]);
            };
        };

        for (var i = 0; i < images.length; i++) {
            var slide = document.createElement('div');
            slide.className = 'swiper-slide';
            document.querySelector('.product-item-slider .swiper-wrapper').appendChild(slide);

            var figure = document.createElement('figure');
            figure.className = 'image-wrapper';
            slide.appendChild(figure);

            var image = document.createElement('img');
            image.className = 'image-wrapper__image';
            image.src = images[i];
            image.alt = 'Фото товара';
            figure.appendChild(image);
        };

        /*
         * Инициализация слайдера на странице товара
         */
        var productItemMainSlider = new Swiper('.product-item-slider', {
            loop: true,
            updateOnImagesReady: false,
            observer: true,
            observeParents: true,
            pagination: {
                el: '.product-item-slider__pagination',
                type: 'bullets',
                clickable: true,
                bulletClass: 'pagination-item',
                bulletActiveClass: 'pagination-item--active',
                renderBullet: function(index, className) {
                    return '<div class="' + className + '"><img class="pagination-item__image" src="' + images[index] + '" alt=""></div>';
                }
            }
        });
    };

    if (document.querySelector('.product-item-slider-quickview')) {

        if (document.querySelector('.product-item-slider-quickview .swiper-wrapper .swiper-slide')) {
            var slides = document.querySelectorAll('.product-item-slider-quickview .swiper-wrapper .swiper-slide');
            for (var i = 0; i < slides.length; i++) {
                document.querySelector('.product-item-slider-quickview .swiper-wrapper').removeChild(slides[i]);
            };
        };

        for (var i = 0; i < images.length; i++) {
            var slide = document.createElement('div');
            slide.className = 'swiper-slide';
            document.querySelector('.product-item-slider-quickview .swiper-wrapper').appendChild(slide);

            var figure = document.createElement('figure');
            figure.className = 'image-wrapper';
            slide.appendChild(figure);

            var image = document.createElement('img');
            image.className = 'image-wrapper__image';
            image.src = images[i];
            image.alt = 'Фото товара';
            figure.appendChild(image);
        };

        /*
         * Инициализация слайдера в окне с быстрым просмотром товара
         */
        var productItemMainSliderQuickview = new Swiper('.product-item-slider-quickview', {
            loop: true,
            updateOnImagesReady: false,
            observer: true,
            observeParents: true,
            pagination: {
                el: '.product-item-slider-quickview__pagination',
                type: 'bullets',
                clickable: true,
                bulletClass: 'pagination-item',
                bulletActiveClass: 'pagination-item--active',
                clickableClass: 'pagination-item--clickable',
                renderBullet: function(index, className) {
                    return '<div class="' + className + '"><img class="pagination-item__image" src="' + images[index] + '" alt=""></div>';
                }
            }
        });
    };
};
