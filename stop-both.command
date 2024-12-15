#!/bin/bash

#kill -9 -$REACT_PID
#kill -9 -$SPRINGBOOT_PID EXIT


# Get the react process ID (PID) of a process by name
react_process_name="react"
# Get the react process ID (PID) of a process by name
spring_process_name="trench-calculation-microservice"

pid=$(pgrep -f "$react_process_name")

# Check if the process is running
if [ -n "$pid" ]; then
    # Kill the process
    kill -9 $pid
    echo "React Process $react_process_name with PID $pid killed."
else
    echo "React Process $react_process_name not found."
fi


pid=$(pgrep -f "$spring_process_name")

# Check if the process is running
if [ -n "$pid" ]; then
    # Kill the process
    kill -9 $pid
    echo "Trench Process $spring_process_name with PID $pid killed."
else
    echo "Trench Process $spring_process_name not found."
fi

