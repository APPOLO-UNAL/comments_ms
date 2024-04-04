
1. docker network create my-network
2. docker build -t ms_comments .
3. docker run --network my-network -p 8082:8082 ms_comments