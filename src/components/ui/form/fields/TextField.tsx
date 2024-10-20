'use client'
import { Ban, CircleSlash, Copy, Eye, EyeOff, LucideIcon } from 'lucide-react'
import { forwardRef, useEffect, useState } from 'react'
import { toast } from 'sonner'

interface InputFieldProps {
	id: string
	Icon?: LucideIcon
	className?: string
	helperText?: string
	label?: string
	important?: boolean
	state?: 'error' | 'success' | 'warning' | 'default' | 'disabled'
	stateText?: string
	defaultValue?: string
	placeholder: string
	errorText?: string
	disabled?: boolean
	onChange?: (text: string) => void
	size?: 'small' | 'medium' | 'normal' | 'large'
	type?: 'password' | 'text' | 'number' | 'search'
}

export const InputField = forwardRef<HTMLInputElement, InputFieldProps>(
	(
		{
			id,
			Icon,
			className,
			helperText,
			label,
			important,
			defaultValue,
			state = 'default',
			stateText = '',
			placeholder,
			disabled,
			onChange,
			type = 'text',
			size = 'normal',
			...rest
		},
		ref
	) => {
		const [showPassword, setShowPassword] = useState(false)
		const [value, setValue] = useState(defaultValue || '')
		if (disabled) {
			state = 'disabled'
		}

		useEffect(() => {
			setValue(defaultValue || '')
		}, [defaultValue])
		const sizeStyle = {
			small: 'h-[40px]',
			medium: 'h-[42px]',
			normal: 'h-[45px]',
			large: 'h-[48px]',
		}
		const typedDivStyle = {
			disabled: '',
			error: 'outline outline-1 outline-red/50 text-red/50 bg-red/15',
			warning: 'outline outline-1 outline-orange text-orange/50 bg-orange/15',
			success: 'outline outline-1 outline-green bg-green/15',
			default:
				'hover:outline hover:outline-1 hover:outline-gray-200 focus-within:outline focus-within:outline-1 focus-within:outline-core-1 hover:bg-background-5',
		}
		const typedInputStyle = {
			disabled: 'text-gray-1/50',
			error: 'placeholder:text-red text-red placeholder:text-sm',
			warning: 'placeholder:text-orange text-orange placeholder:text-sm',
			success: 'placeholder:text-green text-green placeholder:text-sm',
			default: 'placeholder:text-gray-2 text-gray-6 placeholder:text-sm',
		}
		const typedIconStyle = {
			disabled: 'text-gray-1/50',
			error: 'group-focus-within:text-red',
			warning: 'group-focus-within:text-orange',
			success: 'group-focus-within:text-green',
			default: 'group-focus-within:text-gray-1',
		}
		const divStyle = `group flex justify-start items-center transition-all bg-background-6 py-2 gap-3 px-3 text-gray-2 rounded-2xl ${sizeStyle[size]} ${className} ${typedDivStyle[state]}`
		const inputStyle = `w-full bg-transparent border-none focus:ring-0 focus:outline-none text-sm font-regular ${typedInputStyle[state]} ${sizeStyle[size]}`
		const iconStyle = `${typedIconStyle[state]}`

		return (
			<>
				<div className='flex flex-col gap-2'>
					{label && (
						<label className='px-2 flex gap-1 text-[17px] text-gray-6 font-semibold'>
							{label}
							{important && <p className='text-red'>*</p>}
						</label>
					)}
					<div className={divStyle}>
						{Icon && (
							<div className={iconStyle}>
								<Icon />
							</div>
						)}
						<div className='flex w-full justify-between items-center'>
							{helperText && (
								<span
									className={`text-sm text-nowrap ${typedInputStyle[state]}`}
								>
									{helperText}
								</span>
							)}
							<input
								onChange={event => {
									const newValue = event.target.value
									setValue(newValue) // Обновляем состояние
									if (onChange) {
										onChange(newValue) // Вызываем внешний обработчик
									}
								}}
								value={value}
								className={inputStyle}
								{...rest}
								placeholder={placeholder}
								disabled={disabled}
								id={id}
								type={type === 'password' && showPassword ? 'text' : type}
							/>
							{type === 'password' && state !== 'disabled' && (
								<button
									type='button'
									className='text-text/30 hover:text-gray-1 transition-colors'
									onClick={() => {
										setShowPassword(!showPassword)
									}}
								>
									{showPassword ? <Eye /> : <EyeOff />}
								</button>
							)}
							{state === 'disabled' && (
								<button
									className='text-text/30 hover:text-gray-1 transition-colors'
									type='button'
									onClick={() => {
										toast.info('Coppied to clipboard', { description: value })
										navigator.clipboard.writeText(value)
									}}
								>
									<Copy className='text-text/30' />
								</button>
							)}
						</div>
					</div>
					{state === 'error' && (
						<p className='text-red text-[12px] mt-1 flex flex-row items-center'>
							<Ban className='mr-1 size-4' />
							{stateText}
						</p>
					)}
					{state === 'warning' && (
						<p className='text-orange text-[12px] mt-[6px] flex flex-row items-center'>
							<CircleSlash className='mr-1 size-4' />
							{stateText}
						</p>
					)}
				</div>
			</>
		)
	}
)
