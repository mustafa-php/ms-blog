import { usePage } from "@inertiajs/react";
import viteLogo from "@assets/logo/vitejs.svg";
import manPng from "@assets/png/man.png";

export default function Header() {
    const { oturumDurum, oturumSahibi } = usePage().props;

    const navBar = oturumDurum ? (
        <LoggedInNav oturumSahibi={oturumSahibi} />
    ) : (
        <LoggedOutNav />
    );

    return (
        <header className="d-flex justify-content-between align-items-center py-3">
            <div>
                <a href="/">
                    <img src={viteLogo} alt="Vite Logo" className="headLogo" />
                </a>
            </div>
            <nav>{navBar}</nav>
        </header>
    );
}

const LoggedInNav = ({ oturumSahibi }) => (
    <>
        <a href="/blog/ekle" className="btn btn-primary me-2 fs-5">
            Blog Yaz
        </a>
        <div className="navOge d-grid">
            <button
                type="button"
                className="btn btn-primary p-0 rounded-circle d-flex justify-content-center align-items-center"
                data-bs-toggle="dropdown"
                data-bs-auto-close="outside"
            >
                <img src={manPng} alt="User" style={{ height: "2.5rem" }} />
            </button>
            <ul className="dropdown-menu dropdown-menu-end">
                <li className="p-3">
                    <span>{oturumSahibi.isim}</span>
                </li>
                <li>
                    <hr className="dropdown-divider" />
                </li>
                <li>
                    <a className="dropdown-item text-danger" href="/cikis">
                        Çıkış
                    </a>
                </li>
            </ul>
        </div>
    </>
);

const LoggedOutNav = () => (
    <a href="/giris" className="btn btn-primary">
        Giriş
    </a>
);
