import { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Sell Product',
    description: 'Sell Product'
}

export default function SellProductLayout({
    children
}: {
    children: React.ReactNode
}) {
    return <>{children}</>
}
