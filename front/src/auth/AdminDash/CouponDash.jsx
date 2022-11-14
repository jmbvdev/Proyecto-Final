import React from "react";
import axios from "axios";
import {IoIosArrowBack}from "react-icons/io"
import s from "../../styles/coupon.module.css";
import plans from "../../images/plans.webp";
import { useGlobalFilter, useSortBy, useTable } from 'react-table';
import { useNavigate } from "react-router-dom";
import GlobalFilter from "./GlobalFilter";
import Loading from "../../components/Loading";
import Swal from "sweetalert2";
const CuponDash = () => {

  const initialState = {
    name: "",
    count: "",
    discount: "",
  };

  const [input, setInput] = React.useState(initialState);
  const [error, setError] = React.useState({});
  const [coupons, setCoupons] = React.useState([]);
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  React.useEffect(() => {
    if(!coupons.length){
    fetch(`http://localhost:5000/api-plants-b6153/us-central1/app/coupons/all`)
    .then(res => res.json())
    .then(r => setCoupons(r));
  }
}, [coupons]);

  React.useEffect(() => {
    setInput((prev) => ({ ...prev, [input.name]: input.value }));
  }, [input.name, input.value]);

  const handleOnSubmit = (e) => {
    e.preventDefault();
    if(input.name !== "" && input.count !== "" && input.discount !== ""){
    axios.post(`http://localhost:5000/api-plants-b6153/us-central1/app/coupons/create`, input)
    .then((res) => console.log(res.data));
    }
    setInput(initialState);
    Swal.fire({
      title: "Confirm",
      text: "Are yo sure you want to create this coupon?",
      icon: "question",
      showDenyButton: true,
      denyButtonText: "No",
      denyButtonColor: "#FF5733",
      confirmButtonText: "Yes",
      confirmButtonColor: "#72CE65",
    });
  };

  
  

  const handleChange = (e) => {
    e.preventDefault();
    setError(validate({...input, [e.target.name] : e.target.value}))
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const Table = ({ columns, data}) => {
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
        preGlobalFilteredRows,
        setGlobalFilter,
        state
    } = useTable({columns, data}, useGlobalFilter, tableHooks, useSortBy);

    return (
      <>
      {coupons.length ? (
            <>
      <GlobalFilter preGlobalFilteredRows={preGlobalFilteredRows} setGlobalFilter={setGlobalFilter} globalFilter={state.globalFilter} />
      <table {...getTableProps()} className="">
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps(column.getSortByToggleProps())}>{column.render("Header")}
                {column.isSorted ? (column.isSortedDesc ? "▼" :  "▲") : ""}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()} >
          {rows.map((row, i) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                        return <td  {...cell.getCellProps()}>{cell.render('Cell')}</td>
                      })}
                    </tr>
                  )
                })}
              </tbody>
            </table>
            </>
           ) :
            <Loading />
          }
            </>
          )
  };

  const handleDelete = name => {
    axios.delete(`http://localhost:5000/api-plants-b6153/us-central1/app/coupons/${name}`)
    .then(res => console.log(res.data))
    alert(`${name} deleted`)
  };

  const columns = React.useMemo(() => [
    {
        Header: 'Coupons',
        columns: [
            {
                Header: 'Name',
                accessor: 'name'
            },
        ]
    },
    {
        Header: 'Info',
        columns: [
                    {
                        Header: 'Quantity',
                        accessor: 'count'
                    },
                    {
                      Header: 'Disount',
                      accessor: 'discount'
                    }
                ]
    }
], []);

const tableHooks = hooks => {
  hooks.visibleColumns.push((columns) => [
    ...columns,
    {
      id: 'Delete',
      Header: 'Delete',
      Cell: ({row}) => (
        <button onClick={e => handleDelete(row.values.name)}>DELETE</button>
      )
    }
  ])
};

const data = coupons?.map(c => {
  return c.data;
});


    return (
      <div>
        <div className={s.container}>
        <div className={s.button_container}>
            <button onClick={handleBack} className={s.back}>
              <IoIosArrowBack/>
            </button>

          </div>
      <div className={s.wraper}>
        <div className={s.image}>
          <img src={plans} alt="" />
        </div>
        <div className={s.register}>
          <h1 className={s.title}>Coupon Generator</h1>
          <p className={s.welcome}>Create a Discount Coupon.</p>
          <form onSubmit={(e) => handleOnSubmit(e)}>
            <div className={s.input_container}>
              <input
                className={s.input_text}
                name="name"
                value={input.name.toUpperCase()}
                onChange={handleChange}
                placeholder="Coupon's name"
              />
              { error.name && (<p className={s.danger}>{error.name}</p>)}
            </div>
            <div className={s.input_container}>
              <input
                className={s.input_text}
                name="count"
                value={input.count}
                onChange={handleChange}
                placeholder="Quantity"
                type={"number"}
                min="1"
                max="100"
              />
            </div>
            <div className={s.input_container}>
              <input
                className={s.input_text}
                name="discount"
                value={input.discount}
                onChange={handleChange}
                placeholder="Discount"
                type={"number"}
                min="1"
                max="100"
              />
            </div>
            <div>
              <button
                disabled={
                  !input.name ||
                  !input.count ||
                  !input.discount ||
                  error.length>0
                }
                className={s.register_btn}
                type="submit"
              >
                GENERATE
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
      <Table columns={columns} data={data} />
    </div>
    )
};

const validate = input => {
  let error = {};
  if(!/^[a-zA-Z ]*$/.test(input.name))  error.name = "Coupon's name invalid! (Ex : GIFT)";
  return error
}

export default CuponDash;