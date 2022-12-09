import React from "react";
import { BiReset } from "react-icons/bi";
import { RiSearchLine } from "react-icons/ri";
import { useAsyncDebounce } from "react-table";
import s from "../../styles/adminNav.module.css"
const GlobalFilter = ({preGlobalFilteredRows, globalFilter, setGlobalFilter}) => {
    const count = preGlobalFilteredRows.length;
    const [value, setValue] = React.useState(globalFilter);
    const onChange = useAsyncDebounce((value) => {
        setGlobalFilter(value || undefined);
    }, 300);

    const handleReset = () => {
        setValue("");
        setGlobalFilter(undefined)
    }

    return (
        <div className={s.container_search}>
        <div className={s.input_container} >
            <div className={s.search}>
            <input value={value || ""} onChange={(e) => {
                setValue(e.target.value);
                onChange(e.target.value)
            }} placeholder={`${count} results...`} />
              <button type="submit">
                <RiSearchLine />
              </button>

            </div>
        </div>
        <div className={s.reset_container}>

        <BiReset
             onClick={handleReset}
              className={s.reset}
            />
            <span>RESET</span>
        </div>
        

        </div>
    )
};

export default GlobalFilter;