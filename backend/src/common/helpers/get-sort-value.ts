import { SortBy } from "../enums/enums";

const SORT_BY_DEFAULT = "ASC";

const getSortByValue = (value?: string): string | null => {
  if (!value) {
    return SORT_BY_DEFAULT;
  }
  if (value === SortBy.NONE) {
    return null;
  }
  const sortValues = Object.keys(SortBy).includes(value);

  return Boolean(sortValues) ? value : SORT_BY_DEFAULT;
};

export { getSortByValue };
