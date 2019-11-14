import { NgModule } from '@angular/core';

import { NgxEchartsModule } from 'ngx-echarts';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { ChartModule } from 'angular2-chartjs';
import { Ng2SmartTableModule } from 'ng2-smart-table';

import { ThemeModule } from '../../@theme/theme.module';
import { TubeComponent } from './tube.component';

import { EarningCardFrontComponent } from './items-chart/front-side/earning-card-front.component';
import { EarningLiveUpdateChartComponent } from './items-chart/front-side/earning-live-update-chart.component';
import { ItemsChartComponent } from './items-chart/items-chart.component';

import { ShowcaseDialogComponent } from './showcase-dialog/showcase-dialog.component';
import { NbDialogModule, NbWindowModule } from '@nebular/theme';
import { ComponentsModule } from '../../components/components.module';

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
  TubeComponent,
  EarningCardFrontComponent,
  EarningLiveUpdateChartComponent,
  ItemsChartComponent,
  ShowcaseDialogComponent,
];

const ENTRY_COMPONENTS = [
  ShowcaseDialogComponent,
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
export class TubeModule { }
