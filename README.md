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
* Requisites 3 and 4 are not provided in the mockups so I built an Edit button that appears when hovering the host,
 there it shows the list of the top 25 application within a host and provides a button to remove exisiting application.
  It also provides a form to input the application id to be added to that host, I suggest clicking on another application
  from another host to get its application id and paste it in the form.
  