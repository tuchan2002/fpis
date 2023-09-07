import { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Change Ownership',
    description: 'Change Ownership'
}

export default function ChangeOwnershipLayout({
    children
}: {
    children: React.ReactNode
}) {
    return <>{children}</>
}
