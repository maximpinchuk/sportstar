if (document.querySelector('.product-ammount__control')) {
    productsCost();
    productsAmmount();

    var minusBtn = document.querySelectorAll('.product-ammount__btn.minus'),
        plusBtn = document.querySelectorAll('.product-ammount__btn.plus');
        control = document.querySelectorAll('.product-ammount__control');


    for (var i = 0; i < minusBtn.length; i++) {
        minusBtn[i].onclick = function(e) {
            e.preventDefault();
            productAmmount = Number(this.nextElementSibling.value);
            if (productAmmount > 1) {
                productAmmount--;
            };
            this.nextElementSibling.value = String(productAmmount);
            productsCost();
        };
    }

    for (var i = 0; i < plusBtn.length; i++) {
        plusBtn[i].onclick = function(e) {
            e.preventDefault();
            productAmmount = Number(this.previousElementSibling.value);
            productAmmount++;
            this.previousElementSibling.value = String(productAmmount);
            productsCost();
        };
    };

    for (var i = 0; i < control.length; i++) {
        control[i].onchange = productsCost;
    };


    // Удаление товаров из корзины
    var removeLinks = document.querySelectorAll('.product-remove__link');
    for (var i = 0; i < removeLinks.length; i++) {
        removeLinks[i].onclick = removeProduct;
    };
};



// Удаление товара из корзины
function removeProduct(e) {
    e.preventDefault();
    this.parentElement.parentElement.parentElement.parentElement.removeChild(this.parentElement.parentElement.parentElement);
    productsAmmount();
    productsCost();
};



// Подсчет кол-ва товаров в корзине
function productsAmmount() {
    var ammount = document.querySelectorAll('.cart-product-col').length;
    if (ammount == 1 || ammount == 21) {
        document.querySelector('.products-ammount').innerHTML = ammount + ' товар';
    } else if (ammount == 2 || ammount == 3 || ammount == 4) {
        document.querySelector('.products-ammount').innerHTML = ammount + ' товара';
    } else {
        document.querySelector('.products-ammount').innerHTML = ammount + ' товаров';
    };
};



// Подсчет суммы заказа
function productsCost() {
    var products = document.querySelectorAll('.cart-product-col');

    var totalCost = 0;
    for (var i = 0; i < products.length; i++) {
        var productPrice = products[i].querySelector('.product-info__price').getAttribute('data-price') * products[i].querySelector('.product-ammount__control').value;
        totalCost = totalCost + productPrice;
    };
    totalCost = totalCost.toFixed(2);
    document.querySelector('.all-products-cost').innerHTML = totalCost;
    document.querySelector('.all-products-cost-control').value = totalCost;

    document.querySelector('.order-total-cost').innerHTML = document.querySelector('.all-products-cost-control').value + document.querySelector('.delivery-cost-control').value;
    document.querySelector('.order-total-cost-control').value = document.querySelector('.all-products-cost-control').value + document.querySelector('.delivery-cost-control').value;
};
