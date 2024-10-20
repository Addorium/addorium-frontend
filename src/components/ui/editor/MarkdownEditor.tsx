'use client'

import { MarkdownManager } from '@/classes/MarkdownManager.class'
import TextWrapper from '@/classes/TextWrapper.class'
import { Info } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import Toggle from '../form/toggle/Toggle'
import MarkdownRenderer from './MarkdownRenderer'
import MarkdownPlugin from './plugins/MarkdownPlugin'
import EditorToolbar from './toolbar/EditorToolbar'

interface MarkdownEditorProps {
	placeholder?: string
	maxLength?: number
	onChange: (value: string) => void
	value?: string
	plugins: MarkdownPlugin[]
	disabled?: boolean
}

const MarkdownEditor: React.FC<MarkdownEditorProps> = ({
	placeholder,
	maxLength,
	onChange,
	value,
	plugins,
	disabled,
}) => {
	const [markdown, setMarkdown] = useState<string>(value || '')
	useEffect(() => {
		setMarkdown(value || '')
	}, [value])

	const handleEditorChange = (value?: string) => {
		if (value !== undefined) {
			setMarkdown(value)
			onChange(value)
		}
	}
	const textAreaRef = React.useRef<HTMLTextAreaElement>(null)
	const textWrapper = new TextWrapper(textAreaRef.current, handleEditorChange)
	const [markdownManager, setMarkdownManager] = React.useState<MarkdownManager>(
		new MarkdownManager()
	)
	const [isPrewiew, setIsPreview] = React.useState(disabled || false)

	// Состояние для категорий
	const [categories, setCategories] = React.useState(
		markdownManager.getCategories()
	)

	React.useEffect(() => {
		plugins.forEach(plugin => plugin.register(markdownManager))
		setCategories(markdownManager.getCategories())
	}, [plugins, markdownManager])

	return (
		<div className='gap-2 flex flex-col'>
			<div className={`flex min-h-[40px] justify-between`}>
				<EditorToolbar
					categories={categories} // Передаем актуальные категории
					textWrapper={textWrapper}
					disabled={isPrewiew || disabled}
				/>
				<Toggle
					disabled={disabled}
					onChange={enabled => {
						setIsPreview(enabled)
					}}
					checked={isPrewiew}
					label='Preview'
				/>
			</div>
			<div>
				{isPrewiew ? (
					<div className='w-full min-h-96 p-4 outline outline-1 outline-gray-5 rounded-2xl'>
						<MarkdownRenderer markdown={markdown || ''} mplugins={plugins} />
					</div>
				) : (
					<div className='flex flex-col'>
						<textarea
							disabled={disabled}
							ref={textAreaRef}
							className='w-full h-fit min-h-96 p-4 bg-background-6 rounded-2xl hover:outline-1 hover:outline-gray-2 focus-within:outline focus-within:outline-core-1 transition-all'
							placeholder={placeholder}
							maxLength={maxLength}
							value={markdown}
							onChange={e => handleEditorChange(e.target.value)}
						/>
						<div className='flex justify-between mt-2'>
							<p className='text-gray-5 flex gap-1 items-center'>
								<Info className='size-5' />
								This editor supports{' '}
								<a
									className='text-core-1 transition-colors hover:underline hover:text-core-2'
									href='https://github.github.com/gfm/'
								>
									Markdown formatting
								</a>
								.
							</p>
							<p className='text-gray-5'>
								{markdown?.length || 0} / {maxLength}
							</p>
						</div>
					</div>
				)}
			</div>
		</div>
	)
}

export default MarkdownEditor
