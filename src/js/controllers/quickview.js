/*
 * Рендеринг выпадающего списка с доступными размерами
 */
function sizeSelect(sizes) {
    if (document.querySelector('.sizes-list')) {
        document.querySelector('.sizes-list').innerHTML = '';
        for (var x = 0; x < sizes.length; x++) {
            var sizeElem = document.createElement('li');
            sizeElem.classList.add('sizes-list__item');
            quickviewModal.querySelector('.sizes-list').appendChild(sizeElem);
        };
        var sizeElems = document.querySelectorAll('.sizes-list__item');
        for (var i = 0; i < sizeElems.length; i++) {
            var sizeControl = document.createElement('input');
            sizeControl.classList.add('visually-hidden', 'sizes-list__item__checkbox');
            sizeControl.setAttribute('id', 'size-' + sizes[i]);
            sizeControl.setAttribute('type', 'radio');
            sizeControl.setAttribute('value', sizes[i]);
            sizeControl.setAttribute('name', 'size');
            sizeElems[i].appendChild(sizeControl);
            var sizeLabel = document.createElement('label');
            sizeLabel.classList.add('sizes-list__item__label');
            sizeLabel.setAttribute('for', 'size-' + sizes[i]);
            sizeLabel.innerHTML = sizes[i];
            sizeElems[i].appendChild(sizeLabel);
        };
    } else {
        for (var x = 0; x < sizes.length; x++) {
            var sizeElem = document.createElement('li');
            sizeElem.classList.add('sizes-list__item');
            quickviewModal.querySelector('.sizes-list').appendChild(sizeElem);
        };
        var sizeElems = document.querySelectorAll('.sizes-list__item');
        for (var i = 0; i < sizeElems.length; i++) {
            var sizeControl = document.createElement('input');
            sizeControl.classList.add('visually-hidden', 'sizes-list__item__checkbox');
            sizeControl.setAttribute('id', 'size-' + sizes[i]);
            sizeControl.setAttribute('type', 'radio');
            sizeControl.setAttribute('value', sizes[i]);
            sizeControl.setAttribute('name', 'size');
            sizeElems[i].appendChild(sizeControl);
            var sizeLabel = document.createElement('label');
            sizeLabel.classList.add('sizes-list__item__label');
            sizeLabel.setAttribute('for', 'size-' + sizes[i]);
            sizeLabel.innerHTML = sizes[i];
            sizeElems[i].appendChild(sizeLabel);
        };
    };
};



/*
 * Рендеринг доступных вариантов цветов
 */
function colorSelect(colors) {
    if (document.querySelector('.colors-block__item')) {
        quickviewModal.querySelector('.colors-block').innerHTML = '';
        for (var x = 0; x < colors.length; x++) {
            var colorElem = document.createElement('label');
            colorElem.classList.add('colors-block__item');
            quickviewModal.querySelector('.colors-block').appendChild(colorElem);
        };
        var colorElems = document.querySelectorAll('.colors-block__item');
        for (var i = 0; i < colorElems.length; i++) {
            var colorControl = document.createElement('input');
            colorControl.classList.add('visually-hidden', 'colors-block__item__control');
            colorControl.setAttribute('id', colors[i].title);
            colorControl.setAttribute('type', 'radio');
            colorControl.setAttribute('name', 'color');
            colorControl.setAttribute('data-product-id', colors[i].articule);
            colorElems[i].appendChild(colorControl);
            var colorImage = document.createElement('img');
            colorImage.classList.add('colors-block__item__image');
            colorImage.setAttribute('src', colors[i].thumbImage);
            colorImage.innerHTML = colors[i];
            colorElems[i].appendChild(colorImage);
        };
    } else {
        for (var x = 0; x < colors.length; x++) {
            var colorElem = document.createElement('label');
            colorElem.classList.add('colors-block__item');
            quickviewModal.querySelector('.colors-block').appendChild(colorElem);
        };
        var colorElems = document.querySelectorAll('.colors-block__item');
        for (var i = 0; i < colorElems.length; i++) {
            var colorControl = document.createElement('input');
            colorControl.classList.add('visually-hidden', 'colors-block__item__control');
            colorControl.setAttribute('id', colors[i].title);
            colorControl.setAttribute('type', 'radio');
            colorControl.setAttribute('name', 'color');
            colorControl.setAttribute('data-product-id', colors[i].articule);
            colorElems[i].appendChild(colorControl);
            var colorImage = document.createElement('img');
            colorImage.classList.add('colors-block__item__image');
            colorImage.setAttribute('src', colors[i].thumbImage);
            colorImage.innerHTML = colors[i];
            colorElems[i].appendChild(colorImage);
        };
    };
};




