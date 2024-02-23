const inputDay = document.getElementById('day');
const inputMonth = document.getElementById('month');
const inputYear = document.getElementById('year');

const detailDay = document.querySelector('.detail-day');
const detailMonth = document.querySelector('.detail-month');
const detailYear = document.querySelector('.detail-year');


const calcular = document.getElementById('calc');

function validateInputs() {
    const day = inputDay.value.trim();
    const month = inputMonth.value.trim();
    const year = inputYear.value.trim();
    let messageEmpty = 'This field is required';

    hideError(inputDay);
    hideError(inputMonth);
    hideError(inputYear);

    let isEmpty = false;

    if (day === '') {
        showError(inputDay, messageEmpty);
        isEmpty = true;
    } else if (parseInt(day) < 1 || parseInt(day) > 31) {
        showError(inputDay, 'Must be a valid day');
        isEmpty = true;
    }

    if (month === '') {
        showError(inputMonth, messageEmpty);
        isEmpty = true;
    } else if (parseInt(month) < 1 || parseInt(month) > 12) {
        showError(inputMonth, 'Must be a valid month');
        isEmpty = true;
    }

    if (year === '') {
        showError(inputYear, messageEmpty);
        isEmpty = true;
    }

    if (!isEmpty) {
        const enteredDate = new Date(year, month - 1, day);
        if (enteredDate.getDate() !== parseInt(day) || enteredDate.getMonth() !== parseInt(month) - 1 || enteredDate.getFullYear() !== parseInt(year)) {
            showError(inputDay, 'The date is invalid');
            isEmpty = true;
        }

        const currentDate = new Date();
        if (enteredDate > currentDate) {
            showError(inputYear, 'Must be in the past');
            isEmpty = true;
        }
    }

    return !isEmpty;
}



function calculateAge(){
  
    const day = inputDay.value.trim();
    const month = inputMonth.value.trim();
    const year = inputYear.value.trim();

    

    const enteredDate = new Date(year, month - 1, day);
    const currentDate = new Date();

    const ageDate = new Date(currentDate - enteredDate);
    const ageYears = Math.abs(ageDate.getUTCFullYear() - 1970);
    const ageMonths = ageDate.getUTCMonth();
    const ageDays = ageDate.getUTCDate() - 1;

    detailYear.innerText = parseInt(ageYears) || '--';
    detailMonth.innerText = parseInt(ageMonths) || '--';
    detailDay.innerText = parseInt(ageDays) || '--';

}





function showError(input, message) {
    const formControl = input.parentElement;
    const small = formControl.querySelector('small');
    const label = formControl.querySelector('label');
    small.innerText = message;
    input.classList.add('errorInput');
    small.classList.add('error');
    small.classList.remove('hide');
    label.classList.add('error');
}

function hideError(input) {
    input.classList.remove('errorInput');

    const parent = input.parentElement;
    const small = parent.querySelector('small');
    small.innerText = '';
    small.classList.add('hide');

    const label = parent.querySelector('label');
    label.classList.remove('error');
}

calcular.addEventListener('click', () => {
    if (validateInputs()) {
        calculateAge();
    }
});