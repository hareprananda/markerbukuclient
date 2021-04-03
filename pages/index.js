import Head from "next/head";
import React, { useState, useEffect } from "react";
import AccountBalanceIcon from "@material-ui/icons/AccountBalance";
import TurnedInIcon from "@material-ui/icons/TurnedIn";
import DateRangeIcon from "@material-ui/icons/DateRange";
import PersonIcon from "@material-ui/icons/Person";
import AssignmentIcon from "@material-ui/icons/Assignment";
import Pagination from "../component/Utility/Pagination";
import HomeModal from "../component/Utility/Modal/HomeModal";

const dumDat = {
  buku: "seni negosiasi",
  kalimat: "sesungguhnya manusia itu adalah bodoh",
  halaman: "202",
  penulis: "benjamin graham",
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
  useEffect(() => {
    (async () => {
      fetch(`${process.env.SERVER__NODE_ENDPOINT}/buku`, {
        method: "get",
      })
        .then((response) => response.json())
        .then((data) => console.log(data))
        .catch((err) => console.log(err));
    })();
  }, []);
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
              <td>
                {dumDat.kalimat.slice(0, 100) +
                  (dumDat.kalimat.length > 100 ? "..." : "")}
              </td>
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
      <HomeModal
        dataActive={dataActive}
        openModal={openModal}
        modalHandler={setOpenModal}
      />
    </>
  );
}
