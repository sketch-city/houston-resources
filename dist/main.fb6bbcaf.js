// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

// eslint-disable-next-line no-global-assign
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  return newRequire;
})({"js/constants.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.attributeSettings = exports.categories = exports.searchURL = void 0;
var searchURL = '//need-hou-api.herokuapp.com/api/programs';
exports.searchURL = searchURL;
var categories = [{
  name: 'Food',
  description: 'Find help for your food needs such as food pantries, food stamps, and nutrition education'
}, {
  name: 'Family',
  description: 'blajblkajlksj dlkajsdflk askl'
}, {
  name: 'Health',
  description: 'blajblkajlksj dlkajsdflk askl'
}, {
  name: 'Housing',
  description: 'blajblkajlksj dlkajsdflk askl'
}, {
  name: 'Education',
  description: ''
}, {
  name: 'Legal',
  description: ''
}, {
  name: 'Employment',
  description: ''
}, {
  name: 'Money',
  description: ''
}];
exports.categories = categories;
var attributeSettings = {
  agency_id: {
    groups: []
  },
  id: {
    label: 'Service ID',
    groups: []
  },
  name: {
    label: 'Service Name',
    groups: ['summary', 'listing'],
    order: [0, 0]
  },
  description: {
    groups: ['summary', 'listing'],
    order: [2, 2]
  },
  physical_address: {
    label: 'Address',
    groups: ['summary', 'listing', 'contact']
  },
  ada: {
    label: 'ADA Compliant',
    groups: ['about', 'services-provided', 'filterable-toggle']
  },
  application_process: {
    groups: ['about']
  },
  documents_required: {
    groups: ['requirements', 'about']
  },
  fee_structure: {
    groups: ['about']
  },
  coverage_area: {
    groups: ['about']
  },
  service_type: {
    groups: ['services-provided', 'icon']
  },
  last_updated: {
    groups: ['details']
  },
  alternative_name: {
    groups: []
  },
  website: {
    groups: ['contact'],
    label: 'Learn more about the service'
  },
  appointment_required: {
    groups: ['requirements', 'about'],
    order: [1, 1]
  },
  accepting_clients: {
    groups: ['summary', 'filterable-toggle'],
    order: [0, 0]
  },
  transportation: {
    label: 'Provides Transportation',
    groups: ['services-provided', 'filterable-toggle']
  },
  latitude: {
    groups: ['location']
  },
  longitude: {
    groups: ['location']
  },
  holiday_schedule: {
    groups: ['schedule']
  },
  service_area: {
    groups: []
  },
  next_steps: {
    groups: ['summary']
  },
  waitlist_wait: {
    groups: ['about']
  },
  other_program_enrollment: {
    groups: ['about']
  },
  other_eligibility: {
    groups: ['elgibility'],
    order: [4]
  },
  id_accepted_notes: {
    groups: ['id-details', 'about'],
    order: [2]
  },
  proof_address: {
    label: 'Proof of Address',
    groups: ['requirements', 'about']
  },
  appointment_required_notes: {
    groups: ['requirements', 'about']
  },
  service_available_intake: {
    groups: ['service-intake-details', 'about']
  },
  service_available_intake_notes: {
    groups: ['service-intake-details', 'about']
  },
  schedule_notes: {
    groups: ['schedule']
  },
  document_assistance: {
    groups: ['about', 'services-offered']
  },
  visual_aids_offered: {
    groups: ['about', 'services-offered']
  },
  consultation_opportunity: {
    groups: ['about', 'services-offered']
  },
  enforcement_request_policy: {
    groups: ['policy']
  },
  cultural_competency_offered: {
    groups: ['about', 'services-offered']
  },
  zipcode_eligibility: {
    groups: ['elgibility'],
    order: [0]
  },
  age_eligibility: {
    groups: ['elgibility'],
    order: [1]
  },
  id_accepted_current: {
    groups: ['id-details', 'about']
  },
  website_languages: {
    groups: ['language-support'],
    label: 'Website'
  },
  frontline_languages: {
    groups: ['language-support'],
    label: 'Frontline'
  },
  interpretation_offered: {
    groups: ['language-support'],
    label: 'Interpretation'
  },
  crisis_services_offered: {
    groups: ['about', 'services-offered']
  },
  document_languages: {
    groups: ['language-support'],
    label: 'Document'
  },
  immigration_status: {
    groups: ['policy']
  },
  income_eligibility: {
    groups: ['elgibility'],
    order: [2]
  },
  id_accepted_expired: {
    groups: ['id-details', 'about']
  },
  gender_eligibility: {
    groups: ['elgibility'],
    order: [3]
  },
  schedule: {
    groups: ['schedule'],
    label: ['Program/Service Hours']
  },
  service_cost: {
    groups: ['summary']
  },
  source: {
    label: 'A2S Verified',
    groups: ['filterable-toggle']
  },
  agency_name: {
    groups: ['summary', 'listing'],
    label: 'Who is providing this help?',
    order: [1, 1]
  },
  agency_website: {
    groups: ['summary', 'listing'],
    label: 'Learn more about this group.'
  },
  agency_phone: {
    groups: ['listing', 'contact'],
    label: 'Phone Numbers',
    order: [3]
  },
  language_arr: {
    groups: ['language-support'],
    label: 'General'
  }
};
exports.attributeSettings = attributeSettings;
},{}],"js/main.js":[function(require,module,exports) {
"use strict";

var _constants = require("./constants");
},{"./constants":"js/constants.js"}],"node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "38203" + '/');

  ws.onmessage = function (event) {
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      console.clear();
      data.assets.forEach(function (asset) {
        hmrApply(global.parcelRequire, asset);
      });
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          hmrAccept(global.parcelRequire, asset.id);
        }
      });
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAccept(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAccept(bundle.parent, id);
  }

  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAccept(global.parcelRequire, id);
  });
}
},{}]},{},["node_modules/parcel-bundler/src/builtins/hmr-runtime.js","js/main.js"], null)
//# sourceMappingURL=/main.fb6bbcaf.map