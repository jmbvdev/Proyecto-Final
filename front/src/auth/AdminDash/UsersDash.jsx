import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUsers } from "../../Redux/actions/users";
import { useNavigate } from "react-router-dom";
import { useTable } from 'react-table';
import s from "../../styles/adminNav.module.css"

const UsersDash = () => {
    
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const allUsers = useSelector(state => state.usersReducer.users);


    React.useEffect(() => {
        dispatch(getUsers());

    }, []);

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
        } = useTable({columns, data})

        return (
            <table {...getTableProps()} className={s.table}>
              <thead>
                {headerGroups.map(headerGroup => (
                  <tr {...headerGroup.getHeaderGroupProps()}>
                    {headerGroup.headers.map(column => (
                      <th {...column.getHeaderProps()}>{column.render('Header')}</th>
                    ))}
                  </tr>
                ))}
              </thead>
              <tbody {...getTableBodyProps()}>
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

        const data = allUsers;

    return(
        <div className={s.container}>
            <button onClick={handleBack}>BACK</button>
            <Table columns={columns} data={data} />
        </div>
    )
};

export default UsersDash;