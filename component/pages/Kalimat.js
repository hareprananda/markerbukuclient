import React, { useEffect, useRef, useState } from "react";
import AccountBalanceIcon from "@material-ui/icons/AccountBalance";
import TurnedInIcon from "@material-ui/icons/TurnedIn";
import AssignmentIcon from "@material-ui/icons/Assignment";
import AddIcon from "@material-ui/icons/Add";
import { autoGrow } from "../../lib/utility/form";
import { useRouter } from "next/router";
import { requestBuku, requestSingleMarker } from "../../lib/http/api";
const Kalimat = ({ editInitialData, booksAvailable = [], type = "tambah" }) => {
  const router = useRouter();
  const [availBooks, setAvailBooks] = useState(booksAvailable);
  const numberOfRender = useRef(0);
  const [form, setForm] = useState(
    editInitialData || {
      idbuku: "",
      kalimat: "",
      halaman: "",
    }
  );
  const submitHandler = async (e) => {
    e.preventDefault();
    let requestProps = {
      url: `${process.env.NEXT_PUBLIC_SERVER__NODE_ENDPOINT}/marker`,
      method: "POST",
    };
    if (type != "tambah") {
      requestProps = {
        url: `${process.env.NEXT_PUBLIC_SERVER__NODE_ENDPOINT}/marker/${form._id}`,
        method: "PUT",
      };
    }

    let data = await fetch(requestProps.url, {
      method: requestProps.method,
      body: JSON.stringify(form),
      headers: {
        "Content-Type": "application/json",
      },
    });
    data = await data.json();
    alert(`Kalimat berhasil di ${editInitialData ? "update" : "tambahkan"}`);
    router.push("/");
  };
  useEffect(() => {
    (async () => {
      if (availBooks.length == 0) setAvailBooks(await requestBuku());

      if (type != "tambah" && !editInitialData) {
        const { id: markerId } = router.query;
        setForm(await requestSingleMarker(markerId));
      }
    })();
  }, []);
  useEffect(() => {
    console.log(++numberOfRender.current);
  });
  const changeInput = (e) =>
    setForm((current) => ({ ...current, [e.target.name]: e.target.value }));

  return (
    <div className="kalimat__container">
      <form onSubmit={submitHandler}>
        <div className="kalimat__formGroup">
          <AccountBalanceIcon />
          <select value={form.idbuku} onChange={changeInput} name="idbuku">
            <option value="" disabled>
              Pilih Judul
            </option>
            {availBooks.map((buku) => (
              <option value={buku._id} key={buku._id}>
                {buku.judul}
              </option>
            ))}
          </select>
        </div>
        <div className="kalimat__formGroup">
          <TurnedInIcon />
          <input
            name="halaman"
            type="number"
            placeholder="Halaman..."
            onChange={changeInput}
            value={form.halaman}
          />
        </div>
        <div className="kalimat__formGroup">
          <AssignmentIcon />
          <textarea
            name="kalimat"
            placeholder="Kalimat..."
            onInput={autoGrow}
            onChange={changeInput}
            value={form.kalimat}
          />
        </div>
        <button className="btn submitBtn">
          <AddIcon /> {type == "tambah" ? "Tambah" : "Update"}
        </button>
      </form>
    </div>
  );
};

export default Kalimat;
