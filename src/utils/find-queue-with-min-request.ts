export default function findQueueWithMinRequest(arrOfQ: number[][]) {
  // check for empty queue
  arrOfQ.forEach((queue: number[], qIndex: number) => {
    if (queue.length === 0) {
      return qIndex;
    }
  });

  //  check for indexes with minimum total request in queue
  let minIndex = 0;
  let lastMinRequest = Infinity;
  arrOfQ.forEach((queue: number[], qIndex: number) => {
    let sumOfRequest = queue.reduce((acc, val) => acc + val, 0);
    if (sumOfRequest < lastMinRequest) {
      lastMinRequest = sumOfRequest;
      minIndex = qIndex;
    }
  });

  return minIndex;
}
