import { useQueryClient } from '@tanstack/react-query'

interface IUserRevalidate {
	refreshQueries(
		userId: string[] | string,
		profile?: boolean,
		all?: boolean
	): void
}
interface IProjectRevalidate {
	refreshQueries({
		projectId,
		projectSlug,
		all,
	}: {
		projectId?: string[] | string
		projectSlug?: string[] | string
		all?: boolean
	}): void
}

export function useUserRevalidate(): IUserRevalidate {
	const queryClient = useQueryClient()

	const refreshQueries = (
		userId: string[],
		profile?: boolean,
		all?: boolean
	) => {
		setTimeout(() => {
			if (profile) {
				queryClient.invalidateQueries({
					queryKey: ['profile'],
					refetchType: 'all',
				})
			}
			if (all) {
				queryClient.invalidateQueries({
					queryKey: ['users'],
					refetchType: 'all',
				})
			}
			if (userId instanceof Array) {
				userId.forEach(id => {
					queryClient.invalidateQueries({
						queryKey: ['user', id],
						refetchType: 'all',
					})
				})
			} else {
				queryClient.invalidateQueries({
					queryKey: ['user', userId],
					refetchType: 'all',
				})
			}
		}, 1000)
	}
	return {
		refreshQueries,
	}
}

export function useProjectRevalidate(): IProjectRevalidate {
	const queryClient = useQueryClient()

	const refreshQueries = ({
		projectId,
		projectSlug,
		all,
	}: {
		projectId?: string[] | string
		projectSlug?: string[] | string
		all?: boolean
	}) => {
		setTimeout(() => {
			if (all) {
				queryClient.invalidateQueries({
					queryKey: ['projects'],
					refetchType: 'all',
				})
			}
			if (projectId instanceof Array) {
				projectId.forEach(id => {
					queryClient.invalidateQueries({
						queryKey: ['project', id],
						refetchType: 'all',
					})
				})
			} else if (projectId) {
				queryClient.invalidateQueries({
					queryKey: ['project', projectId],
					refetchType: 'all',
				})
			}
			if (projectSlug instanceof Array) {
				projectSlug.forEach(slug => {
					queryClient.invalidateQueries({
						queryKey: ['project', slug],
						refetchType: 'all',
					})
				})
			} else if (projectSlug) {
				queryClient.invalidateQueries({
					queryKey: ['project', projectSlug],
					refetchType: 'all',
				})
			}
		}, 1000)
	}
	return {
		refreshQueries,
	}
}
export const useRevalidateAllQueries = () => {
	const queryClient = useQueryClient()
	const revalidateAll = () => {
		queryClient.invalidateQueries()
	}

	return revalidateAll
}
