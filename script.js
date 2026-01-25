let userText = `Solo quiero que sepas algo sencillo pero verdadero: desde que estás en mi vida, todo se siente distinto. Hay días pesados, ruidos en mi cabeza, cansancio… y aun así, pensar en ti me calma.

Tú eres ese lugar al que mi corazón siempre quiere volver.
Tu sonrisa me arregla el ánimo, tu voz me ordena el mundo y tu forma de ser me hace querer ser mejor.

No sé cómo explicarlo bonito, pero contigo todo se siente real.
Y mientras exista un “nosotros”, yo voy a cuidarte con todo lo que soy.

Te quiero más de lo que las palabras alcanzan.`;

const frases = [
    "Eres mi pensamiento favorito al despertar.", "Contigo, el mundo es un lugar más bonito.",
    "Te amo más de lo que Snoopy ama su casita.", "Tú eres el hogar al que siempre quiero volver.",
    "Cada segundo a tu lado es un regalo.", "Eres la casualidad más linda de mi vida.",
    "Mi lugar favorito es dentro de tus abrazos.", "Te elegiría mil veces más.",
    "Eres mi mejor capítulo.", "Gracias por existir.",
    "Tu sonrisa ilumina mis días más grises.", "Eres mi sol, mi luna y todas mis estrellas.",
    "Eres el 'te amo' más sincero que he dicho.", "Tú y yo, mi equipo favorito.",
    "A tu lado, la vida es una aventura dulce.", "Eres mi sueño hecho realidad.",
    "No hay nada más tierno que tu mirada.", "Te quiero hasta el infinito y más allá.",
    "Eres la melodía de mi corazón.", "Amo cada detalle de ti.",
    "Eres mi persona favorita en el universo.", "Contigo el tiempo vuela y el corazón se acelera.",
    "Me haces la persona más feliz del mundo.", "Eres la paz que necesitaba mi alma.",
    "Lo nuestro es mi historia favorita.", "Donde sea, pero que sea contigo.",
    "Tu amor es mi motor diario.", "Eres el dueño/a de mis suspiros.",
    "Te amo hoy, mañana y siempre.", "Eres mi todo."
];

let i = 0;
let score = 0;
let gameActive = false;
const musicBtn = document.getElementById('music-toggle');
const audio = document.getElementById('bg-music');

function startExperience() {
    document.getElementById('welcome-screen').classList.add('hidden');
    document.getElementById('main-app').classList.remove('hidden');
    
    typeWriter();
    createParticles();
    
    audio.play().then(() => {
        musicBtn.classList.add('playing');
        musicBtn.innerHTML = "🎶";
    }).catch(() => console.log("Autoplay bloqueado"));
}

function typeWriter() {
    const element = document.getElementById("typewriter-text");
    if (i < userText.length) {
        element.innerHTML += userText.charAt(i);
        i++;
        setTimeout(typeWriter, 35 + Math.random()*40);
    }
}

function showNewQuote() {
    const heartBtn = document.querySelector('.btn-heart');
    heartBtn.animate([
      { transform: 'scale(1)' },
      { transform: 'scale(1.5)' },
      { transform: 'scale(1)' }
    ], { duration: 400 });

    const textElement = document.getElementById("quote-text");
    const randomIndex = Math.floor(Math.random() * frases.length);
    
    textElement.style.opacity = 0;
    setTimeout(() => {
        textElement.innerText = frases[randomIndex];
        textElement.style.opacity = 1;
        createConfetti(); 
    }, 300);
}


function initLoveGame(event) {
    if(event) event.stopPropagation();
    if(gameActive) return;

    score = 0;
    gameActive = true;
    document.getElementById('score').innerText = "Corazones: 0";
    document.getElementById('secret-message').classList.remove('show-msg');
    document.getElementById('start-game-btn').style.display = 'none';
    
    spawnHeart();
}

function spawnHeart() {
    if(!gameActive) return;

    const canvas = document.getElementById('game-canvas');
    const heart = document.createElement('div');
    heart.className = 'game-heart';
    heart.innerText = '❤️';
    
    const maxX = canvas.clientWidth - 40;
    const maxY = canvas.clientHeight - 40;
    heart.style.left = Math.random() * maxX + 'px';
    heart.style.top = Math.random() * maxY + 'px';

    heart.onclick = (e) => {
        e.stopPropagation(); 
        score++;
        document.getElementById('score').innerText = `Corazones: ${score}`;
        heart.remove();
        
        if(score >= 10) {
            endGame();
        } else {
            spawnHeart();
        }
    };

    canvas.appendChild(heart);

    setTimeout(() => {
        if(heart.parentNode) {
            heart.remove();
            spawnHeart();
        }
    }, 1200);
}

