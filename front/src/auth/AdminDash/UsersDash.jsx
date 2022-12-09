import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useGlobalFilter, useSortBy, useTable, usePagination } from 'react-table';
import {IoIosArrowBack}from "react-icons/io"
import s from "../../styles/adminNav.module.css"
import { useState } from "react";
import GlobalFilter from "./GlobalFilter";
import Loading from "../../components/Loading";
import {BiDetail} from "react-icons/bi";
import { GrFormNext, GrFormPrevious } from "react-icons/gr";

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
    navigate('/dashboard');
    window.scrollTo(0, {behavior: 'smooth'})
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
            state,
            page,
            nextPage,
            previousPage,
            canNextPage,
            canPreviousPage
        } = useTable({columns, data}, useGlobalFilter, tableHooks, useSortBy, usePagination)

    return (
      <>
      
      {allUsers.length ? (
            <>
       <GlobalFilter preGlobalFilteredRows={preGlobalFilteredRows} setGlobalFilter={setGlobalFilter} globalFilter={state.globalFilter} />
       <div className={s.pages}>
          <button onClick={() => previousPage()} disabled={!canPreviousPage} className={s.pages_icon}><GrFormPrevious className={s.arrow}/></button>
          
          <button onClick={() => nextPage()} disabled={!canNextPage} className={s.pages_icon}><GrFormNext className={s.arrow} /></button>
       </div>
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
        <tbody {...getTableBodyProps()}  >
          {page.map((row, i) => {
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
                <div onClick={()=>{
                  navigate(`/users/detail/${row.values.uid}`)
                  window.scrollTo(0, {behavior: 'smooth'})
                  }} className={s.details_icon_container}>
                <BiDetail className={s.details_icon} />
                </div>
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
            <Table columns={columns} data={data} />
        </div>
    )
};

export default UsersDash;
