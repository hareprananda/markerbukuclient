import { Modal } from "@material-ui/core";
import React from "react";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
const HomeModal = ({ dataActive, openModal, modalHandler }) => {
  return (
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
        <div className="modal__closeButton" onClick={() => modalHandler(false)}>
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
            <p className="modal__home__label">
              Judul<span>:</span>
            </p>
            <p>{dataActive?.buku}</p>
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
            <p>{dataActive?.updated_at}</p>
          </div>
          <div className="modal__home__mainInformation">
            <p className="modal__home__label">
              Oleh<span>:</span>
            </p>
            <p>{dataActive?.oleh?.nama}</p>
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
  );
};

export default HomeModal;
