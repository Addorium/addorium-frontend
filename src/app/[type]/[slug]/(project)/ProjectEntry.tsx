'use client'

import GalleryImage from '@/components/projects-layout/ui/gallery/gallery-image/GaleryImage'
import MarkdownRenderer from '@/components/ui/editor/MarkdownRenderer'
import {
	Heading1Plugin,
	Heading2Plugin,
	Heading3Plugin,
} from '@/components/ui/editor/plugins/headings/HeadingPlugin'
import {
	BoldPlugin,
	ItalicPlugin,
	UnderlinePlugin,
} from '@/components/ui/editor/plugins/LinePlugin'
import Button from '@/components/ui/form/buttons/Button'
import SimpleProjectBanner from '@/components/ui/icons/project-banner/SimpleProjectBanner'
import SimpleProjectIcon from '@/components/ui/icons/project-icon/SimpleProjectIcon'
import SimpleUserIcon from '@/components/ui/icons/user-icon/SimpleUserIcon'
import {
	ImagePopupOptions,
	useImagePopup,
} from '@/components/ui/image-popup-provider/ImagePopupContext'
import ProjectTagLabel from '@/components/ui/labels/ProjectTagLabel'
import ProjectTypeLabel from '@/components/ui/labels/ProjectTypeLabel'
import { projectService } from '@/services/project.service'
import type { GalleryImage as GImage } from '@/types/galery.types'
import { IProject } from '@/types/project.types'
import { useQuery } from '@tanstack/react-query'
import { Heart } from 'lucide-react'
import { useEffect, useState } from 'react'

export default function ProjectEntry({
	initialProject,
}: {
	initialProject: IProject
}) {
	const { showPopup } = useImagePopup()
	const { data, refetch } = useQuery({
		queryKey: ['project', initialProject.slug],
		queryFn: () => {
			return projectService.getBySlug(initialProject.slug)
		},
		enabled: true,
	})
	const [project, setProject] = useState<IProject>(initialProject)
	useEffect(() => {
		if (data) {
			setProject(data)
		}
	}, [data])
	const hasBanner = project.banner !== null
	const imagePrewiew = (image: GImage) => {
		const prewierSettings: ImagePopupOptions = {
			galeryImage: image,
		}
		showPopup(prewierSettings)
	}
	const hasImages = project?.galleryImages && project.galleryImages.length > 0

	return (
		<div className='flex flex-row gap-4'>
			<div className='flex flex-col gap-4 min-w-[342px] w-[342px]'>
				<div className='flex flex-col bg-background-2 rounded-2xl gap-4 w-full'>
					{hasBanner && (
						<SimpleProjectBanner
							image={project.banner}
							isLoading={false}
							height={150}
						/>
					)}
					<div
						className={`flex flex-col gap-1 ${hasBanner ? '-mt-14' : 'mt-1'} sticky px-2 pb-2`}
					>
						<div className='bg-background-2 p-1 w-fit rounded-[18px]'>
							<SimpleProjectIcon
								name={project.icon}
								isLoading={false}
								width={86}
							/>
						</div>
						<div className='flex flex-col gap-3 px-1 '>
							<div className='flex flex-col gap-1.5'>
								<h1 className='text-xl'>{project.name}</h1>
								<ProjectTypeLabel type={project.type} />
								{project.tags.length > 0 && (
									<div className='flex flex-wrap gap-2'>
										{project.tags.map(tag => (
											<ProjectTagLabel key={tag.id} tag={tag} />
										))}
									</div>
								)}
							</div>
							<div className='flex flex-col gap-2'>
								<Button size='normal' className='w-full' onClick={() => {}}>
									Download
								</Button>
								<div className='flex justify-center gap-2'>
									<a href='#' className='text-gray-1/50 underline'>
										How to use it?
									</a>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className='flex flex-row justify-between bg-background-2 rounded-2xl gap-4 w-full px-4 py-2'>
					<div className='flex flex-row gap-3 w-full'>
						<SimpleUserIcon
							avatar={project.owner?.avatar}
							isLoading={false}
							width={56}
						/>
						<div className='flex flex-col justify-center'>
							<h1 className='text-lg font-semibold'>{project.owner?.name}</h1>
							<h2 className='text-md text-gray-1/50'>
								{project.owner?.role?.name}
							</h2>
						</div>
					</div>
					<div className='flex flex-col justify-center'>
						<Button
							size='medium'
							type_style='tertiary'
							className='w-full'
							onClick={() => {}}
							Icon={Heart}
						>
							Follow
						</Button>
					</div>
				</div>
			</div>
			<div className='flex flex-col gap-4 w-full'>
				<div className='flex flex-col bg-background-2 rounded-2xl gap-1.5 w-full px-4 py-4'>
					<div className='text-gray-1'>
						<MarkdownRenderer
							markdown={project.description}
							mplugins={[
								new Heading1Plugin(),
								new Heading2Plugin(),
								new Heading3Plugin(),
								new BoldPlugin(),
								new ItalicPlugin(),
								new UnderlinePlugin(),
							]}
						/>
					</div>
				</div>
				<div className='flex flex-col gap-1.5 w-full'>
					<h1 className='text-2xl'>Gallery</h1>
					<div className='flex flex-row gap-4'>
						{hasImages ? (
							project?.galleryImages
								?.sort((a, b) => (a.id === project.bannerId ? -1 : 1))
								.map(image => {
									image.bannerOf =
										image.id === project.bannerId ? project.id : undefined
									return (
										<GalleryImage
											key={image.id}
											width='291px'
											galleryImage={image}
											onClick={image => {
												imagePrewiew(image)
											}}
										/>
									)
								})
						) : (
							<div className='flex items-center justify-center w-full h-full rounded-2xl '>
								<p>No images found</p>
							</div>
						)}
					</div>
				</div>
			</div>
		</div>
	)
}
