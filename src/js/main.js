//= ../../node_modules/jquery/dist/jquery.min.js
//= ../../node_modules/simplebar/dist/simplebar.js
//= vendors/modernizr.js
//= vendors/swiper.min.js
//= vendors/styleselect.js
//= vendors/nouislider.min.js
//= vendors/modal.min.js
//= vendors/native-slider-toggle.js
//= vendors/share.js
//= vendors/remodal.min.js



'use strict';



// Object-fit fallback
if ('objectFit' in document.documentElement.style === false) {
    var container = document.getElementsByClassName('image-wrapper');
    for (var i = 0; i < container.length; i++) {
        var imageSource = container[i].querySelector('img').src;
        container[i].querySelector('img').style.display = 'none';
        container[i].style.backgroundSize = 'cover';
        container[i].style.backgroundImage = 'url(' + imageSource + ')';
        container[i].style.backgroundPosition = 'center center';
    }
}



// position sticky support
if (!Modernizr.csspositionsticky) {
    if (document.querySelector('.sidebar-nav')) {
        var elementStuck = document.querySelector('.sidebar-nav');
        var elementPosition = elementStuck.getBoundingClientRect();
        var placeholder = document.createElement('div');
        placeholder.style.width = elementPosition.width + 'px';
        placeholder.style.height = elementPosition.height + 'px';
        var isAdded = false;

        window.addEventListener('scroll', function() {
            if (window.pageYOffset >= elementPosition.top && !isAdded) {
                elementStuck.classList.add('sticky');
                elementStuck.parentNode.insertBefore(placeholder, elementStuck);
                isAdded = true;
            } else if (window.pageYOffset < elementPosition.top && isAdded) {
                elementStuck.classList.remove('sticky');
                elementStuck.parentNode.removeChild(placeholder);
                isAdded = false;
            }
        });
    };
};



// Controllers

//= controllers/sliders.js
//= controllers/tabs.js
//= controllers/collapse.js



// Collapses blocks init
var collapses = document.querySelectorAll('.nst-component');
for (var i = 0; i < collapses.length; i++) {
    nst.init(collapses[i]);
};



// Открытие блока с телефонами в header
if (document.querySelector('.userbar-link.phones')) {
    document.querySelector('.userbar-link.phones').onclick = function() {
        this.classList.toggle('opened');
        document.querySelector('.phones-block').classList.toggle('opened');
        var phoneLinks = document.querySelectorAll('.phones-block__tel');
        if (document.querySelector('.phones-block').classList.contains('opened')) {
            for (var i = 0; i < phoneLinks.length; i++) {
                phoneLinks[i].setAttribute('tabindex', '0');
            };
        } else {
            for (var i = 0; i < phoneLinks.length; i++) {
                phoneLinks[i].setAttribute('tabindex', '-1');
            };
        };
    };
};



// Открытие формы с поиском
if (document.querySelector('.search--desktop')) {
    document.querySelector('.search--desktop').onclick = function() {
        this.classList.add('hidden');
        document.querySelector('.header-lowbar__left-panel .nav-list').classList.add('hidden');
        document.querySelector('.search-wrapper').classList.add('search-wrapper--opened');
        document.querySelector('.search-wrapper .search-form__control').focus();
    };
    document.querySelector('.search-form__close').onclick = function() {
        document.querySelector('.header-lowbar__left-panel .nav-list').classList.remove('hidden');
        document.querySelector('.search-wrapper').classList.remove('search-wrapper--opened');
        document.querySelector('.search--desktop').classList.remove('hidden');
    };
}

// Открытие адаптивной формы с поиском
if (document.querySelector('.search--adaptive')) {
    document.querySelector('.search--adaptive').onclick = function() {
        this.classList.toggle('opened');
        document.querySelector('.search-form--adaptive').classList.toggle('opened');
    }
}



// Открытие адаптивного меню
if (document.querySelector('.navigation--adaptive')) {
    document.querySelector('.navigation--adaptive').onclick = function() {
        document.querySelector('.adaptive-nav').classList.add('opened');
        document.body.style.overflow = 'hidden';
    }
}



// Закрытие адаптивного меню
if (document.querySelector('.adaptive-close')) {
    document.querySelector('.adaptive-close').onclick = function() {
        document.querySelector('.adaptive-nav').classList.remove('opened');
        document.body.style.overflow = 'auto';
    }
}



// Раскрытие подменю на адаптиве
$('.item__link').on('click', function() {
    $(this).toggleClass('opened');
    $(this).siblings('.catalog-nav__categories').slideToggle(300);
});



// Select custom
if (document.querySelector('.select--years')) {
    styleSelect('.select--years');
};
if (document.querySelector('.select--sort')) {
    styleSelect('.select--sort');
};
if (document.querySelector('.select--city')) {
    styleSelect('.select--city');
};
if (document.querySelector('.select-contacts--city')) {
    styleSelect('.select-contacts--city');
};



