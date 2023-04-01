import { isFuture, isPast } from "../utils/point";
import { FilterType } from "./const";

export const pointsToFilterMap = {
[FilterType.EVERYTHING]: (points) => points.filter((point) => point),
[FilterType.FUTURE]: (points) => points.filter((point) => isFuture(point.date_from)).length,
[FilterType.PAST]: (points) => points.filter((point) => isPast(point.date_from)).length
}

export const generateFilter = (points) => {
  return Object.entries(pointsToFilterMap).map(([filterName, countPoints]) => {
    return {
      name: filterName,
      count: countPoints(points),
      type: filterName
    };
  });
};