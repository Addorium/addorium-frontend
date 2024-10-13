// Checkbox.tsx
'use client'
import React, { useEffect } from 'react'

interface CustomCheckboxProps {
	label?: string
	icon?: React.ReactNode
	className?: string
	checked?: boolean
	disabled?: boolean
	onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const Checkbox: React.FC<CustomCheckboxProps> = ({
	className,
	label,
	checked,
	onChange,
	disabled,
	icon,
	...rest
}) => {
	const [checkedState, setChecked] = React.useState(checked)
	useEffect(() => {
		setChecked(checked)
	}, [checked])
	return (
		<div className='w-fit px-5 mt-1.5'>
			<label className='flex gap-2 items-center cursor-pointer relative'>
				<input
					checked={checkedState}
					onChange={e => {
						setChecked(e.target.checked)
						onChange && onChange(e)
					}}
					disabled={disabled}
					type='checkbox'
					className='peer h-5 w-5 cursor-pointer transition-all appearance-none rounded shadow hover:shadow-md border border-slate-300 checked:bg-core-1 checked:border-core-2'
					id='check'
				/>
				{icon && <span className='icon-container'>{icon}</span>}
				{label && (
					<span className=' text-gray-6 text-sm text-nowrap'>{label}</span>
				)}
			</label>
		</div>
	)
}

export default Checkbox