if (document.querySelector('.product-item')) {
    var productDetailsLinks = document.querySelectorAll('.product-item-details');
    var quickviewModal = document.getElementById('quickview-modal');
    for (var i = 0; i < productDetailsLinks.length; i++) {
        productDetailsLinks[i].onclick = function() {
            var productId = this.getAttribute('data-product-id');
            var catalogRequest = new XMLHttpRequest();
            catalogRequest.open('GET', '../catalog/catalog.json', true);
            catalogRequest.onreadystatechange = function() {
                if (catalogRequest.readyState == 4 || catalogRequest.readyState == 200) {
                    var returned_data = eval('(' + catalogRequest.responseText + ')');
                    for (var i = 0; i < returned_data.catalog.length; i++) {
                        if (returned_data.catalog[i].articule == productId) {
                            quickviewModal.querySelector('.quickview-header__availability').innerHTML = returned_data.catalog[i].availability;
                            quickviewModal.querySelector('.quickview-header__title').innerHTML = returned_data.catalog[i].title;
                            quickviewModal.querySelector('.quickview-header__brand').innerHTML = returned_data.catalog[i].brand;

                            // Рендеринг доступных цветов
                            var dataColors = returned_data.catalog[i].colors;
                            colorSelect(dataColors);

                            // Рендеринг слайдера с фото
                            var sliderImages = [];
                            var dataImages = returned_data.catalog[i].images;
                            for (var y = 0; y < dataImages.length; y++) {
                                sliderImages.push(dataImages[y]);
                            };
                            renderProductSlider(sliderImages);
                            productSliderImageChange();

                            // Рендеринг списка с доступными размерами
                            var dataSizes = returned_data.catalog[i].sizes;
                            sizeSelect(dataSizes);

                            // Рендеринг цены
                            if (returned_data.catalog[i].stoke == true) {
                                quickviewModal.querySelector('.product-info__price').innerHTML = String(returned_data.catalog[i].stoke_price) + '.00';
                                var beforeStokePrice = document.createElement('span');
                                beforeStokePrice.classList.add('product-info__price--before-stoke');
                                beforeStokePrice.innerHTML = String(returned_data.catalog[i].price) + '.00';
                                quickviewModal.querySelector('.product-info__prices').appendChild(beforeStokePrice);
                            } else {
                                quickviewModal.querySelector('.product-info__price').innerHTML = String(returned_data.catalog[i].price) + '.00';
                            };

                            // Рендеринг data-attributes у конпки добавления в корзину
                            quickviewModal.querySelector('.submit-block__btn').setAttribute('data-product-id', returned_data.catalog[i].articule);
                            quickviewModal.querySelector('.submit-block__btn').setAttribute('data-product-main-articule', returned_data.catalog[i].articule);

                            // Рендеринг описания товара
                            quickviewModal.querySelector('.product-descr__text').innerHTML = returned_data.catalog[i].descr;
                            quickviewModal.querySelector('.more-block__text').innerHTML = returned_data.catalog[i].full_descr;

                            // Рендеринг ссылки на товар
                            quickviewModal.querySelector('.quickview-footer__link').setAttribute('href', returned_data.catalog[i].link);
                        };
                    };
                };
            };
            catalogRequest.send(null);
        };
    };
};
