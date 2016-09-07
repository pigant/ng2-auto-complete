/**
 * ng2-auto-complete v0.5.5 (https://github.com/ng2-ui/ng2-auto-complete#readme)
 * Angular2 Input Autocomplete
 * Copyright 2016
 * Licensed under MIT
 */
(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/forms'), require('@angular/platform-browser'), require('rxjs/Subject'), require('@angular/http'), require('rxjs/Rx')) :
    typeof define === 'function' && define.amd ? define('ng2-auto-complete', ['exports', '@angular/core', '@angular/forms', '@angular/platform-browser', 'rxjs/Subject', '@angular/http', 'rxjs/Rx'], factory) :
    (factory((global.ng2-auto-complete = global.ng2-auto-complete || {}),global.ng.core,global.ng2.forms,global.ng.platformBrowser,global.Rx,global.ng2.http,global.Rx));
}(this, (function (exports,_angular_core,_angular_forms,_angular_platformBrowser,rxjs_Subject,_angular_http,rxjs_Rx) { 'use strict';

function __decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}

function __metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}

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
        _angular_core.Injectable(), 
        __metadata('design:paramtypes', [(typeof (_a = typeof _angular_http.Http !== 'undefined' && _angular_http.Http) === 'function' && _a) || Object])
    ], Ng2AutoComplete);
    return Ng2AutoComplete;
    var _a;
}());

// just to pass type check
/**
 * show a selected date in monthly calendar
 * Each filteredList item has the following property in addition to data itself
 *   1. displayValue as string e.g. Allen Kim
 *   2. dataValue as any e.g. 1234
 */
