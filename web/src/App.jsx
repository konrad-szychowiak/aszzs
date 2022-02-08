import 'regenerator-runtime/runtime'
import {HashRouter, Route, Routes} from "react-router-dom";
import React from 'react';
import {List} from "@/views/List";
import {Layout} from "@/views/Layout";
import {Read} from "@/views/Read";
import {Delete} from "@/views/Delete";

export default function App() {
    return <HashRouter>
        <Routes>
            <Route path={"/"} element={<Layout/>}>
                <Route path={""} element={<List/>}/>
                <Route path={"list"} element={<List/>}/>
                <Route path={"read"}>
                    <Route path={":code"} element={<Read/>}/>
                </Route>
                <Route path={"delete"}>
                    <Route path=":code" element={<Delete/>}/>
                </Route>
            </Route>
        </Routes>
    </HashRouter>
}