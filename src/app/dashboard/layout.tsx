import DashboardLayout from '@/components/dashboard-layout/DashboardLayout'

export default function MainDashboardLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<>
			<DashboardLayout>{children}</DashboardLayout>
		</>
	)
}
