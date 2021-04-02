import React from "react";

import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import { Modal } from "@material-ui/core";
import AccountBalanceIcon from "@material-ui/icons/AccountBalance";
import TurnedInIcon from "@material-ui/icons/TurnedIn";
import AssignmentIcon from "@material-ui/icons/Assignment";
import AddIcon from "@material-ui/icons/Add";
import { autoGrow } from "../../../lib/utility/form";
const EditBukuModal = ({ showModal, modalHandler, data }) => {
  const submitHandler = (e) => {
    e.preventDefault();
    const type = !data ? "tambah" : "edit";

    alert(type);
  };
  return (
    <Modal
      disablePortal
      disableEnforceFocus
      disableAutoFocus
      onClose={() => modalHandler(false)}
      open={showModal}
      aria-labelledby="server-modal-title"
      aria-describedby="server-modal-description"
      className={{ overFlow: "scroll" }}
    >
      <div className="modal__modalRoot">
        <div className="modal__closeButton" onClick={() => modalHandler(false)}>
          <HighlightOffIcon fontSize="inherit" />
        </div>
        <div className="modal__body__editTambah">
          <form onSubmit={submitHandler}>
            <div className="kalimat__formGroup">
              <AccountBalanceIcon />
              <input type="text" placeholder="Judul..." />
            </div>
            <div className="kalimat__formGroup">
              <TurnedInIcon />
              <input type="number" placeholder="Halaman..." />
            </div>
            <div className="kalimat__formGroup">
              <AssignmentIcon />
              <textarea placeholder="Kalimat..." onInput={autoGrow} />
            </div>
            <button className="btn submitBtn">
              <AddIcon /> Tambah
            </button>
          </form>
        </div>
      </div>
    </Modal>
  );
};

export default EditBukuModal;
