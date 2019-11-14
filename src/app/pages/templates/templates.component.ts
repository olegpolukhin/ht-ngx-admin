import { Component, OnDestroy, OnInit } from '@angular/core';
import { TemplatesService } from '../../@core/services/templates.service';
import {
  AppDaterangePickerComponent,
  DateRange,
} from '../../components/app-daterange-picker/app-daterange-picker.component';
import * as moment from 'moment';

@Component({
  selector: 'ngx-templates',
  styleUrls: ['./templates.component.scss'],
  templateUrl: './templates.component.html',
})
export class TemplatesComponent implements OnInit, OnDestroy {

  public dateRangeT: DateRange;

  public selectSizes: number[] = [25, 50, 100, 150, 250];

  public limitT = 25;
  public searchT: string = '';

  public data: any = [];
  public options: any;

  public metricsList: any = [
    'Uniques',
    'Impressions',
    'Views',
    'Revenue ADS',
    'Page Views CPM',
  ];

  // by default: Uniques
  public metricSelected: string = 'Uniques';

  public templatesSelect = [];
  public defaultTemplate: string = 'T02';
  public selectedTemplate: string;

  constructor(private _template: TemplatesService) { }

  ngOnInit() {
    this.dateRangeT = AppDaterangePickerComponent.fromFirstDayWeek();
    this._template.getCollectTemplates().subscribe(
      data => this.templatesSelect = data.list,
    );

  }
  getFormateDate(date: Date): string {
    return moment(date).format('YYYY-MM-DD');
  }

  onEventReset() {
    this.searchT = '';
    this.selectedTemplate = '';
  }

  ngOnDestroy() {
  }
}
