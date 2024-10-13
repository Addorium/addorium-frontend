import { ProjectType } from '@/types/project.types'
import { useDebounce } from '@uidotdev/usehooks'
import { useState } from 'react'

interface IUseUserFilterReturn {
	debouncedSearchTerm?: string
	setSearch?: (value: string) => void
	orderBy?: string
	setOrderBy?: (value: string) => void
	orderDirection?: 'asc' | 'desc'
	setOrderDirection?: (value: 'asc' | 'desc') => void
	projectType?: ProjectType
	setProjectType?: (value: ProjectType) => void
	currentPage?: number
	setCurrentPage?: (value: number) => void
}
interface IUseUserFilterProps {
	initialSearch?: string
	initialOrderBy?: string
	initialOrderDirection?: 'asc' | 'desc'
	initialProjectType?: ProjectType
	initialPage?: number
	debounceTime?: number
}

export function useFilter({
	initialSearch,
	initialOrderBy,
	initialOrderDirection,
	initialProjectType,
	initialPage,
	debounceTime = 400,
}: IUseUserFilterProps): IUseUserFilterReturn {
	// State for filters
	const [search, setSearch] = useState(initialSearch)
	const [orderBy, setOrderBy] = useState(initialOrderBy)
	const [orderDirection, setOrderDirection] = useState<
		'asc' | 'desc' | undefined
	>(initialOrderDirection)
	const [projectType, setProjectType] = useState(initialProjectType)
	const [currentPage, setCurrentPage] = useState(initialPage)
	const debouncedSearchTerm = useDebounce(search, debounceTime)

	return {
		debouncedSearchTerm,
		setSearch,
		orderBy,
		setOrderBy,
		orderDirection,
		currentPage,
		projectType,
		setProjectType,
		setCurrentPage,
		setOrderDirection,
	}
}
