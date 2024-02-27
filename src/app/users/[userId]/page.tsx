type Props = {
    params: {
        userId: string
    }
}

export default async function EditUser(props:Props) {
    return (
        <div>Placeholder page for editing a user: {props.params.userId}</div>
    )
}