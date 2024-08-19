const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
let TILE_SIZE = 50; // Tamaño inicial del tile

// Define los colores de los personajes
const ILO_COLOR = '#8B008B';
const MILO_COLOR = '#191970';

// Define los niveles del juego
const levels = [
    [
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1],
        [1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1],
        [1, 0, 1, 1, 1, 1, 0, 1, 0, 0, 1],
        [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
    ],
    // Nivel 2: Laberinto Moderado
    [
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 0, 0, 0, 0, 0, 1, 0, 0, 1],
        [1, 1, 1, 1, 1, 0, 1, 1, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 1, 0, 1],
        [1, 0, 1, 1, 1, 1, 1, 1, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
    ],
    // Nivel 3: Laberinto Difícil
    [
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 0, 1, 0, 1, 0, 0, 0, 0, 1],
        [1, 0, 1, 0, 1, 0, 1, 1, 0, 1],
        [1, 0, 1, 0, 0, 0, 0, 1, 0, 1],
        [1, 0, 1, 1, 1, 0, 0, 1, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 1, 0, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
    ]
];

let currentLevel = 0;
let world;
let ilo, milo;

// Función para cargar el nivel
function loadLevel(levelIndex) {
    world = levels[levelIndex];
    ilo = { x: 1, y: 1 };
    milo = { x: world[0].length - 2, y: world.length - 2 };
    resizeCanvas();
    drawWorld();
}

// Función para redimensionar el canvas
function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Recalcular el tamaño del tile
    TILE_SIZE = Math.floor(Math.min(canvas.width / world[0].length, canvas.height / world.length));
    drawWorld();
}

// Función para dibujar el mundo
function drawWorld() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let y = 0; y < world.length; y++) {
        for (let x = 0; x < world[y].length; x++) {
            if (world[y][x] === 1) {
                ctx.fillStyle = '#D8BFD8'; // Pared
            } else {
                ctx.fillStyle = '#FFEFD5'; // Suelo
            }
            ctx.fillRect(x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
        }
    }
    drawCharacter(ilo, ILO_COLOR);
    drawCharacter(milo, MILO_COLOR);
}

// Función para dibujar un personaje
function drawCharacter(character, color) {
    ctx.fillStyle = color;
    ctx.fillRect(character.x * TILE_SIZE, character.y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
}

// Función para mover un personaje
function moveCharacter(character, dx, dy) {
    let newX = character.x + dx;
    let newY = character.y + dy;

    if (newX >= 0 && newX < world[0].length && newY >= 0 && newY < world.length) {
        if (world[newY][newX] === 0) {
            character.x = newX;
            character.y = newY;
        }
    }
    drawWorld(); // Mueve la llamada de drawWorld aquí
    checkVictory();
}

// Función para verificar la victoria
function checkVictory() {
    if (ilo.x === milo.x && ilo.y === milo.y) {
        if (currentLevel === levels.length - 1) {
            window.location.href = 'end.html'; // Redirige a la página de despedida
        } else {
            alert('MUY BIEN MI AMOR, ahora apreta el boton aceptar para seguir, TE AMOOOOO');
            currentLevel = (currentLevel + 1) % levels.length;
            loadLevel(currentLevel);
        }
    }
}

// Manejador de eventos para las teclas
document.addEventListener('keydown', (event) => {
    switch (event.key) {
        case 'ArrowUp':
            moveCharacter(ilo, 0, -1);
            break;
        case 'ArrowDown':
            moveCharacter(ilo, 0, 1);
            break;
        case 'ArrowLeft':
            moveCharacter(ilo, -1, 0);
            break;
        case 'ArrowRight':
            moveCharacter(ilo, 1, 0);
            break;
        case 'w':
            moveCharacter(milo, 0, -1);
            break;
        case 's':
            moveCharacter(milo, 0, 1);
            break;
        case 'a':
            moveCharacter(milo, -1, 0);
            break;
        case 'd':
            moveCharacter(milo, 1, 0);
            break;
    }
});

// Manejar el cambio de tamaño de la ventana
window.addEventListener('resize', resizeCanvas);

// Cargar el primer nivel al inicio
loadLevel(currentLevel);
