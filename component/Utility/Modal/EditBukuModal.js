import React, { useEffect, useRef, useState } from "react";

import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import { Modal } from "@material-ui/core";
import AccountBalanceIcon from "@material-ui/icons/AccountBalance";
import TurnedInIcon from "@material-ui/icons/TurnedIn";
import AssignmentIcon from "@material-ui/icons/Assignment";
import AddIcon from "@material-ui/icons/Add";
import { autoGrow } from "../../../lib/utility/form";
const EditBukuModal = ({ showModal, modalHandler, data, setListBuku }) => {
  const formInitial = {
    judul: "",
    penulis: "",
  };
  const [form, setForm] = useState(formInitial);
  const type = useRef("tambah");
  useEffect(() => {
    if (data) setForm(data);
    else setForm(formInitial);

    type.current = data ? "edit" : "tambah";
  }, [data]);

  const changeInput = (e) =>
    setForm((current) => ({ ...current, [e.target.name]: e.target.value }));

  const submitHandler = async (e) => {
    e.preventDefault();

    const endpoint = process.env.NEXT_PUBLIC_SERVER__NODE_ENDPOINT;

    let requestProps = {
      url: `${endpoint}/buku`,
      method: "POST",
    };
    if (type.current == "edit") {
      requestProps = {
        url: `${endpoint}/buku/${form._id}`,
        method: "PUT",
      };
    }

    const { penulis, judul } = form;
    let fetching = await fetch(requestProps.url, {
      method: requestProps.method,
      body: JSON.stringify({ penulis, judul }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    let response = await fetching.json();
    modalHandler(false);

    if (type.current == "tambah")
      setListBuku((current) => [...current, response]);

    if (type.current == "edit")
      setListBuku((current) =>
        current.map((buku) => {
          if (buku._id == form._id) {
            buku = form;
          }
          return buku;
        })
      );
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
              <input
                autoComplete="off"
                type="text"
                placeholder="Judul..."
                name="judul"
                onChange={changeInput}
                value={form.judul}
              />
            </div>
            <div className="kalimat__formGroup">
              <TurnedInIcon />
              <input
                autoComplete="off"
                type="text"
                placeholder="Penulis..."
                name="penulis"
                onChange={changeInput}
                value={form.penulis}
              />
            </div>

            <button className="btn submitBtn"> Simpan</button>
          </form>
        </div>
      </div>
    </Modal>
  );
};

export default EditBukuModal;
