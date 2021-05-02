const todoForm = document.querySelector(".todoForm");
const addTextInput = document.querySelector(".addText");
const todoList = document.querySelector(".todoList");
const finishList = document.querySelector(".finishList");
const todoContainer = document.querySelector(".todoContainer");
const todoIcon = document.querySelector(".todoIcon");
const closeTodo = document.querySelector("#closeTodo");

const TODO = "todo";
const FINISH = "finish";

let todoArray = [];
let finishArray = [];

const onSubmit = (event) => {
  event.preventDefault();
  const text = event.target[0].value;
  const id = uuidv4();
  const toDoObj = {
    text,
    id,
  };
  onPaint(false, toDoObj, todoList, todoArray);
  saveToDos();
  addTextInput.value = "";
};

const onPaint = (isFinish, value, list, dos) => {
  const li = document.createElement("li");
  li.id = value.id;
  const text = document.createElement("span");
  text.innerText = value.text;
  const delBtn = document.createElement("button");
  delBtn.innerText = "❌";
  const checkBtn = document.createElement("button");
  delBtn.addEventListener("click", deleteHandle);

  if (isFinish) {
    checkBtn.innerText = "⏪";
  } else {
    checkBtn.innerText = "✅";
  }
  checkBtn.addEventListener("click", checkHandle);
  li.appendChild(text);
  li.appendChild(delBtn);
  li.appendChild(checkBtn);
  list.appendChild(li);
  dos.push(value);
};

const deleteHandle = (event) => {
  const li = event.target.parentNode;
  if (li.parentNode === todoList) {
    todoList.removeChild(li);
    todoArray = todoArray.filter((todo) => todo.id !== li.id);
  } else if (li.parentNode === finishList) {
    finishList.removeChild(li);
    finishArray = finishArray.filter((todo) => todo.id !== li.id);
  }

  saveToDos();
};

const checkHandle = (event) => {
  const li = event.target.parentNode;
  li.removeChild(li.childNodes[2]);
  const btn = document.createElement("button");
  if (li.parentNode === todoList) {
    btn.innerText = "⏪";
    btn.addEventListener("click", checkHandle);
    li.appendChild(btn);
    todoList.removeChild(li);
    finishList.appendChild(li);
    todoArray.map((todo) =>
      todo.id === li.id ? finishArray.push(todo) : null
    );
    todoArray = todoArray.filter((todo) => todo.id !== li.id);
    saveToDos();
  } else {
    btn.innerText = "✅";
    btn.addEventListener("click", checkHandle);
    li.appendChild(btn);
    finishList.removeChild(li);
    todoList.appendChild(li);
    finishArray.map((todo) =>
      todo.id === li.id ? todoArray.push(todo) : null
    );
    finishArray = finishArray.filter((todo) => todo.id !== li.id);
    saveToDos();
  }
};

const onLoad = () => {
  const loadedToDos = localStorage.getItem(TODO);
  if (loadedToDos !== null) {
    const toDo = JSON.parse(loadedToDos);
    toDo.forEach((toDo) => onPaint(false, toDo, todoList, todoArray));
  }

  const finishToDos = localStorage.getItem(FINISH);
  if (finishToDos !== null) {
    const finish = JSON.parse(finishToDos);
    finish.forEach((toDo) => onPaint(true, toDo, finishList, finishArray));
  }
};

const saveToDos = () => {
  localStorage.setItem(FINISH, JSON.stringify(finishArray));
  localStorage.setItem(TODO, JSON.stringify(todoArray));
};

const uuidv4 = () => {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    var r = (Math.random() * 16) | 0,
      v = c == "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};

const todoOpen = () => {
  todoContainer.classList.remove("hide");
};

const todoClose = () => {
  todoContainer.classList.add("hide");
};

const init = () => {
  onLoad();
  todoForm.addEventListener("submit", onSubmit);
  closeTodo.addEventListener("click", todoClose);
  todoIcon.addEventListener("click", todoOpen);
};

init();
