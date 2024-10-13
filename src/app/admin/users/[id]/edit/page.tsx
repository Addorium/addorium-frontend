import { UserEdit } from './EditUser'

export default function EditUserPage({ params }: { params: { id: string } }) {
	return <UserEdit userId={params.id} />
}
