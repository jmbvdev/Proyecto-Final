import React from "react";
import { useAsyncDebounce } from "react-table";

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
        <div>
            <label>Search:</label>
            <input value={value || ""} onChange={(e) => {
                setValue(e.target.value);
                onChange(e.target.value)
            }} placeholder={`${count} results...`} />
            <button onClick={handleReset}>RESET</button>
        </div>
    )
};

export default GlobalFilter;