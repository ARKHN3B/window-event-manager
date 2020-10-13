"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var WindowEventManager = function () {
  function WindowEventManager() {
    var debug = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

    _classCallCheck(this, WindowEventManager);

    this._listeners = new Map();
    this.debug = debug;
  }

  _createClass(WindowEventManager, [{
    key: "getListenerDetailsByType",
    value: function getListenerDetailsByType(type) {
      return this._listeners.get(type);
    }
  }, {
    key: "addEventListener",
    value: function addEventListener() {
      var target = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : window;
      var type = arguments[1];
      var listener = arguments[2];

      var details = [{ target: target, listener: listener }];
      if (this._listeners.size) {
        var currentListenerDetailsForType = this.getListenerDetailsByType(type);
        if (Array.isArray(currentListenerDetailsForType) && currentListenerDetailsForType.length) {
          details = [].concat(_toConsumableArray(details), _toConsumableArray(currentListenerDetailsForType));
        }
      }
      this._listeners.set(type, details);
      target.addEventListener(type, listener);

      if (this.debug) console.debug("The event listener for the type: " + type + " has been added for the target: " + target);
    }
  }, {
    key: "removeEventListenersByType",
    value: function removeEventListenersByType(type) {
      var basicCheckProcess = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

      if (basicCheckProcess && !this._listeners.size) {
        console.warn("No listener saved");
        return;
      }

      var currentListenerDetailsForType = this.getListenerDetailsByType(type);

      if (!Array.isArray(currentListenerDetailsForType) || !currentListenerDetailsForType.length) {
        console.warn("No listener saved for the type " + type);
        return;
      }

      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = currentListenerDetailsForType[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var _ref = _step.value;
          var target = _ref.target;
          var listener = _ref.listener;

          target.removeEventListener(type, listener);
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      this._listeners.delete(type);

      if (this.debug) console.debug("All listeners for the type " + type + " has been removed");
    }
  }, {
    key: "removeEventListenersByTypes",
    value: function removeEventListenersByTypes() {
      var types = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

      if (!this._listeners.size) {
        console.warn("No listener saved");
        return;
      }

      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        for (var _iterator2 = types[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          var type = _step2.value;

          this.removeEventListenersByType(type, false);
        }
      } catch (err) {
        _didIteratorError2 = true;
        _iteratorError2 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion2 && _iterator2.return) {
            _iterator2.return();
          }
        } finally {
          if (_didIteratorError2) {
            throw _iteratorError2;
          }
        }
      }

      if (this.debug) console.debug("All listeners for the following types: " + JSON.stringify(types) + " has been removed");
    }
  }, {
    key: "removeEventListenersByTarget",
    value: function removeEventListenersByTarget(target) {
      var _this = this;

      var basicCheckProcess = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

      if (basicCheckProcess && !this._listeners.size) {
        console.warn("No listener saved");
        return;
      }

      var _loop = function _loop(type) {
        var details = _this.getListenerDetailsByType(type);
        var updatedDetails = [];
        details.forEach(function (value) {
          if (value.target === target) {
            value.target.removeEventListener(type, value.listener);
          } else {
            updatedDetails.push(value);
          }
        });
        if (updatedDetails.length) _this._listeners.set(type, updatedDetails);
      };

      var _iteratorNormalCompletion3 = true;
      var _didIteratorError3 = false;
      var _iteratorError3 = undefined;

      try {
        for (var _iterator3 = this._listeners.keys()[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
          var type = _step3.value;

          _loop(type);
        }
      } catch (err) {
        _didIteratorError3 = true;
        _iteratorError3 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion3 && _iterator3.return) {
            _iterator3.return();
          }
        } finally {
          if (_didIteratorError3) {
            throw _iteratorError3;
          }
        }
      }
    }
  }, {
    key: "removeEventListenersByTargets",
    value: function removeEventListenersByTargets() {
      var targets = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

      if (!this._listeners.size) {
        console.warn("No listener saved");
        return;
      }

      var _iteratorNormalCompletion4 = true;
      var _didIteratorError4 = false;
      var _iteratorError4 = undefined;

      try {
        for (var _iterator4 = targets[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
          var target = _step4.value;

          this.removeEventListenersByTarget(target, false);
        }
      } catch (err) {
        _didIteratorError4 = true;
        _iteratorError4 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion4 && _iterator4.return) {
            _iterator4.return();
          }
        } finally {
          if (_didIteratorError4) {
            throw _iteratorError4;
          }
        }
      }

      if (this.debug) console.debug("All listeners for the following targets: " + JSON.stringify(targets) + " has been removed");
    }
  }]);

  return WindowEventManager;
}();

module.exports.WindowEventManager = new WindowEventManager();