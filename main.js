const elementObject = {
  inputSection: document.querySelector('.user-input'),
  list: document.querySelector('#my-todo'),
  addBtn: document.querySelector('#addBtn'),
  input: document.querySelector('#newTodo'),
  done: document.querySelector('#my-done')
}

const data = {
  todos: ['Hit the gym', 'Read a book', 'Buy eggs', 'Organize office', 'Pay bills'],
  hintSpanClass: ['mx-3', 'text-danger', 'hint-message']
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
  allAllTodos (todos) {
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
  addHintSpan () {
    if (document.querySelectorAll('.hint-message').length < 1) {
      const span = document.createElement('span')
      span.classList.add(...data.hintSpanClass)
      span.innerHTML = 'Hint: At least enter one alphabet.'
      elementObject.inputSection.appendChild(span)
    }
  },
  deleteHintSpan () {
    if (document.querySelector('.hint-message') !== null) document.querySelector('.hint-message').remove()
  }
}

const controller = {
  notEmptyOrSpace (str) {
    return str.trim().length > 0
  }
}

view.allAllTodos(data.todos)

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
  if (controller.notEmptyOrSpace(todoString)) {
    view.deleteHintSpan()
    view.addItem(todoString)
    elementObject.input.value = ''
  } else {
    view.addHintSpan()
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
