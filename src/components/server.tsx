import getUuid from "../utils/get-uuid"

interface IServerProps {
    queue: number[]
    serverIndex: number
}

export default function Server(props: IServerProps) {
    const { queue, serverIndex } = props
    return <div className='server-col'>
        <h3>Server-{serverIndex}</h3>
        <ul>
            {queue.length > 0 && queue.map((request: number) =>
                <li key={getUuid()}>{request}</li>
            )}
        </ul>
    </div>

}