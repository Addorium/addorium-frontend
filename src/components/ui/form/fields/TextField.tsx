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

const InputField = forwardRef<HTMLInputElement, InputFieldProps>(
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
			small: 'h-8 text-xs px-2 rounded-lg',
			medium: 'h-10 text-sm px-3 rounded-xl',
			normal: 'h-12 text-base px-4 rounded-xl',
			large: 'h-14 text-lg px-5 rounded-xl',
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

		return (
			<div className='flex flex-col gap-1'>
				{label && (
					<label className='px-2 flex gap-1 text-sm text-gray-6 font-semibold'>
						{label}
						{important && <span className='text-red'>*</span>}
					</label>
				)}
				<div
					className={`group flex items-center bg-background-6 transition-all gap-2 ${sizeStyle[size]} ${className} ${typedDivStyle[state]}`}
				>
					{Icon && (
						<div className={`${typedIconStyle[state]}`}>
							<Icon className='w-5 h-5' />
						</div>
					)}
					<input
						ref={ref}
						onChange={event => {
							const newValue = event.target.value
							setValue(newValue)
							onChange?.(newValue)
						}}
						value={value}
						className={`w-full bg-transparent border-none focus:ring-0 focus:outline-none ${typedInputStyle[state]}`}
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
							onClick={() => setShowPassword(!showPassword)}
						>
							{showPassword ? (
								<Eye className='w-5 h-5' />
							) : (
								<EyeOff className='w-5 h-5' />
							)}
						</button>
					)}
					{state === 'disabled' && (
						<button
							className='text-text/30 hover:text-gray-1 transition-colors'
							type='button'
							onClick={() => {
								toast.info('Copied to clipboard', { description: value })
								navigator.clipboard.writeText(value)
							}}
						>
							<Copy className='w-5 h-5' />
						</button>
					)}
				</div>
				{state === 'error' && (
					<p className='text-red text-xs mt-1 flex items-center'>
						<Ban className='mr-1 w-4 h-4' />
						{stateText}
					</p>
				)}
				{state === 'warning' && (
					<p className='text-orange text-xs mt-1 flex items-center'>
						<CircleSlash className='mr-1 w-4 h-4' />
						{stateText}
					</p>
				)}
			</div>
		)
	}
)

InputField.displayName = 'InputField'
export { InputField }
