"use strict";

(function (){
var link = document.querySelector(".map-info-btn"); //document.querySelector - поиск в документе определенного селектора
var popUp = document.querySelector(".pop-up");
var close = document.querySelector(".pop-up-cross");

var form = popUp.querySelector("form"); //Ищем первый найденый элемент по тегу html form
var login = popUp.querySelector("[name=your-name]"); //Можно искать любые css селекторы, даже по атрибуту
var mail = popUp.querySelector("[type=email]"); //Можно искать любые css селекторы, даже по атрибуту
/*var storage = localStorage.getItem("login");*/
/*var placeholder = popUp.querySelector("[name=comment]");*/
var isStorageSupport = true;
var storage = "";

try {
  storage = localStorage.getItem("login");
} catch (err) {
  isStorageSupport = false;
}

//Открытие от кнопки
link.addEventListener("click", function (evt) { //addEventListener - метод для "отлова" событий. "click" - определяем какое событие мы ловим
  evt.preventDefault(); //preventDefault - отменяет у этого селектора все действия по умолчанию.
  popUp.classList.add("pop-up-show"); //Имя класса без "точки", использование "точки приведет к ошибке".
  login.focus(); //В тот момент когда показался pop-up фокус ставится на var login

  if (storage) {
    login.value = storage;
    mail.focus();
  } else {
    login.focus();
  }
}); //Функция, которая будет выполнятся каждый раз, когда мы "ловим" событие "клик"

//Закрытие по крестику.
close.addEventListener("click", function (evt) { //addEventListener - метод для "отлова" событий. "click" - определяем какое событие мы ловим
  evt.preventDefault();
  popUp.classList.remove("pop-up-show");
  popUp.classList.remove("pop-up-error");
}); //Функция, которая будет выполнятся каждый раз, когда мы "ловим" событие "клик"



form.addEventListener("submit", function (evt) { //про событие submit почитать.
  if (!login.value || !mail.value) {
    evt.preventDefault();
    popUp.classList.remove("pop-up-error");
    popUp.offsetWidth = popUp.offsetWidth;
    popUp.classList.add("pop-up-error");
  } else {
    if (isStorageSupport) {
      localStorage.setItem("login", login.value); //глобальный объект localStorage, с методом SetItem. 1 аргумент ключ. 2 аргумент значение.
    }
  }
});

/*
form.addEventListener("submit", function (evt) { //про событие submit почитать.
  evt.preventDefault();
  console.log(login.value);
  console.log(mail.value);
});
*/

//Закроем модальное окно по ESC
window.addEventListener("keydown", function (evt) { //window. или document. работают без различий
  if (evt.keyCode === 27) { //ESC
    if (popUp.classList.contains("pop-up-show")) { //Метод contains возвращает только булево значение. classList проверяет открыт pop-up или нет, для этого используем contains.
      evt.preventDefault();
      popUp.classList.remove("pop-up-show"); //удаляем класс modalshow на клавишу ESC
    }
  }
});

})();




//для проверки значений лучше всегда использовать "==="
//localStorage.setItem("login", "bulgarin");

// метод classList.toggle для модального окна на SEDONA.

//Хранилище localStorage привязано к адресу сайта. localStorage работает в браузере вашего пользователя, это не cookie
//console.log("Клик по ссылке с картой."); //Смотреть во вкладке console

//element.classList.add(""); //element - добавляем новый класс. classList - свойство имеющее методы для работы с классами. add - Метод добавления класса.

//element.classList.add("pop-up-show"); //Без "точки", использование "точки приведет к ошибке".
//element.classList.remove("pop-up-show"); //удаляем свойство.
//Совсем необязательно навешивать на селекторы id, можно просто искать по классу. Это сказал профи.
//https://up.htmlacademy.ru/htmlcss/23/module/9/lecture
