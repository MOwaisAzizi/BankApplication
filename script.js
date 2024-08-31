'use strict';

// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [7, 45, -400, 3000, -650, -130, 7, 1300],
  interestRate: 1.2, // %
  pin: 1111,

  movementsDates: [
    '2024-05-22T09:48:16.867Z',
    '2024-05-22T09:48:16.867Z',
    '2024-05-21T06:04:23.977Z',
    '2024-01-20T14:18:46.235Z',
    '2024-02-19T16:33:06.386Z',
    '2024-05-18T14:43:26.374Z',
    '2024-05-17T18:49:59.371Z',
    '2024-05-16T12:01:20.894Z',
  ],
  currency: 'EUR',
  locale: 'en-US',
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,

  movementsDates: [
    '2024-05-22T09:48:16.867Z',
    '2024-05-22T09:48:16.867Z',
    '2024-05-21T06:04:23.977Z',
    '2024-01-20T14:18:46.235Z',
    '2024-02-19T16:33:06.386Z',
    '2024-05-18T14:43:26.374Z',
    '2024-05-17T18:49:59.371Z',
    '2024-05-16T12:01:20.894Z',
  ],
  currency: 'EUR',
  locale: 'en-US',
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,

  movementsDates: [
    '2024-05-22T09:48:16.867Z',
    '2024-05-22T09:48:16.867Z',
    '2024-05-21T06:04:23.977Z',
    '2024-01-20T14:18:46.235Z',
    '2024-02-19T16:33:06.386Z',
    '2024-05-18T14:43:26.374Z',
    '2024-05-17T18:49:59.371Z',
    '2024-05-16T12:01:20.894Z',
  ],
  currency: 'EUR',
  locale: 'en-US',
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,

  movementsDates: [
    '2024-05-22T09:48:16.867Z',
    '2024-05-22T09:48:16.867Z',
    '2024-05-21T06:04:23.977Z',
    '2024-01-20T14:18:46.235Z',
    '2024-02-19T16:33:06.386Z',
    '2024-05-18T14:43:26.374Z',
    '2024-05-17T18:49:59.371Z',
    '2024-05-16T12:01:20.894Z',
  ],
  currency: 'EUR',
  locale: 'en-US',
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

inputCloseUsername.value = ''
inputClosePin.value = ''

alert(`All Acountes you can login : \n 1- user : js , PIN : 1111 \n 2- user : jd , PIN : 2222 \n 3- user : stw , PIN : 3333 \n 4- user : ss , PIN : 4444`)

const formatMovementsDate = function (date, lacale) {
  const calcDaysPassed = (d1, d2) => Math.round(Math.abs(d1 - d2) / (1000 * 60 * 60 * 24))
  const daypassed = calcDaysPassed(new Date, date)
  if (daypassed == 0) return 'TODAY'
  else if (daypassed == 1) return 'YESTERDaY'
  else if (daypassed <= 7) return `${daypassed} DAYS AGO`
  const year = date.getFullYear()
  const Mounth = `${date.getMonth()}`.padStart(2, 0)
  const Day = `${date.getDate()}`.padStart(2, 0)
  return `${Day}/${Mounth}/${year}`

  //   return new Intl.DateTimeFormat('en-US').format(date)  
}
const formatcalNum = function (value, currency, locale) {
  return new Intl.NumberFormat(locale, { style: 'currency', currency: currency }).format(value)
}

const displaymovements = function (acc, sort = false) {

  containerMovements.innerHTML = ''
  const movs = sort ? acc.movements.slice().sort((a, b) => a - b) : acc.movements
  movs.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdraw'
    const date = new Date(acc.movementsDates[i])
    let displayDate = formatMovementsDate(date, acc.locale)
    //  const formatedMov = new Intl.NumberFormat(acc.locale,{style:'currency', currency:acc.currency,}).format(mov)
    const formatedMov = formatcalNum(mov, acc.currency, acc.lacale)

    const Html =
    ` <div class="movements__row row">
    <div class="movements__type movements__type--${type} col-4 col-sm-2 col-xs-2 col-md-3 col-lg-3 text-center py-2  me-2">
    ${i + 1} ${type}
    </div>
    <div class="col-3">
      <div class="movements__date">${displayDate}</div>
    </div>
    <div class="col-4">
      <div class="movements__value">${formatedMov}</div>
    </div>
  </div>
</div>`
    containerMovements.insertAdjacentHTML('afterbegin', Html)
  });
}

const calcprintbalance = (acc) => {
  acc.balance = acc.movements.reduce((acc, cur) => acc + cur, 0)
  //  labelBalance.textContent = `${Number(acc.balance)}₤`
  labelBalance.textContent = formatcalNum(acc.balance, acc.currency, acc.lacale)
}

