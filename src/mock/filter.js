import { isFuture, isPast } from "../utils"

const pointsToFilterMap = {
everything: (points) => points.filter((point) => point),
future: (points) => points.filter((point) => isFuture(point.date_from)).length,
past: (points) => points.filter((point) => isPast(point.date_from)).length
}

export const generateFilter = (points) => {
  return Object.entries(pointsToFilterMap).map(([filterName, countPoints]) => {
    return {
      name: filterName,
      count: countPoints(points),
    };
  });
};