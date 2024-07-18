import { useForm } from "react-hook-form";
import OturumLayout from "@/Layouts/OturumLayout";
import axios from "axios";
import Swal from "sweetalert2";

const Giris = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = async (data) => {
        try {
            await axios.post("/giris", data);
            window.location = "/";
        } catch (error) {
            const errorMessage = error.response ? error.response.data.message : "Bir hata oluştu!";
            Swal.fire({
                icon: "error",
                title: "Başarısız",
                html: `<p class="text-center">${errorMessage}</p>`,
                confirmButtonText: "Tamam!",
                heightAuto: false,
            });
        }
    };

    return (
        <form className="oturumForm card" onSubmit={handleSubmit(onSubmit)}>
            <div className="card-body">
                <div className="text-center mb-4 h1">Giriş</div>
                <FormInput
                    label="Eposta"
                    type="text"
                    name="eposta"
                    register={register}
                    validation={{ required: "Eposta gereklidir" }}
                    error={errors.eposta}
                />
                <FormInput
                    label="Şifre"
                    type="password"
                    name="sifre"
                    register={register}
                    validation={{ required: "Şifre gereklidir" }}
                    error={errors.sifre}
                />
                <div className="d-flex justify-content-between">
                    <div className="form-check">
                        <input
                            className="form-check-input"
                            type="checkbox"
                            {...register("remember")}
                        />
                        <label className="form-check-label fw-medium" htmlFor="remember">
                            Beni Hatırla
                        </label>
                    </div>
                </div>
                <div className="d-grid mt-4">
                    <button className="btn fs-5 fw-bold btn-dark" type="submit">
                        Giriş
                    </button>
                </div>
            </div>
            <div className="card-footer text-center">
                <a href="/kayit" className="text-decoration-none fw-medium">
                    Hesabın yok mu? Kayıt Ol!
                </a>
            </div>
        </form>
    );
};

const FormInput = ({ label, type, name, register, validation, error }) => (
    <div className="mb-3">
        <label className="form-label fw-medium">{label}</label>
        <input
            type={type}
            className={`form-control ${error ? 'is-invalid' : ''}`}
            {...register(name, validation)}
        />
        {error && <div className="invalid-feedback">{error.message}</div>}
    </div>
);

Giris.layout = (page) => <OturumLayout children={page} />;

export default Giris;
