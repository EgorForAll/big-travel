import dayjs from "dayjs";
import { generateRandomPoint } from "../mock/point";

export const createPriceArray = (points) => {
  return {
    Taxi: sumPrice(points, 'Taxi'),
    Bus: sumPrice(points, 'Bus'),
    Train: sumPrice(points, 'Train'),
    Ship: sumPrice(points, 'Ship'),
    Transport: sumPrice(points, 'Transport'),
    Drive: sumPrice(points, 'Drive'),
    Flight: sumPrice(points, 'Flight'),
    Checkin: sumPrice(points, 'Checkin'),
    Sightseeng: sumPrice(points, 'Sightseeng'),
    Restaurant: sumPrice(points, 'Restaurant')
  }
};

const sumPrice = (points, type) => {
  let sum = 0;
  points.forEach(element => {
    if (element.type === type) {
      sum += element.price;
    }
  });

  return sum;
}

const sumType = (points, type) => {
  let sum = 0;
  points.forEach((point) => {
    if (point.type === type) {
      sum += 1
    }
  })
  return sum;
}

export const createTypeArray = (points) => {
    return {
    Taxi: sumType(points, 'Taxi'),
    Bus: sumType(points, 'Bus'),
    Train: sumType(points, 'Train'),
    Ship: sumType(points, 'Ship'),
    Transport: sumType(points, 'Transport'),
    Drive: sumType(points, 'Drive'),
    Flight: sumType(points, 'Flight'),
    Checkin: sumType(points, 'Checkin'),
    Sightseeng: sumType(points, 'Sightseeng'),
    Restaurant: sumType(points, 'Restaurant')
  }
};

const sumTime = (points, type) => {
 let sum = 0;
  points.forEach((point) => {
    if (point.type === type) {
      let dateFrom = point.date_from;
      let dateTo = point.date_to;
      let diff = Math.floor(dateTo.getTime() - dateFrom.getTime());
      sum += diff;
    }
  })

    return sum;
}

export const createTimeArray = (points) => {
    return {
    Taxi: sumTime(points, 'Taxi'),
    Bus: sumTime(points, 'Bus'),
    Train: sumTime(points, 'Train'),
    Ship: sumTime(points, 'Ship'),
    Transport: sumTime(points, 'Transport'),
    Drive: sumTime(points, 'Drive'),
    Flight: sumTime(points, 'Flight'),
    Checkin: sumTime(points, 'Checkin'),
    Sightseeng: sumTime(points, 'Sightseeng'),
    Restaurant: sumTime(points, 'Restaurant')
  }
};


