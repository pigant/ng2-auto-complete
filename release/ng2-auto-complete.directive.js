"use strict";
var core_1 = require('@angular/core');
var ng2_auto_complete_component_1 = require("./ng2-auto-complete.component");
require("rxjs/Rx");
/**
 * display auto-complete section with input and dropdown list when it is clicked
 */
var Ng2AutoCompleteDirective = (function () {
    function Ng2AutoCompleteDirective(resolver, viewContainerRef) {
        var _this = this;
        this.resolver = resolver;
        this.viewContainerRef = viewContainerRef;
        this.ngModelChange = new core_1.EventEmitter();
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
        var factory = this.resolver.resolveComponentFactory(ng2_auto_complete_component_1.Ng2AutoCompleteComponent);
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
        core_1.Input(), 
        __metadata('design:type', String)
    ], Ng2AutoCompleteDirective.prototype, "placeholder", void 0);
    __decorate([
        core_1.Input('list-formatter'), 
        __metadata('design:type', Function)
    ], Ng2AutoCompleteDirective.prototype, "listFormatter", void 0);
    __decorate([
        core_1.Input('value-changed'), 
        __metadata('design:type', Function)
    ], Ng2AutoCompleteDirective.prototype, "valueChanged", void 0);
    __decorate([
        core_1.Input('source'), 
        __metadata('design:type', Object)
    ], Ng2AutoCompleteDirective.prototype, "source", void 0);
    __decorate([
        core_1.Input('path-to-data'), 
        __metadata('design:type', String)
    ], Ng2AutoCompleteDirective.prototype, "pathToData", void 0);
    __decorate([
        core_1.Input('min-chars'), 
        __metadata('design:type', Number)
    ], Ng2AutoCompleteDirective.prototype, "minChars", void 0);
    __decorate([
        core_1.Input('value-property-name'), 
        __metadata('design:type', String)
    ], Ng2AutoCompleteDirective.prototype, "valuePropertyName", void 0);
    __decorate([
        core_1.Input('display-property-name'), 
        __metadata('design:type', String)
    ], Ng2AutoCompleteDirective.prototype, "displayPropertyName", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], Ng2AutoCompleteDirective.prototype, "ngModel", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], Ng2AutoCompleteDirective.prototype, "ngModelChange", void 0);
    Ng2AutoCompleteDirective = __decorate([
        core_1.Directive({
            selector: '[auto-complete], [ng2-auto-complete]',
            host: {
                '(click)': 'showAutoCompleteDropdown()'
            }
        }), 
        __metadata('design:paramtypes', [core_1.ComponentFactoryResolver, core_1.ViewContainerRef])
    ], Ng2AutoCompleteDirective);
    return Ng2AutoCompleteDirective;
}());
exports.Ng2AutoCompleteDirective = Ng2AutoCompleteDirective;
//# sourceMappingURL=ng2-auto-complete.directive.js.map