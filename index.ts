#! /usr/bin/env node

import inquirer from "inquirer";
import chalk from "chalk";




let arr : string[] = [chalk.blue.bgWhite.bold(" Add Todo + "), chalk.white.bgRed.bold(" Exit ")];


async function todoList() {

let todo = await inquirer.prompt([
    {name:"todos", type:"list", choices: arr}
])

if (todo.todos === chalk.blue.bgWhite.bold(" Add Todo + ")) {
    let todo = await inquirer.prompt([
        {name:"todo", type:"input", message:"Enter your todo"}
    ]);
    arr.push(todo.todo);
    console.log(todo.todo);
    todoList();
} else if (todo.todos !== chalk.white.bgRed.bold(" Exit ") && todo.todos !== chalk.blue.bgWhite.bold(" Add Todo + ")) {
    let todoAction : string[] = ["Delete", "Edit", "Tick"];
    let action = await inquirer.prompt([
        {name:"option", type:"list", choices: todoAction}
    ])
    if (action.option === "Delete") {
        arr.splice(arr.indexOf(todo.todos), 1);
        todoList();
    } else if (action.option === "Edit") {
        let edit = await inquirer.prompt([
            {name:"edit", type:"input", message:"Enter your edit"}
        ])
        arr.splice(arr.indexOf(todo.todos), 1, edit.edit);
        todoList();
    } else if (action.option === "Tick") {
        if (todo.todos.includes("*")) {
            arr.splice(arr.indexOf(todo.todos), 1, todo.todos.replace(chalk.green(" * "), ""));
            todoList();
        } else {
        arr.splice(arr.indexOf(todo.todos), 1, todo.todos + chalk.green(" * "));
        todoList();
        }
    }

}

}
todoList()