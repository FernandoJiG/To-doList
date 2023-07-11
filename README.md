# To-Do list created using react

## Functionality
The project will display some components wich work together to represent a To-Do list where the user will be able to create some task to do and mark them as ready, pending or delete them.

##Where are the tasks stored?
To store the tasks that the user adds there could have been used a data base but for the purpose of this project we used JSON Server which is a usefull tool to emulate a storage system where you can use some HTTP request to add, update, delet or request specific registers.

##Requirements
It is important to set up [JSON Server](https://www.npmjs.com/package/json-server "JSON Server Page") for the best performance.
###  Install JSON Server
    npm install -g json-server

###  Start JSON Server    
    json-server --watch TareasObjeto.json
