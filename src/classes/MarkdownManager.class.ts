import TextWrapper from '@/classes/TextWrapper.class'

export class MarkdownManager {
	private categories: Map<
		string,
		{
			icon: React.ReactNode
			onClick: (wrapper: TextWrapper) => void
			tooltip: string
			renderer: (node: any) => React.ReactNode // изменено на функцию
			remarkPlugin: any
		}[]
	> = new Map()

	private registeredExtensions: string[] = []

	// Добавление кнопки в категорию
	register(
		id: string,
		category: string,
		icon: React.ReactNode,
		onClick: (wrapper: TextWrapper) => void,
		tooltip: string,
		renderer: (node: any) => React.ReactNode, // изменено на функцию
		remarkPlugin: any
	) {
		if (this.registeredExtensions.includes(id)) {
			return
		}
		this.registeredExtensions.push(id)
		if (!this.categories.has(category)) {
			this.categories.set(category, [])
		}
		this.categories
			.get(category)
			?.push({ icon, onClick, tooltip, renderer, remarkPlugin })
	}

	getCategories() {
		return (
			Array.from(this.categories.entries()).map(([name, buttons]) => ({
				name,
				buttons,
			})) || []
		)
	}

	// Получение всех remark плагинов
	getRemarkPlugins() {
		return Array.from(this.categories.values()).flatMap(
			buttons =>
				buttons
					.map(button => button.remarkPlugin)
					.filter(plugin => plugin != null) // Фильтруем null
		)
	}

	// Получение всех рендереров
	getRenderers() {
		// Теперь возвращаем функции рендереров
		return Array.from(this.categories.entries()).reduce(
			(acc, [name, buttons]) => {
				buttons.forEach(button => {
					acc[name] = button.renderer
				})
				return acc
			},
			{} as Record<string, (node: any) => React.ReactNode>
		)
	}
}
