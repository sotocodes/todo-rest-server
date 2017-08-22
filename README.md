# todo-rest-server
A REST API server for a TODO list built with __Node.js__, __restify__ and __PostgreSQL___

## Example

## Install

## Usage

### Get all the todos
```shell
$ curl -X GET http://localhost:8080/todos
```

### Create a todo
```shell
$ curl -i --data 'todo=cook' http://localhost:8080/todo/add
```

### Toggle a todo
```shell
$ curl -X PUT http://localhost:8080/todo/toggle/1
```

### Edit a todo's text
```shell
$ curl -X PUT http://localhost:8080/todo/edit?id=3&text=cook
```

### Remove a todo
```shell
$ curl -X DELETE http://localhost:8080/todo/remove/2
```
