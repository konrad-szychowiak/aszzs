import React, {useState} from "react";
import {useParams} from "react-router";
import {Product, useGetAsync} from "@/helpers";
import axios from "axios";
import {ProductCard} from "@/views/ProductCard";
import {Link} from "react-router-dom";

function ValueControl({name, value, onChange}) {
    const [val, setVal] = useState(value);
    return <>
        <div>
            <h3>{name}</h3>
            <button onClick={() => setVal(Math.max(val - 1, 0))}>-</button>
            <span>{val}</span>
            <button onClick={() => setVal(val + 1)}>+</button>
            <button onClick={() => {
                onChange(val)
            }
            }>save</button>
        </div>
    </>
}

export function Read() {
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
        {/*{JSON.stringify(product)}*/}
        <main className="cards details">
            <section>
                <Link to={'/list'}>
                    <button>Go back</button>
                </Link>

                <ProductCard product={product} hasDetailsLink={false}/>

                <button onClick={() => {
                    axios.post(`http://localhost:3000/update/`, product)
                }}>Save</button>
            </section>

            <section>
                <h2>Info</h2>
                <ValueControl name={'Reserve'} value={product.reserve} onChange={(changed) => {
                    setProduct({...product, reserve: changed})
                }}/>
                <ValueControl name={'Medium Level'} value={product.medium} onChange={(changed) => {
                    setProduct({...product, medium: changed})
                }}/>
                <ValueControl name={'Critical Level'} value={product.critical} onChange={(changed) => {
                    setProduct({...product, critical: changed})
                }}/>
            </section>

            <section>
                <h2>History</h2>
                <em>Work in progress</em>
            </section>


            {/*critical level: <span>\{critical}</span>*/}
            {/*medium level: <span>\{medium}</span>*/}
        </main>
    </>
}