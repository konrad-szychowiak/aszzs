import React from "react";
import {useParams} from "react-router";
import {Product, useGetAsync} from "@/helpers";
import axios from "axios";
import {ProductCard} from "@/views/ProductCard";
import {Link} from "react-router-dom";

export function Delete() {
    const {code} = useParams()
    const {
        value: product,
        setValue: setProduct,
        call: fetchProduct
    } = useGetAsync(async () =>
            Product((await axios.get(`http://localhost:3000/one/${code}`)).data)
        , {
            dependencies: [],
            initialCall: true
        })

    if (!product) return <></>

    return <>
        <main className={'cards'}>
            <ProductCard product={product} hasDetailsLink={false} hasDeleteLink={false}/>

            <section>
                Do you really want to delete <em>{product.name}</em>@{code}?
                <div>
                    <Link to={'/list'}>
                        <button>no</button>
                    </Link>
                    <button onClick={async () => {
                        await axios.delete(`http://localhost:3000/product/${code}`)
                    }}>
                        <Link to={'/list'}>
                            yes
                        </Link>
                    </button>
                </div>
            </section>
        </main>
    </>
}