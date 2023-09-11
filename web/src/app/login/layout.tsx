import { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'FPISystem',
    description: 'FPISystem'
}

export default function LoginLayout({
    children
}: {
    children: React.ReactNode
}) {
    return <>{children}</>
}
