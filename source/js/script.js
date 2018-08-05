var navMain = document.querySelector('.main-navigation');
var navToggle = document.querySelector('.main-navigation__button');
var link = document.querySelector('.user-navigation__link');
var popup = document.querySelector(".modal-login");
var close = popup.querySelector(".modal-login__close");
var application = document.querySelector('.record__submit');
var modalSuccess = document.querySelector('.modal-success');
var modalFailure = document.querySelector('.modal-failure');
var modalSuccessClose = document.querySelector('.modal-success__toggle');
var modalFailureClose = document.querySelector('.modal-failure__toggle');

navToggle.addEventListener('click', function() {
  if (navMain.classList.contains('main-navigation--closed')) {
    navMain.classList.remove('main-navigation--closed');
    navMain.classList.add('main-navigation--opened');
  } else {
    navMain.classList.add('main-navigation--closed');
    navMain.classList.remove('main-navigation--opened');
  }
});

link.addEventListener("click", function(event) {
  event.preventDefault();
  popup.classList.add("modal-login--show");
});

close.addEventListener("click", function(event) {
  event.preventDefault();
  popup.classList.remove("modal-login--show");
 });

 // application.addEventListener('click', function(event) {
 //   event.preventDefault();
 //   modalFailure.classList.add('modal-failure--show');
 // });

 // modalFailureClose.addEventListener('click', function(event) {
 //   event.preventDefault();
 //   modalFailure.classList.remove('modal-failure--show');
 // });

 application.addEventListener('click', function(event) {
   event.preventDefault();
   modalSuccess.classList.add('modal-success--show');
 });

 modalSuccessClose.addEventListener('click', function(event) {
   event.preventDefault();
   modalSuccess.classList.remove('modal-success--show');
 });
