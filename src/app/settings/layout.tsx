import SettingsLayout from '@/components/settings-layout/SettingsLayout'

export default async function LSettingsLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<>
			<SettingsLayout>{children}</SettingsLayout>
		</>
	)
}
