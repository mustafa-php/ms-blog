import AppLayout from "@/Layouts/AppLayout";
import { usePage } from "@inertiajs/react";

function BlogGoster() {
    const { blog } = usePage().props;

    return (
        <>
            <div className="container">
                <div className="row">
                    <div className="col-lg-8 col-md-10 col-12">
                        <article className="card">
                            <div className="card-header">
                                <div className="card-title">
                                    <h1>{blog && blog.baslik}</h1>
                                </div>
                            </div>

                            <div className="card-body">
                                <div
                                    dangerouslySetInnerHTML={{
                                        __html: blog && blog.icerik,
                                    }}
                                />{" "}
                            </div>

                            <div className="card-footer">
                                Yazar : {blog && blog.yazar}
                            </div>
                        </article>
                    </div>
                </div>
            </div>
        </>
    );
}

BlogGoster.layout = (page) => <AppLayout children={page} />;

export default BlogGoster;
