const restify = require('restify');
const db = require('./db');

const server = restify.createServer();

// For debugging purpose
server.pre(restify.plugins.pre.userAgentConnection()); // Close curl connection.
server.use((req, res, next) => {
  console.log(req.method + ' ' + req.url);
  return next();
});

/**
 * Get all the todos.
 */
server.get('/todos', (req, res, next) => {
  db.query('SELECT * FROM todos', (err, result) => {
    if (err) return next(err);
    else {
      res.send(result.rows);
      return next();
    }
  });
});

/**
 * Create a todo.
 */
server.use(restify.plugins.bodyParser());
server.post('/todo/add', (req, res, next) => {
  if (!req.body.hasOwnProperty('todo')) res.send(500);
  db.query(
    `INSERT INTO todos (todo, done) VALUES ('${req.body.todo}', 'FALSE')`,
    (err, result) => {
      if (err) return next(err);
      else res.send(201);
    },
  );
  return next();
});

/**
 * Edit a todo's text.
 */
server.use(restify.plugins.queryParser());
server.put('/todo/edit', (req, res, next) => {
  let id = req.query.id;
  let text = req.query.text;
  db.query(
    `UPDATE todos SET todo='${text}' WHERE todos.id=${id}`,
    (err, result) => {
      if (err) return next(err);
      else res.send(201);
    },
  );
  return next();
});

/**
 * Toggle a todo.
 */
server.put('/todo/toggle/:id', (req, res, next) => {
  let id = req.params.id;

  db.query(`SELECT * FROM todos WHERE todos.id=${id}`, (err, result) => {
    if (err) return next(err);
    let todo = result.rows[0];

    db.query(
      `UPDATE todos SET done='${!todo.done}' WHERE todos.id=${id}`,
      (err, result) => {
        if (err) return next(err);
        else res.send(201);
      },
    );
  });
  return next();
});

/**
 * Delete a todo.
 */
server.del('/todo/remove/:id', (req, res, next) => {
  let id = req.params.id;
  db.query(`DELETE FROM todos WHERE todos.id=${id}`, (err, result) => {
    if (err) return next(err);
    else res.send(200);
  });
});

server.listen('8080', () => {
  console.log('%s listening at %s', server.name, server.url);
});
