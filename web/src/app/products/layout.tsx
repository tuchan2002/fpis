import { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Products',
    description: 'Products'
}

export default function ProductsLayout({
    children
}: {
    children: React.ReactNode
}) {
    return <>{children}</>
}
