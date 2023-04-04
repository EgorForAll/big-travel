import { render, RenderPosition } from "../utils/render";
import { TYPE } from "../mock/const";
import { createPriceArray, createTypeArray, createTimeArray } from "../utils/stats";
import Chart from 'chart.js/auto';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import StatsView from "../view/stats";

const siteBodyElement = document.querySelector('.page-body');
const sitePageBodyContainer = siteBodyElement.querySelector('.page-main__container');

export default class StatsPresenter {
  constructor(pointModel) {
    this._statsComponent = null;
    this._pointsModel = pointModel;
  }

  init() {
    if (this._statsComponent !== null) {
      return;
    }

    this._statsComponent = new StatsView();
    render(sitePageBodyContainer, this._statsComponent.getElement(), RenderPosition.BEFOREEND);
    this._showGrafics();
  }

  show() {
    this._statsComponent.show();
  }

  hide() {
    this._statsComponent.hide();
  }

  _showGrafics(){
    const moneyCtx = this._statsComponent.getElement().querySelector('#money');
    const typeCtx = this._statsComponent.getElement().querySelector('#type');
    const timeCtx = this._statsComponent.getElement().querySelector('#time-spend');

    const points = this._pointsModel.getPoints();
    
    // Рассчитаем высоту канваса в зависимости от того, сколько данных в него будет передаваться

    const BAR_HEIGHT = 55;
    moneyCtx.height = BAR_HEIGHT * 5;
    typeCtx.height = BAR_HEIGHT * 5;
    timeCtx.height = BAR_HEIGHT * 5;

    const moneyChart = new Chart(moneyCtx, {
      plugins: [ChartDataLabels],
      type: 'bar',
      data: {
        labels: TYPE,
        datasets: [{
          data: Object.values(createPriceArray(points)),
          backgroundColor: '#ffa000',
          hoverBackgroundColor: '#ffbb29',
          label: 'MONEY',
          anchor: 'start',
        }],
      },
      options: {
        indexAxis: 'y',
        plugins: {
          datalabels: {
            font: {
              size: 13,
            },
            color: '#000000',
            anchor: 'end',
            align: 'end',
            formatter: (val) => `€ ${val}`,
          },
        },
        title: {
          display: true,
          text: 'MONEY',
          fontColor: '#000000',
          fontSize: 23,
          position: 'left',
        },
        legend: {
          display: false,
        },
        tooltips: {
          enabled: false,
        },
      },
    });

    const typeChart = new Chart(typeCtx, {
      plugins: [ChartDataLabels],
      type: 'bar',
      data: {
        labels: TYPE,
        datasets: [{
          data: Object.values(createTypeArray(points)),
          backgroundColor: '#ffa000',
          label: 'TYPE',
          hoverBackgroundColor: '#ffbb29',
          anchor: 'start',
        }],
      },
      options: {
        indexAxis: 'y',
        plugins: {
          datalabels: {
            font: {
              size: 13,
            },
            color: '#000000',
            anchor: 'end',
            align: 'end',
            formatter: (val) => `${val}x`,
          },
        },
        title: {
          display: true,
          text: 'TYPE',
          fontColor: '#000000',
          fontSize: 23,
          position: 'left',
        },
        legend: {
          display: false,
        },
        tooltips: {
          enabled: false,
        },
      },
    });

    const timeChart = new Chart(timeCtx, {
      plugins: [ChartDataLabels],
      type: 'bar',
      data: {
        labels: TYPE,
        datasets: [{
          data: Object.values(createTimeArray(points)),
          backgroundColor: '#ffa000',
          hoverBackgroundColor: '#ffbb29',
          label: 'TIME-SPEND',
          anchor: 'start',
        }],
      },
      options: {
        indexAxis: 'y',
        plugins: {
          datalabels: {
            font: {
              size: 13,
            },
            color: '#000000',
            anchor: 'end',
            align: 'end',
            formatter: (val) => `${Math.floor(val/1000/60/60)} ч. ${Math.floor(val/1000/60/10)} м.`,
          },
        },
        title: {
          display: true,
          text: 'TYPE',
          fontColor: '#000000',
          fontSize: 23,
          position: 'left',
        },
        legend: {
          display: false,
        },
        tooltips: {
          enabled: false,
        },
      },
    });
  }

}