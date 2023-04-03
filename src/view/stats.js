import Abstract from "./abstract";

const createStatsTemplate = () => {
  return  `<section class="statistics">
          <h2 class="visually-hidden">Trip statistics</h2>

          <div class="statistics__item">
            <canvas class="statistics__chart" id="money" width="900"></canvas>
          </div>

          <div class="statistics__item">
            <canvas class="statistics__chart" id="type" width="900"></canvas>
          </div>

          <div class="statistics__item">
            <canvas class="statistics__chart" id="time-spend" width="900"></canvas>
          </div>
        </section>`;
}

export default class StatsView extends Abstract {
  constructor(points) {
    super();
    this._points = points;
  }

  getTemplate() {
    return createStatsTemplate();
  }
}