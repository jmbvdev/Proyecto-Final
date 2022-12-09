import React from "react";
import axios from "axios";
import { IoIosArrowBack } from "react-icons/io";
import s from "../../styles/coupon.module.css";
import plans from "../../images/plans.webp";
import { useGlobalFilter, useSortBy, useTable } from "react-table";
import { useNavigate } from "react-router-dom";
import GlobalFilter from "./GlobalFilter";
import Loading from "../../components/Loading";
import { MdDeleteForever } from "react-icons/md";
import Swal from "sweetalert2";
import { RiCoupon2Fill } from "react-icons/ri";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
const CuponDash = () => {
  const initialState = {
    name: "",
    discount: "",
  };

  const [input, setInput] = React.useState(initialState);
  const [error, setError] = React.useState({});
  const [coupons, setCoupons] = React.useState([]);
  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate();

  const handleBack = () => {
    navigate("/dashboard");
    window.scrollTo(0, { behavior: "smooth" });
  };

  React.useEffect(() => {
    if (!coupons.length) {
      fetch(
        `https://us-central1-api-plants-b6153.cloudfunctions.net/app/coupons/all`
      )
        .then((res) => res.json())
        .then((r) => setCoupons(r));
    }
  }, [coupons]);

  React.useEffect(() => {
    setInput((prev) => ({ ...prev, [input.name]: input.value }));
  }, [input.name, input.value]);

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    bgcolor: "transparent",
    border: "none",
    p: 4,
  };
  const handleClose = () => setOpen(false);
  const handleOnSubmit = (e) => {
    e.preventDefault();
    if (input.name !== "" && input.discount !== "") {
      Swal.fire({
        title: "Confirm",
        text: "Are yo sure you want to create this coupon?",
        icon: "question",
        showDenyButton: true,
        denyButtonText: "No",
        denyButtonColor: "#FF5733",
        confirmButtonText: "Yes",
        confirmButtonColor: "#72CE65",
      }).then((res) => {
        if (res.isConfirmed) {
          axios
            .post(
              `https://us-central1-api-plants-b6153.cloudfunctions.net/app/coupons/create`,
              input
            )
            .then((res) => {
              setCoupons([...coupons, res]);
              const Toast = Swal.mixin({
                toast: true,
                position: "top-right",
                iconColor: "white",
                customClass: {
                  popup: "colored-toast",
                },
                showConfirmButton: false,
                timer: 3500,
                timerProgressBar: false,
              });
              Promise.resolve(
                Toast.fire({
                  icon: "success",
                  title: `Coupon succesfully created!`,
                })
              );
              return;
            });
        } else {
          const Toast = Swal.mixin({
            toast: true,
            position: "top-right",
            iconColor: "white",
            customClass: {
              popup: "colored-toast",
            },
            showConfirmButton: false,
            timer: 2500,
            timerProgressBar: false,
          });
          Promise.resolve(
            Toast.fire({
              icon: "error",
              title: "Coupon creation canceled",
            })
          );
        }
      });
    }
    setInput(initialState);
  };

  const handleChange = (e) => {
    e.preventDefault();
    setError(validate({ ...input, [e.target.name]: e.target.value }));
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const Table = ({ columns, data }) => {
    const {
      getTableProps,
      getTableBodyProps,
      headerGroups,
      rows,
      prepareRow,
      preGlobalFilteredRows,
      setGlobalFilter,
      state,
    } = useTable({ columns, data }, useGlobalFilter, tableHooks, useSortBy);

    return (
      <>
        {coupons.length ? (
          <>
            <div className={s.container_table}>
              <GlobalFilter
                preGlobalFilteredRows={preGlobalFilteredRows}
                setGlobalFilter={setGlobalFilter}
                globalFilter={state.globalFilter}
              />

              <table {...getTableProps()} className={s.table}>
                <thead>
                  {headerGroups.map((headerGroup) => (
                    <tr {...headerGroup.getHeaderGroupProps()}>
                      {headerGroup.headers.map((column) => (
                        <th
                          {...column.getHeaderProps(
                            column.getSortByToggleProps()
                          )}
                        >
                          {column.render("Header")}
                          {column.isSorted
                            ? column.isSortedDesc
                              ? "▼"
                              : "▲"
                            : ""}
                        </th>
                      ))}
                    </tr>
                  ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                  {rows.map((row, i) => {
                    prepareRow(row);
                    return (
                      <tr {...row.getRowProps()}>
                        {row.cells.map((cell) => {
                          return (
                            <td {...cell.getCellProps()}>
                              {cell.render("Cell")}
                            </td>
                          );
                        })}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </>
        ) : (
          <Loading />
        )}
      </>
    );
  };

  const handleDelete = (name) => {
    if (name) {
      Swal.fire({
        title: "Confirm",
        text: "Are yo sure you want to delete this coupon?",
        icon: "question",
        showDenyButton: true,
        denyButtonText: "No",
        denyButtonColor: "#FF5733",
        confirmButtonText: "Yes",
        confirmButtonColor: "#72CE65",
      }).then((res) => {
        if (res.isConfirmed) {
          axios.delete(
            `https://us-central1-api-plants-b6153.cloudfunctions.net/app/coupons/${name}`
          );

          const Toast = Swal.mixin({
            toast: true,
            position: "top-right",
            iconColor: "white",
            customClass: {
              popup: "colored-toast",
            },
            showConfirmButton: false,
            timer: 3500,
            timerProgressBar: false,
          });
          Promise.resolve(
            Toast.fire({
              icon: "success",
              title: `Coupon succesfully deleted!`,
            })
          );
          setCoupons(coupons.filter((c) => c.data.name !== name));
          return;
        } else {
          const Toast = Swal.mixin({
            toast: true,
            position: "top-right",
            iconColor: "white",
            customClass: {
              popup: "colored-toast",
            },
            showConfirmButton: false,
            timer: 2500,
            timerProgressBar: false,
          });
          Promise.resolve(
            Toast.fire({
              icon: "error",
              title: "Coupon deletion canceled",
            })
          );
        }
      });
    }
  };

  const columns = React.useMemo(
    () => [
      {
        Header: "Coupons",
        columns: [
          {
            Header: "Name",
            accessor: "name",
          },
        ],
      },
      {
        Header: "Info",
        columns: [
          {
            Header: "Disount",
            accessor: "discount",
          },
        ],
      },
    ],
    []
  );

  const tableHooks = (hooks) => {
    hooks.visibleColumns.push((columns) => [
      ...columns,
      {
        id: "Delete",
        Header: "Delete",
        Cell: ({ row }) => (
          <div
            className={s.details_icon_container}
            onClick={(e) => handleDelete(row.values.name)}
          >
            <MdDeleteForever className={s.details_icon} />
          </div>
        ),
      },
    ]);
  };

  const data = coupons?.map((c) => {
    return c.data;
  });

  return (
    <div>
      <div className={s.container}>
        <div className={s.button_container}>
          <button onClick={handleBack} className={s.back}>
            <IoIosArrowBack />
          </button>
        </div>
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
                  value={input.name.toUpperCase()}
                  onChange={handleChange}
                  placeholder="Coupon's name"
                />
                {error.name && <p className={s.danger}>{error.name}</p>}
              </div>
              {/* <div className={s.input_container}>
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
            </div> */}
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
                  disabled={!input.name || !input.discount || error.length > 0}
                  className={s.register_btn}
                  type="submit"
                >
                  GENERATE
                </button>
              </div>
              <div className={s.coupon_list_btn} onClick={() => setOpen(true)}>
                <RiCoupon2Fill className={s.coupon_icon} />
                <span>LIST</span>
              </div>
              <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <Box sx={style}>
                  <Table columns={columns} data={data} />
                </Box>
              </Modal>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

const validate = (input) => {
  let error = {};
  if (!/^[a-zA-Z ]*$/.test(input.name))
    error.name = "Coupon's name invalid! (Ex : GIFT)";
  return error;
};

export default CuponDash;
