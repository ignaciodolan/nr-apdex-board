# New Relic Apdex Board

Basic client server application that shows the list of applications running on every host. 

# Server
- NodeJs application
- Refer to /server/README.md for installing instructions
# Client
- React application
- Refer to /client/README.md for installing instructions

## Asumptions and others
* Requisites 4 and 5 from backend: “It lets you add an application to a host. “
	* I assume that the application must exist so later add/remove it to the given host
* Requisites 3 and 4 from the frontend are not provided in the mockups so I built an "Edit" button that shows when hovering the host,
 after clicking on it, it shows the list of the top 25 application within the host and provides a button to remove existing application.
  It also provides a form to input the application id to be added to that host, I suggest clicking on another application
  from another host to get its application id and paste it in the form.
  
### Backlog (in order of priority)
* Coverage for client, currently there a none tests.
* Add a library for state managment or consider using React Context API, currently when adding the last requisites of frontend
 the state changes started to clutter the whole app.
* Improve queries on the server to improve request time (currently for /hosts it takes ~10s on slow connections)
* Create  scripts to automatize builds and deployments
* Consider using lerna ([Lerna](https://github.com/lerna/lerna)) for monorepo
