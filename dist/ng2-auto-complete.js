"use strict";
var core_1 = require('@angular/core');
var forms_1 = require("@angular/forms");
var platform_browser_1 = require('@angular/platform-browser');
// Components
var ng2_auto_complete_component_1 = require('./ng2-auto-complete.component');
exports.Ng2AutoCompleteComponent = ng2_auto_complete_component_1.Ng2AutoCompleteComponent;
// Services
var ng2_auto_complete_service_1 = require('./ng2-auto-complete.service');
exports.Ng2AutoComplete = ng2_auto_complete_service_1.Ng2AutoComplete;
// Directives
var ng2_auto_complete_directive_1 = require('./ng2-auto-complete.directive');
exports.Ng2AutoCompleteDirective = ng2_auto_complete_directive_1.Ng2AutoCompleteDirective;
var Angular2DataTableModule = (function () {
    function Angular2DataTableModule() {
    }
    return Angular2DataTableModule;
}());
exports.Angular2DataTableModule = Angular2DataTableModule;
var Ng2AutoCompleteModule = (function () {
    function Ng2AutoCompleteModule() {
    }
    Ng2AutoCompleteModule = __decorate([
        core_1.NgModule({
            imports: [platform_browser_1.BrowserModule, forms_1.FormsModule],
            declarations: [ng2_auto_complete_component_1.Ng2AutoCompleteComponent, ng2_auto_complete_directive_1.Ng2AutoCompleteDirective],
            exports: [ng2_auto_complete_component_1.Ng2AutoCompleteComponent, ng2_auto_complete_directive_1.Ng2AutoCompleteDirective],
            entryComponents: [ng2_auto_complete_component_1.Ng2AutoCompleteComponent],
            providers: [ng2_auto_complete_service_1.Ng2AutoComplete]
        }), 
        __metadata('design:paramtypes', [])
    ], Ng2AutoCompleteModule);
    return Ng2AutoCompleteModule;
}());
exports.Ng2AutoCompleteModule = Ng2AutoCompleteModule;
//# sourceMappingURL=ng2-auto-complete.js.map