var Ng2AutoCompleteComponent = (function () {
    /**
     * constructor
     */
    function Ng2AutoCompleteComponent(elementRef, autoComplete) {
        this.autoComplete = autoComplete;
        this.minChars = 0;
        this.valuePropertyName = 'id';
        this.displayPropertyName = 'value';
        this.dropdownVisible = false;
        this.isLoading = false;
        this.filteredList = [];
        this.itemIndex = 0;
        this.valueSelected = new rxjs_Subject.Subject();
        this.delay = (function () {
            var timer = 0;
            return function (callback, ms) {
                clearTimeout(timer);
                timer = setTimeout(callback, ms);
            };
        })();
        this.el = elementRef.nativeElement;
    }
    /**
     * user enters into input el, shows list to select, then select one
     */
    Ng2AutoCompleteComponent.prototype.ngOnInit = function () {
        this.inputEl = (this.el.querySelector('input'));
        this.autoComplete.source = this.source;
        this.autoComplete.pathToData = this.pathToData;
    };
    Ng2AutoCompleteComponent.prototype.reloadListInDelay = function () {
        var _this = this;
        var delayMs = this.source.constructor.name == 'Array' ? 10 : 500;
        //executing after user stopped typing
        this.delay(function () { return _this.reloadList(); }, delayMs);
    };
    Ng2AutoCompleteComponent.prototype.showDropdownList = function () {
        this.keyword = '';
        this.inputEl.focus();
        this.reloadList();
    };
    Ng2AutoCompleteComponent.prototype.hideDropdownList = function () {
        this.dropdownVisible = false;
    };
    Ng2AutoCompleteComponent.prototype.reloadList = function () {
        var _this = this;
        var keyword = this.inputEl.value;
        this.hideDropdownList();
        if (this.source.constructor.name == 'Array') {
            this.filteredList =
                this.autoComplete.filter(this.source, this.keyword);
            this.dropdownVisible = true;
        }
        else {
            if (keyword.length >= this.minChars) {
                this.dropdownVisible = true;
                this.isLoading = true;
                var query = { keyword: keyword };
                this.autoComplete.getRemoteData(query)
                    .subscribe(function (resp) {
                    _this.filteredList = resp;
                }, function (error) { return null; }, function () { return _this.isLoading = false; } //complete
                );
            }
        }
    };
    Ng2AutoCompleteComponent.prototype.selectOne = function (data) {
        this.hideDropdownList();
        this.valueSelected.next(data);
    };
    ;
    Ng2AutoCompleteComponent.prototype.inputElKeyHandler = function (evt) {
        var totalNumItem = this.filteredList.length;
        switch (evt.keyCode) {
            case 27:
                this.hideDropdownList();
                break;
            case 38:
                this.itemIndex = (totalNumItem + this.itemIndex - 1) % totalNumItem;
                break;
            case 40:
                this.dropdownVisible = true;
                this.itemIndex = (totalNumItem + this.itemIndex + 1) % totalNumItem;
                break;
            case 13:
                if (this.filteredList.length > 0) {
                    this.selectOne(this.filteredList[this.itemIndex]);
                }
                evt.preventDefault();
                break;
        }
    };
    ;
    Ng2AutoCompleteComponent.prototype.getFormattedList = function (data) {
        var formatter = this.listFormatter || this.defaultListFormatter;
        return formatter.apply(this, [data]);
    };
    Ng2AutoCompleteComponent.prototype.defaultListFormatter = function (data) {
        var html = "";
        html += data[this.valuePropertyName] ? "<b>(" + data[this.valuePropertyName] + ")</b>" : "";
        html += data[this.displayPropertyName] ? "<span>" + data[this.displayPropertyName] + "</span>" : data;
        return html;
    };
    __decorate([
        _angular_core.Input('list-formatter'), 
        __metadata('design:type', Function)
    ], Ng2AutoCompleteComponent.prototype, "listFormatter", void 0);
    __decorate([
        _angular_core.Input('source'), 
        __metadata('design:type', Object)
    ], Ng2AutoCompleteComponent.prototype, "source", void 0);
    __decorate([
        _angular_core.Input('path-to-data'), 
        __metadata('design:type', String)
    ], Ng2AutoCompleteComponent.prototype, "pathToData", void 0);
    __decorate([
        _angular_core.Input('min-chars'), 
        __metadata('design:type', Number)
    ], Ng2AutoCompleteComponent.prototype, "minChars", void 0);
    __decorate([
        _angular_core.Input('value-property-name'), 
        __metadata('design:type', String)
    ], Ng2AutoCompleteComponent.prototype, "valuePropertyName", void 0);
    __decorate([
        _angular_core.Input('display-property-name'), 
        __metadata('design:type', String)
    ], Ng2AutoCompleteComponent.prototype, "displayPropertyName", void 0);
    __decorate([
        _angular_core.Input('placeholder'), 
        __metadata('design:type', String)
    ], Ng2AutoCompleteComponent.prototype, "placeholder", void 0);
    Ng2AutoCompleteComponent = __decorate([
        // just to pass type check
        _angular_core.Component({
            selector: 'auto-complete',
            template: "\n  <div class=\"auto-complete\">\n\n    <!-- keyword input -->\n    <input class=\"keyword\"\n           placeholder=\"{{placeholder}}\"\n           (focus)=\"showDropdownList()\"\n           (blur)=\"dropdownVisible=false\"\n           (keydown)=\"inputElKeyHandler($event)\"\n           (input)=\"reloadListInDelay()\"\n           [(ngModel)]=\"keyword\" />\n\n    <!-- dropdown that user can select -->\n    <ul *ngIf=\"dropdownVisible\">\n      <li *ngIf=\"isLoading\" class=\"loading\">Loading</li>\n      <li class=\"item\"\n          *ngFor=\"let item of filteredList; let i=index\"\n          (mousedown)=\"selectOne(item)\"\n          [ngClass]=\"{selected: i === itemIndex}\"\n          [innerHTML]=\"getFormattedList(item)\"\n          ></li>\n    </ul>\n\n  </div>",
            providers: [Ng2AutoComplete],
            styles: ["\n  @keyframes slideDown {\n    0% {\n      transform:  translateY(-10px);\n    }\n    100% {\n      transform: translateY(0px);\n    }\n  }\n  .auto-complete input {\n    outline: none;\n    border: 2px solid transparent;\n    border-width: 3px 2px;\n    margin: 0;\n    box-sizing: border-box;\n    background-clip: content-box;\n  }\n\n  .auto-complete ul {\n    background-color: #fff;\n    margin: 0;\n    width : 100%;\n    overflow-y: auto;\n    list-style-type: none;\n    padding: 0;\n    border: 1px solid #ccc;\n    box-sizing: border-box;\n    animation: slideDown 0.1s;\n  }\n\n  .auto-complete ul li {\n    padding: 2px 5px;\n    border-bottom: 1px solid #eee;\n  }\n\n  .auto-complete ul li.selected {\n    background-color: #ccc;\n  }\n\n  .auto-complete ul li:last-child {\n    border-bottom: none;\n  }\n\n  .auto-complete ul li:hover {\n    background-color: #ccc;\n  }\n\n"],
            //encapsulation: ViewEncapsulation.Native
            encapsulation: _angular_core.ViewEncapsulation.None
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof _angular_core.ElementRef !== 'undefined' && _angular_core.ElementRef) === 'function' && _a) || Object, (typeof (_b = typeof Ng2AutoComplete !== 'undefined' && Ng2AutoComplete) === 'function' && _b) || Object])
    ], Ng2AutoCompleteComponent);
    return Ng2AutoCompleteComponent;
    var _a, _b;
}());

