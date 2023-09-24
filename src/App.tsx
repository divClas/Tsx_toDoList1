import React from 'react';
import { useState } from 'react';
import { v1 } from 'uuid';
import './App.css';
import { TaskType } from "./TodoList";
import TodoList from "./TodoList"
import AddItemForm from "./AddItemForm"
import { Button } from '@material-ui/core';


export type FilterValueType = "all" | "active" | "complited";


type ToDoListType = {
  id: string
  title: string
  filter: FilterValueType

}
type tasksStateType = {
  [key: string]: Array<TaskType>
}

function App() {

  function removeTask(id: string, TodoListId: string) {
    let tasks = tasksObj[TodoListId];

    let filteredTasks = tasks.filter(t => t.id !== id);

    tasksObj[TodoListId] = filteredTasks

    setTasks({ ...tasksObj });
  }
  function addTasks(title: string, TodoListId: string) {
    let task = { id: v1(), title: title, isDone: false }
    let tasks = tasksObj[TodoListId];
    let newTasks = [task, ...tasks];
    tasksObj[TodoListId] = newTasks;
    setTasks({ ...tasksObj });
  }
  function changeStatus(taskId: string, isDone: boolean, TodoListId: string) {
    //достаем новый массив по todolistID
    let tasks = tasksObj[TodoListId];
    //найдем нужную таску
    let task = tasks.find(t => t.id === taskId);
    //поменяем таску если она нашлась 
    if (task) {
      task.isDone = isDone;
      //засетамем в стейт компию объекта, чтобы React отреагировал перерисовкой
      setTasks({ ...tasksObj });
    }
  }
  function changeTaskTitle(taskId: string, newTitle: string, TodoListId: string) {
    //достаем новый массив по todolistID
    let tasks = tasksObj[TodoListId];
    //найдем нужную таску
    let task = tasks.find(t => t.id === taskId);
    //поменяем таску если она нашлась 
    if (task) {
      task.title = newTitle;
      //засетамем в стейт компию объекта, чтобы React отреагировал перерисовкой
      setTasks({ ...tasksObj });
    }
  }

  let toDoListsId1 = v1();
  let toDoListsId2 = v1()

  let [toDoLists, setToDoList] = useState<Array<ToDoListType>>([
    { id: toDoListsId1, title: "What to learn", filter: "all", },
    { id: toDoListsId2, title: "What to but", filter: "all", },
  ]);

  let removeTodoList = (TodoListId: string) => {

    let filteredToDoList = toDoLists.filter(tl => tl.id !== TodoListId)
    setToDoList(filteredToDoList);
    delete tasksObj[TodoListId];
    setTasks({ ...tasksObj })
  }

  function changeTodoListTitle(id: string, newTitle: string) {
    const todolist = toDoLists.find(tl => tl.id === id)
    if (todolist) {
      todolist.title = newTitle;
      setToDoList([...toDoLists])
    }
  }




  let [tasksObj, setTasks] = useState<tasksStateType>({
    [toDoListsId1]:
      [
        { id: v1(), title: "CSS", isDone: true, },
        { id: v1(), title: "JS", isDone: true, },
        { id: v1(), title: "React", isDone: false },
        { id: v1(), title: "Redux", isDone: false },
        { id: v1(), title: "Vite", isDone: false },
        { id: v1(), title: "WeB", isDone: true },
      ],
    [toDoListsId2]:
      [
        { id: v1(), title: "Book", isDone: true, },
        { id: v1(), title: "Milk", isDone: true, },
      ]
  });



  function changeFilter(value: FilterValueType, TodoListId: string) {
    let toDoList = toDoLists.find(tl => tl.id === TodoListId);
    if (toDoList) {
      toDoList.filter = value;
      setToDoList([...toDoLists]);
    }
  }

  function addTodoList(title: string) {
    let todoList: ToDoListType = {
      id: v1(),
      filter: "all",
      title: title
    }

    setToDoList([todoList, ...toDoLists]);
    setTasks({
      ...tasksObj,
      [todoList.id]: []
    })

  }


  return (

    <div className="App">
      {/* <input type="text" /><button>+</button> */}
      <AddItemForm addItem={addTodoList} />

      {
        toDoLists.map((tl) => {
          let tasksTodoList = tasksObj[tl.id];

          if (tl.filter === "complited") {
            tasksTodoList = tasksTodoList.filter(t => t.isDone === true)
          }

          if (tl.filter === "active") {
            tasksTodoList = tasksTodoList.filter(t => t.isDone === false)
          }
          return <TodoList
            key={tl.id}
            id={tl.id}
            title={tl.title}
            tasks={tasksTodoList}
            removeTask={removeTask}
            changeFilter={changeFilter}
            addTasks={addTasks}
            changeTaskStatus={changeStatus}
            changeTaskTitle={changeTaskTitle}
            filter={tl.filter}
            removeTodoList={removeTodoList}
            changeTodoListTitle={changeTodoListTitle}
          />
        })
      }


    </div>
  );
}


export default App;
