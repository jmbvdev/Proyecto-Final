import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useGlobalFilter, useSortBy, useTable, usePagination, useFilters } from 'react-table';
import {IoIosArrowBack}from "react-icons/io"
import s from "../../styles/adminNav.module.css"
import { Link } from "react-router-dom";
import GlobalFilter from "./GlobalFilter";
import Loading from "../../components/Loading";
import {CiCircleCheck} from "react-icons/ci";
import {CiCircleRemove} from "react-icons/ci";
import {BiDetail} from "react-icons/bi";
import {AiOutlineEdit} from "react-icons/ai";
import SelectFilter from '../../componentsTable/SelectFilter';
import { matchSorter } from "match-sorter";


const ProductsDash = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const allProducts = useSelector(state => state.productsReducer.productsBackUp);



    const handleBack = () => {
      navigate(-1);
    };

    function matchSorterFn(rows, id, filterValue) {
      return matchSorter(rows, filterValue, { keys: [(row) => row.values[id]] });
    }

    const defaultColumn = React.useMemo(
      () => ({
        Filter: SelectFilter
      }),
      []
    );
    const filterTypes = React.useMemo(
      () => ({
        rankedMatchSorter: matchSorterFn
      }),
      []
    );

    const Table = ({ columns, data, id}) => {
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
        } = useTable({columns, data, defaultColumn, filterTypes}, useGlobalFilter, tableHooks, useFilters, useSortBy, usePagination);


        return (
          <>
          {allProducts.length ? (
            <>
            <GlobalFilter preGlobalFilteredRows={preGlobalFilteredRows} setGlobalFilter={setGlobalFilter} globalFilter={state.globalFilter} />
            <div>
              <button onClick={() => previousPage()} disabled={!canPreviousPage}>PREV</button>
              <button onClick={() => nextPage()} disabled={!canNextPage}>NEXT</button>
            </div>
            <table {...getTableProps()} className={s.table}>
              <thead>
                {headerGroups.map(headerGroup => (
                  <tr {...headerGroup.getHeaderGroupProps()}>
                    {headerGroup.headers.map(column => (
                      <th {...column.getHeaderProps(column.getSortByToggleProps())}>{column.render('Header')}
                      {<span>{column.isSorted ? (column.isSortedDesc ? "▼" :  "▲") : ""}</span>}
                      <div>{column.canFilter ? column.render("Filter") : null}</div>
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>
              <tbody {...getTableBodyProps()}>
                {page.map((row, i) => {
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
           
            </>
           ) :
            <Loading />
          }
          </>
          )
        };
  
        const columns = React.useMemo(() => [
            {
                Header: 'Product',
                columns: [
                    {
                        Header: 'Name',
                        accessor: 'name',
                        disableFilters: true,
                    }
                ]
            },
            {
                Header: 'Info',
                columns: [
                            {
                              Header: 'id',
                              accessor: 'id',
                              disableFilters: true,
                            },
                            {
                                Header: 'Price',
                                accessor: 'price',
                                disableFilters: true,
                            },
                            {
                                Header: 'Stock',
                                accessor: 'stock',
                                disableFilters: true,
                            },
                            {
                              Header: 'Visible',
                              accessor: 'logicalDeletion',
                              disableSortBy: true,
                              Cell: ({value}) => value === true ? <CiCircleRemove /> : <CiCircleCheck /> 
                            },
                            {
                              Header: 'Image',
                              accessor: 'image',
                              disableSortBy: true,
                              disableFilters: true,
                              Cell: ({value}) => <img className={s.img} src={value}/>,
                            }
                        ]
            }
        ], [])

        const tableHooks = hooks => {
          hooks.visibleColumns.push((columns) => [
            ...columns,
            {
              id: 'Detail',
              Header: 'Detail',
              Cell: ({row}) => (
                <Link to={`/plants/details/${row.values.id}`}><BiDetail /></Link>
              )
            },
            {
              id: 'Edit',
              Header: 'Edit',
              Cell: ({row}) => (
                <Link to={`/plants/edit/${row.values.id}`}><AiOutlineEdit /></Link>
              )
            }
          ])
        }

        const data = allProducts?.map(e => {
           return  {...e.data, id: e.id}; 
        });
       

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

export default ProductsDash;