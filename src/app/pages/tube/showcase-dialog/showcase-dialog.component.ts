import { Component, Input, OnInit } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';
import { NbColorHelper } from '@nebular/theme';
import { TubeService } from '../../../@core/services';
import { RequestTubeInfo } from '../../../@core/data/tubes';
import { LocalDataSource } from 'ng2-smart-table';
import { DateRange } from '../../../components/app-daterange-picker/app-daterange-picker.component';
import forIn from 'lodash/forIn';
import isArray from 'lodash/isArray';

@Component({
  selector: 'ngx-showcase-dialog',
  templateUrl: 'showcase-dialog.component.html',
  styleUrls: ['showcase-dialog.component.scss'],
})
export class ShowcaseDialogComponent implements OnInit {

  settings = {
    add: false,
    edit: false,
    delete: false,
    actions: false,
    noDataMessage: 'Loading data...',
    columns: {
      name: {
        title: 'Name',
        type: 'string',
      },
      total: {
        title: 'Total scenes',
        type: 'number',
        filter: false,
      },
    },
  };

  source: LocalDataSource = new LocalDataSource();

  public options: any;
  public themeSubscription: any;
  public data: any = [];

  public optionsTemplate: any;
  public dataTemplate: any = [];

  public template: any = {
    template_dev: 0,
    template_live: 0,
    template_m_dev: 0,
    template_m_live: 0,
  };

  public optionsDevice: any;
  public dataDevice: any = [];

  public showError = false;

  private tubeID: number = 0;

  @Input() titleDig: string;
  @Input() dataDig: any;
  @Input() dateRange: DateRange;

  constructor(
    protected ref: NbDialogRef<ShowcaseDialogComponent>,
    private _tube: TubeService,
  ) { }

  ngOnInit() {

    this.tubeID = this.dataDig.tube_id;

    const reqTubeInfo: RequestTubeInfo = {
      TubeID: this.tubeID,
      DateRange: this.dateRange,
    };

    this._tube.getTubeInfo(reqTubeInfo).subscribe(
      (data) => {
        if (!data) {
          this.showError = true;
        }
        this.template = data.template_use;
        this.stockTubeInfo(data);
      },
      (error) => {
        this.showError = true;
        console.error(error);
      },
    );

    // this._tube.getTubeInfoTagList(this.tubeID).subscribe(
    //   data => {
    //     this.source.load(data.data);
    //   });

    this._tube.getTubeInfoTemplates(this.tubeID).subscribe(
      data => {
        this.stockTubeInfoTemplates(data.data);
      });

    this._tube.gettubeinfoPlatforms(this.tubeID).subscribe(
      data => {
        this.stockTubeInfoDevices(data);
      });
  }

  private stockTubeInfo(stockTubeInfo: any) {

    const colors = {
      uni: { backgroundColor: NbColorHelper.hexToRgbA('#ff6b83', 0.3), colorBorder: '#ff6b83' },
      imp: { backgroundColor: NbColorHelper.hexToRgbA('#ba7fec', 0.3), colorBorder: '#ba7fec' },
      vid: { backgroundColor: NbColorHelper.hexToRgbA('#73a1ff', 0.3), colorBorder: '#73a1ff' },
      ads: { backgroundColor: NbColorHelper.hexToRgbA('#5dcfe3', 0.3), colorBorder: '#5dcfe3' },
    };


    const points = {};
    stockTubeInfo.xaxis.forEach(date => {
      forIn(stockTubeInfo.data[date], function (value, metric) {
        if (!isArray(points[metric])) {
          points[metric] = [];
        }

        points[metric].push(value);
      });
    });

    const sets = [];
    forIn(points, function (value, metric) {
      sets.push({
        data: value,
        label: stockTubeInfo.column_labels[metric],
        backgroundColor: colors[metric].backgroundColor,
        borderColor: colors[metric].colorBorder,
      });
    });

    this.data = {
      labels: stockTubeInfo.xaxis,
      datasets: sets,
    };

    this.options = {
      responsive: true,
      maintainAspectRatio: false,
    };
  }

  private stockTubeInfoTemplates(stockTubeInfo: any) {

    let datasets: Array<any> = [];

    datasets = [
      {
        data: [stockTubeInfo.Mobile],
        label: 'Mobile',
        backgroundColor: NbColorHelper.hexToRgbA('#ff6b83', 0.3),
        borderColor: '#ff6b83',
      },
      {
        data: [stockTubeInfo.Desktop],
        label: 'Desktop',
        backgroundColor: NbColorHelper.hexToRgbA('#73a1ff', 0.3),
        borderColor: '#73a1ff',
      },
    ];

    this.dataTemplate = {
      labels: ['Mobile', 'Desktop'],
      datasets: datasets,
    };

    this.optionsTemplate = {
      responsive: true,
    };

  }

  private stockTubeInfoDevices(stockTubeInfo: any) {
    const lables: Array<any> = [];
    let datasets: Array<any> = [];

    const data = stockTubeInfo.data;
    const xaxis = stockTubeInfo.keys;
    const columns = stockTubeInfo.columns;

    datasets = [{
      data: Object.values(data),
      label: xaxis,
      backgroundColor: [
        NbColorHelper.hexToRgbA('#ff6b83', 0.3),
        NbColorHelper.hexToRgbA('#ba7fec', 0.3),
        NbColorHelper.hexToRgbA('#73a1ff', 0.3),
        NbColorHelper.hexToRgbA('#5dcfe3', 0.3),
        NbColorHelper.hexToRgbA('#c492ee', 0.3),
      ],
    }];

    for (const index of xaxis) {
        lables.push(columns[index]);
    }

    this.dataDevice = {
      labels: lables,
      datasets: datasets,
    };

    this.optionsDevice = {
      responsive: true,
      maintainAspectRatio: false,
    };
  }

  dismiss() {
    this.ref.close();
  }
}
