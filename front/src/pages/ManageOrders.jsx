import React, { useMemo } from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { useTable, useSortBy, useGlobalFilter, useFilters } from "react-table";
import { TableGlobalFilter } from "../components/TableGlobalFilter";
import s from "../styles/adminNav.module.css";
import Loading from "../components/Loading";
import {IoIosArrowBack}from "react-icons/io"
import { useNavigate } from "react-router-dom";

export const COLUMNS = [
  {
    Header: "Date",
    accessor: "date",
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
  },
  {
    Header: "User",
    accessor: "userID",
  },
  {
    Header: "State",
    accessor: "state",
  },
];

export default function ManageOrders() {
  const [orders, getOrders] = useState([]);

  useEffect(() => {
    getAll();
  }, []);

  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  const getAll = () => {
    axios
      .get(
        "https://us-central1-api-plants-b6153.cloudfunctions.net/app/orders/all"
      )
      .then((res) => {
        console.log(res.data);
        getOrders(res.data);
      });
  };

  const tableHooks = (hooks) => {
    hooks.visibleColumns.push((columns) => [
      ...columns,
      {
        id: "Edit",
        Header: "Edit",
        Cell: ({ row }) => (
          <button onClick={() => alert("Editing: " + row.values.orderId)}>
            Edit
          </button>
        ),
      },
    ]);
  };

  const columns = useMemo(() => COLUMNS, []);
  const data = useMemo(() => {
    if (orders.length) {
      return orders;
    } else {
      return [];
    }
  }, [orders]);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    footerGroups,
    rows,
    prepareRow,
    state,
    setGlobalFilter,
  } = useTable(
    {
      columns,
      data,
    },

    tableHooks,
    useGlobalFilter,
    useSortBy
  );

  const { globalFilter } = state;

  return (
    <div className={s.container}>
      {data.length ? (
        <>
            <button onClick={handleBack} className={s.back}>
              <IoIosArrowBack/>
            </button>
          <TableGlobalFilter
            filter={globalFilter}
            setFilter={setGlobalFilter}
          />
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
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody {...getTableBodyProps()}>
              {rows.map((row) => {
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
      ) : (
        <Loading />
      )}
    </div>
  );
}
