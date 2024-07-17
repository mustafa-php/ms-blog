import AppLayout from "@/Layouts/AppLayout";
import { useEffect, useState } from "react";
import axios from "axios";
import BlogForm from "../../Components/Blog/Form";
import { usePage } from "@inertiajs/react";
import Swal from "sweetalert2";

function BlogEkle() {
    const { blog } = usePage().props;
    const [baslikData, setBaslikData] = useState("");
    const [editorData, setEditorData] = useState("");

    let form = {
        baslik: baslikData,
        icerik: editorData,
    };

    const handleBaslikChange = (event) => {
        const baslik = event.target.value;
        setBaslikData(baslik);
    };

    const handleEditorChange = (event, editor) => {
        const icerik = editor.getData();
        setEditorData(icerik);
    };

    const blogGonder = () => {
        if (blog) {
            axios
                .post("/blog/duzenle/" + blog.slug, form)
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
                            : `<p class="text-center">Blog Oluşturulamadı !</p>`
                        ,
                        confirmButtonText: "Tamam !",
                        heightAuto: false,
                    });
                });
        }
    };

    useEffect(() => {
        if (blog) {
            setBaslikData(blog.baslik);
            setEditorData(blog.icerik);
        }
    }, []);

    return (
        <>
            <BlogForm formBaslik="Blog Düzenle" formButtonText="Blog Güncelle" BaslikChange={handleBaslikChange} EditorChange={handleEditorChange} blogGonderForm={blogGonder} />
        </>
    );
}
BlogEkle.layout = (page) => <AppLayout children={page} />;

export default BlogEkle;
