class Todo {
  constructor(data, templateSelector, handleCheck, handleDelete) {
    this._completed = data.completed;
    this._name = data.name;
    this._data = data;
    this._id = data.id;
    this._selector = templateSelector;
    this._templateElement = document.querySelector(this._selector).content;
    this._handleCheck = handleCheck;
    this._handleDelete = handleDelete;
  }

  setEventListeners() {
    // set event listeners for checkbox and delete button
    this._deleteButtonEl = this.todoElement.querySelector(".todo__delete-btn");
    this._deleteButtonEl.addEventListener("click", () => {
      this._remove();
    });
    this._todoCheckboxEl.addEventListener("click", () => {
      this._toggleCompletion();
      this._handleCheck(this._data.completed);
    });
  }

  _generateCheckboxEl() {
    this._todoCheckboxEl = this.todoElement.querySelector(".todo__completed");
    this._todoLabel = this.todoElement.querySelector(".todo__label");
    this._todoCheckboxEl.checked = this._data.completed;
    this._todoCheckboxEl.id = `todo-${this._data.id}`;
    this._todoLabel.setAttribute("for", `todo-${this._data.id}`);
  }

  _toggleCompletion = () => {
    this._data.completed = !this._data.completed;
  };

  _remove = () => {
    this.todoElement.remove();
    this.todoElement = null;
    this._handleDelete(this._data.completed);
  };

  getview() {
    // getView
    this.todoElement = this._templateElement
      .querySelector(".todo")
      .cloneNode(true);

    const todoNameEl = this.todoElement.querySelector(".todo__name");
    const todoDate = this.todoElement.querySelector(".todo__date");

    if (this._data.date) {
      const dueDate = new Date(this._data.date);
      if (!isNaN(dueDate.getTime())) {
        todoDate.textContent = dueDate.toLocaleDateString();
      } else {
        todoDate.textContent = "";
      }
    } else {
      todoDate.textContent = "";
    }
    todoNameEl.textContent = this._data.name;
    this._onToggleActive = this._data.onToggleActive;
    this._generateCheckboxEl();
    this.setEventListeners();

    return this.todoElement;
  }
}

export default Todo;
