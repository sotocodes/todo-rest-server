# todo-rest-server
A REST API server for a TODO list built with __Node.js__, __restify__ and __PostgreSQL__

## Examples with curl

#### Get all the todos
```shell
$ curl -X GET http://localhost:8080/todos
```

#### Create a todo
```shell
$ curl -i --data 'todo=cook' http://localhost:8080/todo/add
```

#### Toggle a todo
```shell
$ curl -X PUT http://localhost:8080/todo/toggle/1
```
#### Remove checked to-dos
```shell
$ curl -X DELETE http://localhost:8080/todo/remove/all
```

## Install
First clone the repository.
```shell
$ git clone https://github.com/sotocodes/todo-rest-server.git
```
Then install the dependencies.
```shell
$ cd todo-rest-server
$ npm install
```
## Usage
Configure the server by specifying the database information in `db/index.js`
```javascript
{
  user: 'username',
  host: 'localhost',
  database: 'database_name',
  password: 'your_password',
  port: 5432,
}
```
The server will listen in port 8080, you have to change that if you have other applications running on that port. Then you can start the server.
```shell
$ npm start
```
That's it! Try some of the examples to make sure everything is working.
