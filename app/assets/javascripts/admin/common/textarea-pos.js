/**
 * 获取textarea光标位置
 */
define(function (require) {
    return {
        get: function (textarea) {
            var rangeData = {text: "", start: 0, end: 0 };
            if (textarea.setSelectionRange) { // W3C
                rangeData.start = textarea.selectionStart;
                rangeData.end = textarea.selectionEnd;
                rangeData.text = (rangeData.start != rangeData.end) ? textarea.value.substring(rangeData.start, rangeData.end) : "";
            } else if (document.selection) { // IE
                var i,
                    oS = document.selection.createRange(),
                // Don't: oR = textarea.createTextRange()
                    oR = document.body.createTextRange();
                oR.moveToElementText(textarea);

                rangeData.text = oS.text;
                rangeData.bookmark = oS.getBookmark();

                // object.moveStart(sUnit [, iCount])
                // Return Value: Integer that returns the number of units moved.
                for (i = 0; oR.compareEndPoints('StartToStart', oS) < 0 && oS.moveStart("character", -1) !== 0; i++) {
                    // Why? You can alert(textarea.value.length)
                    if (textarea.value.charAt(i) == '\r') {
                        i++;
                    }
                }
                rangeData.start = i;
                rangeData.end = rangeData.text.length + rangeData.start;
            }

            return rangeData;
        },

        // 设置光标位置
        set: function (textarea, rangeData) {
            var oR, start, end;
            textarea.focus();
            if (textarea.setSelectionRange) { // W3C
                textarea.setSelectionRange(rangeData.start, rangeData.end);
            } else if (textarea.createTextRange) { // IE
                oR = textarea.createTextRange();

                // Fixbug : ues moveToBookmark()
                // In IE, if cursor position at the end of textarea, the set function don't work
                if (textarea.value.length === rangeData.start) {
                    oR.collapse(false);
                    oR.select();
                } else {
                    oR.moveToBookmark(rangeData.bookmark);
                    oR.select();
                }
            }
        },

        // 根据光标位置插入文本，选中的文字会被替换掉
        insertText: function (textarea, rangeData, text) {
            var oValue, nValue, oR, sR, nStart, nEnd, st;
            this.set(textarea, rangeData);

            if (textarea.setSelectionRange) { // W3C
                oValue = textarea.value;
                nValue = oValue.substring(0, rangeData.start) + text + oValue.substring(rangeData.end);
                nStart = nEnd = rangeData.start + text.length;
                st = textarea.scrollTop;
                textarea.value = nValue;
                // Fixbug:
                // After textarea.values = nValue, scrollTop value to 0
                if (textarea.scrollTop != st) {
                    textarea.scrollTop = st;
                }
                textarea.setSelectionRange(nStart, nEnd);
            } else if (textarea.createTextRange) { // IE
                sR = document.selection.createRange();
                sR.text = text;
                sR.setEndPoint('StartToEnd', sR);
                sR.select();
            }
        },

        // 将光标定位到textarea，对于IE不使用focus，而是使用光标定位，所以不会造成窗口抢焦点
        focus: function (textarea) {
            if (textarea.setSelectionRange) {
                textarea.focus();
                textarea.setSelectionRange(0, 0);
            }
            else if (textarea.createTextRange) {
                var range = textarea.createTextRange();
                range.collapse(true);
                range.moveEnd('character', 0);
                range.moveStart('character', 0);
                range.select();
            }
        }

    }
});