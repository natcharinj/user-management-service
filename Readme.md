## Run the project on a local machine
- Create .env at root level of the project.
- Add a configuration in format `key=value` to .env file.
- CD to `docker` folder and run `docker-compose up`.
- Run `npm start`.
- On local machine, the web service is listen on port 3002

## Remove all databases on a local machine
- At root of the project, CD to `docker` folder and run `docker-compose down --volumes`.

## Debugging
- Open a project with VS Code.
- Put a break point on a line where you want a program to pause.
- Click F5 or goto `Run` > Click `Start Debugging`.