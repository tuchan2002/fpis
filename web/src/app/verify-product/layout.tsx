import { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Verify',
    description: 'Verify'
}

export default function VerifyLayout({
    children
}: {
    children: React.ReactNode
}) {
    return <>{children}</>
}
