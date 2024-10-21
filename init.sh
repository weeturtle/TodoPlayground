#!/bin/sh
echo "Cloning git repository"
git clone https://github.com/weeturtle/TodoPlayground.git
cd TodoPlayground

echo "Adding environment variables to .env files"
echo '
JWT="sfji43d"
DB_USER="postgres"
DB_PASSWORD="postgres"
DATABASE_URL="postgresql://postgres:postgres@host.docker.internal:5433/mydb?schema=public"
' > backend/auth/.env

echo '
DB_USER="postgres"
DB_PASSWORD="postgres"
DATABASE_URL="postgresql://postgres:postgres@host.docker.internal:5432/mydb?schema=public"
' > backend/todos/.env

echo 'URL="http://127.0.0.1:80"' > frontend/.env

echo "Starting databases"
docker compose -f docker-compose.init.yml up auth_db todo_db -d

echo "Waiting for databases to start"
sleep 5

echo "Starting services"
docker compose -f docker-compose.init.yml up --build
