let express = require('express');
let bodyParser = require('body-parser');
let {ObjectID} = require('mongodb');

let {mongoose} = require('./db/mongoose');
let {Todo} = require('./models/todo');
let {User} = require('./models/user');

let app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

app.post('/todos', (req, res) => {
  let todo = new Todo({
    text: req.body.text
  });

  todo.save().then((doc) => {
    res.send(doc);
  }, (e) => {
    res.status(400).send(e);
  });
});

app.get('/todos', (req, res) => {
  Todo.find().then((todos) => {
    res.send({todos});
  }, (e) => {
    res.status(400).send(e);
  });
});

app.get('/todos/:id', (req, res) => {
  let id = req.params.id;

  if(!ObjectID.isValid(id)) {
    res.status(404).send();
  }

  Todo.findById(id).then((todo) => {
      if(!todo) {
        return res.status(404).send();
      }

      res.send({todo});
    }).catch((e) => res.status(400).send());
});

app.delete('/todos/:id', (req, res) => {
  let id = req.params.id;

  if(!ObjectID.isValid(id)) {
    res.status(404).send();
  }

  Todo.findOneAndDelete({_id: id}).then((todo) => {
    if(!todo) {
      return res.status(404).send();
    }

    res.send({todo});
  }).catch((e) => res.status(400).send());
  // Remove by ID
    // Success
      // if no doc, send 404
      // if doc, send it back with 200
    // Error
      // 404 with empty body
});

app.listen(port, () => {
  console.log(`Started at port ${port}`);
});

module.exports = {app} ;













































































// let newTodo = new Todo({
//   text: 'Cook diner'
// });
//
// newTodo.save().then((doc) => {
//   console.log('Saved todo', doc);
// }, (e) => {
//   console.log('Unable to save todo');
// });

// let secondTodo = new Todo({
//   text: 'Something to do'
// });
//
// secondTodo.save().then((doc) => {
//   console.log('Todo: Saved', doc);
// });
//
//
// let newUser = new User({
//   email: '  mudano.tomas@gmail.com  '
// });
//
// newUser.save().then((user) => {
//   console.log('User: Saved', user);
// }, (e) => {
//   console.log('Unable to save user', e);
// });
