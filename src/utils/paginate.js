import _ from "lodash";

export function paginate(items, pageNumber, pageSize = 10) {
  const startIndex = (pageNumber - 1) * pageSize;
  return _(items)
    .slice(startIndex)
    .take(pageSize)
    .value();
}
