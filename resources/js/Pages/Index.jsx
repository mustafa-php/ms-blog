import { usePage } from "@inertiajs/react";
import AppLayout from "@/Layouts/AppLayout";
import axios from "axios";
import BlogCard from "../Components/BlogCard";
import { useState } from "react";

const Index = () => {
    const { bloglar } = usePage().props;
    const [filteredKategori, setFilteredKategori] = useState('');
    const [araTerm, setAraTerm] = useState('');



    const blogList = bloglar.data;
    const handleKategoriChange = (event) => {
        setFilteredKategori(Number(event.target.value));
    };

    const handleAraChange = (event) => {
        setAraTerm(event.target.value);
    };

    const filteredBlog = blogList.filter(blog =>
        (filteredKategori ? blog.kategori === filteredKategori : true) &&
        (araTerm ? blog.baslik.toLowerCase().includes(araTerm.toLowerCase()) : true)
    );

    return (
        <div className="container">
            <Header />
            <Filter
                araTerm={araTerm}
                filteredKategori={filteredKategori}
                handleAraChange={handleAraChange}
                handleKategoriChange={handleKategoriChange}
            />
            <BlogList bloglar={filteredBlog} BlogSil={BlogSil} />
            <Pagination bloglar={bloglar} />
        </div>
    );
};

const Header = () => (
    <div className="row">
        <h1 className="text-center mb-5">Bloglar</h1>
    </div>
);

const Filter = ({ araTerm, filteredKategori, handleAraChange, handleKategoriChange }) => (
    <div className="row mb-2">
        <div className="col-12">
            <div className="card">
                <div className="card-header">
                    <div className="fs-5">Filtre</div>
                </div>
                <div className="card-body d-flex">
                    <div className="col-3 pe-2">
                        <label className="form-label fw-medium">Ara</label>
                        <input
                            placeholder="Ara..."
                            className="form-control"
                            value={araTerm}
                            onChange={handleAraChange}
                        />
                    </div>
                    <div className="col-3 pe-2">
                        <label className="form-label fw-medium">Kategori</label>
                        <select
                            className="filterKategori form-select"
                            value={filteredKategori}
                            onChange={handleKategoriChange}
                        >
                            <option value="">Tüm Kategoriler</option>
                            <option value="1">Tarih</option>
                            <option value="2">Ekonomi</option>
                            <option value="3">Yazılım</option>
                        </select>
                    </div>
                </div>
            </div>
        </div>
    </div>
);

const BlogList = ({ bloglar, BlogSil }) => (
    <div className="row">
        {bloglar.length > 0 ? (
            bloglar.map((blog) => (
                <BlogCard blog={blog} BlogSil={() => BlogSil(blog.slug)} key={blog.id} />
            ))
        ) : (
            <div className="fs-2">Mevcut Blog Yok!</div>
        )}
    </div>
);

const Pagination = ({ bloglar }) => (
    <div className="d-flex justify-content-center align-items-center">
        {bloglar.prev_page_url && (
            <button className="btn mx-1 btn-primary" onClick={() => window.location = bloglar.prev_page_url}>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-chevron-left" viewBox="0 0 16 16">
                    <path fillRule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0" />
                </svg> Geri
            </button>
        )}
        {bloglar.next_page_url && (
            <button className="btn m-1 btn-primary" onClick={() => window.location = bloglar.next_page_url}>
                İleri
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-chevron-right" viewBox="0 0 16 16">
                    <path fillRule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708" />
                </svg>
            </button>
        )}
    </div>
);

const BlogSil = (slug) => {
    axios.post(`/blog/sil/${slug}`)
        .then(() => {
            window.location = "/";
        })
        .catch(error => {
            console.error("There was an error deleting the blog!", error);
        });
};

Index.layout = (page) => <AppLayout children={page} />;

export default Index;
