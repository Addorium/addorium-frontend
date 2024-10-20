import React, { useState } from 'react'
import Checkbox from '../checkbox'

export interface CheckboxOption {
	icon?: React.ReactNode
	label: string
	value: string
}

interface CheckboxListProps {
	checkboxes: CheckboxOption[]
	onChange: (value: CheckboxOption[]) => void
	defaultValues?: CheckboxOption[]
	isMulti?: boolean
	label?: string
	maxValue?: number
	description?: string
	important?: boolean
	disabled?: boolean
}

export default function CheckboxList({
	checkboxes,
	defaultValues,
	onChange,
	isMulti = false,
	label,
	description,
	important,
	maxValue,
	disabled,
}: CheckboxListProps) {
	const [checked, setChecked] = useState<CheckboxOption[]>(defaultValues || [])

	const handleCheckboxChange = (
		checkbox: CheckboxOption,
		isChecked: boolean
	) => {
		let updatedChecked

		// Проверяем, достигнуто ли максимальное количество выбранных чекбоксов
		if (isMulti && maxValue && checked.length >= maxValue && isChecked) {
			return // Останавливаем добавление, если лимит достигнут
		}

		if (isMulti) {
			if (isChecked) {
				updatedChecked = [...checked, checkbox]
			} else {
				updatedChecked = checked.filter(
					checkedValue => checkedValue.value !== checkbox.value
				)
			}
		} else {
			updatedChecked = isChecked ? [checkbox] : []
		}

		setChecked(updatedChecked)
		onChange(updatedChecked) // Передаем обновленное состояние
	}

	const hasData = checkboxes && checkboxes.length > 0

	return (
		<div>
			<div className='mb-2 flex flex-col gap-1'>
				{label && (
					<label className='px-2 flex gap-1 text-xl text-gray-1 font-semibold'>
						{label}
						{important && <p className='text-red'>*</p>}
					</label>
				)}
				{description && (
					<p className='px-2 text-gray-5 text-sm'>{description}</p>
				)}
			</div>
			<div className='grid grid-cols-4 gap-x-2'>
				{hasData ? (
					checkboxes.map((checkbox, index) => (
						<Checkbox
							key={index}
							icon={checkbox.icon}
							label={checkbox.label}
							checked={checked.some(
								checkedValue => checkedValue.value === checkbox.value
							)}
							disabled={
								disabled ||
								!!(
									isMulti &&
									maxValue &&
									checked.length >= maxValue &&
									!checked.some(
										checkedValue => checkedValue.value === checkbox.value
									)
								)
							}
							onChange={e => {
								handleCheckboxChange(checkbox, e.target.checked)
							}}
						/>
					))
				) : (
					<div className='flex w-full min-h-32 items-center justify-center col-span-4'>
						<p>Empty</p>
					</div>
				)}
			</div>
		</div>
	)
}
