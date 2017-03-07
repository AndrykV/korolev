!function(e){function n(){}function t(e,n){return function(){e.apply(n,arguments)}}function o(e){if("object"!=typeof this)throw new TypeError("Promises must be constructed via new");if("function"!=typeof e)throw new TypeError("not a function");this._state=0,this._handled=!1,this._value=void 0,this._deferreds=[],s(e,this)}function i(e,n){for(;3===e._state;)e=e._value;return 0===e._state?void e._deferreds.push(n):(e._handled=!0,void o._immediateFn(function(){var t=1===e._state?n.onFulfilled:n.onRejected;if(null===t)return void(1===e._state?r:u)(n.promise,e._value);var o;try{o=t(e._value)}catch(i){return void u(n.promise,i)}r(n.promise,o)}))}function r(e,n){try{if(n===e)throw new TypeError("A promise cannot be resolved with itself.");if(n&&("object"==typeof n||"function"==typeof n)){var i=n.then;if(n instanceof o)return e._state=3,e._value=n,void f(e);if("function"==typeof i)return void s(t(i,n),e)}e._state=1,e._value=n,f(e)}catch(r){u(e,r)}}function u(e,n){e._state=2,e._value=n,f(e)}function f(e){2===e._state&&0===e._deferreds.length&&o._immediateFn(function(){e._handled||o._unhandledRejectionFn(e._value)});for(var n=0,t=e._deferreds.length;n<t;n++)i(e,e._deferreds[n]);e._deferreds=null}function c(e,n,t){this.onFulfilled="function"==typeof e?e:null,this.onRejected="function"==typeof n?n:null,this.promise=t}function s(e,n){var t=!1;try{e(function(e){t||(t=!0,r(n,e))},function(e){t||(t=!0,u(n,e))})}catch(o){if(t)return;t=!0,u(n,o)}}var a=setTimeout;o.prototype["catch"]=function(e){return this.then(null,e)},o.prototype.then=function(e,t){var o=new this.constructor(n);return i(this,new c(e,t,o)),o},o.all=function(e){var n=Array.prototype.slice.call(e);return new o(function(e,t){function o(r,u){try{if(u&&("object"==typeof u||"function"==typeof u)){var f=u.then;if("function"==typeof f)return void f.call(u,function(e){o(r,e)},t)}n[r]=u,0===--i&&e(n)}catch(c){t(c)}}if(0===n.length)return e([]);for(var i=n.length,r=0;r<n.length;r++)o(r,n[r])})},o.resolve=function(e){return e&&"object"==typeof e&&e.constructor===o?e:new o(function(n){n(e)})},o.reject=function(e){return new o(function(n,t){t(e)})},o.race=function(e){return new o(function(n,t){for(var o=0,i=e.length;o<i;o++)e[o].then(n,t)})},o._immediateFn="function"==typeof setImmediate&&function(e){setImmediate(e)}||function(e){a(e,0)},o._unhandledRejectionFn=function(e){"undefined"!=typeof console&&console&&console.warn("Possible Unhandled Promise Rejection:",e)},o._setImmediateFn=function(e){o._immediateFn=e},o._setUnhandledRejectionFn=function(e){o._unhandledRejectionFn=e},"undefined"!=typeof module&&module.exports?module.exports=o:e.Promise||(e.Promise=o)}(this);
(function(a){function b(a){var b=[],c=[],d=[],f=Object.is||function(a,b){return a===b?0!==a||1/a==1/b:a!=a&&b!=b},g=function(a){if(a!=a||0===a)for(var b=this.length;b--&&!f(this[b],a););else b=[].indexOf.call(this,a);return b},h=function(b,c){var d=0;return Object.create({},{next:{value:function(){if(d<b.items().length)switch(c){case"keys":return b.keys()[d++];case"values":return b.values()[d++];case"keys+values":return[].slice.call(b.items()[d++]);default:throw new TypeError("Invalid iterator type")}throw new Error("Stop Iteration")}},iterator:{value:function(){return this}},toString:{value:function(){return"[object Map Iterator]"}}})},i=function(a,e){var f=g.call(c,a);f>-1?(b[f][1]=e,d[f]=e):(b.push([a,e]),c.push(a),d.push(e))},j=function(a){if(2!==a.length)throw new TypeError("Invalid iterable passed to Map constructor");i(a[0],a[1])};if(Array.isArray(a))a.forEach(j);else if(void 0!==a)throw new TypeError("Invalid Map");return Object.create(e,{items:{value:function(){return[].slice.call(b)}},keys:{value:function(){return[].slice.call(c)}},values:{value:function(){return[].slice.call(d)}},has:{value:function(a){var b=g.call(c,a);return b>-1}},get:{value:function(a){var b=g.call(c,a);return b>-1?d[b]:void 0}},set:{value:i},size:{get:function(){return b.length}},clear:{value:function(){c.length=d.length=b.length=0}},delete:{value:function(a){var e=g.call(c,a);return e>-1&&(c.splice(e,1),d.splice(e,1),b.splice(e,1),!0)}},forEach:{value:function(a){function b(){try{return c.next()}catch(a){return}}if("function"!=typeof a)throw new TypeError("Invalid callback function given to forEach");for(var c=this.iterator(),d=b(),e=b();void 0!==d;)a.apply(arguments[1],[d[1],d[0],this]),d=e,e=b()}},iterator:{value:function(){return new h(this,"keys+values")}},toString:{value:function(){return"[Object Map]"}}})}var c="undefined"==a,d=c?this:global,a=c?{}:exports,e=b.prototype;b.prototype=e=b(),d.Map=a.Map=d.Map||b}).call(this,typeof exports);

