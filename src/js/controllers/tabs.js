// Tabs
(function() {
    function onTabClick(event) {
        event.preventDefault();

        var activesLinks = event.target.parentElement.parentElement.querySelectorAll('.active');
        for (var i = 0; i < activesLinks.length; i++) {
            activesLinks[i].className = activesLinks[i].className.replace('active', '');
        };

        var activesTabs = event.target.parentElement.parentElement.nextElementSibling.querySelectorAll('.active');
        for (var i = 0; i < activesTabs.length; i++) {
            activesTabs[i].className = activesTabs[i].className.replace('active', '');
        };

        event.target.parentElement.className += ' active';
        document.getElementById(event.target.href.split('#')[1]).className += ' active';
    };
    var el = document.querySelectorAll('.tabs-nav');
    for (var i = 0; i < el.length; i++) {
        el[i].addEventListener('click', onTabClick);
    };
})();
