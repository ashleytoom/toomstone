const toDoForm = document.querySelector('#todo-form');
const taskInput = document.querySelector('#new-task');
const incompleteTask = document.querySelector('#incomplete-tasks');
const completedTask = document.querySelector('#completed-tasks');

const item = [
  '<input type="checkbox" onchange="taskCompleted(this)" />',
  '<label></label>',
  '<input type="text" />',
  '<button class="edit" onclick="editTask(this)">Edit</button>',
  '<button class="delete" onclick="deleteTask(this)">Delete</button>',
];

const stringToHTML = htmlString => {
  const li = document.createElement('li');
  li.innerHTML = htmlString;
  return li;
};

const createEmptyListElement = str => {
  const li = stringToHTML(str);
  li.classList.add('empty');
  li.style.color = '#903d3d';
  return li;
};

const ifEmpty = () => {
  // if incompleteTask is empty
  if (!incompleteTask.children.length) {
    incompleteTask.append(
      createEmptyListElement('Currently there are no Incompleted Tasks!')
    );
  }

  // if completedTask is empty
  if (!completedTask.children.length) {
    completedTask.append(
      createEmptyListElement('Currently there are no Completed Tasks!')
    );
  }
};

const ifNotEmpty = () => {
  const empty = document.querySelector('.empty');

  if (incompleteTask.contains(empty))
    incompleteTask.removeChild(incompleteTask.childNodes[0]);

  if (completedTask.contains(empty))
    completedTask.removeChild(completedTask.childNodes[0]);
};

ifEmpty();

// Form
toDoForm.addEventListener('submit', e => {
  e.preventDefault();
  addNewTaskElement();
});

// add task
const addNewTaskElement = () => {
  ifNotEmpty();

  item[1] = '<label>' + taskInput.value + '</label>';
  const newItemString = item.join('\n');

  const newListItem = stringToHTML(newItemString);
  incompleteTask.append(newListItem);

  taskInput.value = '';
};

//Edit an existing task. (the logic for hiding is in css file)
const editTask = editBtn => {
  const listItem = editBtn.parentNode;

  const editInput = listItem.querySelector('input[type=text]');
  const label = listItem.querySelector('label');
  const containsClass = listItem.classList.contains('editMode');

  if (containsClass) {
    editBtn.innerText = 'Edit';
    label.innerText = editInput.value;
  } else {
    editBtn.innerText = 'Save';
    editInput.value = label.innerText;
  }

  listItem.classList.toggle('editMode');
};

//Delete task.
const deleteTask = delBtn => {
  const listItem = delBtn.parentNode;
  const ul = listItem.parentNode;

  ul.removeChild(listItem);
  ifEmpty();
};

//Mark task completed
const taskCompleted = checkBox => {
  ifNotEmpty();
  var listItem = checkBox.parentNode;
  completedTask.appendChild(listItem);
  checkBox.onchange = e => taskIncomplete(checkBox);
  ifNotEmpty();

  ifEmpty();
};

// mark task incomplete
const taskIncomplete = checkBox => {
  var listItem = checkBox.parentNode;
  incompleteTask.appendChild(listItem);
  checkBox.onchange = e => taskCompleted(checkBox);
  ifNotEmpty();

  ifEmpty();
};
