angular.module('common').directive({

    // 元素可以被 Drop
    'dropable': [function() {
        return {
            restrict: 'CA',
            scope: {
                dragEnter: '&',
                dragLeave: '&',
                dragHover: '&',
                dragOver: '&',
                drop: '&'
            },
            link: function(scope, element, attrs) {
                var dragged = 0;
                var dragEnterFn = scope.dragEnter || angular.noop;
                var dragLeaveFn = scope.dragLeave || angular.noop;
                var dragOverFn = scope.dragOver || angular.noop;
                var dragHoverFn = scope.dragHover || angular.noop;
                var dropFn = scope.drop || angular.noop;

                element.bind('dragenter', function(e) {
                    dragged++;
                    scope.$apply(function() {
                        dragEnterFn({$event: e});
                        dragHoverFn({$event: e});
                    });
                });

                element.bind('dragleave', function(e) {
                    dragged--;
                    if (!dragged) {
                        scope.$apply(function() {
                            dragLeaveFn({$event: e});
                            dragHoverFn({$event: e});
                        });
                    }
                });
                element.bind('dragover', function(e) {
                    scope.$apply(function() {
                        dragOverFn({$event: e});
                    });
                });
                element.bind('drop', function(e) {
                    scope.$apply(function() {
                        dropFn({$event: e});
                        dragLeaveFn({$event: e});
                        dragHoverFn({$event: e});
                    });
                });
            }
        };
    }]
});