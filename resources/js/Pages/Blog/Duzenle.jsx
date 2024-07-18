import AppLayout from "@/Layouts/AppLayout";
import { useEffect, useState } from "react";
import axios from "axios";
import BlogForm from "../../Components/Blog/Form";
import { usePage } from "@inertiajs/react";
import Swal from "sweetalert2";

function BlogDuzenle() {
    const { blog } = usePage().props;

    const blogGonder = (data) => {
        if (blog) {
            axios
                .post("/blog/duzenle/" + blog.slug, data)
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
                }).catch((error) => {
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
        }
    };

    return (
        <>
            <BlogForm
                formBaslik="Blog Düzenle"
                formButtonText="Blog Güncelle"
                blogGonderForm={blogGonder}
            />
        </>
    );
}
BlogDuzenle.layout = (page) => <AppLayout children={page} />;

export default BlogDuzenle;
