import Header from "../Components/Header";

export default function Layout({ children }) {
    return (
        <>
            <Header></Header>
            <main>{children}</main>
        </>
    );
}
