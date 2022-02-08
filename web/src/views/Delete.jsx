import React from "react";
import {useParams} from "react-router";
import {api, Product, useGetAsync} from "@/helpers";
import {ProductCard} from "@/views/ProductCard";
import {Link} from "react-router-dom";

export function Delete() {
    const {code} = useParams()
    const {
        value: product,
        setValue: setProduct,
        call: fetchProduct
    } = useGetAsync(async () =>
            Product((await api.get(`/one/${code}`)).data)
        , {
            dependencies: [],
            initialCall: true
        })

    if (!product) return <></>

    return <>
        <main className={'cards'}>
            <ProductCard product={product} hasDetailsLink={false} hasDeleteLink={false}/>

            <section>
                <p>Do you really want to delete <em>{product.name}</em>@{code}?</p>
                <div>
                    <Link to={'/list'}>
                        <button className={'btn is-safe'}>no</button>
                    </Link>
                    <button
                        className={'btn mw1 is-critical'}
                        onClick={async () => {
                            await api.delete(`/product/${code}`)
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