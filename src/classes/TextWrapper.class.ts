export default class TextWrapper {
	private input: HTMLTextAreaElement | null
	private onChange: (value: string) => void

	constructor(
		input: HTMLTextAreaElement | null,
		onChange: (value: string) => void
	) {
		this.input = input
		this.onChange = onChange
	}

	wrapText(startText: string, endText: string) {
		if (!this.input || this.input.selectionStart === this.input.selectionEnd)
			return

		const start = this.input.selectionStart
		const end = this.input.selectionEnd

		// Проверяем, обернут ли уже текст
		if (this.isWrapped(startText, endText)) {
			this.unwrapText(startText, endText)
			return
		}

		const selectedText = this.input.value.substring(start, end)
		const modifiedText = `${startText}${selectedText}${endText}`
		const newValue =
			this.input.value.substring(0, start) +
			modifiedText +
			this.input.value.substring(end)

		// Сохраняем новое значение
		this.input.value = newValue
		this.onChange(this.input.value)

		// Перемещаем курсор, чтобы выделить только измененный текст без добавленных символов
		this.input.setSelectionRange(
			start + startText.length,
			start + startText.length + selectedText.length
		)
	}

	getSelectedText() {
		if (!this.input || this.input.selectionStart === this.input.selectionEnd)
			return ''

		const start = this.input.selectionStart
		const end = this.input.selectionEnd
		return this.input.value.substring(start, end)
	}

	replaceSelectedText(newText: string) {
		if (!this.input || this.input.selectionStart === this.input.selectionEnd)
			return

		const start = this.input.selectionStart
		const end = this.input.selectionEnd
		const newValue =
			this.input.value.substring(0, start) +
			newText +
			this.input.value.substring(end)

		// Сохраняем новое значение
		this.input.value = newValue
		this.onChange(this.input.value)

		// Перемещаем курсор, чтобы выделить только что вставленный текст
		this.input.setSelectionRange(start, start + newText.length)
	}

	getCursorPosition() {
		if (!this.input) return 0

		return this.input.selectionStart
	}

	setCursorPosition(position: number) {
		if (!this.input) return
		this.input.setSelectionRange(position, position)
	}

	inputFocus() {
		if (!this.input) return
		this.input.focus()
	}

	pasteTextInCursorPosition(text: string) {
		if (!this.input) return
		const start = this.input.selectionStart
		const end = this.input.selectionEnd
		const newValue =
			this.input.value.substring(0, start) +
			text +
			this.input.value.substring(end)

		// Сохраняем новое значение
		this.input.value = newValue
		this.onChange(this.input.value)

		// Перемещаем курсор, чтобы выделить только что вставленный текст
		this.input.setSelectionRange(start, start + text.length)
	}
	pasteTextInPosition(text: string, position: number) {
		if (!this.input) return
		const newValue =
			this.input.value.substring(0, position) +
			text +
			this.input.value.substring(position)

		// Сохраняем новое значение
		this.input.value = newValue
		this.onChange(this.input.value)

		// Перемещаем курсор, чтобы выделить только что вставленный текст
		this.input.setSelectionRange(position, position + text.length)
	}

	isWrapped(startText: string, endText: string): boolean {
		if (!this.input || this.input.selectionStart === this.input.selectionEnd)
			return false

		const start = this.input.selectionStart
		const end = this.input.selectionEnd
		const selectedText = this.input.value.substring(start, end)

		return selectedText.startsWith(startText) && selectedText.endsWith(endText)
	}

	unwrapText(startText: string, endText: string) {
		if (!this.input || this.input.selectionStart === this.input.selectionEnd)
			return

		const start = this.input.selectionStart
		const end = this.input.selectionEnd
		const selectedText = this.input.value.substring(start, end)

		const unwrappedText = selectedText.substring(
			startText.length,
			selectedText.length - endText.length
		)
		const newValue =
			this.input.value.substring(0, start) +
			unwrappedText +
			this.input.value.substring(end)

		// Сохраняем новое значение
		this.input.value = newValue
		this.onChange(this.input.value)

		// Перемещаем курсор, чтобы выделить только развёрнутый текст
		this.input.setSelectionRange(start, start + unwrappedText.length)
	}

	wrapBold() {
		this.wrapText('**', '**')
	}
	wrapItalic() {
		this.wrapText('*', '*')
	}
	wrapUnderline() {
		this.wrapText('__', '__')
	}
	wrapStrikethrough() {
		this.wrapText('~~', '~~')
	}
	wrapCode() {
		this.wrapText('`', '`')
	}
	wrapCodeBlock() {
		this.wrapText('```', '```')
	}
	wrapBlockquote() {
		this.wrapText('> ', '')
	}
	wrapLink(link: string) {
		this.wrapText('[', `](https://${link})`)
	}
	wrapImage(link: string) {
		this.wrapText('![', `](https://${link})`)
	}
}
