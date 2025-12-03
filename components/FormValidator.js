class FormValidator {
  constructor(settings, formEl) {
    this._formEl = formEl;
    this._settings = settings;
    this._buttonElement = this._formEl.querySelector(
      settings.submitButtonSelector
    );
    this._inputErrorClass = settings.inputErrorClass;
    this._errorClass = settings.errorClass;
    this._inactiveButtonClass = settings.inactiveButtonClass;
    this._inputSelector = settings.inputSelector;
    this._submitButtonSelector = settings.submitButtonSelector;
  }

  resetValidation() {
    this._formEl.reset();
    this._buttonElement.disabled = true;
    this._buttonElement.classList.add(this._settings.inactiveButtonClass);
  }

  _showInputError = (formElement, inputElement, errorMessage, settings) => {
    const errorElementId = `#${inputElement.id}-error`;
    const errorElement = formElement.querySelector(errorElementId);
    inputElement.classList.add(settings.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(settings.errorClass);
  };

  _toggleButtonState() {
    if (this._hasInvalidInput()) {
      this._buttonElement.classList.add(this._inactiveButtonClass);
      this._buttonElement.disabled = true;
    } else {
      this._buttonElement.classList.remove(this._inactiveButtonClass);
      this._buttonElement.disabled = false;
    }
  }
  _hasInvalidInput() {
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }

  _hideInputError = (formElement, inputElement, settings) => {
    const errorElementId = `#${inputElement.id}-error`;
    const errorElement = formElement.querySelector(errorElementId);
    inputElement.classList.remove(settings.inputErrorClass);
    errorElement.classList.remove(settings.errorClass);
    errorElement.textContent = "";
  };

  _checkInputValidity = (formElement, inputElement, settings) => {
    if (!inputElement.validity.valid) {
      this._showInputError(
        formElement,
        inputElement,
        inputElement.validationMessage,
        settings
      );
    } else {
      this._hideInputError(formElement, inputElement, settings);
    }
  };

  _setEventListeners() {
    this._inputList = Array.from(
      this._formEl.querySelectorAll(this._inputSelector)
    );

    this._buttonElement = this._inputList = Array.from(
      this._formEl.querySelectorAll(this._inputSelector)
    );
    this._buttonElement = this._formEl.querySelector(
      this._submitButtonSelector
    );

    // toggleButtonState(this._inputList, buttonElement, this._settings);

    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._checkInputValidity(this._formEl, inputElement, this._settings);
        this._toggleButtonState(
          this._inputList,
          this._buttonElement,
          this._settings
        );
      });
    });
  }

  enableValidation() {
    this._formEl.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });
    this._setEventListeners();
  }
}

export default FormValidator;
