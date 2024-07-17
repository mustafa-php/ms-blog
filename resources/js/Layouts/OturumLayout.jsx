import { usePage } from "@inertiajs/react";

export default function Layout({ children }) {
    return (
        <>
            <main className="formContainer">{children}</main>
        </>
    );
}
