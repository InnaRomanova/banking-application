"use strict";

const account1 = {
  owner: "Dmitrii Fokeev",
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  pin: 1111,
  interesRate: 1.5,

  // movementsDates: [
  //   "2019-11-18T21:31:17.178Z",
  //   "2019-12-23T07:42:02.383Z",
  //   "2020-01-28T09:15:04.904Z",
  //   "2020-04-01T10:17:24.185Z",
  //   "2020-05-08T14:11:59.604Z",
  //   "2020-05-27T17:01:17.194Z",
  //   "2020-07-11T23:36:17.929Z",
  //   "2020-07-12T10:51:36.790Z",
  // ],
  // currency: "RUB",
  // locale: "pt-PT",
};

const account2 = {
  owner: "Anna Filimonova",
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  pin: 2222,
  interesRate: 1.8,

  // movementsDates: [
  //   "2019-11-01T13:15:33.035Z",
  //   "2019-11-30T09:48:16.867Z",
  //   "2019-12-25T06:04:23.907Z",
  //   "2020-01-25T14:18:46.235Z",
  //   "2020-02-05T16:33:06.386Z",
  //   "2020-04-10T14:43:26.374Z",
  //   "2020-06-25T18:49:59.371Z",
  //   "2020-07-26T12:01:20.894Z",
  // ],
  // currency: "USD",
  // locale: "en-US",
};

const account3 = {
  owner: "Polina Filimonova",
  movements: [200, -200, 340, -300, -20, 50, 400, -460, 5000],
  pin: 3333,
  interesRate: 0.5,

  // movementsDates: [
  //   "2019-11-01T13:15:33.035Z",
  //   "2019-11-30T09:48:16.867Z",
  //   "2019-12-25T06:04:23.907Z",
  //   "2020-01-25T14:18:46.235Z",
  //   "2020-02-05T16:33:06.386Z",
  //   "2020-04-10T14:43:26.374Z",
  //   "2020-06-25T18:49:59.371Z",
  //   "2020-07-26T12:01:20.894Z",
  // ],
  // currency: "EUR",
  // locale: "es-PE",
};

