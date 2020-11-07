'use strict';

class Todo {
    constructor(form, input, todoList, todoCompleted, todoContainer) {
        this.form = document.querySelector(form);
        this.input = document.querySelector(input);
        this.todoList = document.querySelector(todoList);
        this.todoCompleted = document.querySelector(todoCompleted);    
        this.todoContainer = document.querySelector(todoContainer);          
        this.todoData = new Map(JSON.parse(localStorage.getItem('toDoList')) );
        
    }

    addToStorage() {
        localStorage.setItem('toDoList', JSON.stringify([...this.todoData]))
    }

    render() {
        this.todoList.textContent = '';
        this.todoCompleted.textContent = '';
        this.todoData.forEach(this.createItem, this);
        this.addToStorage();
    }

    createItem(todo){        
        const li = document.createElement('li');
        li.classList.add('todo-item');
        li.key = todo.key;
        li.insertAdjacentHTML('beforeend', `
            <span class="text-todo">${todo.value}</span>
            <div class="todo-buttons">
                <button class="todo-edit"></button>
                <button class="todo-remove"></button>
                <button class="todo-complete"></button>
            </div>
        `);

        if (todo.completed) {
            this.todoCompleted.append(li);
            
        } else {
            this.todoList.append(li);
            
        }
    }

    addTodo(e) {
        e.preventDefault();
        
        if(this.input.value.trim()){
            const newTodo = {
                value: this.input.value,
                completed: false,
                key: this.generateKey(),
            };
            
            this.todoData.set(newTodo.key, newTodo);  
                    
            this.render();
        }else {
            alert('Пустое дело добавить нельзя!');
        }
        
        this.input.value = ''; 
    }

    generateKey() {
        return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    }

    deleteItem(elem) {             
        this.todoData.forEach(item => {
            if (elem.key === item.key) {
                this.todoData.delete(item.key);
            }
        });
        this.render();
    }

    completedItem(elem) {  
            
        this.todoData.forEach(item => {
            if (elem.key === item.key) {
                if (item.completed) {
                    item.completed = false;
                } else {
                    item.completed = true;
                }
            }
        });
        this.render();        
    }

    editItem(elem) {
        const span = elem.querySelector(".text-todo");
        span.setAttribute("contenteditable", true);
        span.focus();
    }

    handler(event) {       
        const target = event.target, 
            element = target.parentNode.parentNode; 
        
        if (target.matches(".todo-remove")) {
            this.deleteItem(element);
            
        } else if (target.matches(".todo-complete")) {
            this.completedItem(element);
        } else if (target.matches(".todo-edit")) {
            this.editItem(element);
        }
    }   


    init() {
        this.form.addEventListener('submit', this.addTodo.bind(this));        
        this.render();
        this.todoContainer.addEventListener('click', this.handler.bind(this));
        
    }

}


const todo = new Todo('.todo-control', '.header-input', '.todo-list', '.todo-completed', '.todo-container');

todo.init();
