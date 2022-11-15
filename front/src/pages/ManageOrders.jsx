import React, { useMemo } from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { useTable, useSortBy, useGlobalFilter, useFilters, usePagination } from "react-table";
import { TableGlobalFilter } from "../componentsTable/TableGlobalFilter";
import s from "../styles/adminNav.module.css";
import Loading from "../components/Loading";
import {IoIosArrowBack}from "react-icons/io"
import { useNavigate } from "react-router-dom";
import DropdownFilter from '../componentsTable/DropdownFilter'
import { matchSorter } from "match-sorter";
import SwitchOrderState from '../components/SwitchOrderState'
import Swal from "sweetalert2";


export const COLUMNS = [
  {
    Header: "Date",
    accessor: "date",
    disableFilters: true,
    Cell: ({ value }) => {
      const day = new Date(value).getDate();
      const month = new Date(value).getMonth() + 1;
      const year = new Date(value).getFullYear();
      const hours = new Date(value).getHours();
      const minutes = new Date(value).getMinutes();

      const day_aux = (day + "").length == 1 ? "0" + day : day;
      const month_aux = (month + "").length == 1 ? "0" + month : month;
      const hours_aux = (hours + "").length == 1 ? "0" + hours : hours;
      const minutes_aux = (minutes + "").length == 1 ? "0" + minutes : minutes;

      return `${day_aux}/${month_aux}/${year} - ${hours_aux}:${minutes_aux} hs`;
    },
  },

  {
    Header: "Order Code ",
    accessor: "orderId",
    disableSortBy: true,
    disableFilters: true,
  },
  // {
  //   Header: "UserID",
  //   accessor: "userID",
  //   disableFilters: true,
  //   show: true
  // },
  {
    Header: "User name",
    accessor: "user.displayName",
    disableFilters: true,
  },
  {
    Header: "User email",
    accessor: "user.email",
    disableFilters: true,
  },
  {
    Header: "State",
    accessor: "state",
    disableSortBy: true,
  },
];

