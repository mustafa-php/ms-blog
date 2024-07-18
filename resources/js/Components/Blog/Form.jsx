import { CKEditor } from "@ckeditor/ckeditor5-react";
import { useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import "ckeditor5/ckeditor5.css";
import { ClassicEditor, AccessibilityHelp, Autosave, Bold, Essentials, Italic, Paragraph, SelectAll, Undo } from "ckeditor5";
import translations from "ckeditor5/translations/tr.js";
import { usePage } from "@inertiajs/react";

const BlogForm = ({ formBaslik, formButtonText, blogGonderForm }) => {
    const [icerikHata, setIcerikHata] = useState(false);
    const { register, handleSubmit, setValue, formState: { errors }, watch } = useForm();
    const [isLayoutReady, setIsLayoutReady] = useState(false);
    const editorContainerRef = useRef(null);
    const editorRef = useRef(null);
    const { blog } = usePage().props;

    useEffect(() => {
        setIsLayoutReady(true);
        return () => setIsLayoutReady(false);
    }, []);

    useEffect(() => {
        if (blog) {
            setValue("baslik", blog.baslik);
            setValue("kategori", blog.kategori);
            setValue("icerik", blog.icerik);
        }
    }, [blog, setValue]);

    const handleEditorChange = (event, editor) => {
        const data = editor.getData();
        setValue("icerik", data);
        setIcerikHata(false);
    };

    const onSubmit = (data) => {
        if (!data.icerik || data.icerik === "<p><br></p>") {
            setIcerikHata(true); // İçerik boş ise hata durumunu true yap
            return;
        }

        blogGonderForm(data);
    };

    const editorConfig = {
        toolbar: {
            items: [
                "undo", "redo", "|", "selectAll", "|", "bold", "italic", "|", "accessibilityHelp",
            ],
            shouldNotGroupWhenFull: false,
        },
        plugins: [
            AccessibilityHelp, Autosave, Bold, Essentials, Italic, Paragraph, SelectAll, Undo,
        ],
        initialData: blog ? blog.icerik : " ",
        language: "tr",
        placeholder: "Blog Metini Yaz!",
        translations: [translations],
    };

    return (
        <div className="container">
            <div className="fs-5 mb-4"><a href="/">Anasayfa</a></div>
            <div className="row">
                <h1 className="mb-5">{formBaslik}</h1>
            </div>
            <div className="row">
                <div className="col-12">
                    <div className="card">
                        <div className="card-body">
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <div className="mb-3 d-flex">
                                    <InputField
                                        label="Başlık"
                                        type="text"
                                        name="baslik"
                                        register={register}
                                        className="col-8 pe-2"
                                        validation={{ required: "Başlık gerekli" }}
                                        error={errors.baslik}
                                    />
                                    <SelectField
                                        label="Kategori"
                                        name="kategori"
                                        options={[
                                            { value: "1", label: "Tarih" },
                                            { value: "2", label: "Ekonomi" },
                                            { value: "3", label: "Yazılım" },
                                        ]}
                                        register={register}
                                        className="col-4"
                                        validation={{ required: "Kategori seçimi gerekli" }}
                                        error={errors.kategori}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">İçerik</label>
                                    <div className="main-container">
                                        <div className="editor-container editor-container_classic-editor" ref={editorContainerRef}>
                                            <div className="editor-container__editor" ref={editorRef}>
                                                {isLayoutReady && (
                                                    <CKEditor
                                                        editor={ClassicEditor}
                                                        config={editorConfig}
                                                        onChange={(event, editor) => { handleEditorChange(event, editor) }}
                                                    />
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                    {icerikHata && <div className="text-danger">İçerik boş olamaz!</div>}
                                </div>
                                <div className="d-flex justify-content-end">
                                    <div className="col-4 d-grid">
                                        <button className="btn btn-success" type="submit">
                                            {formButtonText}
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const InputField = ({ label, type, name, register, className, validation, error }) => (
    <div className={className}>
        <label className="form-label">{label}</label>
        <input
            type={type}
            className="form-control"
            {...register(name, validation)}
        />
        {error && <p className="text-danger">{error.message}</p>}
    </div>
);

const SelectField = ({ label, name, options, register, className, validation, error }) => (
    <div className={className}>
        <label className="form-label">{label}</label>
        <select className="form-select" defaultValue={""} {...register(name, validation)}>
            <option value="" disabled>Kategori Seç!</option>
            {options.map((option) => (
                <option key={option.value} value={option.value}>{option.label}</option>
            ))}
        </select>
        {error && <p className="text-danger">{error.message}</p>}
    </div>
);

export default BlogForm;
