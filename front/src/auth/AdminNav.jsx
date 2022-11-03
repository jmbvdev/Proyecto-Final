import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentUser, getUsers, getUserDetail, deleteUser } from "../Redux/actions/users";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase/firebase";
import { useTable } from 'react-table';
import s from "../styles/adminNav.module.css"

const AdminNav = ( isAdmin, setIsAdmin) => {
    
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const allUsers = useSelector(state => state.usersReducer.users);
    const admin = auth.currentUser;

    React.useEffect(() => {
        dispatch(getUsers());

    }, [])

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
              <thead className={s.thead_column}>
                {headerGroups.map(headerGroup => (
                  <tr className={s.tr_column} {...headerGroup.getHeaderGroupProps()}>
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
                    <tr {...row.getRowProps()} className={s.tr_cell}>
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

        const data = allUsers;

    return(
        <div className={s.container} >
            <h2>Welcome {admin.displayName}!</h2>
            <Table columns={columns} data={data}  />
        </div>
    )
};

export default AdminNav;