class Todo {
  constructor(data, templateSelector) {
    this._data = data;
    this._templateElement = document.querySelector(templateSelector);
  }

  setEventListeners() {
    // Event listener for delete button
    const todoDeleteBtn = this.todoElement.querySelector(".todo__delete-btn");
    todoDeleteBtn.addEventListener("click", () => {
      this.todoElement.remove();
    });

    this._todoCheckboxEl.addEventListener("change", () => {
      this._data.completed = !this._data.completed;
    });
  }

  _generateCheckboxEl() {
    this._todoCheckboxEl = this.todoElement.querySelector(".todo__completed");
    this._todoLabel = this.todoElement.querySelector(".todo__label");
    this._todoCheckboxEl.checked = this._data.completed;
    this._todoCheckboxEl.id = `todo-${this._data.id}`;
    this._todoLabel.setAttribute("for", `todo-${this._data.id}`);
  }

  getview() {
    this.todoElement = this._templateElement.content
      .querySelector(".todo")
      .cloneNode(true);

    const todoNameEl = this.todoElement.querySelector(".todo__name");
    const todoDate = this.todoElement.querySelector(".todo__date");

    todoNameEl.textContent = this._data.name;
    const dueDate = new Date(this._data.date);
    todoDate.textContent = dueDate.toLocaleDateString();

    this._generateCheckboxEl();
    this.setEventListeners();

    return this.todoElement;
  }
}

export default Todo;
