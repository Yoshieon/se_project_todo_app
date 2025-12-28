import { v4 as uuidv4 } from "https://jspm.dev/uuid";

import { initialTodos, validationConfig } from "../utils/constants.js";
import Todo from "../components/Todo.js";
import FormValidation from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import TodoCounter from "../components/TodoCounter.js";
// import Popup from "../components/Popup.js";

const addTodoButton = document.querySelector(".button_action_add");
const addTodoPopupEl = document.querySelector("#add-todo-popup");
const addTodoForm = addTodoPopupEl.querySelector(".popup__form");
// const addTodoCloseBtn = addTodoPopupEl.querySelector(".popup__close");
const todosList = document.querySelector(".todos__list");
const todoCounters = new TodoCounter(initialTodos, ".counter__text");

const addTodoPopup = new PopupWithForm({
  popupSelector: "#add-todo-popup",
  handleFormSubmit: (values) => {
    renderTodo(values);
    todoCounters.updateTotal(true);
    if (values.completed) {
      todoCounters.updateCompleted(false);
    }
  },
});

function handleCheck(completed) {
  todoCounters.updateCompleted(completed);
}

function handleDelete(completed) {
  if (completed) {
    todoCounters.updateCompleted(false);
  }

  todoCounters.updateTotal(false);
}

addTodoPopup.setEventListeners();

const section = new Section({
  items: [...initialTodos],
  renderer: (item) => {
    renderTodo(item);
  },
  containerSelector: ".todos__list",
});
// call sections Instance's renderItems method.

const openModal = (modal) => {
  modal.classList.add("popup_visible");
};

addTodoPopup.close();

// const onRemove = (wasActive) => {
//   todoCounter.updateGeneralCounter(false);
//   if (!wasActive) {
//     todoCounter.updateActiveCounter(false);
//   }
// };

const onToggleActive = (isCompleted) => {
  todoCounters.updateActiveCounter(isCompleted);
};

const renderTodo = (todoData) => {
  const todoElement = generateTodo(todoData);
  section.addItem(todoElement);

  // todoCounter.updateGeneralCounter(true);
  // if (todoData.completed) {
  //   todoCounter.updateActiveCounter(false);
  // }
};

// The logic in this function should all be handled in the Todo class.
const generateTodo = (data) => {
  const todo = new Todo(data, "#todo-template", handleCheck, handleDelete);
  const todoElement = todo.getview();
  return todoElement;
};

addTodoButton.addEventListener("click", () => {
  addTodoPopup.open();
});

initialTodos.forEach((item) => {
  const todoElement = generateTodo(item);
  todosList.append(todoElement); // Use addItem method instead.
});

const newTodoFormValidator = new FormValidation(validationConfig, addTodoForm);
newTodoFormValidator.enableValidation();
