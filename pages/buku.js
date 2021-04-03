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

const dumDat = {
  judul: "seni negosiasi",
  penulis: "Warren Buffet",
  halaman: "202",
  updated_at: "2020-09-21 10:00:00",
  oleh: {
    nama: "wayan kaler",
    photo: "nophoto.jpg",
  },
};
export default function buku() {
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [dataActive, setDataActive] = useState({});
  const [showEditModal, setShowEditModal] = useState(false);
  const [dataModal, setDataModal] = useState(false);

  const [confirmationModalText, setConfirmationModalText] = useState("");

  const confirmationModalHandler = (data) => () => {
    setConfirmationModalText(
      `Apakah anda yakin ingin menghapus ${data.judul} dan segala kalimat kutipannya ?`
    );
    setShowConfirmationModal(true);
  };
  const openModal = (data) => () => {
    setShowEditModal(true);
    setDataModal(data);
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
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((value) => (
            <tr key={value}>
              <td>{dumDat.judul}</td>
              <td>{dumDat.penulis}</td>
              <td>{dumDat.updated_at}</td>
              <td>
                <img
                  src={`${process.env.SERVER__NODE_ENDPOINT}/image/${dumDat.oleh.photo}`}
                />
              </td>
              <td>
                <div className="button__row">
                  <button
                    className="btn inline btn-red"
                    onClick={confirmationModalHandler(dumDat)}
                  >
                    <DeleteIcon />
                  </button>
                  <button
                    onClick={openModal(dumDat)}
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
      <Pagination />
      <ConfirmationModal
        showModal={showConfirmationModal}
        modalHandler={setShowConfirmationModal}
        text={confirmationModalText}
        confirmedHandler={() => alert("sukses terhapus")}
      />
      <EditBukuModal
        showModal={showEditModal}
        modalHandler={setShowEditModal}
        data={dataModal}
      />
    </div>
  );
}