// Pseudo select
function pseudoSelectToggle(el) {
    el.classList.toggle('opened');
    el.nextElementSibling.classList.toggle('opened');
};

function pseudoSelectCloseAll(exception) {
    document.querySelectorAll('.pseudo-select').forEach(function(pseudoSelectEl) {
        if ( pseudoSelectEl !== exception ) {
            pseudoSelectEl.classList.remove('opened');
        }
    });
};

if (document.querySelector('.pseudo-select')) {
    document.querySelector('.pseudo-select').onclick = function() {
        pseudoSelectToggle(document.querySelector('.pseudo-select'));
    };
};



// Change color image
if (document.querySelector('.product-item-colors__btn')) {
    var colorLinksBtn = document.querySelectorAll('.product-item-colors__btn');
    for (var i = 0; i < colorLinksBtn.length; i++) {
        colorLinksBtn[i].onclick = function() {
            var imageSrc = this.getAttribute('data-image-src');
            var imageArticule = this.getAttribute('data-product-id');
            var cardImage = this.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.previousElementSibling.querySelector('img');
            var card = this.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement;
            cardImage.setAttribute('src', imageSrc);
            card.setAttribute('data-product-id', imageArticule);
        };
    };
};



// Change product card image
if (document.querySelector('.product-item') && window.innerWidth > 992) {
    var productCards = document.querySelectorAll('.product-item');
    for (var i = 0; i < productCards.length; i++) {
        productCards[i].addEventListener('mouseover', function() {
            var imageElement = this.querySelector('.image-wrapper__image');
            var imageSrc1 = imageElement.getAttribute('data-src-1');
            var imageSrc2 = imageElement.getAttribute('data-src-2');
            imageElement.src = imageSrc2;
        });
        productCards[i].addEventListener('mouseout', function() {
            var imageElement = this.querySelector('.image-wrapper__image');
            var imageSrc1 = imageElement.getAttribute('data-src-1');
            var imageSrc2 = imageElement.getAttribute('data-src-2');
            imageElement.src = imageSrc1;
        });
    };
};



// Рассчет рейтинга продукта и проставление звезд у каждого отзыва
if (document.querySelector('.review-item')) {
    var ratingOutputElem = document.querySelector('.reviews-total__rating');
    var ratingItems = document.querySelectorAll('.review-item__stars');
    var ratings = [];
    for (var i = 0; i < ratingItems.length; i++) {
        ratings.push(ratingItems[i].getAttribute('data-rating'));
        ratingItems[i].querySelector('.stars-front-svg').style.width = ratingItems[i].getAttribute('data-rating') * 20 + '%';
    };
    var ratingSum = 0;
    for (var i = 0; i < ratings.length; i++) {
        ratingSum += Number(ratings[i]);
    };
    var totalRating = ratingSum / ratings.length;
    totalRating = totalRating.toFixed(1);
    // totalRating = totalRating.replace('.', ',');
    ratingOutputElem.innerHTML = totalRating;
};



// Add to favorites
function addFavorite(e) {
    e.preventDefault();
    e.stopPropagation();
    this.classList.toggle('in-favorite');
};
if (document.querySelector('.product-item')) {
    var favoriteLinks = document.querySelectorAll('.product-item__favorite');
    for (var i = 0; i < favoriteLinks.length; i++) {
        favoriteLinks[i].addEventListener('click', addFavorite, true);
    };
};
if (document.querySelector('.product-info')) {
    document.querySelector('.product__favorite').addEventListener('click', addFavorite, true);
};



// Simplebar init
function sizesScrollbarInit() {
    if (document.getElementById('sizes-scrollbar') && window.innerWidth > 992) {
        var sizesElem = document.getElementById('sizes-scrollbar');
        new SimpleBar(sizesElem);
    };
};
window.addEventListener('load', sizesScrollbarInit);
window.addEventListener('resize', sizesScrollbarInit);



// Подробнее о товаре
$('.product-descr__more').on('click', function(e) {
    e.preventDefault();
    $(this).addClass('hidden');
    $('.product-descr__more-block').slideDown(300);
});



// Get all products from catalog.json
var products;
var returned_data;
if (document.querySelector('.submit-block__btn')) {
    var productArticule = document.querySelector('.submit-block__btn').getAttribute('data-product-id');
};



function catalogReq(callback) {
    var catalogRequest = new XMLHttpRequest();
    catalogRequest.open('GET', '../catalog/catalog.json', true);
    catalogRequest.onreadystatechange = function() {
        if (catalogRequest.readyState == 4 || catalogRequest.readyState == 200) {
            var returned_data = eval('(' + catalogRequest.responseText + ')');

            var sliderImages = [];
            for (var i = 0; i < returned_data.catalog.length; i++) {
                if (returned_data.catalog[i].articule == productArticule) {
                    var dataImages = returned_data.catalog[0].images;
                    for (var i = 0; i < dataImages.length; i++) {
                        sliderImages.push(dataImages[i]);
                    };
                };
            };
            // callback.apply(this,[returned_data]);
            renderProductSlider(sliderImages);
        } else {
            // console.log('Error');
        };
    };

    catalogRequest.send(null);
};
window.addEventListener('load', catalogReq);



