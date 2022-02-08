import React from "react";
import {Link, Outlet} from "react-router-dom";

export function Layout() {
    return <>
        <header className="top">
            <div className={'top__title'}>Food Reserve</div>

            <Link to={'/add'}>
                <button className={'top__btn is-safe'}>add</button>
            </Link>
        </header>

        <Outlet/>
    </>
}