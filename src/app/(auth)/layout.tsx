import BlankLayout from "@/components/auth_pages/BlankLayout";

export default function AuthLayout({children,}: { children: React.ReactNode }) {
    return (
        <BlankLayout>
            {children}
        </BlankLayout>
    )
}

