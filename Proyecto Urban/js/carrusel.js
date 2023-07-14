const slick = document.querySelectorAll('.slick');
const slickWidth = slick[0].offsetWidth;
const slickCount = slick.length;
const track = document.getElementById('track');
const slickList = document.getElementById('slick-list');
const clonedSlicks = [];

// Clonar los elementos slick y añadirlos al principio y final del carrusel
for (let i = 0; i < slickCount; i++) {
    const clonedSlick = slick[i].cloneNode(true);
    clonedSlicks.push(clonedSlick);
}

for (let i = slickCount - 1; i >= 0; i--) {
    const clonedSlick = slick[i].cloneNode(true);
    clonedSlicks.unshift(clonedSlick);
}

// Agregar los elementos clonados al carrusel
clonedSlicks.forEach((clonedSlick) => {
    track.appendChild(clonedSlick);
});

const buttonPrev = document.getElementById('btn-prev');
const buttonNext = document.getElementById('btn-next');

let currentPosition = 0;

buttonPrev.onclick = () => Move(-1);
buttonNext.onclick = () => Move(1);

function Move(direction) {
    currentPosition += direction;
    const newPosition = currentPosition * slickWidth;
    track.style.transform = `translateX(${-newPosition}px)`;
    track.style.transition = "transform 0.3s ease";

    // Verificar límites
    if (currentPosition < 0) {
        currentPosition = slickCount - 1;
        setTimeout(() => {
            track.style.transition = "none";
            track.style.transform = `translateX(${-currentPosition * slickWidth}px)`;
        }, 300);
    } else if (currentPosition >= slickCount) {
        currentPosition = 0;
        setTimeout(() => {
            track.style.transition = "none";
            track.style.transform = `translateX(0)`;
        }, 300);
    }
}