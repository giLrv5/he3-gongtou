async function loadQuestion() {
    try {
        const response = await fetch('question.json');
        const data = await response.json();
        const container = document.getElementById('content');

        const questionEl = document.createElement('div');
        questionEl.className = 'question';
        questionEl.textContent = data.question;

        const optionsEl = document.createElement('div');
        optionsEl.className = 'options';
        data.options.forEach(opt => {
            const label = document.createElement('label');
            const input = document.createElement('input');
            input.type = 'radio';
            input.name = 'answer';
            input.value = opt;
            label.appendChild(input);
            label.appendChild(document.createTextNode(opt));
            optionsEl.appendChild(label);
            optionsEl.appendChild(document.createElement('br'));
        });

        const button = document.createElement('button');
        button.textContent = '送出';
        const resultEl = document.createElement('div');
        resultEl.className = 'result';

        button.addEventListener('click', () => {
            const selected = document.querySelector('input[name="answer"]:checked');
            if (!selected) {
                resultEl.textContent = '請先選擇一個答案';
                return;
            }
            if (selected.value === data.answer) {
                resultEl.textContent = '回答正確';
            } else {
                resultEl.textContent = '回答錯誤';
            }
        });

        container.innerHTML = '';
        container.appendChild(questionEl);
        container.appendChild(optionsEl);
        container.appendChild(button);
        container.appendChild(resultEl);
    } catch (error) {
        document.getElementById('content').textContent = '無法載入題目';
        console.error(error);
    }
}

document.addEventListener('DOMContentLoaded', loadQuestion);
