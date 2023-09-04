import { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Create Product',
    description: 'Create Product'
}

export default function CreateProductLayout({
    children
}: {
    children: React.ReactNode
}) {
    return <>{children}</>
}
