Install Docker and Docker Compose (usually packaged together)
First run `sh init.sh` to build the images and connect databases.
When you see `
todo_api-1  | Server started at http://localhost:4001
auth_api-1  | Server started at http://localhost:4002
` then exit with `Ctrl+C`.
If `sh` doesn't work then use `bash` instead.


Everytime after that, run `sh start.sh` to start the containers.

This runs a local instance and uses containerised databases.
Therefore no data is transferred in the images.

To see the frontend go to `http://localhost:3000`
To test the backend use `http://localhost:80`
