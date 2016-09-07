import { NgModule } from '@angular/core';
import { FormsModule } from "@angular/forms";
import { BrowserModule  } from '@angular/platform-browser';

// Components
import { Ng2AutoCompleteComponent } from './ng2-auto-complete.component';

// Services
import { Ng2AutoComplete } from './ng2-auto-complete.service';

// Directives
import { Ng2AutoCompleteDirective } from './ng2-auto-complete.directive';

export class Angular2DataTableModule { }
@NgModule({
  imports: [ BrowserModule, FormsModule ],
  declarations: [Ng2AutoCompleteComponent, Ng2AutoCompleteDirective],
  exports:  [Ng2AutoCompleteComponent, Ng2AutoCompleteDirective],
  entryComponents: [Ng2AutoCompleteComponent],
  providers: [ Ng2AutoComplete ]
})
export class Ng2AutoCompleteModule {}

export {
  Ng2AutoComplete,
  Ng2AutoCompleteComponent,
  Ng2AutoCompleteDirective
};
