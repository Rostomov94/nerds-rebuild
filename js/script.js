"use strict";

(function (){
var link = document.querySelector(".map-info-btn");
var popUp = document.querySelector(".pop-up");
var close = document.querySelector(".pop-up-cross");

var form = popUp.querySelector("form");
var login = popUp.querySelector("[name=your-name]");
var mail = popUp.querySelector("[type=email]");
var isStorageSupport = true;
var storage = "";

try {
  storage = localStorage.getItem("login");
} catch (err) {
  isStorageSupport = false;
}

link.addEventListener("click", function (evt) {
  evt.preventDefault();
  popUp.classList.add("pop-up-show");
  login.focus();

  if (storage) {
    login.value = storage;
    mail.focus();
  } else {
    login.focus();
  }
});

close.addEventListener("click", function (evt) {
  evt.preventDefault();
  popUp.classList.remove("pop-up-show");
  popUp.classList.remove("pop-up-error");
});

form.addEventListener("submit", function (evt) {
  if (!login.value || !mail.value) {
    evt.preventDefault();
    popUp.classList.remove("pop-up-error");
    popUp.offsetWidth = popUp.offsetWidth;
    popUp.classList.add("pop-up-error");
  } else {
    if (isStorageSupport) {
      localStorage.setItem("login", login.value);
    }
  }
});

window.addEventListener("keydown", function (evt) {
  if (evt.keyCode === 27) {
    if (popUp.classList.contains("pop-up-show")) {
      evt.preventDefault();
      popUp.classList.remove("pop-up-show");
    }
  }
});

})();
