import AdminLayout from '@/components/admin-layout/AdminLayout'

export default function MainAdminLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<>
			<AdminLayout>{children}</AdminLayout>
		</>
	)
}
