import React from 'react'
import s from "../styles/adminNav.module.css"


// a dropdown list filter
const SelectFilter = ({
    column: { filterValue, setFilter, preFilteredRows, id }
}) => {
    // Calculate the options for filtering
    // using the preFilteredRows
    const options = React.useMemo(() => {
        const options = new Set();
        preFilteredRows.forEach((row) => {
            options.add(row.values[id]);
        });
        return [...options.values()];
    }, [id, preFilteredRows]);

    // Render a multi-select box
    return (
        <div className={s.order}>
            
        <select
            value={filterValue}
            onChange={(e) => {
                setFilter(e.target.value || undefined);
            }}
        >
            <option value="">All</option>
            {options.map((option, i) => (
                <option key={i} value={option}>
                    {option === true ? 'hidden' : 'visible'}
                </option>
            ))}
        </select>
        </div>
    );
}

export default SelectFilter;