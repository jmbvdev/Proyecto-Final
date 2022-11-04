import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { GetAllProducts } from "../../Redux/actions/products";
import { useNavigate } from "react-router-dom";
import { useTable } from 'react-table';

const ProductsDash = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const allProducts = useSelector(state => state.productsReducer.allProducts);


    React.useEffect(() => {
        if(!allProducts[0])  dispatch(GetAllProducts());

    }, [allProducts, dispatch]);

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
            <table {...getTableProps()}>
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
                Header: 'Product',
                columns: [
                    {
                        Header: 'image',
                        accessor: 'image'
                    },
                    {
                        Header: 'Name',
                        accessor: 'name'
                    }
                ]
            },
            {
                Header: 'Info',
                columns: [
                            {
                                Header: 'Price',
                                accessor: 'price'
                            },
                            {
                                Header: 'Stock',
                                accessor: 'stock'
                            }
                        ]
            }
        ], [])

        const data = allProducts?.map(e => {
           return allProducts[e][data]; 
        });
        console.log(data)

    return(
        <div>
            <button onClick={handleBack}>BACK</button>
            <Table columns={columns} data={data} />
        </div>
    )
};

export default ProductsDash;