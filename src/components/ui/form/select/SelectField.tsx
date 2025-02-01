'use client'
import clsx from 'clsx'
import { ChevronDown } from 'lucide-react'
import { forwardRef, useRef, useState } from 'react'
import { CustomOption, SelectFieldProps } from './select-field.types'

const baseStyle =
	'px-4 py-2 text-sm cursor-pointer w-full flex justify-between items-center bg-background-6 text-gray-1 hover:bg-background-5 transition-colors hover:outline-1 hover:outline hover:outline-gray-2'
const sizeStyles = {
	small: 'h-8 rounded-lg',
	medium: 'h-10 rounded-xl',
	normal: 'h-12 rounded-2xl',
	large: 'h-14 rounded-2xl',
}

const SelectField = forwardRef<HTMLInputElement, SelectFieldProps>(
	(
		{
			options,
			className = 'min-w-[256px]',
			placeholder,
			defaultValue,
			onChange,
			label,
			labelPosition = 'top',
			important,
			id,
			disabled,
			size = 'normal',
		},
		ref
	) => {
		const [isOpen, setIsOpen] = useState(false)
		const [selectedOption, setSelectedOption] = useState<
			CustomOption | undefined
		>(defaultValue)
		const select = useRef(null)

		const toggleDropdown = () => setIsOpen(!isOpen)

		const handleOptionClick = (option: CustomOption) => {
			setSelectedOption(option)
			setIsOpen(false)
			if (onChange) {
				onChange(option)
			}
		}
		return (
			<>
				<div
					className={clsx(
						`relative flex flex-col justify-end gap-2`,
						className
					)}
					ref={select}
				>
					{label && labelPosition === 'top' && (
						<label className='px-2 flex gap-1 text-sm text-gray-6 font-semibold text-nowrap'>
							{label}
							{important && <p className='text-red'>*</p>}
						</label>
					)}
					<div className='flex items-center w-full'>
						{label && labelPosition === 'left' && (
							<label className='px-2 flex gap-1 text-sm text-gray-6 font-semibold text-nowrap break-words'>
								{label}
								{important && <p className='text-red'>*</p>}
							</label>
						)}
						<div
							className={`${baseStyle} ${sizeStyles[size]} ${isOpen && 'border border-1 border-core-1 w-full'}`}
							onClick={() => {
								if (!disabled) {
									toggleDropdown()
								}
							}}
						>
							<span
								className={`${disabled ? 'text-gray-1/50' : 'text-gray-6'}`}
							>
								{selectedOption ? selectedOption.label : placeholder}
							</span>
							<span
								className={`transform ${isOpen ? 'rotate-180' : 'rotate-0'} transition-transform ${disabled ? 'text-gray-1/50' : 'text-gray-6'}`}
							>
								<ChevronDown />
							</span>
						</div>
						{isOpen && (
							<div className='absolute mt-1 max-h-52 overflow-y-auto flex-none min-w-full rounded-2xl border border-core-1 bg-background-5 shadow-lg z-10 focus:outline-none'>
								{options.map(option => (
									<div
										key={option.value}
										className='px-4 py-2 hover:bg-gray-2/50 cursor-pointer rounded-lg text-gray-1 transition-colors'
										onClick={() => handleOptionClick(option)}
									>
										{option.label}
									</div>
								))}
							</div>
						)}
					</div>
				</div>
			</>
		)
	}
)

SelectField.displayName = 'SelectField'
export { SelectField }
