import LayoutProjectsList from '@/components/main-layout/projects-layout/LayoutProjectsList'
import { ReactNode } from 'react'

export default async function ProjectsListLayout(
    props: {
        children: ReactNode
        params: Promise<{ type: string }>
    }
) {
    const params = await props.params;

    const {
        children
    } = props;

    return <LayoutProjectsList type={params.type}>{children}</LayoutProjectsList>
}
