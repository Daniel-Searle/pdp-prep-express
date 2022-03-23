import express from 'express';
import {VersionService} from "../service/VersionService";
import {TodoListService} from "../service/TodoListService";
import * as csvwriter from 'csv-writer'
import * as json from '../dist/resources/TodoList.json'
import {printHelloWorld} from '@daniel-searle/github-package/src/main';
import {Todo, TodoList} from "@daniel-searle/github-package/build/main";


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

router.get('/package', (req, res) => {
    res.status(204)
    res.send(printHelloWorld());
})

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

router.get('/todoList/:id', (req, res) => {
        try {
            let toDoListService = new TodoListService();
            let data: Todo = toDoListService.getTodoListById(parseInt(req.params.id));
            if (data) {
                res.json(data);
            } else {
                res.send('No Data Found').status(204)
            }
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

router.get('/convert-json', (req, res) => {
        try {
            const createCsvWriter = csvwriter.createObjectCsvWriter

            // console.log(json)
            const csvWriter = createCsvWriter({
                path: 'todoList.csv',
                header: [
                    {id: 'id', title: 'ID'},
                    {id: 'timeStamp', title: 'TIMESTAMP'},
                    {id: 'body', title: 'BODY'},
                    {id: 'status', title: 'STATUS'},
                ]
            })
            let json2: any = json

            csvWriter.writeRecords(json2.default)
                .then(() => console.log('Data uploaded into csv successfully'));
            res.send('csv file created.')
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

router.put('/todoList/:id', jsonParser, (req, res) => {
        try {
            let toDoListService = new TodoListService();
            let data = toDoListService.putTodoList(parseInt(req.params.id));
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
