"use strict";

const account1 = {
  owner: "Dmitrii Fokeev",
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  pin: 1111,
  interesRate: 1.5,

  movementsDates: [
    "2019-11-18T21:31:17.178Z",
    "2019-12-23T07:42:02.383Z",
    "2020-01-28T09:15:04.904Z",
    "2020-04-01T10:17:24.185Z",
    "2023-05-08T14:11:59.604Z",
    "2023-05-27T17:01:17.194Z",
    "2023-07-11T23:36:17.929Z",
    "2023-07-12T10:51:36.790Z",
  ],
  // currency: "RUB",
  // locale: "pt-PT",
};

const account2 = {
  owner: "Anna Filimonova",
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  pin: 2222,
  interesRate: 1.8,

  movementsDates: [
    "2019-11-01T13:15:33.035Z",
    "2019-11-30T09:48:16.867Z",
    "2019-12-25T06:04:23.907Z",
    "2020-01-25T14:18:46.235Z",
    "2020-02-05T16:33:06.386Z",
    "2020-04-10T14:43:26.374Z",
    "2020-06-25T18:49:59.371Z",
    "2020-07-26T12:01:20.894Z",
  ],
  // currency: "USD",
  // locale: "en-US",
};

const account3 = {
  owner: "Polina Filimonova",
  movements: [200, -200, 340, -300, -20, 50, 400, -460, 5000],
  pin: 3333,
  interesRate: 0.5,

  movementsDates: [
    "2019-11-01T13:15:33.035Z",
    "2019-11-30T09:48:16.867Z",
    "2019-12-25T06:04:23.907Z",
    "2020-01-25T14:18:46.235Z",
    "2020-02-05T16:33:06.386Z",
    "2020-04-10T14:43:26.374Z",
    "2020-06-25T18:49:59.371Z",
    "2020-07-26T12:01:20.894Z",
  ],
  // currency: "EUR",
  // locale: "es-PE",
};

