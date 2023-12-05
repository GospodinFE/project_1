'use strict';
/* 
S = S0 × (1 + P / 100)^n, где S — финальная сумма вклада
S0 — начальная сумма вклада
P — процентная ставка с учетом капитализации
n — количество периодов, в которые банк начисляет проценты
Если вклад на год, то n = 1
*/
/* Записываем данные в localstorage */

const sumEnd = () => {
  let start = document.getElementById('start').value;
  let count = document.getElementById('count').value;
  let year = document.getElementById('year').value;
  if (start === '' || count === '' || year === '') {
    document.querySelector(
      '.error'
    ).innerHTML = `<h2>Все поля должны быть заполнены!(не пустыми)</h2>`;
  } else {
    document.querySelector('.error').innerHTML = '';
    const sizeLocal = localStorage.length === 0 ? 1 : aI() + 1;
    let end = (document.getElementById('end').innerHTML =
      start * Math.pow(1 + count / 100, year));
    localStorage.setItem(
      sizeLocal,
      JSON.stringify({
        start: start,
        count: count,
        year: year,
        end: end,
        delStore: `localStorage.removeItem(${sizeLocal});
      tableParse();`,
      })
    );
    tableParse();
    clearInput();
  }
};

/* Парсим на страницу данные */
const tableParse = () => {
  if (localStorage.length !== 0) {
    let result = `<h2>История расчетов</h2>
        <table>
      <tr>
        <th>Номер расчета</th>
        <th><label for="sum">Сумма вложений</label></th>
        <th><label for="count">Ставка %</label></th>
        <th><label for="year">На какой период в годах</label></th>
        <th>Итого</th>
        <th>Удалить</th>
      </tr>`;
    for (let i = localStorage.length; i > 0; i--) {
      let key = localStorage.key(i - 1);
      const objData = JSON.parse(localStorage.getItem(key));
      result += `<tr class="data">
      <td>${key}</td>
      <td>${objData.start}</td>
      <td>${objData.count}</td>
      <td>${objData.year}</td>
      <td>${objData.end}</td>
      <td><div onclick="${objData.delStore}" id='del'>🚫</div></td>`;
    }

    document.getElementById('table_parse').innerHTML = result + `</table>`;
  } else {
    document.getElementById(
      'table_parse'
    ).innerHTML = `<h2>Здесь появиться история расчетов</h2>`;
  }
};

/* Очищаем input */
const clearInput = () => {
  document.getElementById('start').value = '';
  document.getElementById('count').value = '';
  document.getElementById('year').value = '';
  document.getElementById('end').innerHTML = 'Классно! Давай еще!';
};

tableParse();

/* Подсчет максимального числа. */
const aI = () => {
  let arr = [];
  for (let i = 0; i < localStorage.length; i++) {
    const num = localStorage.key(i);
    arr.push(num);
  }
  return Math.max(...arr);
};
btn.addEventListener('click', sumEnd);
