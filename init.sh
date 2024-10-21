#!/bin/sh

echo "Starting databases"
docker compose -f docker-compose.init.yml up auth_db todo_db -d

echo "Waiting for databases to start"
sleep 5

echo "Starting services"
docker compose -f docker-compose.init.yml up --build
