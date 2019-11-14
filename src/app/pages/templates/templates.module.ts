import { NgModule } from '@angular/core';

import { NgxEchartsModule } from 'ngx-echarts';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { ChartModule } from 'angular2-chartjs';
import { Ng2SmartTableModule } from 'ng2-smart-table';

import { ThemeModule } from '../../@theme/theme.module';
import { TemplatesComponent } from './templates.component';

import { ItemsChartComponent } from './items-chart-bar/items-chart.component';

import { NbDialogModule, NbWindowModule } from '@nebular/theme';
import { ComponentsModule } from '../../components/components.module';
import { ChartbaseComponent } from './chart-base/chartbase.component';
import { ChartmetricComponent } from './chart-metric/chartmetric.component';
import { TableMetricComponent } from './table-metric/table-metric.component';
import { TableBasicComponent } from './table-basic/table-basic.component';

const MODULES = [
    ThemeModule,
    Ng2SmartTableModule,
    NgxEchartsModule,
    NgxChartsModule,
    ChartModule,
    NbDialogModule.forChild(),
    NbWindowModule.forChild(),
    ComponentsModule,
];

const components = [
    ChartbaseComponent,
    ChartmetricComponent,
    ItemsChartComponent,
    TemplatesComponent,
    TableMetricComponent,
    TableBasicComponent,
];

const ENTRY_COMPONENTS = [];

@NgModule({
    imports: [
        ...MODULES,
    ],
    exports: [
    ],
    declarations: [
        ...components,
    ],
    entryComponents: [
        ...ENTRY_COMPONENTS,
    ],
})
export class TemplatesModule { }
