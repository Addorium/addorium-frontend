import { UserEdit } from './EditUser'

export default async function EditUserPage(props: { params: Promise<{ id: string }> }) {
    const params = await props.params;
    return <UserEdit userId={params.id} />
}
