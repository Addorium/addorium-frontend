export interface IApplication {
	id: number
	name?: string
	token: string
	status: 'ACTIVE' | 'INACTIVE' | 'REVOKED'
	description?: string
	icon?: string
	ownerId: number
	createAt?: string
	updateAt?: string
	deleteAt?: string
}
