import Head from "next/head";
import React, { useEffect, useState } from "react";
import AccountBalanceIcon from "@material-ui/icons/AccountBalance";
import TurnedInIcon from "@material-ui/icons/TurnedIn";
import DateRangeIcon from "@material-ui/icons/DateRange";
import PersonIcon from "@material-ui/icons/Person";
import AssignmentIcon from "@material-ui/icons/Assignment";
import Modal from "@material-ui/core/Modal";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import Pagination from "../component/Utility/Pagination";
import ConfirmationModal from "../component/Utility/Modal/ConfirmationModal";
import EditBukuModal from "../component/Utility/Modal/EditBukuModal";
import { requestBuku } from "../lib/http/api";

const buku = ({ dataBuku }) => {
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);

  const [showEditModal, setShowEditModal] = useState(false);
  const [dataModal, setDataModal] = useState(false);
  const [listBuku, setListBuku] = useState(dataBuku ?? []);
  const [deletePointer, setDeletePointer] = useState("");

  const [confirmationModalText, setConfirmationModalText] = useState("");

  useEffect(() => {
    if (dataBuku) return;

    (async () => setListBuku(await requestBuku()))();
  }, []);
  const confirmationModalHandler = (data) => () => {
    setConfirmationModalText(
      `Apakah anda yakin ingin menghapus ${data.judul} dan segala kalimat kutipannya ?`
    );
    setShowConfirmationModal(true);
    setDeletePointer(data._id);
  };
  const openModal = (data) => () => {
    setShowEditModal(true);
    setDataModal(data);
  };

  const deleteBuku = (id) => async (e) => {
    const deleteBuku = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER__NODE_ENDPOINT}/buku/${id}`,
      {
        method: "delete",
      }
    ).then((response) => response.json());

    if (!deleteBuku) alert("Gagal terhapus");

    setListBuku((current) =>
      current.filter((buku) => buku._id !== deletePointer)
    );
  };
  return (
    <div className="buku__root">
      <button className="btn buku__tambahBuku__btn" onClick={openModal()}>
        Tambah Buku
      </button>
      <table className="home__table">
        <thead>
          <tr>
            <th>
              <div className="home__table__contentHead">
                <AccountBalanceIcon className="icons" /> Buku
              </div>
            </th>
            <th>
              <div className="home__table__contentHead">
                <AssignmentIcon className="icons" /> Penulis
              </div>
            </th>
            <th>
              <div className="home__table__contentHead">
                <DateRangeIcon className="icons" /> Dibuat / update
              </div>
            </th>
            <th>
              <div className="home__table__contentHead">
                <PersonIcon className="icons" /> Oleh
              </div>
            </th>
          </tr>
        </thead>
        <tbody>
          {listBuku.map((buku, idxBuku) => (
            <tr key={buku._id}>
              <td>{buku.judul}</td>
              <td>{buku.penulis}</td>
              <td>{buku.updatedAt}</td>
              <td>
                <img
                  src={`${process.env.NEXT_PUBLIC_SERVER__NODE_ENDPOINT}/image/${buku.penambah.photo}`}
                />
              </td>
              <td>
                <div className="button__row">
                  <button
                    className="btn inline btn-red"
                    onClick={confirmationModalHandler(buku)}
                  >
                    <DeleteIcon />
                  </button>
                  <button
                    onClick={openModal(buku)}
                    className="btn inline btn-blue"
                    style={{ marginLeft: "7px" }}
                  >
                    <EditIcon />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <ConfirmationModal
        showModal={showConfirmationModal}
        modalHandler={setShowConfirmationModal}
        text={confirmationModalText}
        confirmedHandler={deleteBuku(deletePointer)}
      />
      <EditBukuModal
        showModal={showEditModal}
        modalHandler={setShowEditModal}
        data={dataModal}
        setListBuku={setListBuku}
      />
    </div>
  );
};

buku.getInitialProps = async (ctx) => {
  if (process.browser) return __NEXT_DATA__.props.pageProps;

  return {
    dataBuku: await requestBuku(),
  };
};
export default buku;
