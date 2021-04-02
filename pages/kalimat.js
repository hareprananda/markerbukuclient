import React from "react";
import AccountBalanceIcon from "@material-ui/icons/AccountBalance";
import TurnedInIcon from "@material-ui/icons/TurnedIn";
import AssignmentIcon from "@material-ui/icons/Assignment";
import AddIcon from "@material-ui/icons/Add";
import { autoGrow } from "../lib/utility/form";
const kalimat = () => {
  const submitHandler = (e) => {
    e.preventDefault();
  };
  return (
    <div className="kalimat__container">
      <form onSubmit={submitHandler}>
        <div className="kalimat__formGroup">
          <AccountBalanceIcon />
          <select placeholder="Pilih Judul...">
            <option>Intelligent Investor</option>
            <option>Seni Negosiasi</option>
            <option>How to Win Friends and influence people</option>
          </select>
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
  );
};

export default kalimat;
