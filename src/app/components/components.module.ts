import { NgModule } from '@angular/core';
import { AppDaterangePickerComponent } from './app-daterange-picker/app-daterange-picker.component';
import { AppDateCustomBlockComponent } from './app-date-custom-block/app-date-custom-block.component';
import { NbDatepickerModule } from '@nebular/theme';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        NbDatepickerModule,
    ],
    declarations: [
        AppDaterangePickerComponent,
        AppDateCustomBlockComponent,
    ],
    exports: [
        AppDaterangePickerComponent,
        AppDateCustomBlockComponent,
    ],
})
export class ComponentsModule {
}
