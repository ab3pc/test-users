import { SortOrder } from "antd/es/table/interface";
import { SortTypesTable } from "../types/types";

const getSortOrder = (value: string): SortOrder => {
	if (value === SortTypesTable.NONE) return null;
	return value as SortOrder;
};

export { getSortOrder };
