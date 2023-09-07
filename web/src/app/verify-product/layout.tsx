import { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Verify Product',
    description: 'Verify Product'
}

export default function VerifyProductLayout({
    children
}: {
    children: React.ReactNode
}) {
    return <>{children}</>
}
