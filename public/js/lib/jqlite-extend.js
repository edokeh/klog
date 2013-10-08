(function () {
    angular.element.prototype.offset = function () {
        var docElem, win,
            box = { top: 0, left: 0 },
            elem = this[ 0 ],
            doc = elem && elem.ownerDocument;

        if (!doc) {
            return;
        }

        docElem = doc.documentElement;

        // Make sure it's not a disconnected DOM node
        //    if (!jQuery.contains(docElem, elem)) {
        //        return box;
        //    }

        // If we don't have gBCR, just use 0,0 rather than error
        // BlackBerry 5, iOS 3 (original iPhone)
        if (typeof elem.getBoundingClientRect !== 'undefined') {
            box = elem.getBoundingClientRect();
        }
        win = getWindow(doc);
        return {
            top: box.top + ( win.pageYOffset || docElem.scrollTop ) - ( docElem.clientTop || 0 ),
            left: box.left + ( win.pageXOffset || docElem.scrollLeft ) - ( docElem.clientLeft || 0 )
        };
    };

    angular.element.prototype.offsetParent = function () {
        var offsetParent = this[0].offsetParent || document.documentElement;
        while (offsetParent && getCss(offsetParent, "position") === "static") {
            offsetParent = offsetParent.offsetParent;
        }
        return angular.element(offsetParent || document.documentElement);
    };

    angular.element.prototype.position = function () {
        if (!this[ 0 ]) {
            return;
        }

        var offsetParent, offset,
            parentOffset = { top: 0, left: 0 },
            elem = this[0];

        // fixed elements are offset from window (parentOffset = {top:0, left: 0}, because it is it's only offset parent
        if (getCss(this[0], "position") === "fixed") {
            // we assume that getBoundingClientRect is available when computed position is fixed
            offset = elem.getBoundingClientRect();
        } else {
            // Get *real* offsetParent
            offsetParent = this.offsetParent();

            // Get correct offsets
            offset = this.offset();
            if (offsetParent[0].nodeName.toLowerCase() !== "html") {
                parentOffset = offsetParent.offset();
            }

            // Add offsetParent borders
            parentOffset.top += parseInt(getCss(offsetParent[0], "borderTopWidth"), 10);
            parentOffset.left += parseInt(getCss(offsetParent[0], "borderLeftWidth"), 10);
        }

        // Subtract parent offsets and element margins
        // note: when an element has margin: auto the offsetLeft and marginLeft
        // are the same in Safari causing offset.left to incorrectly be 0
        return {
            top: offset.top - parentOffset.top - this.css("marginTop"),
            left: offset.left - parentOffset.left - this.css("marginLeft")
        };
    };


    function getWindow(elem) {
        return elem.nodeType === 9 ?
            elem.defaultView || elem.parentWindow :
            false;
    }

    function getCss(elem, name) {
        return (window.getComputedStyle ? window.getComputedStyle(elem)[name] : elem.currentStyle[name] ) || '';
    }
})();