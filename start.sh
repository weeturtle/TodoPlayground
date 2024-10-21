#!/bin/sh

echo "Starting databases"
docker compose up auth_db todo_db -d

echo "Waiting for databases to start"
sleep 1

echo "Starting services"
docker compose --profile=dev up --build
