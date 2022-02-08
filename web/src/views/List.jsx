import React from "react";
import {Product, useGetAsync} from "@/helpers";
import axios from 'axios'
import {ProductCard} from "@/views/ProductCard";

export function List() {
    const {
        value: products,
        call: fetchProducts
    } = useGetAsync(async () =>
        (await axios.get(`http://localhost:3000/list/`)).data.map(Product)
        , {
        dependencies: [],
        initialCall: true
    })

    return <>
        <main className="cards">
            { products && products.map(product =>
                <ProductCard product={product}/>
            ) }
        </main>
    </>
}