export default function ManageOrders() {

  const [orders, setOrders] = useState([]);
  const [order, setOrder] = useState(''); // "order" es el id de la orden
  const [allUsers, setAllusers] = useState([]);
  const [auxOrders, setAuxOrders] = useState([]);
  const navigate= useNavigate()
  //console.log("luego de declarar order", order)


  useEffect(() => {
    getAll();
  }, []);




  const getAll = () => {

    axios
      .get(
        // "https://us-central1-api-plants-b6153.cloudfunctions.net/app/orders/all"
        "http://localhost:5000/api-plants-b6153/us-central1/app/orders/all"
      )
      .then((res) => {
        setAuxOrders(res.data);
      });

    axios
      .get(
        "https://us-central1-api-plants-b6153.cloudfunctions.net/app/users/all"
      )
      .then((response) => {
        setAllusers(response.data)
      });

  };

  // const Una_orden =
  // {
  //   orderId: "3edSJND9ZjgAtoyEU7r2",
  //   state: "Pending",
  //   date: "2022-11-05T02:48:02.810Z",
  //   cart: [{}],
  //   userID: "AkzFrkSPsLZ8RDtO53THqxsro3h1"
  // }

  // const Usuario =
  // {
  //   uid: "5u9Bwr7iWmW1F2NH5vKVEwvB9bA3",
  //   email: "cristianmurua1994@gmail.com",
  //   emailVerified: false,
  //   displayName: "Cristian Muruas",
  //   disabled: false,
  //   metadata: { creationTime: "Fri, 28 Oct 2022 04:29:06 GMT" },
  //   passwordHash: "S7K7LblMiidp0v_Gq6fvZ9hGPcgNCyFHWaRhrhM37qCoMPvlIxci2ZyfYKpqTAN26cCo1uy09ekbf9xP1BmUSg==",
  //   passwordSalt: "PFNXk0oFZmHUvA==",
  //   customClaims: { role: 1 },
  //   tokensValidAfterTime: "Fri, 28 Oct 2022 04:29:06 GMT",
  //   providerData: [{}]
  // }

  // const new_orden =
  // {
  //   orderId: "3rlgqJMKunvGu4Ksaswl",
  //   state: "Pending",
  //   date: "2022-11-09T18:51:09.251Z",
  //   cart: [],
  //   userID: "7ovCCgIS1bgEX1VQtUkfW3TjapE2",
  //   user: { displayName: "Juan Manuel Blanco Vargas", email: "jmbv.dev@gmail.com" }
  // }

  const tableHooks = (hooks) => {
    hooks.visibleColumns.push((columns) => [
      ...columns,
      {
        id: "Edit",
        Header: "Edit",
        Cell: ({ row }) => (
          <button onClick={() => {

            if (row.values.state === 'Pending') {
              Swal.fire({
                icon: 'warning',
                text: 'Order in process of purchase. Its status cannot be modified',
              })
            } else {
              setOrder(row.values.orderId)
            }
          }}>
            Edit
          </button>
        ),
      },
    ]);
  };


  function matchSorterFn(rows, id, filterValue) {
    return matchSorter(rows, filterValue, { keys: [(row) => row.values[id]] });
  }

  const columns = useMemo(() => COLUMNS, []);
  const data = useMemo(() => {
    if (allUsers.length && auxOrders.length) {

      let orders = [];
      auxOrders.forEach((order) => {
        allUsers.forEach((user) => {
          if (order.userID === user.uid) {
            orders.push({
              ...order,
              user: {
                displayName: user.displayName,
                email: user.email,
              }
            })
          }
        })
      })
      setOrders(orders)
      return orders;
    } else {
      return [];
    }
  }, [auxOrders, allUsers]);

  const defaultColumn = React.useMemo(
    () => ({
      // Let's set up our default Filter UI
      Filter: DropdownFilter
    }),
    []
  );
  const filterTypes = React.useMemo(
    () => ({
      rankedMatchSorter: matchSorterFn
    }),
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    //rows,
    prepareRow,
    state,
    setGlobalFilter,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    pageOptions,
    setPageSize,
  } = useTable(
    {
      columns,
      data,
      defaultColumn,
      filterTypes,

    },

    tableHooks,
    useGlobalFilter,
    useFilters,
    useSortBy,
    usePagination,
  );

  const { globalFilter, pageIndex, pageSize } = state;

  return (
    <div className={s.container}>
           <div className={s.button_container}>
            <button onClick={()=>navigate(-1)} className={s.back}>
              <IoIosArrowBack/>
            </button>

          </div>
      {data.length ? (
        <div>
          <>
            <TableGlobalFilter
              filter={globalFilter}
              setFilter={setGlobalFilter}
            />
            <div>
              <select
                value={pageSize}
                onChange={e => setPageSize(Number(e.target.value))}>
                {[10, 15, 20].map(pageSize => (
                  <option key={pageSize} value={pageSize}>
                    Show {pageSize}
                  </option>
                ))}
              </select>
              <span>
                Page{' '}
                <strong>
                  {pageIndex + 1} of {pageOptions.length}
                </strong>{' '}
              </span>
              <button onClick={() => previousPage()} disabled={!canPreviousPage}>PREV</button>
              <button onClick={() => nextPage()} disabled={!canNextPage}>NEXT</button>
            </div>
            <table {...getTableProps()}>
              <thead>
                {headerGroups.map((headerGroup) => (
                  <tr {...headerGroup.getHeaderGroupProps()}>
                    {headerGroup.headers.map((column) => (
                      <th
                        {...column.getHeaderProps(column.getSortByToggleProps())}
                      >
                        {column.render("Header")}

                        {
                          <span>
                            {column.isSorted
                              ? column.isSortedDesc
                                ? " ▼"
                                : " ▲"
                              : ""}
                          </span>
                        }
                        <div>{column.canFilter ? column.render("Filter") : null}</div>
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>
              <tbody {...getTableBodyProps()}>
                {page.map((row) => {
                  prepareRow(row);
                  return (
                    <tr {...row.getRowProps()}>
                      {row.cells.map((cell) => {
                        return (
                          <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                        );
                      })}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </>
          <br></br>
          <SwitchOrderState
            orders={orders}
            order={order}
            auxOrders={auxOrders}
            setOrder={setOrder}
            setAuxOrders={setAuxOrders} />
        </div>
      ) : (
        <Loading />
      )}
    </div>
  );
}
