import clsx from 'clsx'
import { Ban, CircleSlash, LucideIcon } from 'lucide-react'
import { forwardRef, useEffect, useState } from 'react'
import { useDropzone } from 'react-dropzone'

export interface ImageFileFieldProps {
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
	size?: 'small' | 'normal' | 'large'
}

const ImageFileField = forwardRef<HTMLInputElement, ImageFileFieldProps>(
	(
		{
			id,
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
		const [imagePreview, setImagePreview] = useState<string | null>(null)

		// Создание временного URL для выбранного файла
		useEffect(() => {
			if (file) {
				const objectUrl = URL.createObjectURL(file)
				setImagePreview(objectUrl)

				// Освобождение памяти, когда компонент размонтирован
				return () => URL.revokeObjectURL(objectUrl)
			}
		}, [file])

		// Используем ReactDropzone для drag-and-drop
		const { getRootProps, getInputProps, isDragActive } = useDropzone({
			onDrop: acceptedFiles => {
				const selectedFile = acceptedFiles[0]
				setFile(selectedFile)

				// Если предоставлен обработчик изменения файла
				if (onChange) {
					onChange(selectedFile)
				}
			},
			disabled: state === 'disabled',
			multiple: false,
			accept: {
				'image/*': ['.jpeg', '.png', '.jpg', '.gif', '.bmp'],
			},
		})

		const sizeStyle = {
			small: 'h-[50px] w-full',
			normal: 'h-[150px] w-full',
			large: 'h-[270px] w-full',
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
			error: 'placeholder:text-red text-red placeholder:text-sm text-red',
			warning: 'placeholder:text-orange text-orange placeholder:text-sm',
			success: 'placeholder:text-green text-green placeholder:text-sm',
			default: `placeholder:text-gray-2 placeholder:text-sm ${file ? 'text-gray-1/50' : 'text-gray-2'}`,
		}

		const divStyle = `cursor-pointer group flex items-center justify-center transition-all bg-background-6 py-2 gap-3 px-3 text-gray-2 rounded-2xl ${sizeStyle[size]} ${className} ${typedDivStyle[state]}`
		const inputStyle = `cursor-pointer flex items-center justify-center bg-transparent border-none focus:ring-0 focus:outline-none text-sm font-regular ${typedInputStyle[state]} ${sizeStyle[size]}`

		return (
			<>
				<div className='flex flex-col gap-2 h-[300px]'>
					{label && (
						<label className='px-2 flex gap-1 text-[17px] text-gray-6 font-semibold'>
							{label}
							{important && <p className='text-red'>*</p>}
						</label>
					)}
					<div
						{...getRootProps({
							className: clsx(
								divStyle,
								isDragActive && 'outline outline-2 outline-blue-500',
								state === 'disabled' && 'cursor-not-allowed'
							),
							style: {
								backgroundImage: imagePreview ? `url(${imagePreview})` : 'none',
								backgroundSize: 'contain',
								backgroundRepeat: 'no-repeat',
								backgroundPosition: 'center',
							},
						})}
					>
						{/* Скрытый input для выбора файла */}
						<input
							{...getInputProps()}
							ref={ref}
							id={id}
							disabled={state === 'disabled'}
							{...rest}
						/>
						{/* Кастомная кнопка для выбора файла */}
						<label htmlFor={id} className={clsx(inputStyle, '')}>
							{imagePreview ? (
								<span className='bg-background-5/95 p-2 rounded-lg text-gray-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300'>
									{file ? file.name : placeholder}
								</span>
							) : (
								<span className='bg-background-5/95 p-2 rounded-lg text-gray-1'>
									{file ? file.name : placeholder}
								</span>
							)}
						</label>
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

ImageFileField.displayName = 'ImageFileField'

export default ImageFileField
