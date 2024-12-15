#!/bin/bash
echo "Starting React and Spring Boot applications..."

sleep 5

# Start React
/Users/masood/default-workspace/trench-calculation-microservice/frontend/start-react.sh &
REACT_PID=$!

# Wait a moment to ensure React starts
sleep 5

# Start Spring Boot
/Users/masood/default-workspace/trench-calculation-microservice/start-boot.sh &
SPRINGBOOT_PID=$!


echo "React (PID $REACT_PID) and Spring Boot (PID $SPRINGBOOT_PID) are running."
echo "Press Ctrl+C to stop both."

# Wait for both processes to exit
wait $REACT_PID
wait $SPRINGBOOT_PID

#trap "kill -TERM -$REACT_PID" EXIT
#trap "kill -TERM -$SPRINGBOOT_PID" EXIT
