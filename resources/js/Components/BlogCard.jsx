import { usePage } from "@inertiajs/react";

export default function BlogCard({blog, BlogSil}) {

    const { oturumDurum, oturumSahibi } = usePage().props;

    return <>
        <div className="col-lg-6 col-12 mb-3" >
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
                            onClick={() => { BlogSil(); }}
                        >
                            Sil
                        </button>
                    ) : (
                        ""
                    )}
                </div>
            </div>
        </div>
    </>
}