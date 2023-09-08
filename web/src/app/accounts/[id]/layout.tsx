import { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Account Detail',
    description: 'Account Detail'
}

export default function AccountDetailLayout({
    children
}: {
    children: React.ReactNode
}) {
    return <>{children}</>
}
