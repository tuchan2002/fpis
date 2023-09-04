import { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Move Product',
    description: 'Move Product'
}

export default function MoveProductLayout({
    children
}: {
    children: React.ReactNode
}) {
    return <>{children}</>
}