const account4 = {
  owner: "Stanislav Ivanchenko",
  movements: [430, 1000, 700, 50, 90],
  pin: 4444,
  interesRate: 1,

  // movementsDates: [
  //   "2019-11-01T13:15:33.035Z",
  //   "2019-11-30T09:48:16.867Z",
  //   "2019-12-25T06:04:23.907Z",
  //   "2020-01-25T14:18:46.235Z",
  //   "2020-02-05T16:33:06.386Z",
  // ],
  // currency: "USD",
  // locale: "ru-RU",
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector(".welcome");
const labelDate = document.querySelector(".date");
const labelBalance = document.querySelector(".balance__value");
const labelSumIn = document.querySelector(".summary__value--in");
const labelSumOut = document.querySelector(".summary__value--out");
const labelSumInterest = document.querySelector(".summary__value--interest");
const labelTimer = document.querySelector(".timer");

const containerApp = document.querySelector(".app");
const containerMovements = document.querySelector(".movements");

const btnLogin = document.querySelector(".login__btn");
const btnTransfer = document.querySelector(".form__btn--transfer");
const btnLoan = document.querySelector(".form__btn--loan");
const btnClose = document.querySelector(".form__btn--close");
const btnSort = document.querySelector(".btn--sort");

const inputLoginUsername = document.querySelector(".login__input--user");
const inputLoginPin = document.querySelector(".login__input--pin");
const inputTransferTo = document.querySelector(".form__input--to");
const inputTransferAmount = document.querySelector(".form__input--amount");
const inputLoanAmount = document.querySelector(".form__input--loan-amount");
const inputCloseUsername = document.querySelector(".form__input--user");
const inputClosePin = document.querySelector(".form__input--pin");

// Вывод на страницу всех приходов и уходов
function displayMovements(movements) {
  containerMovements.innerHTML = "";
  movements.forEach(function (value, i) {
    const type = value > 0 ? "deposit" : "withdrawal";
    const typeMessage = value > 0 ? "внесение" : "снятие";
    const html = `
    <div class="movements__row">
    <div class="movements__type movements__type--${type}">
      ${i + 1} ${typeMessage}
    </div>
    <div class="movements__date">3 дня назад</div>
    <div class="movements__value">${value}₽</div>
  </div>`;
    containerMovements.insertAdjacentHTML("afterbegin", html);
  });
}

//создание логина из ФИО в объекте
function createLogin(accs) {
  accs.forEach(function (account) {
    account.logIn = account.owner
      .toLowerCase()
      .split(" ")
      .map(function (value) {
        return value[0];
      })
      .join("");
  });
}

createLogin(accounts);
console.log(accounts); //(4) [{…}, {…}, {…}, {…}]

// accounts.forEach(function (value) {
//   value.logIn = createLogin(value.owner);
//   console.log(value); //{owner: 'Dmitrii Fokeev', movements: Array(8), pin: 1111, interesRate: 1.5, logIn: 'df'}
// });
// console.log(createLogin("Inna Romanova")); //ir

//метод reduce();

//общий баланс
function balaceMassiv(movements) {
  const balace = movements.reduce(function (acc, val, key, movements) {
    return acc + val;
  });
  labelBalance.textContent = `${balace}₽`;
}

//узнать максимальное число в массиве
const max = account3.movements.reduce(function (acc, value) {
  if (acc > value) {
    return acc;
  } else {
    return value;
  }
}, account3.movements[0]);

console.log(max); //5000

/////////////////////////////////////

//вывод на страницу суммы прихода, ухода и общей суммы баланса в футере
function balaceMonye(movements) {
  const sumAdd = movements.filter((x) => x > 0).reduce((acc, x) => acc + x, 0);
  console.log(sumAdd); //2270
  labelSumIn.textContent = `${sumAdd}₽`;

  const sumDel = movements.filter((x) => x <= 0).reduce((acc, x) => acc + x, 0);
  console.log(sumDel); //-1180
  labelSumOut.textContent = `${Math.abs(sumDel)}₽`;

  labelSumInterest.textContent = `${sumAdd + sumDel}₽`;
}

/////////////////////////////////////////////

//ищет определенного пользователя  и выдает его данные
const acc = accounts.find(function (acc) {
  return acc.owner === "Polina Filimonova";
});

console.log(acc); //{owner: 'Polina Filimonova', movements: Array(9), pin: 3333, interesRate: 0.5, logIn: 'pf'}

///////////////////////////////////////////////////

let currentAccount;
function Login() {
  btnLogin.addEventListener("click", function (e) {
    e.preventDefault();
    console.log("Login");
    //проверка первых букв в имени и фамилии для авторизации, есть ли такой пользователь
    currentAccount = accounts.find(function (acc) {
      return acc.logIn === inputLoginUsername.value;
    });
    console.log(currentAccount); //{owner: 'Dmitrii Fokeev', movements: Array(8), pin: 1111, interesRate: 1.5, logIn: 'df'}
    if (currentAccount && currentAccount.pin === Number(inputLoginPin.value)) {
      containerApp.style.opacity = 100;
      inputLoginPin.value = inputLoginUsername.value = "";
      console.log("true");

      displayMovements(currentAccount.movements);

<<<<<<< Updated upstream
      balaceMassiv(currentAccount.movements); //11720

      balaceMonye(currentAccount.movements);
=======
/////////////////////////////////////////////////////////////
//функция для перевода денег
function transfer() {
  btnTransfer.addEventListener("click", function (e) {
    e.preventDefault();
    const translationTo = accounts.find(function (acc) {
      return acc.logIn === inputTransferTo.value;
    });
    //поле ввода суммы, сразу переводим строку в числовой тип number
    const translationSum = Number(inputTransferAmount.value);
    console.log(translationTo, translationSum);
    if (
      //условие, чтобы перевести деньги
      translationTo &&
      translationSum > 0 &&
      currentAccount.balace >= translationSum &&
      translationTo.logIn !== currentAccount.logIn
    ) {
      console.log("Успешно");
      //списывание
      currentAccount.movements.push(-translationSum);
      //зачисление в тотт аккаунт, который указали
      translationTo.movements.push(translationSum);
      upDateUi(currentAccount);
      //очищение полей инпутов после перевода
      inputTransferTo.value = inputTransferAmount.value = "";
      console.log("true");
>>>>>>> Stashed changes
    }
  });
}

Login();
