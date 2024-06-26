import React from 'react'
import { Link } from 'react-router-dom'

const Cardscg = ({ title }) => {
    return (

        <div className="cardscg" style={{ "border": "2px solid black" }}>
            <h1>{title}</h1>
            <Link to={`/Shop/?cg=${title}`} className="ShopNowcg">Shop Now</Link>
        </div>
    )
}

export default Cardscg
