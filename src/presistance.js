const userForm = document.querySelector(".userForm");
const addUserInput = document.querySelector(".addUser");
const userName = document.querySelector(".userName");
const joinBtn = document.querySelector(".joinBtn");
const modalContainer = document.querySelector(".nameContainer");
const weatherContainer = document.querySelector(".weatherContainer");

const USERNAME = "username";

const presistanceSubmit = (event) => {
  event.preventDefault();
  const text = event.target[0].value;
  console.log(text);
  presistanceAddUser(text);
  addUserInput.value = "";
};

const presistanceAddUser = (text) => {
  userName.innerHTML = `Hello! ${text}`;
  userName.classList.remove("hide");
  joinBtn.classList.remove("hide");
  addUserInput.classList.add("hide");
  presistanceSave(text);
};

const presistanceLoad = () => {
  const name = localStorage.getItem(USERNAME);
  if (name !== null) {
    presistanceAddUser(name);
  }
};

const presistanceSave = (text) => {
  localStorage.setItem(USERNAME, text);
};

const closeModal = () => {
  modalContainer.classList.add("hide");
  weatherContainer.classList.remove("hide");
};

const presistanceInit = () => {
  presistanceLoad();
  userForm.addEventListener("submit", presistanceSubmit);
  joinBtn.addEventListener("click", closeModal);
};

presistanceInit();
