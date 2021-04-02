import { Modal } from "@material-ui/core";
import React from "react";

import HighlightOffIcon from "@material-ui/icons/HighlightOff";

const ConfirmationModal = ({
  modalHandler,
  showModal,
  confirmedHandler,
  cancelHandler,
  text,
}) => {
  const confirmed = () => {
    confirmedHandler();
    modalHandler(false);
  };
  return (
    <div>
      <Modal
        disablePortal
        disableEnforceFocus
        disableAutoFocus
        onClose={() => modalHandler(false)}
        open={showModal}
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
          <div className="modal__body__confirmation">
            <h1>{text}</h1>

            <div className="modal__confirmation__buttonContainer">
              <button
                className="btn btn-blue"
                onClick={() => modalHandler(false)}
              >
                Tidak
              </button>
              <button className="btn btn-red" onClick={confirmed}>
                Ya
              </button>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default ConfirmationModal;
