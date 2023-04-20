import { render, RenderPosition } from "../utils/render";
import { TYPE } from "../mock/const";
import { createPriceArray, createTimeArray, createTypeArray, OutputData } from "../utils/stats";
import StatsView from "../view/stats";
import Chart from 'chart.js/auto';
import ChartDataLabels from 'chartjs-plugin-datalabels';

const siteBodyElement = document.querySelector('.page-body');
const sitePageBodyContainer = siteBodyElement.querySelector('.page-main__container');

export default class StatsPresenter {
  constructor(pointModel) {
    this.statsComponent = null;
    this._pointsModel = pointModel;
    
  }

  init() {
    if (this.statsComponent !== null) {
      return;
    }

    this.statsComponent = new StatsView();
    
    render(sitePageBodyContainer, this.statsComponent.getElement(), RenderPosition.BEFOREEND);
  }

  show() {
    this.statsComponent.show();
  }

  hide() {
    if (this.statsComponent === null) {
      return;
    }
    this.statsComponent.hide();
  }

  

  drawGrafics() {  
    const points = this._pointsModel.getPoints();
    const moneyCtx = this.statsComponent.getElement().querySelector('#money');
    const typeCtx = this.statsComponent.getElement().querySelector('#type');
    const timeCtx = this.statsComponent.getElement().querySelector('#time-spend');

    const BAR_HEIGHT = 55;
    moneyCtx.height = BAR_HEIGHT * 5;
    typeCtx.height = BAR_HEIGHT * 5;
    timeCtx.height = BAR_HEIGHT * 5;

    this._moneyChart = new Chart(moneyCtx, {
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
            color: '#ffffff',
            anchor: 'end',
            align: 'start',
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
  
    this._typeChart = new Chart(typeCtx, {
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
            color: '#ffffff',
            anchor: 'end',
            align: 'start',
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
  
    this._timeChart = new Chart(timeCtx, {
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
            color: '#ffffff',
            anchor: 'end',
            align: 'start',
            formatter: (val) => {
              const days = Math.round(Math.floor(val/1000/60/60) / 24);
              const hours = Math.floor(val/1000/60/60) % 24;
              const minutes = Math.floor(val/1000/60) % 60;
              return days > 0 ? `${days} д. ${hours} ч. ${minutes} м.` : `${hours} ч. ${minutes} м.`
            }
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

  destroyChart() {
    this._moneyChart.destroy();
    this._typeChart.destroy();
    this._timeChart.destroy();
  }
}