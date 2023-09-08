import { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Account Management',
    description: 'Account Management'
}

export default function AccountManagementLayout({
    children
}: {
    children: React.ReactNode
}) {
    return <>{children}</>
}
