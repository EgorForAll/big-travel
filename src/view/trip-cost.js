export const createTripCost = (points) => {
  const initialValue = 0;
  return `<p class="trip-info__cost">
              Total: &euro;&nbsp;<span class="trip-info__cost-value">${points.reduce((acc, val) => acc + val.price, initialValue)}</span>
            </p>`;
}