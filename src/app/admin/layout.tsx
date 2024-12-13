import AdminLayout from '@/components/admin-layout/AdminLayout'
import { hasPermission } from '@/services/role.service'
import { getServerAuth } from '@/utils/server/get-server-auth'
import { notFound } from 'next/navigation'

export const getUser = async () => {
	const user = await getServerAuth()
	return user
}

export default async function MainAdminLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	const user = await getUser()
	const requiredPermissions = 'admin:dashboard.see'
	const hasPermissions = hasPermission(
		user?.role.permissions || [],
		requiredPermissions
	)
	if (!hasPermissions) {
		return notFound()
	}
	return (
		<>
			{hasPermissions}
			<AdminLayout>{children}</AdminLayout>
		</>
	)
}
