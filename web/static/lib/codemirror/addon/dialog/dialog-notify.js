// CodeMirror, copyright (c) by Marijn Haverbeke and others
// Distributed under an MIT license: http://codemirror.net/LICENSE

// Open simple notification dialogs on top of an editor. Relies on dialog.css.

(function (mod) {
    if (typeof exports === 'object' && typeof module == 'object') {//CMD
        mod(require("../../codemirror"));
    } else if (typeof define === 'function' && define.amd) {//AMD
        define(['../../codemirror'], mod);
    } else {//Browser
        mod(CodeMirror);
    }
})(function (CodeMirror) {

    function createDialog(template, options) {
        var dialog = document.createElement("div");
        var animation = options.animation || 'fade';
        var bottom = options.bottom;
        var className = !!bottom ? "CodeMirror-dialog CodeMirror-dialog-bottom" : "CodeMirror-dialog CodeMirror-dialog-top";
        dialog.className = [className, animation].join(' ');
        dialog.innerHTML = template;
        return dialog;
    }

    function closeNotification(cm, newVal) {
        if (cm.state.currentNotificationClose)
            cm.state.currentNotificationClose();
        cm.state.currentNotificationClose = newVal;
    }

    /*
     * notify
     * Opens a notification, that can be closed with an optional timer
     * (default 3000ms timer) and always closes on click.
     *
     * If a notification is opened while another is opened, it will close the
     * currently opened one and open the new one immediately.
     */
    CodeMirror.defineExtension('notify', function (template, options) {
        closeNotification(this, close);
        var wrap = this.getWrapperElement();
        var dialog = createDialog(template, options);
        var closed = false, doneTimer;
        var duration = options && typeof options.duration !== "undefined" ? options.duration : 3000;

        function close() {
            if (closed) return;
            closed = true;
            dialog.className = dialog.className.replace(/(\sin|in\s)/g, '');
            clearTimeout(doneTimer);
            setTimeout(function () {
                dialog.parentNode.removeChild(dialog);
            }, 800);
        }

        CodeMirror.on(dialog, 'click', function (e) {
            CodeMirror.e_preventDefault(e);
            close();
        });

        wrap.appendChild(dialog);
        setTimeout(function () {
            dialog.className = [dialog.className, 'in'].join(' ');
        }, 1);

        if (duration)
            doneTimer = setTimeout(close, duration);

        return close;
    });
});
