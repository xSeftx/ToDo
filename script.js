'use strict'
const todoControl = document.querySelector('.todo-control'), 
    headerInput = document.querySelector('.header-input'), 
    todoList = document.querySelector('.todo-list'), 
    todoCompleted = document.querySelector('.todo-completed'); 
    

let todoData = [];
if(localStorage.getItem('newArr')){
    todoData = JSON.parse(localStorage.getItem('newArr'));    
    render();
}



todoControl.addEventListener('submit', function(event){
    event.preventDefault();
    if (headerInput.value.trim() !== ''){
        const newTodo = {
            value: headerInput.value,
            completed: false
        };    
        todoData.push(newTodo);    
        render();
        localStorage.setItem('newArr', JSON.stringify(todoData));
    } else {
        return
    }

    
});

function render() {
    
    
    todoList.textContent = '';
    todoCompleted.textContent = '';
    headerInput.value = '';
    todoData.forEach(function(item){
        const li = document.createElement('li');
        li.classList.add('todo-item');
        li.innerHTML = '<span class="text-todo">' + item.value + '</span>' + 
        '<div class="todo-buttons">' + 
            '<button class="todo-remove"></button>' +
            '<button class="todo-complete"></button>' +
        '</div>';
        

        if (item.completed) {
            headerInput.value = '';
            todoCompleted.append(li);            
        } else {
            todoList.append(li);
        }
        
        const btnTodoComplete = li.querySelector('.todo-complete');
        btnTodoComplete.addEventListener('click', function(event){
            item.completed = !item.completed;
            localStorage.setItem('newArr', JSON.stringify(todoData));
            
            render();
        }); 
        
        const btnTodoRemove = li.querySelector('.todo-remove');        
        btnTodoRemove.addEventListener('click',  function(){
            let listItem=this.parentNode;
            let ul =listItem.parentNode;
            ul.remove(listItem);
            localStorage.setItem('newArr', JSON.stringify(todoData));
        });
              
                
    });

          
    
   
    
}




