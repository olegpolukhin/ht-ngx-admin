import { NgModule } from '@angular/core';

import { NgxEchartsModule } from 'ngx-echarts';

import { EarningCardFrontComponent } from './items-chart/front-side/earning-card-front.component';
import { EarningLiveUpdateChartComponent } from './items-chart/front-side/earning-live-update-chart.component';
import { ItemsChartComponent } from './items-chart/items-chart.component';

import { ThemeModule } from '../../@theme/theme.module';
import { DashboardComponent } from './dashboard.component';
import { ComponentsModule } from '../../components/components.module';
import { TopCardComponent } from './top-card/top-card.component';
import { SiteActivityComponent } from './site-activity/site-activity.component';
import { Ng2SmartTableModule } from 'ng2-smart-table';

@NgModule({
    imports: [
        ThemeModule,
        NgxEchartsModule,
        ComponentsModule,
        Ng2SmartTableModule,
    ],
    declarations: [
        EarningCardFrontComponent,
        EarningLiveUpdateChartComponent,
        ItemsChartComponent,
        DashboardComponent,
        TopCardComponent,
        SiteActivityComponent,
    ],
})
export class DashboardModule {

}
