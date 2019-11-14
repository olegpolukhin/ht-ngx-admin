import { delay, takeWhile } from 'rxjs/operators';
import { AfterViewInit, Component, Input, OnChanges, OnDestroy } from '@angular/core';
import { NbThemeService } from '@nebular/theme';
import * as moment from 'moment';

@Component({
  selector: 'ngx-earning-live-update-chart',
  styleUrls: ['earning-card-front.component.scss'],
  templateUrl: './init.component.html',
})
export class EarningLiveUpdateChartComponent implements AfterViewInit, OnDestroy, OnChanges {
  private alive = true;

  @Input() liveUpdateChartData: { value: [string, number] }[];

  option: any;
  echartsInstance;

  constructor(private theme: NbThemeService) { }

  ngOnChanges(): void {
    if (this.option) {

      this.echartsInstance.setOption({
        series: [{
          data: this.liveUpdateChartData,
        }],
      });
    }
  }

  ngAfterViewInit() {
    this.theme.getJsTheme()
      .pipe(
        delay(3),
        takeWhile(() => this.alive),
      )
      .subscribe(() => {
        this.option = {
          grid: {
            left: 0,
            top: 0,
            right: 0,
            bottom: 0,
          },
          xAxis: {
            type: 'time',
            axisLine: {
              show: false,
            },
            axisLabel: {
              show: false,
            },
            axisTick: {
              show: false,
            },
            splitLine: {
              show: false,
            },
          },
          yAxis: {
            boundaryGap: [0, '5%'],
            axisLine: {
              show: false,
            },
            axisLabel: {
              show: false,
            },
            axisTick: {
              show: false,
            },
            splitLine: {
              show: false,
            },
          },
          tooltip: {
            axisPointer: {
              type: 'shadow',
            },
            formatter: params =>
              `${'<strong>' +
              Math.round(parseInt(params.value[1], 10)) +
              '</strong><br>' + moment(params.value[0]).format('MMM D, YYYY')}`,
          },
          series: [
            {
              type: 'line',
              symbol: 'circle',
              sampling: 'average',
              itemStyle: {
                normal: {
                  // opacity: 0,
                  borderColor: '#0054ff',
                  color: '#73a1ff',
                },
                emphasis: {
                  // opacity: 0,
                  color: '#73a1ff',
                },
              },
              lineStyle: {
                normal: {
                  // width: 0,
                  color: '#73a1ff',
                },
              },
              areaStyle: {
                // normal: {
                //   color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                //     offset: 0,
                //     color: earningLineTheme.gradFrom,
                //   }, {
                //     offset: 1,
                //     color: earningLineTheme.gradTo,
                //   }]),
                //   opacity: 0.2,
                // },
              },
              data: this.liveUpdateChartData,
            },
          ],
          animation: true,
        };
      });
  }

  onChartInit(ec) {
    this.echartsInstance = ec;
  }

  resizeChart() {
    if (this.echartsInstance) {
      this.echartsInstance.resize();
    }
  }

  ngOnDestroy() {
    this.alive = false;
  }
}
