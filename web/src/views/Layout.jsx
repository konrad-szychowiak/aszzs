import React from "react";
import {Link, Outlet} from "react-router-dom";

export function Layout() {
    return <>
        <header className="top">
            <h1>Food Reserve</h1>
            <Link to={'/add'}>
                <button>add</button>
            </Link>
        </header>

        <Outlet/>
    </>
}