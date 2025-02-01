import { Ban, CircleSlash, LucideIcon } from 'lucide-react'
import { forwardRef, useState } from 'react'

export interface FileFieldProps {
	id: string
	Icon?: LucideIcon
	className?: string
	label?: string
	important?: boolean
	state?: 'error' | 'success' | 'warning' | 'default' | 'disabled'
	stateText?: string
	defaultValue?: string
	placeholder: string
	disabled?: boolean
	onChange?: (file: File) => void
	size?: 'small' | 'normal' | 'large' | 'medium'
}

const FileField = forwardRef<HTMLInputElement, FileFieldProps>(
	(
		{
			id,
			Icon,
			className,
			label,
			important,
			defaultValue,
			state = 'default',
			stateText = '',
			placeholder,
			disabled,
			onChange,
			size = 'normal',
			...rest
		},
		ref
	) => {
		const [file, setFile] = useState<File | null>(null)
		const sizeStyle = {
			small: 'h-[40px]',
			normal: 'h-[45px]',
			medium: 'h-[46px]',
			large: 'h-[48px]',
		}
		const typedDivStyle = {
			disabled: '',
			error: 'outline outline-1 outline-red/50 text-red/50 bg-red/15',
			warning: 'outline outline-1 outline-orange text-orange/50 bg-orange/15',
			success: 'outline outline-1 outline-green bg-green/15',
			default:
				'hover:outline hover:outline-2 hover:outline-gray-2 focus-within:outline focus-within:outline-2 focus-within:outline-core-1 hover:bg-background-5',
		}
		const typedInputStyle = {
			disabled: 'text-gray-1/50',
			error: 'placeholder:text-red text-red placeholder:text-sm text-red',
			warning: 'placeholder:text-orange text-orange placeholder:text-sm',
			success: 'placeholder:text-green text-green placeholder:text-sm',
			default: `placeholder:text-gray-2 placeholder:text-sm ${file ? 'text-gray-1/50' : 'text-gray-2'}`,
		}
		const typedIconStyle = {
			disabled: 'text-gray-1/50',
			error: 'group-focus-within:text-red',
			warning: 'group-focus-within:text-orange',
			success: 'group-focus-within:text-green',
			default: 'group-focus-within:text-gray-1',
		}

		// Стили для скрытого input[type="file"] и кастомного отображения
		const hiddenFileInputStyle = 'hidden'

		const divStyle = `cursor-pointer group flex justify-start items-center transition-all bg-background-6 py-2 gap-3 px-3 text-gray-2 rounded-2xl ${sizeStyle[size]} ${className} ${typedDivStyle[state]}`
		const inputStyle = `cursor-pointer w-full flex items-center bg-transparent border-none focus:ring-0 focus:outline-none text-sm font-regular ${typedInputStyle[state]} ${sizeStyle[size]}`
		const iconStyle = `${typedIconStyle[state]}`

		// Обработчик изменения файла
		const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
			if (onChange && e.target.files) {
				setFile(e.target.files[0])
				onChange(e.target.files[0])
			}
		}

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
							{/* Скрытый input для выбора файла */}
							<input
								ref={ref}
								id={id}
								type='file'
								onChange={handleFileChange}
								disabled={state === 'disabled'}
								className={hiddenFileInputStyle}
								{...rest}
							/>
							{/* Кастомная кнопка для выбора файла */}
							<label htmlFor={id} className={inputStyle}>
								{file ? file.name : placeholder}
							</label>
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

FileField.displayName = 'FileField'

export default FileField
