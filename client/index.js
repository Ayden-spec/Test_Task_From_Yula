const amount_input = document.querySelector('.terminal_input');

amount_input.oninput = function () {
    amount_input.value = amount_input.value.replace(/[^0-9]/g, "");
}

async function get_data() {
    try {
        const amount = document.querySelector('.terminal_input').value;
        const response = await fetch(`http://localhost:5000/get-number-of-banknotes/${amount}`, { method: 'GET' });
        response.json().then(data => { redering(Array_Sort(data)) });
    } catch (error) {
        console.error('Ошибка:', error);
    }
}

function redering(banknotes) {
    const banknotesDiv = document.querySelector('.terminal_output');
    const array = banknotes.filter(el => el.count !== 0)
    banknotesDiv.innerHTML = '';
    if (array.length > 0) {

        array.forEach(element => {
            for (let i = 0; i < element.count; i++) {
                banknotesDiv.style.flexDirection = 'row';
                banknotesDiv.innerHTML += `<img class="banknote" src="./assets/${element.nominal}.jpg" alt="100">`
            }
        });

    } else {
        banknotesDiv.style.flexDirection = 'column';
        banknotesDiv.innerHTML = '<h2>Невозможно собрать нужную сумму.</h2>';
        banknotesDiv.innerHTML += '<img id="sadSmile" src="./assets/SadSmile.png" alt="SadSmile">'
    }
}

function Array_Sort(data) {
    let amount = data.amount;
    let array = Object.entries(data.banknotes).sort((a, b) => parseInt(b[0], 10) - parseInt(a[0], 10));
    let result = [];
    for (let i = 0; i < array.length; i++) {
        const calc = calculate(array[i][1], parseInt(array[i][0], 10), amount)
        amount = calc.amount;
        result.push({ count: calc.count, nominal: calc.nominal })
    }
    return (amount === 0 ? result : [])
}

function calculate(number, nominal, amount) {
    let maxNumber = (amount - (amount % nominal)) / nominal;
    let count = maxNumber < number ? maxNumber : number;
    return { count: count, amount: amount - (nominal * count), nominal: nominal }
}