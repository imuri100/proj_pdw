/* eslint-disable */
import _ from "lodash";

export default (results, selectedMonth) => {
  const filtered = results.filter(
    (item) =>
      new Date(item.date).toLocaleString("default", { month: "long" }) ===
      selectedMonth
  );
  return _.groupBy(filtered, function (item) {
    return `${item.date.substring(0, 7)}-${item.category}`;
  });
};
