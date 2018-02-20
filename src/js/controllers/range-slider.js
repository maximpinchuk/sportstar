/*
 * noUiSlider init
 */
// (function() {
    if (document.getElementById('range-slider')) {
        var slider = document.getElementById('range-slider');

        var priceLimits = {
            min: Number(slider.getAttribute('data-price-min')),
            max: Number(slider.getAttribute('data-price-max'))
        };

        noUiSlider.create(slider, {
         	connect: true,
            start: [priceLimits.min, priceLimits.max],
            range: {
         		'min': priceLimits.min,
         		'max': priceLimits.max
         	},
            step: 5
        });

        var controlMin = document.querySelector('.control-min'),
            controlMax = document.querySelector('.control-max');

        slider.noUiSlider.on('slide', function(values) {
            controlMin.value = Number(values[0]).toFixed(0);
            controlMax.value = Number(values[1]).toFixed(0);
        });

        /*
         * В эти два события нужно вписать сортировку по цене
         */
        controlMin.onchange = function() {
            slider.noUiSlider.set([controlMin.value, controlMax.value]);
        };
        controlMax.onchange = function() {
            if (controlMax.value < controlMin.value) {
                controlMax.value = controlMin.value;
                slider.noUiSlider.set([controlMin.value, controlMin.value]);
            } else {
                slider.noUiSlider.set([controlMin.value, controlMax.value]);
            };
        };
    };
// })();
