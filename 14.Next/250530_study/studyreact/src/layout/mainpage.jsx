import { NavLink, Outlet } from "react-router-dom";
import { Page } from "../pages";
import { Page2 } from "../pages/Page2";
import { Page3 } from "../pages/Page3";


export const StudyMainPage = () => {
    return (
        <div>
            <Page />
            <NavLink to="page1">page1페이지 이동하기</NavLink>
            <NavLink to="page2">page2페이지 이동하기</NavLink>
            <NavLink to="/">헤더 페이지로 돌아가기</NavLink>
            <Outlet />
        </div>
    )
}