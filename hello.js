const buttons = document.querySelectorAll('button');
const yesButton = buttons[0];
const noButton = buttons[1];
const valentineText = document.getElementById('valentine-text');
const dogImage = document.querySelector('img');
const body = document.body;

let noClickCount = 0;
let yesButtonSize = 1;
let isMoving = false;
let victoryAchieved = false;

yesButton.addEventListener('click', function() {
    if (victoryAchieved) return;
    
    victoryAchieved = true;
    yesButton.textContent = 'YIPIII';
    yesButton.style.pointerEvents = 'none';
    noButton.style.display = 'none';
    yesButton.classList.add('victory');
    
    valentineText.textContent = 'You\'re gorgeous and special';
    dogImage.src = 'Images/happycat.gif';
    
    body.classList.add('victory-background');
    
    // Create confetti effect
    createConfetti();
});

noButton.addEventListener('click', function() {
    if (isMoving || victoryAchieved) return;
    
    noClickCount++;
    yesButtonSize += 0.2;
    yesButton.style.transform = `scale(${yesButtonSize})`;
    
    if (noClickCount === 1) {
        valentineText.textContent = 'Pretty pleasee';
        dogImage.src = 'Images/catplease.gif';
    } else if (noClickCount === 2) {
        valentineText.textContent = 'Are you sure, I\'m going to cry';
        dogImage.src = 'Images/catserious.gif';
    } else if (noClickCount === 3) {
        noButton.addEventListener('mouseover', moveNoButton);
    }
});

function moveNoButton(e) {
    if (isMoving || victoryAchieved) return;
    
    isMoving = true;
    noButton.style.pointerEvents = 'none';
    noButton.classList.add('moving');
    
    const randomX = (Math.random() - 0.5) * 400;
    const randomY = (Math.random() - 0.5) * 400;
    noButton.style.transform = `translate(${randomX}px, ${randomY}px)`;
    
    setTimeout(() => {
        isMoving = false;
        noButton.style.pointerEvents = 'auto';
        noButton.classList.remove('moving');
    }, 600);
}

function createConfetti() {
    for (let i = 0; i < 50; i++) {
        const confetti = document.createElement('div');
        confetti.classList.add('confetti');
        confetti.style.left = Math.random() * 100 + '%';
        confetti.style.backgroundColor = ['#ff69b4', '#ff1493', '#ffd1dc', '#ffb6d9', '#ffc0cb'][Math.floor(Math.random() * 5)];
        confetti.style.animationDelay = Math.random() * 0.5 + 's';
        document.body.appendChild(confetti);
        
        setTimeout(() => confetti.remove(), 3000);
    }
}