const displaySummary = (acc) => {
  const income = acc.movements.filter((mov => mov > 0)).reduce((acc, cur) => acc + cur)
  // labelSumIn.textContent = `${income}₤`
  labelSumIn.textContent = formatcalNum(income, acc.currency, acc.lacale)

  const out = acc.movements.filter((mov => mov < 0)).reduce((acc, cur) => acc + cur)
  // labelSumOut.textContent = `${out}₤`
  labelSumOut.textContent = formatcalNum(Math.abs(out), acc.currency, acc.lacale)
  const interest = acc.movements.filter(mov => mov > 0).map(mov => mov * acc.interestRate / 100).
    filter(int => int > 0).reduce((acc, cur) => acc + cur)
  // labelSumInterest.textContent = `${interest.toFixed(2)}₤`
  labelSumInterest.textContent = formatcalNum(interest, acc.currency, acc.lacale)


}

const createName = function (accs) {
  accs.forEach(function (accs) {
    accs.username = accs.owner.toLocaleLowerCase().split(' ').map(name => name[0]).join('')
  })
}
createName(accounts);

const UpdateUI = function (account) {
  displaymovements(account)
  displaySummary(account)
  calcprintbalance(account)
}

const startLogoutTimer = function () {
  let time = 300;
  const timer = setInterval(() => {
    const min = String(Math.trunc(time / 60)).padStart(2, 0)
    const sec = String(Math.trunc(time % 60)).padStart(2, 0)
    labelTimer.textContent = `${min}:${sec}`
    time--;
    if (time == 0) {
      clearInterval(timer)
      labelWelcome.textContent = `Login to get started`
      containerApp.style.opacity = 0
    }
  }, 1000);
  return timer
}

let currentAcount, timer

btnLogin.addEventListener('click', function (e) {
  e.preventDefault()
  currentAcount = accounts.find(acc => acc.username === inputLoginUsername.value)
  if (currentAcount?.pin === Number(inputLoginPin.value)) {
    labelWelcome.textContent = `Wellcome Back,${currentAcount.owner.split(' ')[0]}`
    containerApp.style.opacity = 100
    const date = new Date()
    //   const year = date.getFullYear()
    //  const Mounth = `${date.getMonth()}`.padStart(2,0)
    //  const Day = `${date.getDate()}`.padStart(2,0)
    //  const hour = `${date.getHours()}`.padStart(2,0)
    //  const min = `${date.getMinutes()}`.padStart(2,0)
    //  labelDate.textContent = `${year}/${Mounth}/${Day} ${hour}:${min}`

    const options = {
      hour: 'numeric',
      minute: 'numeric',
      day: 'numeric',
      Mounth: 'numeric',
      year: 'numeric',
    }
    labelDate.textContent = Intl.DateTimeFormat(currentAcount.locale, options).format(date)

    if (timer) clearInterval(timer)
    timer = startLogoutTimer()
    UpdateUI(currentAcount)
    inputLoginUsername.value = inputLoginPin.value = ''
  }
})


btnTransfer.addEventListener('click', function (e) {
  e.preventDefault()
  const amount = Number(inputTransferAmount.value)
  const ReseverAcount = accounts.find(acc => acc.username === inputTransferTo.value)
  inputTransferAmount.value = inputTransferTo.value = ''

  if (amount > 0 && ReseverAcount && currentAcount.balance >= amount && ReseverAcount?.username !== currentAcount.username) {
    ReseverAcount.movements.push(amount)
    currentAcount.movements.push(-amount)
    //adding date
    currentAcount.movementsDates.push(new Date().toISOString())
    ReseverAcount.movementsDates.push(new Date().toISOString())
    UpdateUI(currentAcount)
    clearInterval(timer)
    timer = startLogoutTimer()
  }
})

btnLoan.addEventListener('click', function (e) {
  e.preventDefault()
  const amount = Number(inputLoanAmount.value)
  if (amount > 0 && currentAcount.movements.some(mov => mov > amount * 0.1)) {
    setTimeout(() => {
      currentAcount.movements.push(amount)
      currentAcount.movementsDates.push(new Date().toISOString())
      UpdateUI(currentAcount)
    }, 1000);
  }
  clearInterval(timer)
  timer = startLogoutTimer()
  inputLoanAmount.value = ''
})

btnClose.addEventListener('click', function (e) {
  e.preventDefault();
  if (inputCloseUsername.value === currentAcount.username && Number(inputClosePin.value) === currentAcount.pin) {
    const index = accounts.findIndex(acc => acc.username === currentAcount.username)
    accounts.splice(index, 1)
    containerApp.style.opacity = 0
    inputCloseUsername.value = ''
    inputClosePin.value = ''
  }
})

let sorted = false
btnSort.addEventListener('click', function (e) {
  e.preventDefault()
  displaymovements(currentAcount, !sorted)
  sorted = !sorted
})


const toggle = (entries) => {
  const [entry] = entries;

  if (!entry.isIntersecting) btnSort.classList.add('hid')
  else { { btnSort.classList.remove('hid') } }
}
const Appwith = containerApp.getBoundingClientRect().width
const btnObserver = new IntersectionObserver(toggle, {
  root: null,
  threshold: 0,

})
btnObserver.observe(btnSort)









































