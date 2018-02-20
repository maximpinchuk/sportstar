if (document.querySelector('.form-control')) {
    function focusInput() {
        var formControls = document.querySelectorAll('.form-control');
        for (var i = 0; i < formControls.length; i++) {
            if (formControls[i].value != '') {
                formControls[i].classList.add('on-blur');
            };
            formControls[i].onfocus = function() {
                this.classList.add('on-blur');
            };
            formControls[i].onblur = function() {
                if (this.value == '') {
                    this.classList.remove('on-blur');
                };
            };
        };
    };
    window.addEventListener('load', focusInput);
};
