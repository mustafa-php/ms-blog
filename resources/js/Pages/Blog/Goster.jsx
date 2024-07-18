import AppLayout from "@/Layouts/AppLayout";
import { usePage } from "@inertiajs/react";

function BlogGoster() {
    const { blog } = usePage().props;

    return (
        <div className="container my-5">
            <div className="row justify-content-center">
                <div className="col-lg-8 col-md-10 col-12">
                    <article className="card">
                        <header className="card-header">
                            <h1 className="card-title">{blog?.baslik}</h1>
                        </header>
                        <div className="card-body">
                            <div
                                dangerouslySetInnerHTML={{
                                    __html: blog?.icerik,
                                }}
                            />
                        </div>
                        <footer className="card-footer">
                            <p>Yazar: {blog?.yazar}</p>
                        </footer>
                    </article>
                </div>
            </div>
        </div>
    );
}

BlogGoster.layout = (page) => <AppLayout children={page} />;

export default BlogGoster;
