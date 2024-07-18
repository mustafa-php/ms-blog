import { useForm } from "react-hook-form";
import OturumLayout from "@/Layouts/OturumLayout";
import axios from "axios";
import Swal from "sweetalert2";

const Kayit = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = async (data) => {
        try {
            const response = await axios.post("/kayit", data);
            Swal.fire({
                icon: "success",
                title: "Başarılı",
                html: response.data
                    ? `<p class="text-center">${response.data.mesaj}</p>`
                    : "Kayıt işlemi başarılı!",
                confirmButtonText: "Tamam!",
                heightAuto: false,
            });
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
                <div className="text-center mb-4 h1">Kayıt</div>

                <FormInput
                    label="İsim"
                    type="text"
                    name="isim"
                    register={register}
                    validation={{ required: "İsim gereklidir" }}
                    error={errors.isim}
                />
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

                <div className="d-grid mt-4">
                    <button className="btn fs-5 fw-bold btn-dark" type="submit">
                        Kayıt Ol
                    </button>
                </div>
            </div>
            <div className="card-footer text-center">
                <a href="/giris" className="text-decoration-none fw-medium">Giriş Yap!</a>
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

Kayit.layout = (page) => <OturumLayout children={page} />;

export default Kayit;