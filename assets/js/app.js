// Todo data init
/*
    type Status = "next" | "progress" | "done";
    type Category = "productive" | "work" | "food" | "health" | "meeting" | "bill";
    type Todo = {
        id: () => number;
        title: string;
        description: string;
        status: Status;
        category: Category[];
    }

    let todos: Todo[];
    let categories: string[];
 */
let uniqueId = () => new Date().valueOf() + Math.random()
let todos = [
    {
        id: uniqueId(),
        title: 'Example Done Task',
        description: 'Hey, this is an example task for you. Write your own by pressing blue + button!',
        status: 'done',
        categories: ['health', 'bill']
    },
    {
        id: uniqueId(),
        title: 'Example Next Task',
        description: 'Hello World',
        status: 'next',
        categories: ['health', 'meeting']
    }
]
let categories = new Set([])
let statusOption = ''
let categoryOption = ''

// Todo element selector
let sectionList = document.getElementById('section-list')
let categoryList = document.getElementById('category-list')
let categoryListAdd = document.getElementById('category-list-add')
let addTodoName = document.getElementById('add-todo-name')
let addTodoDescription = document.getElementById('add-todo-description')
let buttonAdd = document.getElementById('button-add-todo')
let buttonAddCategory = document.getElementById('button-add-category')
let categoryAdd = document.getElementById('category-add')
let filterStatus = document.getElementById('filter-status')
let filterCategory = document.getElementById('filter-category')
let header = document.getElementById('header')
let closeModal = document.getElementById('close-modal')

/**
 * Todo modifier
 */
// Add todo
let setTodo = data => {
    // todos.push(data)
    todos.unshift(data)
    renderTodosList()
    // Clear categories too
    resetCategory()
}
// Remove todo
let removeTodo = id => {
    todos.splice(todos.findIndex(todo => todo.id === id), 1)
    renderTodosList()
}
// Remove todo
let updateStatus = (id, status) => {
    let todo = todos.find(i => i.id === id)
    todo.status = status
    renderTodosList()
}

/**
 * Categories modifier
 */
// Add category
let setCategory = value => {
    categories.add(value)
    renderCategoriesList()
}
// Remove category
let removeCategory = value => {
    categories.delete(value)
    renderCategoriesList()
}
// Reset categories
let resetCategory = value => {
    categories.clear()
    renderCategoriesList()
}

/**
 * Render list
 */
let renderTodosList = () => {
    addTodoName.value = ''
    addTodoDescription.value = ''
    categoryAdd.value = ''
    sectionList.innerHTML = listElems()
}
let renderCategoriesList = () => {
    categoryListAdd.innerHTML = listCategoryElems()
}

// Set listElems to function to invoke new change from todos
let listElems = () => {
    // Remove unnecesarry coma from array with join
    return todos.filter(data => {
        if (categoryOption) {
            return data.status === categoryOption
        }

        return data
    }).filter(data => {
        if (statusOption) {
            return data.categories.includes(statusOption)
        }

        return data
    }).map(data => (`
        <li>
            <div class="d-flex">
                <div class="content">
                    <h3>${data.title}</h3>
                    <span class="description">${data.description}</span>
                    ${data.categories.map(category => `<span class="category-item category-${category}">${category}</span>`).join('')}
                </div>
                <div class="action">
                    ${getStatus(data)}
                </div>
                <button class="delete-item" onclick="removeTodo(${data.id})">
                    <div class="tooltip" text="Delete todo">&times;</div>
                </button>
            </div>
        </li>
    `)).join('')
}
let getStatus = data => {
    switch (data.status) {
      case 'next':
        return `<button class="button-progress-outline tooltip" text="Move to progress" onclick="updateStatus(${data.id}, 'progress')">
                    <img src="./assets/img/hourglass.svg" height="25" alt="progress">
                </button>
                <button class="button-done-outline tooltip" text="Mark as done" onclick="updateStatus(${data.id}, 'done')">
                    <img src="./assets/img/icon_check.svg" height="25" alt="done">
                </button>`
      case 'progress':
        return `<button class="button-progress tooltip" text="In Progress">
                    <img src="./assets/img/hourglass.svg" height="25" alt="progress">
                </button>
                <button class="button-done-outline tooltip" text="Mark as done" onclick="updateStatus(${data.id}, 'done')">
                    <img src="./assets/img/icon_check.svg" height="25" alt="done">
                </button>`
      case 'done':
        return `<button class="button-done tooltip" text="Done">
                    <img src="./assets/img/icon_check.svg" height="25" alt="done">
                </button>`
    }
}

// Set listCategoryElems to function to invoke new change from categories
let listCategoryElems = () => {
    if (!categories.size) {
        return ''
    }
    // Remove unnecesarry coma from array with join
    return [...categories].map(data => (`
        <li>
            <div class="button-group">
                <span class="button category-item category-${data}">${data}</span>
                <button class="button category-item category-${data} delete" onclick="removeCategory('${data}')">
                    <b>&times;</b>
                </button>
            </div>
        </li>
    `)).join('')
}

// Set date
let arrayDate = new Date().toDateString().split(' ')
arrayDate[2] += ','
let currentDate = arrayDate.slice(1).join(' ')

let headerContent = () => {
    return `<h1>Hey ${getName()}, Let's add something!</h1>
            <span id="span-date">${currentDate}</span>`
}

header.innerHTML = headerContent()
sectionList.innerHTML = listElems()
categoryListAdd.innerHTML = listCategoryElems()

/**
 * Listener
 */
// Add todo listener by press button
buttonAdd.addEventListener('click', () => {
    if (!addTodoName.value) {
        return null
    }

    setTodo({
        id: uniqueId(),
        title: addTodoName.value,
        description: addTodoDescription.value,
        status: 'next',
        categories: [...categories]
    })

    closeModal.click()
})

// Add category listener by press button
buttonAddCategory.addEventListener('click', () => {
    if (!categoryAdd.value) {
        return null
    }
    setCategory(categoryAdd.value)
})

// Filter by status
filterStatus.addEventListener('change', e => {
    categoryOption = e.target.value
    renderTodosList()
})

// Filter by category
filterCategory.addEventListener('change', e => {
    statusOption = e.target.value
    renderTodosList()
})

// Modal Open
let openEls = document.querySelectorAll('[data-open]')
let isVisible = "is-visible"

openEls.forEach(el => {
    el.addEventListener('click', () => {
        let modalId = el.dataset.open
        document.getElementById(modalId).classList.add(isVisible)
    })
})
// Modal Close
let closeEls = document.querySelectorAll("[data-close]")
// Close by click button
closeEls.forEach(el => {
    el.addEventListener('click', () => {
        el.parentElement.parentElement.classList.remove(isVisible)
    })
})
// Close by click outside modal-content
document.addEventListener('click', e => {
    if (e.target == document.querySelector(".modal.is-visible")) {
        document.querySelector(".modal.is-visible").classList.remove(isVisible)
    }
});
// Close by pressing the esc key
document.addEventListener('keyup', e => {
    if (e.key == "Escape" && document.querySelector(".modal.is-visible")) {
        document.querySelector(".modal.is-visible").classList.remove(isVisible)
    }
})

function getName() {
    let name = localStorage.getItem('name') || 'Stranger'
    return name
}
