import { NgModule } from '@angular/core';

import { NgxEchartsModule } from 'ngx-echarts';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { ChartModule } from 'angular2-chartjs';
import { Ng2SmartTableModule } from 'ng2-smart-table';

import { ThemeModule } from '../../@theme/theme.module';
import { NetworkComponent } from './network.component';

import { ChartbaseComponent } from './chart-base/chartbase.component';
import { ChartmetricComponent } from './chart-metric/chartmetric.component';
import { TableBaseComponent } from './table-base/table-base.component';
import { TableMetricComponent } from './table-metric/table-metric.component';
import { ComponentsModule } from '../../components/components.module';

const MODULES = [
  ThemeModule,
  Ng2SmartTableModule,
  NgxEchartsModule,
  NgxChartsModule,
  ChartModule,
  ComponentsModule,
];

const components = [
  NetworkComponent,
  ChartbaseComponent,
  ChartmetricComponent,
  TableBaseComponent,
  TableMetricComponent,
];

const ENTRY_COMPONENTS = [
  ChartbaseComponent,
];

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
export class NetworkModule { }
