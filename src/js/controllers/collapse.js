// Collapse blocks
function collapseBehaviour(collapseLinks) {
    for (var i = 0; i < collapseLinks.length; i++) {
        // collapseLinks[i].nextElementSibling.style.height = collapseLinks[i].nextElementSibling.clientHeight + 'px';
        collapseLinks[i].nextElementSibling.classList.add('hidden');
        collapseLinks[i].onclick = function(e) {
            e.preventDefault();
            this.classList.toggle('opened');
            this.nextElementSibling.classList.toggle('hidden');
            if (!this.nextElementSibling.classList.contains('hidden')) {
                if (this.nextElementSibling.getElementsByTagName('input').length) {
                    for (var i = 0; i < this.nextElementSibling.getElementsByTagName('input').length; i++) {
                        this.nextElementSibling.getElementsByTagName('input')[i].setAttribute('tabindex', '1');
                    };
                };
            } else {
                if (this.nextElementSibling.getElementsByTagName('input').length) {
                    for (var i = 0; i < this.nextElementSibling.getElementsByTagName('input').length; i++) {
                        this.nextElementSibling.getElementsByTagName('input')[i].setAttribute('tabindex', '-1');
                    };
                };
            };
        };
    };
};

// $('.collapse__link').on('click', function(e) {
//     e.preventDefault();
//     $(this).toggleClass('opened');
//     $(this).siblings('.collapse__content').slideToggle(300);
// });

(function() {
    if (document.querySelector('.filter-form__link')) {
        var links = document.querySelectorAll('.collapse__link');
        if (links[0].classList.contains('filter-item__link') && document.documentElement.clientWidth > 992) {
            $('.collapse__link').on('click', function(e) {
                e.preventDefault();
                $(this).toggleClass('opened');
                $(this).siblings('.collapse__content').slideToggle(100);
            });
        };

        $('.subcategory-link').on('click', function(e) {
            e.preventDefault();
            $(this).toggleClass('opened');
            $(this).siblings('.collapse__content').slideToggle(100);
        });

        if (document.documentElement.clientWidth < 992) {
            $('.filter-form__link').on('click', function(e) {
                e.preventDefault();
                $(this).toggleClass('opened');
                $(this).siblings('.filter-form__collapse').slideToggle(100);
            });
        };
    };
    if (!document.querySelector('.filter-form__link')) {
        var links = document.querySelectorAll('.collapse__link');
        collapseBehaviour(links);
    };
})();



/*
 * Другая реализация сворачивающихся блоков
 */
function collapses(links) {
    // for (var i = 0; i < links.length; i++) {
        // links[i].nextElementSibling.style.height = links[i].nextElementSibling.getBoundingClientRect().height + 'px';
        // links[i].nextElementSibling.classList.add('hidden');
        // links[i].onclick = function(e) {
        //     e.preventDefault();
        //     this.classList.toggle('opened');
        //     this.nextElementSibling.classList.toggle('hidden');
        //     this.nextElementSibling.slideToggle(300);
        // };

        $('.faq-item__link').on('click', function(e) {
            e.preventDefault();
            if ($('.faq-item__link').not(this).hasClass('opened')) {
                $('.faq-item__link').removeClass('opened');
            };
            if ($('.faq-item__collapse-block').not($(this).siblings('.faq-item__collapse-block')).hasClass('hidden')) {
                $('.faq-item__collapse-block').removeClass('hidden');
                $('.faq-item__collapse-block').slideUp(300);
            };
            if ($(this).hasClass('opened')) {
                $(this).removeClass('opened');
                $(this).siblings('.faq-item__collapse-block').removeClass('hidden');
                $(this).siblings('.faq-item__collapse-block').slideUp(300);
            } else {
                $(this).addClass('opened');
                $(this).siblings('.faq-item__collapse-block').addClass('hidden');
                $(this).siblings('.faq-item__collapse-block').slideDown(300);
            };
        });
    // };
};

if (document.querySelector('.faq-item__link')) {
    var links = $('.faq-item__link');
    collapses(links);
};
if (document.querySelector('.shop-info__link')) {
    $('.shop-info__link').on('click', function(e) {
        e.preventDefault();
        if ($('.shop-info__link').not(this).hasClass('opened')) {
            $('.shop-info__link').removeClass('opened');
        };
        if ($('.shop-info__item').not($(this).siblings('.shop-info__item')).hasClass('shop-info__item--opened')) {
            $('.shop-info__item').removeClass('shop-info__item--opened');
            $('.shop-info__item').slideUp(300);
        };
        if ($(this).hasClass('opened')) {
            $(this).removeClass('opened');
            $(this).siblings('.shop-info__item').removeClass('shop-info__item--opened');
            $(this).siblings('.shop-info__item').slideUp(300);
        } else {
            $(this).addClass('opened');
            $(this).siblings('.shop-info__item').addClass('shop-info__item--opened');
            $(this).siblings('.shop-info__item').slideDown(300);
        };
    });
};



$('.catalog-categories-list__item__link').on('click', function(e) {
    e.preventDefault(e);
    $(this).toggleClass('opened');
    $(this).siblings('.catalog-subcategories').slideToggle(300);
});
