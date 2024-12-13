import { ProjectType } from '@/types/project.types'

class MAIN {
	private root = '/'

	HOME = this.root
	SCRIPTS = `${this.root}scripts`
	BLUEPRINTS = `${this.root}blueprints`
	THEMES = `${this.root}themes`
	PACKS = `${this.root}packs`

	BLUEPRINT_SLUG(slug: string): string {
		return `${this.BLUEPRINTS}/${slug}`
	}
	SCRIPT_SLUG(slug: string): string {
		return `${this.SCRIPTS}/${slug}`
	}
	THEME_SLUG(slug: string): string {
		return `${this.THEMES}/${slug}`
	}

	getProjectLink = (slug: string, type: ProjectType): string => {
		switch (type) {
			case 'BLUEPRINT':
				return this.BLUEPRINT_SLUG(slug)
			case 'SCRIPT':
				return this.SCRIPT_SLUG(slug)
			case 'THEME':
				return this.THEME_SLUG(slug)
			default:
				return this.BLUEPRINT_SLUG(slug)
		}
	}
}
class SETTINGS {
	private root = '/settings'

	APPERANCE = this.root
	ACCOUNT = `${this.root}/profile`
	SECURITY = `${this.root}/security`
	AUTHORIZED_APPS = `${this.root}/authorized-apps`
	SESSIONS = `${this.root}/sessions`
	PERSONAL_ACCESS_TOKENS = `${this.root}/personal-access-tokens`
	APPLICATIONS = `${this.root}/applications`
}
class PROJECT_SETTINGS {
	private root = '/settings'

	GENERAL = this.root
	TAGS = `${this.root}/tags`
	DESCRIPTION = `${this.root}/description`
	IMAGES = `${this.root}/images`
	FILE = `${this.root}/file`

	MODERATION = `${this.root}/moderation`
	STATISTICS = `${this.root}/statistics`
}

class ADMIN {
	private root = '/admin'

	HOME = this.root
	USERS = `${this.root}/users`
	ROLES = `${this.root}/roles`
	PROJECTS = `${this.root}/projects`
	CATEGORIES = `${this.root}/categories`
	TAGS = `${this.root}/tags`

	PERSONAL_ACCESS_TOKENS = `${this.root}/personal-access-tokens`
	APPLICATIONS = `${this.root}/applications`

	EDIT_USERS(id: number) {
		return `${this.USERS}/${id}/edit`
	}
}

class DASHBOARD {
	private root = '/dashboard'

	OVERVIEW = this.root
	PROJECTS = `${this.root}/projects`
	ANALYTICS = `${this.root}/analytics`
	NOTIFICATIONS = `${this.root}/notifications`
}

export const MAIN_PAGES = new MAIN()
export const SETTINGS_PAGES = new SETTINGS()
export const ADMIN_PAGES = new ADMIN()
export const DASHBOARD_PAGES = new DASHBOARD()
export const PROJECT_SETTINGS_PAGES = new PROJECT_SETTINGS()
