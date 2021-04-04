import { Modal } from "@material-ui/core";
import React, { useState } from "react";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import ConfirmationModal from "./ConfirmationModal";
import Link from "next/link";
import { useRouter } from "next/router";
const HomeModal = ({
  dataActive,
  openModal,
  modalHandler,
  changeActive,
  setSummaryData,
}) => {
  const [confirmationModalHandler, setConfirmationModalHandler] = useState(
    false
  );
  const router = useRouter();

  const hapusKutipan = async () => {
    let menghapus = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER__NODE_ENDPOINT}/marker/${dataActive._id}`,
      {
        method: "delete",
      }
    ).then((response) => response.json());

    if (!menghapus) alert("gagal terhapus");

    setSummaryData((current) =>
      current.filter((summary) => summary != dataActive)
    );
    modalHandler(false);
  };
  return (
    <>
      <Modal
        disablePortal
        disableEnforceFocus
        disableAutoFocus
        onClose={() => modalHandler(false)}
        open={openModal}
        aria-labelledby="server-modal-title"
        aria-describedby="server-modal-description"
      >
        <div className="modal__modalRoot">
          <div
            className="modal__closeButton"
            onClick={() => modalHandler(false)}
          >
            <HighlightOffIcon fontSize="inherit" />
          </div>

          <div className="modal__header modal__header__home">
            <div className="modal__home__button">
              <button
                className="btn btn-red"
                onClick={() => setConfirmationModalHandler(true)}
              >
                <DeleteIcon />
                Hapus
              </button>
              <Link href={`/kalimat/${dataActive._id}`}>
                <a className="btn btn-blue">
                  <EditIcon />
                  Edit
                </a>
              </Link>
            </div>

            <div className="modal__home__nextPrevButton">
              <button
                className="previous__button btn"
                onClick={() => changeActive.previous()}
              >
                <ChevronLeftIcon color="inherit" /> Previous
              </button>
              <button
                className="next__button btn"
                onClick={() => changeActive.next()}
              >
                Next
                <ChevronRightIcon color="inherit" />
              </button>
            </div>
          </div>
          <div className="modal__body modal__home__body">
            <div className="modal__home__mainInformation">
              <p className="modal__home__label">
                Judul<span>:</span>
              </p>
              <p>{dataActive?.judul}</p>
            </div>
            <div className="modal__home__mainInformation">
              <p className="modal__home__label">
                Penulis<span>:</span>
              </p>
              <p>{dataActive?.penulis}</p>
            </div>
            <div className="modal__home__mainInformation">
              <p className="modal__home__label">
                Dibuat / update<span>:</span>
              </p>
              <p>{dataActive?.updatedAt}</p>
            </div>
            <div className="modal__home__mainInformation">
              <p className="modal__home__label">
                Oleh<span>:</span>
              </p>
              <p>{dataActive?.nama}</p>
            </div>
            <div className="modal__home__mainInformation">
              <p className="modal__home__label">
                Halaman<span>:</span>
              </p>
              <p>{dataActive?.halaman}</p>
            </div>
            <div className="modal__home__mainInformation">
              <p className="modal__home__label">
                Kalimat<span>:</span>
              </p>
              <p>{dataActive?.kalimat}</p>
            </div>
          </div>
        </div>
      </Modal>
      <ConfirmationModal
        modalHandler={setConfirmationModalHandler}
        showModal={confirmationModalHandler}
        confirmedHandler={hapusKutipan}
        text={`Apakah anda yakin ingin menghapus kutipan dari buku ${dataActive.judul} di halaman ${dataActive.halaman}`}
      />
    </>
  );
};

export default HomeModal;
