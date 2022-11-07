import React, { useState } from 'react'
import { RiSearchLine } from 'react-icons/ri'
import { useAsyncDebounce } from 'react-table'
import s from "../styles/tableGlobal.module.css"

export const TableGlobalFilter = ({ filter, setFilter }) => {
    const [value, setValue] = useState(filter)
    const onChange = useAsyncDebounce(value => {
      setFilter(value || undefined)
    }, 1000)
    return (
        <div className={s.search}>
          <input
            value={value || ''}
            onChange={e => {
              setValue(e.target.value);
              onChange(e.target.value);
            }}
          />
          <button><RiSearchLine /></button>
        </div>
     
    )
  }