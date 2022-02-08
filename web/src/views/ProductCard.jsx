import {Link} from "react-router-dom";
import React from "react";

export function ProductCard({hasDetailsLink = true, hasDeleteLink = true, product}) {
    return <div className={`product is-${product.level()}`}>
        <span className={`product__name`}>{product.name}</span>
        <div className="product__reserve">
            {product.level()} reserve ({product.reserve})
        </div>
        <div className="product__actions">
            {hasDetailsLink && <Link to={`/read/${product.code}`}>
                <button>details</button>
            </Link>}
            {hasDeleteLink &&
            <Link to={`/delete/${product.code}`}>
                <button>delete</button>
            </Link>}
        </div>
    </div>;
}