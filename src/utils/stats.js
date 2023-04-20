import dayjs from "dayjs";

const sumPrice = (points, type) => {
  let sum = 0;
  points.forEach(element => {
    if (element.type === type.toLowerCase()) {
      sum += element.price;
    }
  });

  return sum;
}

export const createPriceArray = (points) => {
  return {
    Taxi: sumPrice(points, 'Taxi'),
    Bus: sumPrice(points, 'Bus'),
    Train: sumPrice(points, 'Train'),
    Ship: sumPrice(points, 'Ship'),
    Transport: sumPrice(points, 'Transport'),
    Drive: sumPrice(points, 'Drive'),
    Flight: sumPrice(points, 'Flight'),
    Checkin: sumPrice(points, 'Check-in'),
    Sightseeng: sumPrice(points, 'Sightseeing'),
    Restaurant: sumPrice(points, 'Restaurant')
  }
};


const sumType = (points, type) => {
  let sum = 0;
  points.forEach((point) => {
    if (point.type === type.toLowerCase()) {
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
    Checkin: sumType(points, 'Check-in'),
    Sightseeng: sumType(points, 'Sightseeing'),
    Restaurant: sumType(points, 'Restaurant')
  }
};

const sumTime = (points, type) => {
 let sum = 0;
  points.forEach((point) => {
    if (point.type === type.toLowerCase()) {
      let dateFrom = dayjs(point.date_from);
      let dateTo = dayjs(point.date_to);
      let diff = dateTo.diff(dateFrom);
      sum = sum + diff;
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
    Checkin: sumTime(points, 'Check-in'),
    Sightseeng: sumTime(points, 'Sightseeing'),
    Restaurant: sumTime(points, 'Restaurant')
  }
};

export const OutputData = (val) => {
  return Math.round(Math.floor(val/1000/60/60) / 24);
}

