import { Component, OnDestroy, OnInit } from '@angular/core';
import { LangService } from '../../@core/services/lang.service';
import { LocalDataSource } from 'ng2-smart-table';

@Component({
  selector: 'ngx-languages',
  styleUrls: ['./languages.component.scss'],
  templateUrl: './languages.component.html',
})
export class LanguagesComponent implements OnInit, OnDestroy {

  public selectSizes: number[] = [
    25,
    50,
    100,
    150,
    250,
  ];

  public limitT: number = 25;
  public countItems: number = 0;
  public totalPages: number = 1;
  public searchT: string = '';

  public data: any = [];
  public options: any;

  settings = {
    editable: false,
    hideSubHeader: true,
    noDataMessage: 'Loading data...',
    mode: 'external',
    actions: false,
    pager: {
      perPage: this.limitT,
    },
    columns: {
      code: {
        title: 'Language Code',
        type: 'string',
        filter: false,
      },
      lang_count: {
        title: 'Count Tubes ',
        filter: false,
      },
    },
  };

  source: LocalDataSource;

  constructor(
    private _lang: LangService) {
  }

  ngOnInit() {
    this._lang.getAll().subscribe(
      data => this.source = new LocalDataSource(data.data),
    );
  }

  ngOnDestroy() {
  }
}
