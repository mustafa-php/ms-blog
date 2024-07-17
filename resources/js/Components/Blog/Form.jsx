
import { CKEditor } from "@ckeditor/ckeditor5-react";
import { useState, useEffect, useRef } from "react";
import "ckeditor5/ckeditor5.css";

import {
    ClassicEditor, AccessibilityHelp, Autosave, Bold, Essentials, Italic, Paragraph, SelectAll, Undo,
} from "ckeditor5";

import translations from "ckeditor5/translations/tr.js";
import { usePage } from "@inertiajs/react";

export default function BlogForm({ formBaslik, formButtonText, BaslikChange, EditorChange, blogGonderForm }) {
    const [isLayoutReady, setIsLayoutReady] = useState(false);
    const editorContainerRef = useRef(null);
    const editorRef = useRef(null);
    const { blog } = usePage().props;

    const editorConfig = {
        toolbar: {
            items: [
                "undo",
                "redo",
                "|",
                "selectAll",
                "|",
                "bold",
                "italic",
                "|",
                "accessibilityHelp",
            ],
            shouldNotGroupWhenFull: false,
        },
        plugins: [
            AccessibilityHelp,
            Autosave,
            Bold,
            Essentials,
            Italic,
            Paragraph,
            SelectAll,
            Undo,
        ],
        initialData: blog ? blog.icerik : " ",
        language: "tr",
        placeholder: "Blog Metini Yaz!",
        translations: [translations],
    };

    useEffect(() => {
        setIsLayoutReady(true);
        return () => setIsLayoutReady(false);
    }, []);

    return <>
        <div className="container">
            <div className="fs-5 mb-4"><a href="/">Anasayfa</a></div>
            <div className="row">
                <h1 className="mb-5">{formBaslik}</h1>
            </div>

            <div className="row">
                <div className="col-12">
                    <div className="card ">
                        <div className="card-body">
                            <div className="mb-3">
                                <label className="form-label">Başlık</label>
                                <input
                                    type="text"
                                    defaultValue={blog && blog.baslik}
                                    className="form-control"
                                    onChange={BaslikChange}
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">
                                    İçerik
                                </label>
                                <div className="main-container">
                                    <div
                                        className="editor-container editor-container_classic-editor"
                                        ref={editorContainerRef}
                                    >
                                        <div className="editor-container__editor">
                                            <div ref={editorRef}>
                                                {isLayoutReady && (
                                                    <CKEditor
                                                        editor={
                                                            ClassicEditor
                                                        }
                                                        config={
                                                            editorConfig
                                                        }
                                                        onChange={
                                                            EditorChange
                                                        }
                                                    />
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="d-flex justify-content-end">
                                <div className="col-4 d-grid">
                                    <button
                                        className="btn btn-success"
                                        onClick={blogGonderForm}
                                    >
                                        {formButtonText}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
}