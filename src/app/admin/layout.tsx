import AdminLayout from '@/components/admin-layout/AdminLayout'

export default async function MainAdminLayout({
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
