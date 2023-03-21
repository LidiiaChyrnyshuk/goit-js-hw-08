import throttle from 'lodash.throttle';

const form = document.querySelector('.feedback-form');
const inputEl = document.querySelector('input');
const textareaEl = document.querySelector('textarea');
const LOCALSTORAGE_KEY = 'feedback-form-state';

let formData = {};
form.addEventListener('input', throttle(onFormInput, 500));
form.addEventListener('submit', onFormSubmit);

inputSavedData();

// function onFormInput(evt) {
//   formData[evt.target.name] = evt.target.value;
//   localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(formData));
//   //  console.log(formData);
// }

function onFormInput(evt) {
  formData = JSON.parse(localStorage.getItem(LOCALSTORAGE_KEY)) || {};
  formData[evt.target.name] = evt.target.value;
  localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(formData));
}

function onFormSubmit(evt) {
  evt.preventDefault();

  const {
    elements: { email, message }
  } = evt.currentTarget;
  if (email.value === '' || message.value === '') {
    alert('Please fill in all the fields!');
  } 
  // console.log(JSON.parse(localStorage.getItem(LOCALSTORAGE_KEY)));
  const formElDetails = { email: email.value, message: message.value };
  console.log(formElDetails);
  evt.currentTarget.reset();
  localStorage.removeItem(LOCALSTORAGE_KEY);
}

function inputSavedData() {
  const savedData = JSON.parse(localStorage.getItem(LOCALSTORAGE_KEY));

  if (savedData) {
    inputEl.value = savedData.email || '';
    textareaEl.value = savedData.message || '';
  }
}