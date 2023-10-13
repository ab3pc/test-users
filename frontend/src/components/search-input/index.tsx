import React from "react"
import { Input } from "antd"
const { Search } = Input

import style from "./index.module.css"

type SearchInputProps = {
  onSearch: (
    value: string,
    _e?:
      | React.ChangeEvent<HTMLInputElement>
      | React.MouseEvent<HTMLElement>
      | React.KeyboardEvent<HTMLInputElement>,
  ) => void
}

const SearchInput: React.FC<SearchInputProps> = ({onSearch}) => {
  return (
    <Search
      placeholder="Search"
      allowClear
      onSearch={onSearch}
      className={style.searchInput}
    />
  )
}

export { SearchInput }
