if (document.querySelector('.colors-block__item__control')) {
    var controlls = document.querySelectorAll('.colors-block__item__control');
    for (var i = 0; i < controlls.length; i++) {
        controlls[i].addEventListener('change', function() {
            document.querySelector('.submit-block__btn').setAttribute('data-product-id', this.getAttribute('data-product-id'));
        });
    };
};



// Cart modal
var cartModal = new Modal({
    el: document.getElementById('cart-modal'),
    backdrop: false
});



// Нажатие на кнопку "Добавить в корзину"
if (document.querySelector('.submit-block__btn')) {
    document.querySelector('.submit-block__btn').addEventListener('click', function() {
        var productId = this.getAttribute('data-product-id'),
            productSize,
            productSizes = document.querySelectorAll('.sizes-list__item__checkbox');

        for (var i = 0; i < productSizes.length; i++) {
            if (productSizes[i].checked) {
                productSize = productSizes[i].value;
            };
        };
        // Добавление товара в локальное хранилище
        addToStorage(productId, productSize);
        // Вывод кол-ва товаров в корзине в header
        cartAmmount();
        //
        if ($('#quickview-modal')) {
            if ($('[data-remodal-id=quickview-modal]').remodal().getState() == 'opened') {
                $('[data-remodal-id=quickview-modal]').remodal().close();
            };
        };
        // Открытие всплывающего окна
        cartModal.show();
        // вывод кол-ва товаров в модальном окне
        var ammount = cartAmmount();
        if (ammount == 1 || ammount == 21) {
            document.querySelector('.text-block__cart-amount').innerHTML = ammount + ' товар';
        } else if (ammount == 2 || ammount == 3 || ammount == 4) {
            document.querySelector('.text-block__cart-amount').innerHTML = ammount + ' товара';
        } else {
            document.querySelector('.text-block__cart-amount').innerHTML = ammount + ' товаров';
        };
    });
};



// Определение кол-ва товаров в корзине
function cartAmmount() {
    if (JSON.parse(localStorage.getItem('products')) != null) {
        var cartAmmount = JSON.parse(localStorage.getItem('products')),
            cartAmmountLength = cartAmmount.length;
        document.querySelector('.userbar-link__tip.cart span').innerHTML = cartAmmountLength;
        return cartAmmountLength;
    } else {
        return 0;
    };
};
window.addEventListener('load', cartAmmount);



function addToStorage(id, size) {
    if (localStorage.getItem('products')) {
        var productsInfo = JSON.parse(localStorage.getItem('products'));
        productsInfo.push({
            id: id,
            size: size
        });
        console.log(productsInfo);
        localStorage.setItem('products', JSON.stringify(productsInfo));
    } else {
        var productInfo = [
            {
                id: id,
                size: size
            }
        ];
        localStorage.setItem('products', JSON.stringify(productInfo));
    };
};