const account4 = {
  owner: "Stanislav Ivanchenko",
  movements: [430, 1000, 700, 50, 90],
  pin: 4444,
  interesRate: 1,

  movementsDates: [
    "2019-11-01T13:15:33.035Z",
    "2019-11-30T09:48:16.867Z",
    "2019-12-25T06:04:23.907Z",
    "2020-01-25T14:18:46.235Z",
    "2020-02-05T16:33:06.386Z",
  ],
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

//отображение денежных двжиений в личном кабинете даты ввиде - сегодня, вчера,
//позавчера и далее с датами
function dataMovemets(date) {
  const calcDaysPassed = function (data1, data2) {
    return Math.round((data1 - data2) / (1000 * 60 * 60 * 24));
  };
  const daysPassed = calcDaysPassed(new Date(), date);
  console.log(daysPassed);

  if (daysPassed === 0) return "Сегодня";
  if (daysPassed === 1) return "Вчера";
  if (daysPassed >= 2 && daysPassed <= 4) return `Прошло ${daysPassed} дня`;
  if (daysPassed === 2) return `Позавчера ${daysPassed}`;
  if (daysPassed <= 7) return `Прошло ${daysPassed} дней`;

  const year = date.getFullYear();
  const month = `${date.getMonth() + 1}`.padStart(2, 0);
  const day = `${date.getDate()}`.padStart(2, 0);
  const hours = `${date.getHours()}`.padStart(2, 0);
  const minutes = `${date.getMinutes()}`.padStart(2, 0);
  return `${day}/${month}/${year} ${hours}:${minutes}`;
}

// Вывод на страницу всех приходов и уходов
function displayMovements(acc, sort = false) {
  containerMovements.innerHTML = "";

  const moves = sort
    ? acc.movements.slice().sort((a, b) => a - b)
    : acc.movements;

  moves.forEach(function (value, i) {
    const type = value > 0 ? "deposit" : "withdrawal";
    const typeMessage = value > 0 ? "внесение" : "снятие";
    const date = new Date(acc.movementsDates[i]);

    const displayDate = dataMovemets(date);
    const html = `
    <div class="movements__row">
    <div class="movements__type movements__type--${type}">
      ${i + 1} ${typeMessage}
    </div>
    <div class="movements__date">${displayDate}</div>
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
function balaceMassiv(acc) {
  acc.balace = acc.movements.reduce(function (acc, val, key, movements) {
    return acc + val;
  });
  labelBalance.textContent = `${acc.balace}₽`;
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
//////////////////////////////////////////////////
//вызовы функций
function upDateUi(acc) {
  displayMovements(acc);
  balaceMassiv(acc); //11720
  balaceMonye(acc.movements);
}
///////////////////////////////////////////////////
//устанавливаю дату в личном кабинете
function dateNew() {
  const now = new Date();
  const year = now.getFullYear();
  const month = `${now.getMonth() + 1}`.padStart(2, 0);
  const date = `${now.getDate()}`.padStart(2, 0);
  const hours = `${now.getHours()}`.padStart(2, 0);
  const minutes = `${now.getMinutes()}`.padStart(2, 0);
  labelDate.textContent = `${date}/${month}/${year} ${hours}:${minutes}`;
  console.log(now);
}

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
      //вызов функции, котрая показывает дату и время приходов и уходов денег а так же сверху текущую дату с временем после входа в аккаунт
      dateNew();
      console.log("true");
      upDateUi(currentAccount);
    }
  });
}

Login();

/////////////////////////////////////////////////////////////

function transfer() {
  btnTransfer.addEventListener("click", function (e) {
    e.preventDefault();
    const translationTo = accounts.find(function (acc) {
      return acc.logIn === inputTransferTo.value;
    });
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
      currentAccount.movements.push(-translationSum);
      translationTo.movements.push(translationSum);
      currentAccount.movementsDates.push(new Date().toISOString());
      upDateUi(currentAccount);
      inputTransferTo.value = inputTransferAmount.value = "";
      console.log("true");
    }
  });
}

transfer();

//метод findIndex()
const index = accounts.findIndex(function (acc) {
  return acc.logIn === "af";
});
console.log(accounts.indexOf(account2));
console.log(index);

////////////////////////////////////////
//закрытие аккаунта
function logOut() {
  btnClose.addEventListener("click", function (e) {
    e.preventDefault();
    if (
      inputCloseUsername.value === currentAccount.logIn &&
      Number(inputClosePin.value) === currentAccount.pin
    ) {
      const index = accounts.findIndex(function (acc) {
        return acc.logIn === currentAccount.logIn;
      });
      console.log(index);
      //удаление 1 аккаунта
      accounts.splice(index, 1);
      //страница закрывается, стиль меняется
      containerApp.style.opacity = 0;
      console.log(accounts);
    }
    inputCloseUsername.value = inputClosePin.value = "";
  });
}

logOut();

//////////////////////////////
//метод some() и every() - внесение денег в аккаунте

function intro() {
  btnLoan.addEventListener("click", function (e) {
    e.preventDefault();
    const amount = Number(inputLoanAmount.value);
    if (amount > 0) {
      currentAccount.movements.push(amount);
      currentAccount.movementsDates.push(new Date().toISOString());
      upDateUi(currentAccount);
    }
    inputLoanAmount.value = "";
  });
}

intro();

//////////////////////////////////////////
//метод flat() - пример

const flatMas = [1, [5, 3], 4, 6, 8, 1, [556, [54, 65], 10]];

console.log(flatMas.flat(2));

///////////////////////////////////

//общий баланс всех пользователей - длинная запись

// const accMov = accounts.map(function (acc) {
//   return acc.movements;
// });
// console.log(accMov);

// const allMov = accMov.flat();
// console.log(allMov);

// const allBalance = allMov.reduce(function (acc, mov) {
//   return acc + mov;
// }, 0);
// console.log(allBalance);

//короткая запись
const accMov = accounts
  .map((acc) => acc.movements)
  .flat()
  .reduce((acc, mov) => acc + mov, 0);
console.log(accMov);

/////////////////////////////////////

//сортировка-фильтр
let sorted = false;
function filter() {
  btnSort.addEventListener("click", function (e) {
    e.preventDefault();
    displayMovements(currentAccount, !sorted);
    sorted = !sorted;
  });
}
filter();

//метод fill() и Array.from()
function balanceClick() {
  labelBalance.addEventListener("click", function () {
    console.log(document.querySelectorAll(".movements__value")); //NodeList(8) [div.movements__value, div.movements__value, div.movements__value, div.movements__value, div.movements__value, div.movements__value, div.movements__value, div.movements__value]
    Array.from(
      document.querySelectorAll(".movements__value"),
      function (value, i) {
        return (value.textContent = value.textContent.replace("₽", "RUB"));
      }
    );
  });
}
balanceClick();

///////////////////////////////////////////////////
