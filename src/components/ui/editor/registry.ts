import { Components } from 'react-markdown'

interface EditorExtension {
	renderer?: { [key: string]: React.ElementType }
}

export const registry: EditorExtension[] = []

// Функция для регистрации расширений редактора
export const registerExtension = (extension: EditorExtension) => {
	registry.push(extension)
}

// Утилиты для получения всех зарегистрированных рендереров, команд и плагинов
export const getRenderers = () => {
	return registry.reduce<Partial<Components>>((acc, ext) => {
		if (ext.renderer) {
			return { ...acc, ...ext.renderer }
		}
		return acc
	}, {})
}
