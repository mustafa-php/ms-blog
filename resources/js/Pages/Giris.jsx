import { useState } from "react";
import OturumLayout from "@/Layouts/OturumLayout";
import axios from "axios";
import Swal from "sweetalert2";

function Giris() {
    const [eposta, setEposta] = useState();
    const [sifre, setSifre] = useState();
    const [remember, setRemember] = useState(false);

    const form = {
        eposta: eposta,
        sifre: sifre,
        remember: remember,
    };

    function FormGonderme() {
        axios
            .post("/giris", form)
            .then((response) => {
                window.location = "/"
            })
            .catch((error) => {
                let errors = error.response ? error.response.data.message : null;

                return Swal.fire({
                    icon: "error",
                    title: "Başarısız",
                    html: errors
                        ? `<p class="text-center">${errors}</p>`
                        : `<p class="text-center">Blog Oluşturulamadı !</p>`
                    ,
                    confirmButtonText: "Tamam !",
                    heightAuto: false,
                });
            });
    }

    return (
        <>
            <form className="oturumForm card">
                <div className="card-body">
                    <div className="text-center mb-4 h1">Giriş</div>
                    <div className="mb-3">
                        <label className="form-label fw-medium">Eposta</label>
                        <input
                            type="text"
                            className="form-control"
                            onChange={(e) => {
                                setEposta(e.target.value);
                            }}
                        />
                    </div>

                    <div className="mb-3">
                        <label className="form-label fw-medium">Şifre</label>
                        <input
                            type="password"
                            className="form-control"
                            onChange={(e) => {
                                setSifre(e.target.value);
                            }}
                        />
                    </div>

                    <div className="d-flex justify-content-between">
                        <div className="form-check">
                            <input
                                className="form-check-input"
                                type="checkbox"
                                value="true"
                                id="remember"
                                onChange={(e) => {
                                    setRemember(!remember);
                                }}
                            />
                            <label
                                className="form-check-label fw-medium"
                                htmlFor="remember"
                            >
                                Beni Hatırla
                            </label>
                        </div>
                    </div>
                    <div className="d-grid mt-4">
                        <button
                            className="btn fs-5 fw-bold btn-dark"
                            type="button"
                            onClick={() => FormGonderme()}
                        >
                            Giriş
                        </button>
                    </div>
                </div>
                <div className="card-footer text-center ">
                    <a href="/kayit" className="text-decoration-none fw-medium">
                        Hesabın yok mu ? Kayıt Ol!
                    </a>
                </div>
            </form>
        </>
    );
}

Giris.layout = (page) => <OturumLayout children={page} />;

export default Giris;
