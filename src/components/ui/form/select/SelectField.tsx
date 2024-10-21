'use client'
import clsx from 'clsx'
import { ChevronDown } from 'lucide-react'
import { forwardRef, useRef, useState } from 'react'
import { useOnClickOutside } from 'usehooks-ts'
import { CustomOption, SelectFieldProps } from './select-field,types'

const baseStyle =
	'rounded-2xl px-4 py-2 text-sm cursor-pointer w-full flex justify-between items-center bg-background-6 text-gray-1 hover:bg-background-5 transition-colors hover:outline-1 hover:outline hover:outline-gray-2'
const sizeStyles = {
	small: 'h-[32px]',
	medium: 'h-[42px]',
	normal: 'h-[50px]',
	large: 'h-[60px]',
}

export const SelectField = forwardRef<HTMLInputElement, SelectFieldProps>(
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
		useOnClickOutside(select, () => setIsOpen(false))

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
						<label
							className={`px-2 flex gap-1 text-[17px] text-gray-6 font-semibold text-nowrap `}
						>
							{label}
							{important && <p className='text-red'>*</p>}
						</label>
					)}
					<div className='flex items-center w-full'>
						{label && labelPosition === 'left' && (
							<label
								className={`px-2 flex gap-1 text-[17px] text-gray-6 font-semibold text-nowrap break-words`}
							>
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
							<div className='absolute max-h-52 overflow-auto flex-none w-full rounded-2xl border border-1 border-core-1 bg-background-5 z-10'>
								{options.map((option, index) => (
									<div
										key={option.value}
										className={`px-4 py-1.5 hover:bg-gray-1/15 cursor-pointer rounded-2xl text-gray-1`}
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
