// Filter modal adaptive
var filterModal = new Modal({
    el: document.getElementById('static-modal'),
    backdrop: false
});

if (document.querySelector('.filter-item__link') && document.documentElement.clientWidth < 992) {
    var filterModalLinks = document.querySelectorAll('.filter-item__link');
    for (var i = 0; i < filterModalLinks.length; i++) {
        filterModalLinks[i].onclick = function(e) {
            e.preventDefault();
            var filterNode = this.nextElementSibling;
            this.parentNode.removeChild(this.nextElementSibling);
            document.querySelector('.modal-content').appendChild(filterNode);
            filterModal.show();
        };
    };

    filterModal.on('dismiss', function(filterModal, event) {
        var filterModalNode = document.querySelector('.modal-content').firstElementChild;
        var filterItems = document.querySelectorAll('.catalog-filter__item');

        document.querySelector('.modal-content').removeChild(document.querySelector('.modal-content').firstElementChild);
        for (var i = 0; i < filterItems.length; i++) {
            if (filterItems[i].childNodes.length == 4) {
                filterItems[i].appendChild(filterModalNode);
                // filterItems[i].firstElementChild.classList.add('selected');
            }
        };
    });
};
