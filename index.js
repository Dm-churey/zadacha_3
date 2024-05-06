document.getElementById('feedingForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const n = parseInt(document.getElementById('catsCount').value); // Количество котиков
    const b = parseInt(document.getElementById('foodPerCat').value); // Корм на котика
    const m = parseInt(document.getElementById('bowlCapacity').value); // Вместимость миски
    const t = parseInt(document.getElementById('feedingTime').value); // Время на кормление
    const r = parseInt(document.getElementById('refillTime').value); // Время на пополнение миски

    let totalTime = 0;
    let currentFood = m;
    let statusDelay = 0;

    if (b > m) {
        document.getElementById('statusOutput').innerHTML += `Вместительность миски не может быть меньше требуемого количества корма на котика<br>Введите корректные значения<br>`;
        return;
    } 

    for (let i = 0; i < n; i++) {
        if (currentFood < b) {
            totalTime += r;
            currentFood = m;
            setTimeout(function() {
                document.getElementById('statusOutput').innerHTML += `<br>Бабушка наполняет миску<br>`;
                scrollToBottom('statusOutput');
            }, statusDelay);
            statusDelay += 500;
        }
        totalTime += t;
        currentFood -= b;
        setTimeout(function() {
            document.getElementById('statusOutput').innerHTML += `<br>Котик под номером ${i + 1} подошел к миске<br>`;
            scrollToBottom('statusOutput');
        }, statusDelay);
        statusDelay += 500;
        setTimeout(function() {
            document.getElementById('statusOutput').innerHTML += `Котик под номером ${i + 1} отошел от миски<br>`;
            scrollToBottom('statusOutput');
        }, statusDelay);
        statusDelay += 500;
    }

    setTimeout(function() {
        document.getElementById('statusOutput').innerHTML += `<br>Всего затрачено времени: ${totalTime} сек.<br>`;
        scrollToBottom('statusOutput');
    }, statusDelay);
    statusDelay += 500;
});

function scrollToBottom(elementId) {
    const element = document.getElementById(elementId);
    if (element) {
        element.scrollTop = element.scrollHeight;
    }
}

document.getElementById('clearButton').addEventListener('click', function() {
    document.getElementById('feedingForm').reset();
    document.getElementById('statusOutput').innerHTML = '';
});