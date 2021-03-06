const elementObject = {
  hintSpan: document.querySelector('.hint-message'),
  list: document.querySelector('#my-todo'),
  addBtn: document.querySelector('#addBtn'),
  input: document.querySelector('#newTodo'),
  done: document.querySelector('#my-done')
}

const data = {
  todos: ['Hit the gym', 'Read a book', 'Buy eggs', 'Organize office', 'Pay bills']
}

const view = {
  addItem (todo) {
    elementObject.list.innerHTML += `
      <li>
        <label for="todo">${todo}</label>
        <i class="delete fa fa-trash"></i>
      </li>
      `
  },
  addAllTodo (todos) {
    todos.forEach(todo => {
      this.addItem(todo)
    })
  },
  checkedItem (event) {
    event.target.classList.toggle('checked')
  },
  moveItem (event) {
    const li = event.target.parentElement
    elementObject.done.appendChild(li)
  },
  deleteItem (event) {
    const li = event.target.parentElement
    li.remove()
  },
  setHintMessage (target, message) {
    target.innerText = message
  }
}

const utility = {
  notEmptyOrSpace (str) {
    return str.trim().length > 0
  }
}

view.addAllTodo(data.todos)

elementObject.list.addEventListener('click', event => {
  const targetTagName = event.target.tagName
  switch (targetTagName) {
    case 'LABEL':
      view.checkedItem(event)
      view.moveItem(event)
      return
    case 'I':
      view.deleteItem(event)
  }
})

elementObject.addBtn.addEventListener('click', event => {
  const todoString = elementObject.input.value
  if (utility.notEmptyOrSpace(todoString)) {
    view.setHintMessage(elementObject.hintSpan, '')
    view.addItem(todoString)
    elementObject.input.value = ''
  } else {
    view.setHintMessage(elementObject.hintSpan, 'Hint: At least enter one alphabet.')
  }
})

elementObject.input.addEventListener('keypress', event => {
  if (event.keyCode === 13) {
    elementObject.addBtn.click()
  }
})

elementObject.done.addEventListener('click', event => {
  if (event.target.tagName === 'I') view.deleteItem(event)
})
