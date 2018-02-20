/*
 * Создание блока с выбранными параметрами фильтра
 */

// Функция создания строки с выбранными параметрами фильтра
function rowCreate(id, title, value) {
    var rowElem = document.createElement('div');
    rowElem.className = 'filter-selected__row ' + id;
    document.querySelector('.filter-selected').appendChild(rowElem);

    var labelElem = document.createElement('div');
    labelElem.className = 'filter-selected__label';
    labelElem.innerHTML = title;
    rowElem.appendChild(labelElem);

    var valueElem = document.createElement('div');
    valueElem.className = 'filter-selected__item';
    var elemText = [];

    if (value.length == 1) {
        // elemText += value[0];
        elemText.push(value[0]);
        valueElem.innerHTML = elemText;
        rowElem.appendChild(valueElem);
    } else if (value.length > 1 && id != 'price-filter') {
        for (var i = 0; i < value.length; i++) {
            // elemText += value[i] + ' ';
            elemText.push(value[i]);
        };
        // var regExp = /\s*,\s*/;
        // elemText = elemText.replace(' ', ', ');
        valueElem.innerHTML = elemText;
        rowElem.appendChild(valueElem);
    } else if (id == 'price-filter') {
        valueElem.innerHTML = 'от ' + value[0] + ' до ' + value[1];
        rowElem.appendChild(valueElem);
    } else {
        document.querySelector('.filter-selected').removeChild(rowElem);
    };
    // var regExp = /\s*,\s*/;
    // var newElemText = elemText.split(',');
    // console.log(newElemText);
};


// Создание строки с параметром отдельного фильтра
function filterParamsRow(id, title, value) {
    var rows = document.querySelectorAll('.filter-selected__row');
    for (var i = 0; i < rows.length; i++) {
        if (rows[i].classList.contains(id)) {
            var elem = rows[i];
        }
    };

    if (!elem) {
        rowCreate(id, title, value);
    } else {
        document.querySelector('.filter-selected').removeChild(elem);
        rowCreate(id, title, value);
    };
};


// Создание блока с выбранными параметрами сортировки
function filterParams(id, title, value) {
    if (!document.querySelector('.filter-selected')) {
        var filterSelectedElem = document.createElement('div');
        filterSelectedElem.className = 'filter-selected';
        document.querySelector('.catalog-main-row').insertBefore(filterSelectedElem, document.querySelector('.catalog-main-row').children[1]);
    };
    filterParamsRow(id, title, value);
};



/*
 * Функция добавления обводки на кнопку в зависимости от наполнения фильтра
 * передаются true и false, в зависимости от наличия кнопок принять и сбросить
 */
function filterUi(elem, submitBtn, clearBtn) {
    if (document.getElementById(elem)) {
        var sectionFilterBlock = document.getElementById(elem);
        var filterControllers = sectionFilterBlock.querySelectorAll('input');
        var sectionFilterBlockLabel = sectionFilterBlock.firstElementChild.getAttribute('aria-label');

        if (submitBtn) {
            var submitBtn = sectionFilterBlock.querySelector('button.submit');
            submitBtn.onclick = function() {
                var checkedElements = [];
                for (var i = 0; i < filterControllers.length; i++) {
                    if (filterControllers[i].checked) {
                        checkedElements.push(filterControllers[i].value);
                    };
                };
                filterParams(sectionFilterBlock.id, sectionFilterBlockLabel, checkedElements);
                for (var i = 0; i < filterControllers.length; i++) {
                    if (filterControllers[i].checked) {
                        sectionFilterBlock.firstElementChild.classList.add('selected');
                        break;
                    };
                };
            };
        };
        if (clearBtn) {
            var clearBtn = sectionFilterBlock.querySelector('button.clear');
            clearBtn.onclick = function() {
                for (var i = 0; i < filterControllers.length; i++) {
                    filterControllers[i].checked = false;
                };
                if (sectionFilterBlock.firstElementChild.classList.contains('selected')) {
                    sectionFilterBlock.firstElementChild.classList.remove('selected');
                };
            };
        };
    };
};




