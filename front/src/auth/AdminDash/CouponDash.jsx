import React from "react";
import axios from "axios";
import s from "../../styles/coupon.module.css";
import plans from "../../images/plans.webp";
import { useTable } from 'react-table';

const CuponDash = () => {

  const initialState = {
    name: "",
    count: "",
    discount: "",
  };

  const [input, setInput] = React.useState(initialState);
  const [coupons, setCoupons] = React.useState([]);

  React.useEffect(() => {
    if(!coupons){
    axios.get(`http://localhost:5000/api-plants-b6153/us-central1/app/coupons/all`)
    .then(res => setCoupons(res.data));
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
    alert("Coupon succesfully created!");
  };


  const handleChange = (e) => {
    e.preventDefault();
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const Table = ({ columns, data}) => {
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow
    } = useTable({columns, data}, tableHooks);

    return (
      <table {...getTableProps()} className="">
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()}>{column.render("Header")}</th>
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
          )
  };

  const handleDelete = name => {
    //axios.delete(`http://localhost:5000/api-plants-b6153/us-central1/app/coupons/${name}`)
    //.then(res => console.log(res.data))
    alert("deleted")
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
        <button onClick={handleDelete(row.values.name)}>DELETE</button>
      )
    }
  ])
};

const data = coupons;

    return (
      <div>
        <div className={s.container}>
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
                value={input.name}
                onChange={handleChange}
                placeholder="Coupon's name"
              />
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
                  !input.discount
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

export default CuponDash;