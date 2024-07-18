import AppLayout from "@/Layouts/AppLayout";
import axios from "axios";
import BlogForm from "../../Components/Blog/Form";
import Swal from "sweetalert2";

function BlogEkle() {

    const blogGonder = (data) => {
        axios.post("/blog/ekle", data)
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
                        : `<p class="text-center">Blog Oluşturulamadı !</p>`,
                    confirmButtonText: "Tamam !",
                    heightAuto: false,
                });
            });
    };

    return (
        <BlogForm
            formBaslik="Blog Ekle"
            formButtonText="Blog Oluştur"
            blogGonderForm={blogGonder}
        />
    );
}

BlogEkle.layout = (page) => <AppLayout children={page} />;

export default BlogEkle;