// Controllers
//= controllers/filter-modal.js
//= controllers/filter.js
//= controllers/cart.js
//= controllers/storage.js
//= controllers/input.js
//= controllers/map.js
//= controllers/quickview.js
//= controllers/rating.js



function productSliderImageChange() {
    var colorControlls = document.querySelectorAll('.colors-block__item__control');
    for (var i = 0; i < colorControlls.length; i++) {
        colorControlls[i].onchange = function() {
            var productArticule = document.querySelector('.submit-block__btn').getAttribute('data-product-main-articule');
            if (this.checked) {
                var colorArticule = this.getAttribute('data-product-id');
                var catalogRequest = new XMLHttpRequest();
                catalogRequest.open('GET', '../catalog/catalog.json', true);
                catalogRequest.onreadystatechange = function() {
                    if (catalogRequest.readyState == 4 || catalogRequest.readyState == 200) {
                        var returned_data = eval('(' + catalogRequest.responseText + ')');

                        var sliderImages = [];
                        for (var i = 0; i < returned_data.catalog.length; i++) {
                            if (returned_data.catalog[i].articule == productArticule) {
                                var colors = returned_data.catalog[i].colors;
                                for (var i = 0; i < colors.length; i++) {
                                    if (colors[i].articule == colorArticule) {
                                        var colorImages = colors[i].images;
                                        for (var i = 0; i < colorImages.length; i++) {
                                            sliderImages.push(colorImages[i]);
                                        };
                                    };
                                };
                                renderProductSlider(sliderImages);
                            };
                        };
                    };
                };

                catalogRequest.send(null);
            } else {
                console.log('error');
            };
        };
    };
};
productSliderImageChange();



// Social likes init
if (document.querySelector('.social-share')) {
    var shareBlock = document.querySelector('.social-share');
    var links = document.querySelectorAll('.social-share__link');
    var data = {
        url: shareBlock.getAttribute('data-url'),
        title: shareBlock.getAttribute('data-title'),
        descr: shareBlock.getAttribute('data-descr'),
        image: shareBlock.getAttribute('data-image')
    };
    for (var i = 0; i < links.length; i++) {
        if (links[i].classList.contains('facebook')) {
            links[i].onclick = function(e) {
                e.preventDefault();
                Share.facebook(data.url);
            };
        } else if (links[i].classList.contains('vkontakte')) {
            links[i].onclick = function(e) {
                e.preventDefault();
                Share.vkontakte(data.url, data.title, data.image, data.descr);
            };
        } else if (links[i].classList.contains('odnoklassniki')) {
            links[i].onclick = function(e) {
                e.preventDefault();
                Share.odnoklassniki(data.url, data.title);
            };
        };
    };
};



// Smooth scroll
$(document).ready(function() {
	$('.sidebar-nav-subnav__item__link').bind('click', function(e) {
		e.preventDefault();

		var target = $(this).attr("href");

		$('html, body').stop().animate({
			scrollTop: $(target).offset().top
		}, 600, function() {
			location.hash = target;
		});

		return false;
	});
});
$(window).scroll(function() {
	var scrollDistance = $(window).scrollTop();

	$('.article-section').each(function(i) {
		if ($(this).position().top <= scrollDistance) {
			$('.sidebar-nav-subnav__item__link').removeClass('sidebar-nav-subnav__item__link--current');
			$('.sidebar-nav-subnav__item__link').eq(i).addClass('sidebar-nav-subnav__item__link--current');
		};
	});
}).scroll();



// Инициализация всплывающего окна с авторизацией
// window.addEventListener('load', function() {
//     registrationModal.show();
// });



// Filter fixed icon on adaptive
if (document.querySelector('.filter-form__link--fixed') && document.documentElement.clientWidth < 992) {

    (function() {
    	document.querySelector('.filter-form__link--fixed').onclick = function(e) {
    		e.preventDefault();
    		var scrollDuration = 300,
            	scrollStep = -window.scrollY / (scrollDuration / 15),
            	scrollInterval = setInterval(function() {
    		        if ( window.scrollY != 0 ) {
    		            window.scrollBy( 0, scrollStep );
    		        }
    		        else clearInterval(scrollInterval);
    	    	},15);
    	};
    })();

    function filterIconFixed() {
        if (window.pageYOffset > 600) {
            document.querySelector('.filter-form__link--fixed').classList.add('visible');
        } else {
            if (document.querySelector('.filter-form__link--fixed').classList.contains('visible')) {
                document.querySelector('.filter-form__link--fixed').classList.remove('visible');
            };
        };
    };
    window.addEventListener('scroll', filterIconFixed);
};
