type Props = {
    params: {
        personId: string
    }
}

export default async function EditHolder(props:Props) {
    return (
        <div>Placeholder page for editing a game holder: {props.params.personId}</div>
    )
}