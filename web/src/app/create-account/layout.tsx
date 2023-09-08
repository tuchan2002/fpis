import { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Create Account',
    description: 'Create Account'
}

export default function CreateAccountLayout({
    children
}: {
    children: React.ReactNode
}) {
    return <>{children}</>
}
