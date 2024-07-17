import { usePage } from "@inertiajs/react";
import AppLayout from "@/Layouts/AppLayout";
import axios from "axios";

const Index = () => {
    const { bloglar, oturumDurum, oturumSahibi } = usePage().props;
    let blogList = bloglar.data;

    const BlogSil = (slug) => {
        axios.post("blog/sil/" + slug).then(() => {
            window.location = "/";
        }
        );
    };

    const oncekiSayfa = () => {
        if (bloglar.prev_page_url) {
            window.location = bloglar.prev_page_url;
        }
    }

    const sonrakiSayfa = () => {
        if (bloglar.next_page_url) {
            window.location = bloglar.next_page_url;
        }
    }

    return (
        <>
            <div className="container">
                <div className="row">
                    <h1 className="text-center mb-5">Bloglar</h1>
                </div>
                <div className="row">
                    {blogList.length > 0
                        ? blogList.map((blog) => (
                            <div className="col-lg-6 col-12 mb-3" key={blog.id}>
                                <div className="card">
                                    <div className="card-header fs-4">
                                        {blog.baslik}
                                    </div>
                                    <div className="card-body">
                                        <div
                                            dangerouslySetInnerHTML={{
                                                __html: blog.icerik,
                                            }}
                                        />
                                    </div>
                                    <div className="card-footer d-flex justify-content-between">
                                        <div>
                                            <a
                                                href={
                                                    "/blog/goster/" +
                                                    blog.slug
                                                }
                                                className="btn btn-primary"
                                            >
                                                Oku
                                            </a>
                                            {oturumDurum &&
                                                blog.yazar_id ==
                                                oturumSahibi.id ? (
                                                <a
                                                    href={
                                                        "/blog/duzenle/" +
                                                        blog.slug
                                                    }
                                                    className="btn btn-success ms-2"
                                                >
                                                    Düzenle
                                                </a>
                                            ) : (
                                                ""
                                            )}
                                        </div>{" "}
                                        {oturumDurum &&
                                            blog.yazar_id == oturumSahibi.id ? (
                                            <button
                                                className="btn btn-danger"
                                                onClick={() => {
                                                    BlogSil(blog.slug);
                                                }}
                                            >
                                                Sil
                                            </button>
                                        ) : (
                                            ""
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))
                        : (<div className="fs-2">Mevcut Blog Yok ! </div>)}
                </div>

                {blogList.length >= 20 && ( <div div className="d-flex justify-content-center align-items-center">
                    <button className="btn mx-1 btn-primary" onClick={oncekiSayfa}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-chevron-left" viewBox="0 0 16 16">
                            <path fill-rule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0" />
                        </svg>Geri
                    </button>
                    <button className="btn m-1 btn-primary" onClick={sonrakiSayfa}>İleri
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-chevron-right" viewBox="0 0 16 16">
                            <path fill-rule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708" />
                        </svg>
                    </button>
                </div>)
                }
            </div>
        </>
    );
};

Index.layout = (page) => <AppLayout children={page} />;

export default Index;
