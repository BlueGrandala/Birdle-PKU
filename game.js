// game.js

let words = [];
let family=[];
let targetWord = '';
let targetFamily = '';
let indexed = 0;
let attempts = 0;
const maxAttempts = 5;

// 从birds.txt加载鸟类列表; 从family.txt加载对应的科
async function loadWords() {
    const loadingStatus = document.getElementById('loadingStatus');
    try {
        const response = await fetch('birds.txt');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const text2 = await response.text();
        words = text2.split('\n').map(word => word.trim()).filter(word => word.length > 0);
        console.log('Loaded words:', words); // 输出加载的单词列表
        const responsed = await fetch('family.txt');
        if (!responsed.ok) {
            throw new Error('Network response was not ok');
        }
        const text = await responsed.text();
        family = text.split('\n').map(word => word.trim()).filter(word => word.length > 0);

        loadingStatus.innerText = 'Birds loaded successfully!';
        startGame();
    } catch (error) {
        console.error('Error loading words:', error);
        loadingStatus.innerText = 'Failed to load words.';
    }
}

function startGame() {
    indexed = Math.floor(Math.random() * words.length)
    targetWord = words[indexed];
    targetFamily = family[indexed];
    attempts = 0;
    document.getElementById('wordLengthHint').innerText = `名字有 ${targetWord.length} 个字.`;
    document.getElementById('lastLetterHint').innerText = `这是一种${targetFamily}鸟.`;
    document.getElementById('results').innerHTML = '';
}

function checkGuess() {
    const userInput = document.getElementById('userInput').value.toLowerCase();
    if (userInput.length !== targetWord.length) {
        alert(`Please enter a ${targetWord.length}-letter word.`);
        return;
    }

    attempts++;
    let result = '';
    for (let i = 0; i < targetWord.length; i++) {
        if (userInput[i] === targetWord[i]) {
            result += `<span class="correct">${userInput[i]}</span>`;
        } else if (targetWord.includes(userInput[i])) {
            result += `<span class="present">${userInput[i]}</span>`;
        } else {
            result += userInput[i];
        }
    }

    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML += `<div class="result">${result}</div>`;

    if (userInput === targetWord) {
        alert(`牛逼! 只用 ${attempts} 次就猜对了.`);
        startGame();
    } else if (attempts >= maxAttempts) {
        alert(`寄! 答案是 ${targetWord}.`);
        startGame();
    }

    document.getElementById('userInput').value = ''; // 清空输入框
}

// 初始化游戏
loadWords();
