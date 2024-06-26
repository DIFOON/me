document.addEventListener('DOMContentLoaded', (event) => {
    const originalTitle = "DIFOON";
    let currentIndex = 1; // Start from the second character
    let titleDirection = 1;

    function changeTitle() {
        document.title = originalTitle.substring(0, currentIndex);
        currentIndex += titleDirection;

        if (currentIndex > originalTitle.length) {
            titleDirection = -1;
            currentIndex -= 1;
        } else if (currentIndex < 1) { // Ensure we don't go below the first character
            titleDirection = 1;
            currentIndex = 1;
        }

        setTimeout(changeTitle, 200); // Adjust the speed by changing the timeout value
    }

    changeTitle();
});

(function() {
    let devtools = {
        open: false,
        orientation: null
    };
    const threshold = 160;
    const element = new Image();
    const devtoolsDetector = function() {
        devtools.open = window.outerWidth - window.innerWidth > threshold || window.outerHeight - window.innerHeight > threshold;
        if (devtools.open) {
            window.location.href = '404.html';
        }
    };

    Object.defineProperty(element, 'id', {
        get: function() {
            devtools.open = true;
            throw new Error('DevTools detected');
        }
    });

    setInterval(devtoolsDetector, 1000);
    console.log(element);
})();

const statusTexts = [
    "designer...",
    "coder...",
    "streamer...",
    "gamer"
];

let currentIndex = 0;
let typingInterval = null;
let erasingTimeout = null;

function typeWriterEffect(text, element, speed) {
    let i = 0;
    typingInterval = setInterval(() => {
        element.textContent += text[i];
        i++;
        if (i > text.length - 1) {
            clearInterval(typingInterval);
            erasingTimeout = setTimeout(() => {
                startErasing(element);
            }, 4000); // Задержка перед стиранием текста (4 секунды)
        }
    }, speed);
}

function startErasing(element) {
    erasingInterval = setInterval(() => {
        const currentText = element.textContent;
        if (currentText.length > 0) {
            element.textContent = currentText.substring(0, currentText.length - 1);
        } else {
            clearInterval(erasingInterval);
            currentIndex = (currentIndex + 1) % statusTexts.length;
            setTimeout(() => {
                startTyping(element);
            }, 1000); // Задержка перед началом новой анимации печати (1 секунда)
        }
    }, 50); // Скорость стирания (каждые 50 миллисекунд)

    // Очистка таймаута перед стиранием, если пользователь быстро переключит тексты
    clearTimeout(erasingTimeout);
}

function startTyping(element) {
    const newText = statusTexts[currentIndex];
    element.textContent = ''; // Очистка текущего текста перед началом нового
    typeWriterEffect(newText, element, 100);
}

function changeStatusText() {
    const statusElement = document.getElementById('status-text');
    startTyping(statusElement);
}

document.addEventListener('DOMContentLoaded', changeStatusText);
