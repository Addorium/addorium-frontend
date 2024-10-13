import { useEffect, useState } from 'react'

interface ToggleProps {
	checked: boolean
	onChange: (checked: boolean) => void
	label?: string
	important?: boolean
}

const Toggle: React.FC<ToggleProps> = ({
	checked = false,
	onChange,
	label,
	important,
}) => {
	const [enabled, setEnabled] = useState<boolean>(checked)

	useEffect(() => {
		onChange(enabled)
	}, [enabled])

	return (
		<div className='flex gap-2 items-center'>
			<div
				className={`relative inline-flex items-center h-3 w-11 rounded-full transition-colors cursor-pointer ${
					enabled ? 'bg-core-1/30' : 'bg-gray-2'
				}`}
				onClick={() => setEnabled(!enabled)}
			>
				<span
					className={`${
						enabled ? 'translate-x-6 bg-core-0' : 'translate-x-0 bg-gray-5'
					} inline-block w-6 h-6 transform rounded-full  transition-transform`}
				/>
			</div>
			{label && (
				<label className='px-2 flex gap-1 text-[17px] text-gray-6'>
					{label}
					{important && <p className='text-red'>*</p>}
				</label>
			)}
		</div>
	)
}

export default Toggle