/**
 * display auto-complete section with input and dropdown list when it is clicked
 */
var Ng2AutoCompleteDirective = (function () {
    function Ng2AutoCompleteDirective(resolver, viewContainerRef) {
        var _this = this;
        this.resolver = resolver;
        this.viewContainerRef = viewContainerRef;
        this.ngModelChange = new _angular_core.EventEmitter();
        this.hideAutoCompleteDropdown = function (event) {
            if (_this.componentRef) {
                if (event && event.type === 'click' &&
                    event.target !== _this.el &&
                    event.target !== _this.acEl) {
                    _this.componentRef.destroy();
                    _this.componentRef = undefined;
                }
                else if (!event) {
                    _this.componentRef.destroy();
                    _this.componentRef = undefined;
                }
            }
        };
        this.styleAutoCompleteDropdown = function () {
            var component = _this.componentRef.instance;
            /* setting width/height auto complete */
            var thisElBCR = _this.el.getBoundingClientRect();
            _this.acEl.style.width = thisElBCR.width + 'px';
            _this.acEl.style.position = 'absolute';
            _this.acEl.style.zIndex = '1';
            _this.acEl.style.top = '0';
            _this.acEl.style.left = '0';
            _this.acEl.style.display = 'inline-block';
            component.inputEl.style.width = (thisElBCR.width - 30) + 'px';
            component.inputEl.style.height = thisElBCR.height + 'px';
            component.inputEl.focus();
        };
        this.selectNewValue = function (val) {
            if (val && typeof val !== "string") {
                var displayVal_1 = val[_this.displayPropertyName || 'value'];
                val.toString = function () { return displayVal_1; };
            }
            _this.ngModelChange.emit(val);
            if (_this.valueChanged) {
                _this.valueChanged(val);
            }
            _this.hideAutoCompleteDropdown();
        };
        this.el = this.viewContainerRef.element.nativeElement;
    }
    Ng2AutoCompleteDirective.prototype.ngOnInit = function () {
        var divEl = document.createElement("div");
        divEl.className = 'ng2-auto-complete';
        divEl.style.display = 'inline-block';
        divEl.style.position = 'relative';
        this.el.parentElement.insertBefore(divEl, this.el.nextSibling);
        divEl.appendChild(this.el);
        this.selectNewValue(this.ngModel);
    };
    Ng2AutoCompleteDirective.prototype.ngOnDestroy = function () {
        if (this.componentRef) {
            this.componentRef.instance.valueSelected.unsubscribe();
        }
        document.removeEventListener('click', this.hideAutoCompleteDropdown);
    };
    //show auto-complete list below the current element
    Ng2AutoCompleteDirective.prototype.showAutoCompleteDropdown = function () {
        document.addEventListener('click', this.hideAutoCompleteDropdown);
        this.hideAutoCompleteDropdown();
        var factory = this.resolver.resolveComponentFactory(Ng2AutoCompleteComponent);
        this.componentRef = this.viewContainerRef.createComponent(factory);
        this.acEl = this.componentRef.location.nativeElement;
        var component = this.componentRef.instance;
        component.listFormatter = this.listFormatter;
        //component.prefillFunc = this.prefillFunc;
        component.pathToData = this.pathToData;
        component.minChars = this.minChars;
        component.valuePropertyName = this.valuePropertyName || 'id';
        component.displayPropertyName = this.displayPropertyName || 'value';
        component.source = this.source;
        component.placeholder = this.placeholder;
        component.valueSelected.subscribe(this.selectNewValue);
        this.acEl.style.display = 'none';
        setTimeout(this.styleAutoCompleteDropdown);
    };
    __decorate([
        _angular_core.Input(), 
        __metadata('design:type', String)
    ], Ng2AutoCompleteDirective.prototype, "placeholder", void 0);
    __decorate([
        _angular_core.Input('list-formatter'), 
        __metadata('design:type', Function)
    ], Ng2AutoCompleteDirective.prototype, "listFormatter", void 0);
    __decorate([
        _angular_core.Input('value-changed'), 
        __metadata('design:type', Function)
    ], Ng2AutoCompleteDirective.prototype, "valueChanged", void 0);
    __decorate([
        _angular_core.Input('source'), 
        __metadata('design:type', Object)
    ], Ng2AutoCompleteDirective.prototype, "source", void 0);
    __decorate([
        _angular_core.Input('path-to-data'), 
        __metadata('design:type', String)
    ], Ng2AutoCompleteDirective.prototype, "pathToData", void 0);
    __decorate([
        _angular_core.Input('min-chars'), 
        __metadata('design:type', Number)
    ], Ng2AutoCompleteDirective.prototype, "minChars", void 0);
    __decorate([
        _angular_core.Input('value-property-name'), 
        __metadata('design:type', String)
    ], Ng2AutoCompleteDirective.prototype, "valuePropertyName", void 0);
    __decorate([
        _angular_core.Input('display-property-name'), 
        __metadata('design:type', String)
    ], Ng2AutoCompleteDirective.prototype, "displayPropertyName", void 0);
    __decorate([
        _angular_core.Input(), 
        __metadata('design:type', Object)
    ], Ng2AutoCompleteDirective.prototype, "ngModel", void 0);
    __decorate([
        _angular_core.Output(), 
        __metadata('design:type', Object)
    ], Ng2AutoCompleteDirective.prototype, "ngModelChange", void 0);
    Ng2AutoCompleteDirective = __decorate([
        _angular_core.Directive({
            selector: '[auto-complete], [ng2-auto-complete]',
            host: {
                '(click)': 'showAutoCompleteDropdown()'
            }
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof _angular_core.ComponentFactoryResolver !== 'undefined' && _angular_core.ComponentFactoryResolver) === 'function' && _a) || Object, (typeof (_b = typeof _angular_core.ViewContainerRef !== 'undefined' && _angular_core.ViewContainerRef) === 'function' && _b) || Object])
    ], Ng2AutoCompleteDirective);
    return Ng2AutoCompleteDirective;
    var _a, _b;
}());

var Angular2DataTableModule = (function () {
    function Angular2DataTableModule() {
    }
    return Angular2DataTableModule;
}());
var Ng2AutoCompleteModule = (function () {
    function Ng2AutoCompleteModule() {
    }
    Ng2AutoCompleteModule = __decorate([
        _angular_core.NgModule({
            imports: [_angular_platformBrowser.BrowserModule, _angular_forms.FormsModule],
            declarations: [Ng2AutoCompleteComponent, Ng2AutoCompleteDirective],
            exports: [Ng2AutoCompleteComponent, Ng2AutoCompleteDirective],
            entryComponents: [Ng2AutoCompleteComponent],
            providers: [Ng2AutoComplete]
        }), 
        __metadata('design:paramtypes', [])
    ], Ng2AutoCompleteModule);
    return Ng2AutoCompleteModule;
}());

exports.Ng2AutoComplete = Ng2AutoComplete;
exports.Ng2AutoCompleteComponent = Ng2AutoCompleteComponent;
exports.Ng2AutoCompleteDirective = Ng2AutoCompleteDirective;
exports.Angular2DataTableModule = Angular2DataTableModule;
exports.Ng2AutoCompleteModule = Ng2AutoCompleteModule;

Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=ng2-auto-complete.umd.js.map
