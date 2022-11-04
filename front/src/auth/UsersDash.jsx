import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentUser, getUsers, getUserDetail, deleteUser } from "../Redux/actions/users";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase/firebase";
import { useTable } from 'react-table';
import s from "../styles/adminNav.module.css"
import { useState } from "react";

const UsersDash = ( isAdmin, setIsAdmin) => {
    
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [allUsers, setAllusers] = useState([])
    const admin = auth.currentUser;

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

    }, [allUsers])

    const Table = ({ columns, data}) => {
        const {
            getTableProps,
            getTableBodyProps,
            headerGroups,
            rows,
            prepareRow
        } = useTable({columns, data})

        return (
       

            <table {...getTableProps()} className={s.table}>
              <thead >
                {headerGroups.map(headerGroup => (
                  <tr  {...headerGroup.getHeaderGroupProps()}>
                    {headerGroup.headers.map(column => (
                      <th {...column.getHeaderProps()}>{column.render('Header')}</th>
                    ))}
                  </tr>
                ))}
              </thead>
              <tbody {...getTableBodyProps()} className={s.tbody}>
                {rows.map((row, i) => {
                  prepareRow(row)
                  return (
                    <tr {...row.getRowProps()}>
                      {row.cells.map(cell => {
                        return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
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
                            }
                        ]
            }
        ], [])

      

    return(
        <div className={s.container} >
            <h2>Welcome {admin.displayName}!</h2>
            <Table columns={columns} data={allUsers}  />
        </div>
    )
};

export default UsersDash;