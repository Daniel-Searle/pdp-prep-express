import express from 'express';
import {VersionService} from "../service/VersionService";
import {TodoListService} from "../service/TodoListService";
import {TodoList} from "../models/TodoList";

let router = express.Router();
const bodyParser = require('body-parser');
let jsonParser = bodyParser.json();

router.use((req, res, next) => {
    try {
        console.log("Time: ", Date.now());
        next();
    } catch (err) {
        console.log(`Error: ${err}`);
    }
});

router.get('/version', (req, res) => {
        let versionService = new VersionService();
        res.json(versionService.getVersion());
    }
);

router.get('/todoList/pending', (req, res) => {
        try {
            let toDoListService = new TodoListService();
            let data: TodoList = toDoListService.getPendingTodoList();
            res.json(data);
        } catch (e) {
            console.log(e);
        }
    }
);

router.get('/todoList', (req, res) => {
        try {
            let toDoListService = new TodoListService();
            let data: TodoList = toDoListService.getTodoList();
            res.json(data);
        } catch (e) {
            console.log(e);
        }
    }
);

router.post('/todoList', jsonParser, (req, res) => {
        try {
            let toDoListService = new TodoListService();
            res.json(toDoListService.postTodoList(req.body));
        } catch (e) {
            console.log(e);
        }
    }
);

router.put('/todoList', jsonParser, (req, res) => {
        try {
            let toDoListService = new TodoListService();
            let data = toDoListService.putTodoList(req.body);
            if (data === 'Updated record') {
                res.json(data);
            } else if (data === null) {
                res.send('No records found to be updated').status(204);
            }
        } catch (e) {
            console.log(e);
            res.send(e);
        }
    }
);

module.exports = router;
