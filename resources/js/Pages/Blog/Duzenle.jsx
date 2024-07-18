import AppLayout from "@/Layouts/AppLayout";
import { useEffect, useState } from "react";
import axios from "axios";
import BlogForm from "../../Components/Blog/Form";
import { usePage } from "@inertiajs/react";

function BlogEkle() {
    const { blog } = usePage().props;
    const [baslik, setBaslik] = useState("");
    const [icerik, setIcerik] = useState("");

    useEffect(() => {
        if (blog) {
            setBaslik(blog.baslik);
            setIcerik(blog.icerik);
        }
    }, [blog]);

    const handleBaslikChange = (event) => {
        setBaslik(event.target.value);
    };

    const handleEditorChange = (event, editor) => {
        setIcerik(editor.getData());
    };

    const blogGonder = () => {
        if (!baslik.trim() || !icerik.trim()) {
            alert("Başlık ve içerik alanları boş olamaz!");
            return;
        }

        axios
            .post(blog ? "/blog/duzenle/" + blog.slug : "/blog/ekle", { baslik, icerik })
            .then((response) => {
                alert("İşlem başarıyla tamamlandı: " + response.data.mesaj);
                // İşlem tamamlandıktan sonra yönlendirme veya başka bir işlem yapılabilir
            })
            .catch((error) => {
                let errorMessage = error.response ? error.response.data.message : "Bir hata oluştu!";
                alert("Hata: " + errorMessage);
            });
    };

    return (
        <>
            <BlogForm
                formBaslik={blog ? "Blog Düzenle" : "Blog Ekle"}
                formButtonText={blog ? "Blog Güncelle" : "Blog Oluştur"}
                BaslikChange={handleBaslikChange}
                EditorChange={handleEditorChange}
                blogGonderForm={blogGonder}
            />
        </>
    );
}

BlogEkle.layout = (page) => <AppLayout children={page} />;

export default BlogEkle;