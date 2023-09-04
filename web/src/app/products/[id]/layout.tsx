import { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Product Details',
    description: 'Product Details'
}

export default function ProductDetailsLayout({
    children
}: {
    children: React.ReactNode
}) {
    return <>{children}</>
}
