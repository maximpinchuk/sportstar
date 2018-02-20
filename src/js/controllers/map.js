if (document.getElementById('map')) {
    var map;
    var markers = [];
    var mapOptions = {
        zoom: 7,
        center: {
            lat: 53.903753,
            lng: 27.558242
        },
        panControl: false,
        streetViewControl: false,
        overviewMapControl: false
    };

    document.querySelector('.select-contacts--city').addEventListener('change', function() {
        var city = this.value;
        if (city.length != '') {
            var xhr = new XMLHttpRequest();
            xhr.open('GET', '../shops/'+ city +'.json', true);
            xhr.send();
            xhr.onreadystatechange = function() {
                if (xhr.readyState == 4 || xhr.readyState == 200) {
                    shopContainerRemove();
                    var data = eval('(' + xhr.responseText + ')');
                    for (var i = 0; i < data.shops.length; i++) {
                        shopContainerCreate(data.shops[i].shop, data.shops[i].tel, data.shops[i].schedule, data.shops[i].address, data.shops[i].lat, data.shops[i].lng);
                        markers[i] = {
                            lat: data.shops[i].lat,
                            lng: data.shops[i].lng,
                            shop: data.shops[i].shop,
                            tel: data.shops[i].tel
                        };
                    };
                    reuseMethods();
                };
            };
        } else {
            shopContainerRemove();
        };
    });
};

// Создание блока с информацией о магазине
function shopContainerCreate(shop, tel, schedule, address, lat, lng) {
    var mainContainer = document.createElement('div');
    mainContainer.className = 'city-select-block__shop-info';
    var btn = '<a class="shop-info__link" aria-label="' + shop + '">' + shop + '<svg class="shop-info__link__icon" viewBox="0 0 8 8" width="8px" height="8px"><rect y="3" width="8" height="2"/><rect class="plus-vertical" y="3" transform="matrix(4.501980e-011 1 -1 4.501980e-011 8 -1.809886e-010)" width="8" height="2"/></svg></a>';
    var body = '<div class="shop-info__item"><div class="item__info-block"><img class="info-block__icon" src="img/icons/contacts-1.svg" alt="телефон"><a class="info-block__link" href="tel:'+ tel +'" aria-label="'+ tel +'">'+ tel +'</a></div><div class="item__info-block"><img class="info-block__icon" src="img/icons/contacts-2.svg" alt="время работы"><p class="info-block__text">'+ schedule +'</p></div><div class="item__info-block"><img class="info-block__icon" src="img/icons/contacts-3.svg" alt="адрес"><p class="info-block__text">'+ address +'</p></div><p class="item__map-link"><a href="#" data-lat="'+ lat +'" data-lng="'+ lng +'" aria-label="Смотреть на карте">Смотреть на карте</a></p></div>';
    mainContainer.innerHTML = btn + body;
    document.querySelector('.shop-info-wrapper').appendChild(mainContainer);
};

function reuseMethods() {
    $('.shop-info__link').on('click', function(e) {
        e.preventDefault();
        $(this).toggleClass('opened');
        $(this).siblings('.shop-info__item').toggleClass('shop-info__item--opened');
        $(this).siblings('.shop-info__item').slideToggle(300);
    });
    mapLinks();
};

// Удаляем все блоки с информацией о магазинах
function shopContainerRemove() {
    var shops = document.querySelectorAll('.city-select-block__shop-info');
    for (var i = 0; i < shops.length; i++) {
        document.querySelector('.shop-info-wrapper').removeChild(shops[i]);
    };
};

// Открытие магазина на карте
function mapLinks() {
    var mapLinks = document.querySelectorAll('.item__map-link');
    for (var i = 0; i < mapLinks.length; i++) {
        mapLinks[i].onclick = function(e) {
            e.preventDefault();
            changeCenter(Number(this.getAttribute('data-lat')), Number(this.getAttribute('data-lng')), 15);
        };
    };
};

/*
 * Инициализация карты
 */
function initMap() {
    map = new google.maps.Map(document.getElementById('map'), mapOptions);
};

function changeCenter(lat, lng, zoom) {
    map = new google.maps.Map(document.getElementById('map'), {
        zoom: zoom,
        center: {
            lat: lat,
            lng: lng
        },
        panControl: false,
        streetViewControl: false,
        overviewMapControl: false
    });

    markers.forEach(function(item) {
        var marker = new google.maps.Marker({
            position: {
                lat: item.lat,
                lng: item.lng
            },
            map: map
        });

        var contentString = '<div id="siteNotice">'+
            '</div>'+
            '<div class="map-info" id="bodyContent">'+
            '<h3 class="map-info__title">' + item.shop + '</h3>'+
            '<img class="map-info__icon" src="../img/icons/contacts-1.svg" alt="Телефон">' +
            '<a class="map-info__link" href="tel:'+ item.tel +'">' + item.tel + '</a>'+
            '</div>'+
            '</div>';

        var infowindow = new google.maps.InfoWindow({
            content: contentString
        });

        marker.addListener('click', function() {
            infowindow.open(map, marker);
        });
    });
};
