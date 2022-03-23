import fs from "fs";
import {Todo} from "@daniel-searle/github-package/build/main";

export class TodoListService {
    /**
     * Get ToDoList items
     */
    public getTodoList(): any {
        let todoListJson = fs.readFileSync("resources/TodoList.json", "utf-8");
        let todo = JSON.parse(todoListJson);
        console.log(todo);
        return todo;
    }

    /**
     * Get ToDoList items
     */
    public getTodoListById(data: number): any {
        let todoListJson = fs.readFileSync("resources/TodoList.json", "utf-8");
        let todo = JSON.parse(todoListJson);

        return todo.find((x: { id: number; }) => x.id === data) ? todo.find((x: { id: number; }) => x.id === data) : null;
    }

    /**
     * Get ToDoList items
     */
    public getPendingTodoList(): any {
        let todoListJson = fs.readFileSync("resources/TodoList.json", "utf-8");
        let todo = JSON.parse(todoListJson);
        return todo.filter((data: { status: string; }) => data.status === 'Pending');
    }

    /**
     * Insert ToDoList
     */
    public postTodoList(data: Todo) {
        try {
            const fs = require("fs");
            let todoListJson = fs.readFileSync("resources/TodoList.json", "utf-8");
            let todo = JSON.parse(todoListJson);

            data.status = 'Pending';
            data.timeStamp = Date.now().toString();

            todo.push(data);
            todo.forEach(function (item: { id: any; }, index: any) {
                item.id = index;
            });
            fs.writeFileSync("resources/TodoList.json", JSON.stringify(todo), "utf-8");
            return todo;
        } catch (e) {
            console.log(e)
        }
    }

    /**
     * Update TodoList
     */
    public putTodoList(data: number) {
        try {
            const fs = require("fs");
            let todoListJson = fs.readFileSync("resources/TodoList.json", "utf-8");
            let todo: any = JSON.parse(todoListJson);

            if (todo.find((x: { id: number; }) => x.id === data) != undefined) {
                let index: any = todo.findIndex(((x: { id: number; }) => x.id === data))
                todo[index].status = 'Completed';
                fs.writeFileSync("resources/TodoList.json", JSON.stringify(todo), "utf-8");
                return 'Updated record';
            } else {
                return null;
            }
        } catch (e) {
            console.log(e)
            return e;
        }
    }
}
