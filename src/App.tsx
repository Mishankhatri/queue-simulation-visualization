import { ChangeEvent, FormEvent, useEffect, useRef, useState } from 'react';
import './App.css'
import getUuid from './utils/get-uuid';
import Server from './components/server';
import findQueueWithMinRequest from './utils/find-queue-with-min-request';

function App() {

  const SERVICE_TIME = 1000 // 1s service time for server

  const [newCustomerRequest, setNewCustomerRequest] = useState(1)
  const [serverQueues, setServerQueues] = useState<number[][]>([[9, 10], [6], [], [4], [8]]);

  const timerRef = useRef<number | null>(null);

  const handleRequestInput = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.value) {
      setNewCustomerRequest(parseInt(e.target.value))
    }
  }

  const handleAddServer = () => {
    setServerQueues([...serverQueues, []])
  }

  const handleService = (serverQueues: number[][]) => {
    console.log('servicing...')
    let servedServerQueue = [...serverQueues]
    return servedServerQueue.map((queue) => {
      if (queue.length === 0) {
        return []
      }
      if (queue[0] === 0) {
        queue.shift()
        return queue
      }
      queue[0] = queue[0] - 1
      return queue
    })
  }


  const handleAddCustomer = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    let indexToBeUpdated = findQueueWithMinRequest(serverQueues)

    let temp = [...serverQueues]
    temp[indexToBeUpdated].push(newCustomerRequest)
    setServerQueues(temp)

  }


  useEffect(() => {

    if (serverQueues.flat().length === 0) {
      timerRef.current && clearInterval(timerRef.current)
      return
    }
    timerRef.current = setInterval(() => {
      setServerQueues(handleService(serverQueues))
    }, SERVICE_TIME)

    return () => {
      timerRef.current && clearInterval(timerRef.current)
    }
  }, [serverQueues])


  return (
    <div>
      <h1>Queue Simulation</h1>

      <div >
        <fieldset className='add-customer-container'>
          <legend>Add New Bulk Requests</legend>
          <form onSubmit={handleAddCustomer} className="request-form">
            <label htmlFor="customer-request">Request count : </label>
            <input type="number" name="customer-request" id="customer-request" placeholder="Number of requests" className="customer-input" value={newCustomerRequest} onChange={handleRequestInput} min={1} max={100} />
            <button type="submit">Add</button>
          </form>
        </fieldset>
      </div>

      <div className="server-grid">
        {
          serverQueues.map((queue: any, idx: number) => {
            return <Server queue={queue} serverIndex={idx + 1} key={getUuid()} />
          })
        }
        <button type='button' onClick={handleAddServer}>Add Server</button>
      </div>
    </div>
  )
}

export default App
