import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useSortBy, useTable } from 'react-table';
import {IoIosArrowBack}from "react-icons/io"
import s from "../../styles/adminNav.module.css"
import { useState } from "react";

const UsersDash = () => {
    
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [allUsers, setAllusers] = useState([]);
    


    React.useEffect(() => {
      if (!allUsers.length) {
        fetch(
         "https://us-central1-api-plants-b6153.cloudfunctions.net/app/users/all"
       )
         .then((r) => r.json())
         .then((response) => {
         setAllusers(response)
         });
      }

    }, [allUsers]);

  const handleBack = () => {
    navigate(-1);
  };

    const Table = ({ columns, data}) => {
        const {
            getTableProps,
            getTableBodyProps,
            headerGroups,
            rows,
            prepareRow
        } = useTable({columns, data}, tableHooks, useSortBy)

    return (
      <table {...getTableProps()} className={s.table}>
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
          )
        };
  
        const columns = React.useMemo(() => [
            {
                Header: 'User',
                columns: [
                    {
                        Header: 'Display Name',
                        accessor: 'displayName'
                    },
                    {
                        Header: 'Email',
                        accessor: 'email'
                    }
                ]
            },
            {
                Header: 'Info',
                columns: [
                            {
                                Header: 'Phone Number',
                                accessor: 'phoneNumber'
                            },
                            {
                              Header: 'Id',
                              accessor: 'uid'
                            }
                        ]
            }
        ], [])

  const data = allUsers;

         const tableHooks = hooks => {
           hooks.visibleColumns.push((columns) => [
             ...columns,
             {
               id: 'Detail',
               Header: 'Detail',
               Cell: ({row}) => (
                 <Link to={`/users/detail/${row.values.uid}`}>DETAIL</Link>
               )
             }
           ])
         }

    return(
        <div className={s.container}>
          <div className={s.button_container}>
            <button onClick={handleBack} className={s.back}>
              <IoIosArrowBack/>
            </button>

          </div>
          <div>
            
          </div>
            <Table columns={columns} data={data} />
        </div>
    )
};

export default UsersDash;
