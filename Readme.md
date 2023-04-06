# Queue Simulation React

## Problem statement:

- You have 5 servers that handles each request with service time of 1 second.
- You have each queue for servers for customers , Each customer can bulk requests.
- And one server will move to next customer only if all requests from customer is finished.

Note:

- Stop server if request queue are empty.
- Server will start immediately and at the same time.

Example:S = Server, C = Customer, C(`request-count`) = request count associated with each customer

S1 - [C1(45),C2(40),C3(1)]
S2 - [C4(45),C5(40)]
S3 - [C6(45),C7(40)]
S4 - [C8(45),C9(40)]
S5 - [C8(45),C9(40)]
