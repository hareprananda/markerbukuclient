import Head from "next/head";
import React, { useState } from "react";
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

const dumDat = {
  buku: "seni negosiasi",
  kalimat: "sesungguhnya manusia itu adalah bodoh",
  halaman: "202",
  updated_at: "2020-09-21 10:00:00",
  oleh: {
    nama: "wayan kaler",
    photo: "nophoto.jpg",
  },
};
export default function Home() {
  const [openModal, setOpenModal] = useState(false);
  const [dataActive, setDataActive] = useState({});
  const openModalWithData = (data) => (e) => {
    console.log(data);

    setOpenModal(true);
    setDataActive(data);
  };
  return (
    <>
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
                <AssignmentIcon className="icons" /> Kalimat
              </div>
            </th>
            <th>
              <div className="home__table__contentHead">
                <TurnedInIcon className="icons" /> Halaman
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
            <tr onClick={openModalWithData(dumDat)} key={value}>
              <td>{dumDat.buku}</td>
              <td>{dumDat.kalimat}</td>
              <td>#{dumDat.halaman}</td>
              <td>{dumDat.updated_at}</td>
              <td>
                <img
                  src={`${process.env.SERVER__NODE_ENDPOINT}/image/${dumDat.oleh.photo}`}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination />
      <Modal
        disablePortal
        disableEnforceFocus
        disableAutoFocus
        onClose={() => setOpenModal(false)}
        open={openModal}
        aria-labelledby="server-modal-title"
        aria-describedby="server-modal-description"
      >
        <div className="modal__modalRoot">
          <div
            className="modal__closeButton"
            onClick={() => setOpenModal(false)}
          >
            <HighlightOffIcon fontSize="inherit" />
          </div>

          <div className="modal__header modal__header__home">
            <div className="modal__home__button">
              <button className="btn btn-red">
                <DeleteIcon />
                Hapus
              </button>
              <button className="btn btn-blue">
                <EditIcon />
                Edit
              </button>
            </div>

            <div className="modal__home__nextPrevButton">
              <button className="previous__button btn">
                <ChevronLeftIcon color="inherit" /> Previous
              </button>
              <button className="next__button btn">
                Next
                <ChevronRightIcon color="inherit" />
              </button>
            </div>
          </div>
          <div className="modal__body modal__home__body">
            <div className="modal__home__mainInformation">
              {Object.keys(dataActive).map((data, idx) => (
                <>
                  <p>{data}</p>
                  <p>
                    {typeof dataActive[data] === "object"
                      ? dataActive[data].nama
                      : dataActive[data]}
                  </p>
                </>
              ))}
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
}
