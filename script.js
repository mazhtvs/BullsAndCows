// Генерация случайного четырехзначного числа
function generateSecretNumber() {
    let digits = Array.from({ length: 10 }, (_, i) => i);
    let secretNumber = [];

    for (let i = 0; i < 4; i++) {
        const index = Math.floor(Math.random() * digits.length);
        secretNumber.push(digits[index]);
        digits.splice(index, 1);
    }

    return secretNumber.join('');
}

// Хранение загаданного числа
let secretNumber = generateSecretNumber();
console.log(`Загаданное число: ${secretNumber}`);

// Проверка предположения
function checkGuess() {
    const guessInput = document.getElementById('guessInput');
    const guess = guessInput.value.trim();
    const resultDiv = document.getElementById('result');
    const historyList = document.getElementById('historyList');

    // Проверяем валидность ввода
    if (/^0/.test(guess)) {
        alert('Число не может начинаться с нуля.');
        guessInput.focus();
        return;
    }

    if (!/^\d{4}$/.test(guess) || new Set(guess.split('')).size !== 4) {
        alert('Номер должен содержать четыре уникальные цифры.');
        guessInput.focus();
        return;
    }

    let bulls = 0;
    let cows = 0;

    for (let i = 0; i < 4; i++) {
        if (guess[i] === secretNumber[i]) {
            bulls++;
        } else if (secretNumber.includes(guess[i])) {
            cows++;
        }
    }

    const resultMessage = `${bulls} бык., ${cows} кор.`;
    resultDiv.textContent = resultMessage;

    // Добавляем попытку в историю
    const li = document.createElement('li');
    li.textContent = `${guess}: ${resultMessage}`;
    historyList.prepend(li);

    if (bulls === 4) {
        alert(`Поздравляю! Вы угадали число: ${secretNumber}.`);
        location.reload(); // Перезагружаем страницу для новой игры
    } else {
        resultDiv.style.color = 'red'; // Красный текст при неудачной попытке
        resultDiv.textContent += ' Не угадали)';
    }

    guessInput.value = ''; // Очищаем поле ввода
    guessInput.focus(); // Возвращаемся к полю ввода
}

// Обработка нажатия Enter
document.getElementById('guessInput').addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        event.preventDefault();
        checkGuess();
    }
});

// Генерация нового числа
function newNumber() {
    secretNumber = generateSecretNumber();
    console.log(`Новое загаданное число: ${secretNumber}`);
    alert('Загаданное число сменено. Попробуйте снова!');
    document.getElementById('result').innerHTML = '';
    document.getElementById('historyList').innerHTML = '';
}

// Открытие модального окна с правилами
function openRulesModal() {
    var modal = document.getElementById("rulesModal");
    modal.style.display = "block";
}

// Закрытие модального окна с правилами
function closeRulesModal() {
    var modal = document.getElementById("rulesModal");
    modal.style.display = "none";
}