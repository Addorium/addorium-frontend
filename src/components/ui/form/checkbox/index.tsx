// Checkbox.tsx
'use client'
import React, { useEffect } from 'react'

interface CustomCheckboxProps {
	label?: string
	className?: string
	checked?: boolean
	onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const Checkbox: React.FC<CustomCheckboxProps> = ({
	className,
	label,
	checked,
	onChange,
	...rest
}) => {
	const [checkedState, setChecked] = React.useState(checked)
	useEffect(() => {
		setChecked(checked)
	}, [checked])
	return (
		<div className=''>
			<label className='flex items-center cursor-pointer relative'>
				<input
					checked={checkedState}
					onChange={e => {
						setChecked(e.target.checked)
						onChange && onChange(e)
					}}
					type='checkbox'
					className='peer h-5 w-5 cursor-pointer transition-all appearance-none rounded shadow hover:shadow-md border border-slate-300 checked:bg-core-1 checked:border-core-2'
					id='check'
				/>
			</label>
		</div>
	)
}

export default Checkbox