function endGame() {
    gameActive = false;
    const msg = document.getElementById('secret-message');
    msg.innerText = "❤️ ¡Eres increíble! Mi premio para ti es un beso infinito ❤️";
    msg.classList.add('show-msg');
    const btn = document.getElementById('start-game-btn');
    btn.style.display = 'inline-block';
    btn.innerText = '¿Jugar otra vez?';

    setTimeout(showEnding, 800);
}



function createParticles() {
    const container = document.getElementById('particles');
    for (let i = 0; i < 20; i++) {
        const p = document.createElement('div');
        p.className = 'particle';
        p.style.left = Math.random() * 100 + 'vw';
        p.style.width = p.style.height = Math.random() * 10 + 5 + 'px';
        p.style.animationDuration = Math.random() * 3 + 2 + 's';
        container.appendChild(p);
    }
}

function createConfetti() {
    for(let i=0; i<8; i++) {
        const heart = document.createElement('div');
        heart.innerText = '❤️';
        heart.className = 'particle'; 
        heart.style.position = 'fixed';
        heart.style.left = '50%';
        heart.style.top = '50%';
        heart.style.transition = 'all 1s ease-out';
        document.body.appendChild(heart);
        
        const angle = Math.random() * Math.PI * 2;
        const dist = 100;
        
        setTimeout(() => {
            heart.style.transform = `translate(${Math.cos(angle)*dist}px, ${Math.sin(angle)*dist}px)`;
            heart.style.opacity = 0;
        }, 50);
        setTimeout(() => heart.remove(), 1000);
    }
}

musicBtn.onclick = () => {
    if (audio.paused) {
        audio.play();
        musicBtn.classList.add('playing');
        musicBtn.innerHTML = "🎶";
    } else {
        audio.pause();
        musicBtn.classList.remove('playing');
        musicBtn.innerHTML = "🎵";
    }
};
let memoryScore = 0;
const memoryMessages = [
  "Nuestro primer beso 💕",
  "Un abrazo pendiente para ti 🤍",
  "Eres mi lugar seguro 🏡",
  "Contigo todo es mejor ✨",
  "Mi siempre seré tuyo tuyo ❤️"
];

function startMemoryGame() {
    memoryScore = 0;
    document.getElementById("memory-progress").innerText = "Recuerdos: 0 / 5";
    document.getElementById("memory-final").classList.remove("show-msg");
    spawnEnvelope();
}

function spawnEnvelope() {
    if (memoryScore >= 5) {
        endMemoryGame();
        return;
    }

    const canvas = document.getElementById("memory-canvas");
    const env = document.createElement("div");
    env.className = "memory-envelope";
    env.innerText = "💌";

    const maxX = canvas.clientWidth - 40;
    const maxY = canvas.clientHeight - 40;
    env.style.left = Math.random() * maxX + "px";
    env.style.top = Math.random() * maxY + "px";

    env.onclick = () => {
        showMemory(env);
    };

    canvas.appendChild(env);

    setTimeout(() => {
        if (env.parentNode) {
            env.remove();
            spawnEnvelope();
        }
    }, 1500);
}

function showMemory(env) {
    const msg = memoryMessages[memoryScore];
    env.remove();
    memoryScore++;

    document.getElementById("memory-progress").innerText =
        `Recuerdos: ${memoryScore} / 5`;

    const popup = document.createElement("div");
    popup.className = "memory-popup";
    popup.innerHTML = `
      <div class="memory-popup-card">
        <p>${msg}</p>
        <button class="btn-main btn-small">Seguir</button>
      </div>
    `;

    popup.querySelector("button").onclick = () => {
        popup.remove();
        spawnEnvelope();
    };

    document.body.appendChild(popup);
}

function endMemoryGame() {
    const end = document.getElementById("memory-final");
    end.innerText = "💖 Terminaste todos mis recuerdos contigo 💖";
    end.classList.add("show-msg");
}
function showEnding() {
    const end = document.getElementById("love-ending");
    end.classList.remove("hidden");

    for (let i = 0; i < 25; i++) {
        const heart = document.createElement("div");
        heart.innerText = "❤️";
        heart.style.position = "fixed";
        heart.style.left = Math.random() * 100 + "vw";
        heart.style.bottom = "-20px";
        heart.style.fontSize = Math.random() * 20 + 15 + "px";
        heart.style.animation = "floatUp 4s linear forwards";
        document.body.appendChild(heart);

        setTimeout(() => heart.remove(), 4000);
    }
}

function closeEnding() {
    document.getElementById("love-ending").classList.add("hidden");
}
