/* eslint-disable */
const input = document.querySelector('.input');
const ulContent = document.querySelector('.li');

// Objects to work
let data = {};
const makeWork = document.createElement('ul');
const ulElement = ulContent.appendChild(makeWork);



// Set display values

function saveValues(value, id) {
  const arr = [...value.children];

  for (let i = 0; i < arr.length; i++) {
    id.setAttribute('id', `${i}`);
    localStorage[arr[i].id] = arr[i].innerHTML;
  }
}

function setValues(setItem) {
  localStorage.removeItem('');
  const properties = Object.keys(localStorage).sort();

  for (let i = 0; i < properties.length; i++) {
    const li = document.createElement('li');
    li.innerHTML = localStorage[properties[i]];

    const arr = [...li.children];
    function remove() {
      localStorage.removeItem(properties[i]);
      this.parentNode.remove();
    }
    arr.forEach((item) => {
      item.addEventListener('click', remove);
    });

    setItem.appendChild(li);
  }
}

// Get values and display than

function doSomething(event) {
  const key = event.wich || event.keyCode;
  if (event.target.value === '') {
    undefined;
  } else {
    if (key === 13) {
      data.element = event.target.value;
      const li = document.createElement('li');
      const span = document.createElement('button');
      li.innerHTML += `${data.element}`;
      li.appendChild(span);
      ulElement.appendChild(li);
      function remove() {
        this.parentNode.remove();
      }
      span.addEventListener('click', remove);
      saveValues(ulElement, li);
      reset(data);
      event.target.value = '';
      return li;
    }
  }
}

window.onload = function () {
  setValues(ulElement);
};
// Reset object

function reset(object) {
  object = {};
  return object;
}

input.addEventListener('keyup', doSomething);
