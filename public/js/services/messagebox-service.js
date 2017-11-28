(function () {
  "use strict";
  angular.module('mufcg')
    .service('messagebox', function () {
      const successModal = function (message, title, callback) {
        defaultModal(getCustomTitle(title || "Sucesso", 'white', true), message, 'small', getButton('ok', 'OK', 'btn-success'), false, "success-modal");
      };

      const failModal = function (message, title, callback) {
        defaultModal(getCustomTitle(title || "Falha de autenticação", 'white', true), message, 'small', getButton('ok', 'OK', 'btn-danger'), false, "danger-modal");
      };

      const defaultModal = function (title, message, size, buttons, closeButton, customClass, callback) {
        bootbox.dialog({
          title: title,
          message: message,
          size: size || "small",
          buttons: buttons || {},
          closeButton: closeButton,
          className: customClass || "",
          callback: callback || function () { }
        });
      };

      function getButton(name, label, className, callback) {
        var buttons = {};

        buttons[name] = {
          label: label,
          className: className,
          callback: callback || function () { }
        };

        return buttons;
      }

      function getCustomTitle(text, color, bold) {
        return "<div style='color: " + color +
          (bold ? "; font-weight : bold'>" : "'>") +
          text + "</div>";
      }

      return {
        success: successModal,
        fail: failModal,
        custom: defaultModal
      };
    });
})();