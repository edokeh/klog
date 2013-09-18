category.animation('sb-enter', function () {
    return {
        setup: function (element) {
            element.addClass('tr-animate-enter');
        },

        start: function (element, done, memo) {
            element.addClass('tr-animate-enter-active');
        }
    };
});