/*
 * Фильтрация по разделам
 */

function sectionFilter() {
    filterUi('section-filter', true, false);
};
sectionFilter();



/*
 * Фильтрация по подкатегории
 */

function categoryFilter() {
    filterUi('category-filter', true, false);
};
categoryFilter();



/*
 * Фильтрация по брендам
 */

function brandFilter() {
    filterUi('brand-filter', true, true);
};
brandFilter();



/*
 * Фильтрация для кого
 */

function forwhomFilter() {
    filterUi('for-whom-filter', true, true);
};
forwhomFilter();



/*
 * Фильтрация по цене
 */

function priceFilter() {
    if (document.getElementById('price-filter')) {

        /*
         * Сортровку по цене нужно будет вписать в файл range-slider.js
         */

        //= range-slider.js

        var sectionFilterBlock = document.getElementById('price-filter');
        var filterControllers = sectionFilterBlock.querySelectorAll('input');
        var sectionFilterBlockLabel = sectionFilterBlock.firstElementChild.getAttribute('aria-label');
        var submitBtn = sectionFilterBlock.querySelector('button.submit');
        var clearBtn = sectionFilterBlock.querySelector('button.clear');

        for (var i = 0; i < filterControllers.length; i++) {
            // filterControllers[i].onchange = function() {
                // console.log(this.value);
            // };
        };

        var minRange = document.getElementById('range-slider').getAttribute('data-price-min'),
            maxRange = document.getElementById('range-slider').getAttribute('data-price-max');

        submitBtn.onclick = function() {
            if (filterControllers[0].value != minRange || filterControllers[1].value != maxRange) {
                sectionFilterBlock.firstElementChild.classList.add('selected');
            } else {
                if (sectionFilterBlock.firstElementChild.classList.contains('selected')) {
                    sectionFilterBlock.firstElementChild.classList.remove('selected');
                };
            };
            var checkedElements = [filterControllers[0].value, filterControllers[1].value];
            filterParams(sectionFilterBlock.id, sectionFilterBlockLabel, checkedElements);

            if (filterControllers[0].value == minRange && filterControllers[1].value == maxRange) {
                document.querySelector('.filter-selected').removeChild(document.querySelector('.filter-selected__row.price-filter'));
            };
        };

        clearBtn.onclick = function() {
            filterControllers[0].value = minRange;
            filterControllers[1].value = maxRange;
            if (sectionFilterBlock.firstElementChild.classList.contains('selected')) {
                sectionFilterBlock.firstElementChild.classList.remove('selected');
            };
            slider.noUiSlider.set([minRange, maxRange]);
            // document.querySelector('.filter-selected').removeChild(document.querySelector('.filter-selected__row.price-filter'));
        };
    };
};
priceFilter();



/*
 * Фильтрация по размеру
 */

function sizesFilter() {
    filterUi('sizes-filter', true, true);
};
sizesFilter();



/*
 * Фильтрация по наличию
 */

function availabilityFilter() {
    filterUi('availability-filter', true, true);
};
availabilityFilter();



/*
 * Фильтрация по цвету
 */

function colorsFilter() {
    filterUi('colors-filter', true, true);
};
colorsFilter();



/*
 * Сбросить сортировку
 */
function clearFilter() {
    if (document.querySelector('.filter-selected')) {
        document.querySelector('.catalog-main-row').removeChild(document.querySelector('.filter-selected'));
    };

    var filterControllers = document.querySelector('.catalog-filter').querySelectorAll('input');
    var filterLinks = document.querySelectorAll('.filter-item__link.selected');

    for (var i = 0; i < filterLinks.length; i++) {
        filterLinks[i].classList.remove('selected');
    };

    for (var i = 0; i < filterControllers.length; i++) {
        if (filterControllers[i].type == 'radio' || filterControllers[i].type == 'checkbox') {
            filterControllers[i].checked = false;
        };
    };
};

if (document.querySelector('.clear-all')) {
    document.querySelector('.clear-all').onclick = function() {
        clearFilter();
    };
};
