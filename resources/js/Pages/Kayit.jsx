import { useState } from "react";
import OturumLayout from "@/Layouts/OturumLayout";
import axios from "axios";
import Swal from "sweetalert2";

function Kayit() {
    const [eposta, setEposta] = useState();
    const [sifre, setSifre] = useState();
    const [isim, setIsim] = useState(false);

    const form = {
        isim: isim,
        eposta: eposta,
        sifre: sifre,
    };

    function FormGonderme() {
        axios
            .post("/kayit", form)
            .then((response) => {
                return Swal.fire({
                    icon: "success",
                    title: "Başarılı",
                    html: response.data
                        ? `<p class="text-center">${response.data.mesaj}</p>`
                        : false,
                    confirmButtonText: "Tamam !",
                    heightAuto: false,
                });
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
                    <div className="text-center mb-4 h1">Kayıt</div>

                    <div className="mb-3">
                        <label className="form-label fw-medium">İsim</label>
                        <input
                            type="text"
                            className="form-control"
                            onChange={(e) => {
                                setIsim(e.target.value);
                            }}
                        />
                    </div>

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

                    <div className="d-grid mt-4">
                        <button
                            className="btn fs-5 fw-bold btn-dark"
                            type="button"
                            onClick={() => FormGonderme()}
                        >
                            Kayıt Ol
                        </button>
                    </div>


                </div>
                <div className="card-footer text-center">
                    <a href="/giris" className="text-decoration-none fw-medium">Giriş Yap !</a>
                </div>
            </form>
        </>
    );
}
Kayit.layout = (page) => <OturumLayout children={page} />;

export default Kayit;
