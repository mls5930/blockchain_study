import { Header } from "../components/header";
import { Outlet } from "react-router-dom";

export const HerderPage = () => {
    return (
        <div>
            <Header />
            <Outlet />
        </div>
    )
}