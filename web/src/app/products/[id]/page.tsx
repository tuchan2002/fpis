import React from 'react'

const ProductDetails = ({ params }: { params: { id: string } }) => {
    return <div>{params.id}</div>
}

export default ProductDetails
