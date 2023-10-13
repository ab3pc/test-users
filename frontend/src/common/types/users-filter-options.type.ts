const SortTypesTable = {
  ASC: "ascend",
  DESC: "descend",
  NONE: "undefined",
} as const

const SortTypesFetchData = {
  ascend: "ASC",
  descend: "DESC",
  none: "NONE",
} as const

const UsersFilterKeys = {
  sort: 'sort'
} as const

type UsersFilterOptions = {
  sort: string | null
}


export { type UsersFilterOptions, SortTypesTable, SortTypesFetchData, UsersFilterKeys }
