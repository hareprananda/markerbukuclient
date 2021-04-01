import React, { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
const Header = () => {
  const router = useRouter();

  useEffect(() => {
    let { pathname } = router;
    pathname = pathname.replace("/", "");
    const allMenuEl = document.querySelectorAll(".headerContainer__menu");
    [...allMenuEl].forEach((menuEl) => menuEl.classList.remove("active"));
    document.querySelector(`#${pathname}__headerMenu`).classList.add("active");
  }, [router]);
  return (
    <div className="headerContainer">
      <div className="headerContainer__content">
        <div className="px-60">
          <h1 className="logo__app">P</h1>
        </div>

        <div className="headerContainer__sideMenu">
          <Link href="/">
            <a className="headerContainer__menu active" id="__headerMenu">
              <h2>Home</h2>
            </a>
          </Link>
          <Link href="/kalimat">
            <a className="headerContainer__menu" id="kalimat__headerMenu">
              <h2>Kalimat </h2>
            </a>
          </Link>
          <Link href="/buku">
            <a className="headerContainer__menu" id="buku__headerMenu">
              <h2>Buku </h2>
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Header;