(function(global) {

  global.Korolev = (function() {
    var root = null,
      els = null,
      addHandler = null,
      removeHandler = null,
      scheduledAddHandlerItems = [],
      renderNum = 0,
      rootListeners = [],
      listenFun = null,
      historyHandler = null,
      initialPath = global.location.pathname;

    function scheduleAddHandler(element) {
      if (!addHandler)
        return;
      if (scheduledAddHandlerItems.length == 0) {
        setTimeout(function() {
          scheduledAddHandlerItems.forEach(addHandler);
          scheduledAddHandlerItems.length = 0;
        }, 0);
      }
      scheduledAddHandlerItems.push(element);
    }
    return {
      SetRenderNum: function(n) {
        renderNum = n;
      },
      RegisterRoot: function(rootNode) {
        function aux(prefix, node) {
          var children = node.childNodes;
          for (var i = 0; i < children.length; i++) {
            var child = children[i];
            var id = prefix + '_' + i;
            child.vId = id;
            els[id] = child;
            aux(id, child);
          }
        }
        root = rootNode;
        els = { "0": rootNode };
        aux("0", rootNode);
      },
      CleanRoot: function() {
        while (root.children.length > 0)
          root.removeChild(root.children[0]);
      },
      RegisterGlobalAddHandler: function(f) {
        addHandler = f;
      },
      RegisterGlobalRemoveHandler: function(f) {
        removeHandler = f;
      },
      RegisterGlobalEventHandler: function(eventHandler) {
        listenFun = function(name, preventDefault) {
          var listener = function(event) {
            if (event.target.vId) {
              if (preventDefault) {
                event.preventDefault();
              }
              eventHandler(renderNum + ':' + event.target.vId + ':' + event.type);
            }
          }
          root.addEventListener(name, listener);
          rootListeners.push({ 'listener': listener, 'type': name });
        }
        listenFun('submit', true);
      },
      UnregisterGlobalEventHandler: function() {
        rootListeners.forEach(function(item) {
          root.removeEventListener(item.type, item.listener);
        });
        listenFun = null;
        rootListeners.length = 0;
      },
      ListenEvent: function(type, preventDefault) {
        listenFun(type, preventDefault);
      },
      Create: function(id, childId, tag) {
        var parent = els[id],
          child = els[childId],
          newElement;
        if (!parent) return;
        newElement = document.createElement(tag);
        newElement.vId = childId;
        scheduleAddHandler(newElement);
        if (child && child.parentNode == parent) {
          parent.replaceChild(newElement, child);
        } else {
          parent.appendChild(newElement);
        }
        els[childId] = newElement;
      },
      CreateText: function(id, childId, text) {
        var parent = els[id],
          child = els[childId],
          newElement;
        if (!parent) return;
        newElement = document.createTextNode(text);
        newElement.vId = childId;
        if (child && child.parentNode == parent) {
          parent.replaceChild(newElement, child);
        } else {
          parent.appendChild(newElement);
        }
        els[childId] = newElement;
      },
      Remove: function(id, childId) {
        var parent = els[id],
          child = els[childId];
        if (!parent) return;
        if (child) {
          if (removeHandler) removeHandler(child);
          parent.removeChild(child);
        }
      },
      ExtractProperty: function(id, propertyName) {
        var element = els[id];
        return element[propertyName];
      },
      SetAttr: function(id, name, value, isProperty) {
        var element = els[id];
        if (isProperty) element[name] = value
        else element.setAttribute(name, value);
      },
      RemoveAttr: function(id, name, isProperty) {
        var element = els[id];
        if (isProperty) element[name] = undefined
        else element.removeAttribute(name);
      },
      RegisterHistoryHandler: function(handler) {
        global.addEventListener('popstate', historyHandler = function(event) {
          if (event.state === null) handler(initialPath);
          else handler(event.state);
        });
      },
      UnregisterHistoryHandler: function() {
        if (historyHandler !== null) {
          global.removeEventListener('popstate', historyHandler);
          historyHandler = null;
        }
      },
      ChangePageUrl: function(path) {
        console.log(path);
        if (path !== global.location.pathname)
          global.history.pushState(path, '', path);
      }
    }
  })();

  global.document.addEventListener("DOMContentLoaded", function() {

    var deviceId = getCookie('device');
    var root = global.document.body;
    var loc = global.location;

    global.Korolev.RegisterRoot(root);

    function initializeBridgeWs() {    
      var uri, ws;
      if (loc.protocol === "https:") uri = "wss://";
      else uri = "ws://";
      uri += loc.host + KorolevServerRootPath +
        'bridge/web-socket' +
        '/' + deviceId +
        '/' + KorolevSessionId;
      console.log('Try to open connection to ' + uri + ' using WebSocket');
      ws = new WebSocket(uri);
      ws.addEventListener('open', onOpen);
      Bridge.webSocket(ws).catch(function(errorEvent) {
        // Try to reconnect after 2s
        setTimeout(initializeBridgeLongPolling, 1);
      });
    }

    function initializeBridgeLongPolling() {
      var uriPrefix = loc.protocol + "//" + loc.host + KorolevServerRootPath +
        'bridge/long-polling' +
        '/' + deviceId +
        '/' + KorolevSessionId +
        '/';

      console.log('Try to open connection to ' + uriPrefix + ' using long polling');

      function lpSubscribe(target, firstTime) {
        var request = new XMLHttpRequest();
        request.addEventListener('readystatechange', function() {
          if (request.readyState === 4) {
            switch (request.status) {
              case 200:
                if (firstTime) {
                  var event = new Event('open');
                  target.dispatchEvent(event);
                }
                var event = new MessageEvent('message', {
                  'data': request.responseText
                });
                target.dispatchEvent(event);
                break;
              case 410:
                var event = new Close('close');
                target.dispatchEvent(event);
                break;
              case 400:
                var event = new ErrorEvent('error', {
                  error: new Error(request.responseText),
                  message: request.responseText
                });
                target.dispatchEvent(event);
                break;
            }
            lpSubscribe(target);
          }
        });
        request.open('GET', uriPrefix + 'subscribe', true);
        request.send(null);
      }

      function lpPublish(target, message) {
        var request = new XMLHttpRequest();
        request.addEventListener('readystatechange', function() {
          if (request.readyState === 4) {
            switch (request.status) {
              case 400:
                var event = new ErrorEvent('error', {
                  error: new Error(request.responseText),
                  message: request.responseText,
                });
                target.dispatchEvent(event);
                break;
            }
          }
        });
        request.open('POST', uriPrefix + 'publish', true);
        request.setRequestHeader("Content-Type", "application/json");
        request.send(message);
      }

      var fakeWs = global.document.createDocumentFragment()
      fakeWs.send = function(message) {
        lpPublish(fakeWs, message);
      }
      fakeWs.addEventListener('open', onOpen);
      Bridge.webSocket(fakeWs).catch(function(errorEvent) {
        // Try to reconnect after 2s
        setTimeout(initializeBridgeWs, 2000);
      });
      lpSubscribe(fakeWs, true);
    }

    function onOpen(event) {
      console.log("Connection opened.");
      event.target.addEventListener('close', onClose);
    }

    function onClose(event) {
      Korolev.UnregisterGlobalEventHandler();
      Korolev.UnregisterHistoryHandler();
      console.log("Connection closed. Global event handler us unregistered. Try to reconnect.");
      initializeBridgeWs();
    }

    initializeBridgeWs();
  });

  function getCookie(name) {
    var matches = document.cookie.match(new RegExp(
      "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ));
    return matches ? decodeURIComponent(matches[1]) : undefined;
  }
})(this);
