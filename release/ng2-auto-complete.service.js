"use strict";
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
require('rxjs/Rx');
/**
 * provides auto-complete related utility functions
 */
var Ng2AutoComplete = (function () {
    function Ng2AutoComplete(http) {
        this.http = http;
        // ...
    }
    Ng2AutoComplete.prototype.filter = function (list, keyword) {
        return list.filter(function (el) {
            return !!JSON.stringify(el).match(new RegExp(keyword, 'i'));
        });
    };
    /**
     * return remote data from the given source and options, and data path
     */
    Ng2AutoComplete.prototype.getRemoteData = function (options) {
        var _this = this;
        var keyValues = [];
        var url = "";
        for (var key in options) {
            var regexp = new RegExp(':' + key, 'g');
            url = this.source;
            if (url.match(regexp)) {
                url = url.replace(regexp, options[key]);
            }
            else {
                keyValues.push(key + "=" + options[key]);
            }
        }
        if (keyValues.length) {
            var qs = keyValues.join("&");
            url += url.match(/\?[a-z]/i) ? qs : ('?' + qs);
        }
        return this.http.get(url)
            .map(function (resp) { return resp.json(); })
            .map(function (resp) {
            var list = resp.data || resp;
            if (_this.pathToData) {
                var paths = _this.pathToData.split('.');
                paths.forEach(function (el) {
                    list = list[el];
                });
            }
            return list;
        });
    };
    ;
    Ng2AutoComplete = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], Ng2AutoComplete);
    return Ng2AutoComplete;
}());
exports.Ng2AutoComplete = Ng2AutoComplete;
//# sourceMappingURL=ng2-auto-complete.service.js.map