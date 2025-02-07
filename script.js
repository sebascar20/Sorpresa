document.addEventListener("DOMContentLoaded", function () {
    const yesBtn = document.getElementById("yesBtn");
    const noBtn = document.getElementById("noBtn");
    const carrusel = document.getElementById("carrusel");
    const song = document.getElementById("song");
    const slides = document.querySelectorAll(".slide");
    let currentSlide = 0;
    let currentCover = 1; // Inicia desde la primera capa

    showCover(currentCover); // Muestra la primera capa

    yesBtn.addEventListener("click", function () {
        alert("¡TE AMOOOO MOMO, ERES EL AMOR DE MI VIDA! 💖😍");
        document.querySelector(".container").style.display = "none"; // Oculta la pantalla inicial
        carrusel.classList.add("active"); // Muestra el carrusel
        song.currentTime = 125; // Inicia la canción en el minuto 2:05 (125 segundos)
        song.play(); // Reproduce la música

        // Loop de la canción entre los segundos 2:05 (125) y 3:08 (188)
        const loopSong = () => {
            if (song.currentTime >= 188) {
                song.currentTime = 125; // Vuelve a 2:05
            }
        };
        const loopInterval = setInterval(loopSong, 100); // Loops cada 100 ms

        // Detén el loop después de 5 minutos (300000 ms)
        setTimeout(() => {
            clearInterval(loopInterval);
            song.pause();
        }, 300000); 

        showSlide(currentSlide); // Muestra la primera imagen
        startCarousel(); // Inicia el carrusel
    });
    noBtn.addEventListener("mouseover", moveNoButton); // Para computadoras
    noBtn.addEventListener("touchstart", moveNoButton); // Para teléfonos y tablets
    function moveNoButton() {
        const x = Math.random() * (window.innerWidth - noBtn.offsetWidth);
        const y = Math.random() * (window.innerHeight - noBtn.offsetHeight);
        noBtn.style.position = "absolute";
        noBtn.style.left = `${x}px`;
        noBtn.style.top = `${y}px`;
    }


    function showSlide(index) {
        slides.forEach(slide => slide.classList.remove("active"));
        slides[index].classList.add("active");
    }

    function startCarousel() {
    const interval = setInterval(() => {
        if (currentSlide < slides.length - 1) {
            currentSlide++;
            showSlide(currentSlide);
        } else {
            clearInterval(interval); // Detiene el carrusel cuando llega a la última imagen
        }
    }, 3000); // Cambia cada 3 segundos
}

    function showCover(level) {
        // Oculta todas las capas
        for (let i = 1; i <= 7; i++) {
            document.getElementById(`cover${i}`).classList.add("hidden");
        }

        // Muestra la capa correspondiente
        document.getElementById(`cover${level}`).classList.remove("hidden");

        // Si es la última capa, mostramos el botón y avanzamos cuando se haga clic
        if (level === 7) {
            const lastCoverButton = document.getElementById("cover7").querySelector("button");
            lastCoverButton.addEventListener("click", function () {
                // Al presionar el botón en la última capa, ocultamos todas las capas y mostramos el contenido
                document.getElementById("cover7").classList.add("hidden");
                document.getElementById("mainContent").classList.remove("hidden"); // Muestra la pregunta final
            });
        }
    }

    // Función para pasar a la siguiente capa
    function openNextCover() {
        if (currentCover < 7) {
            currentCover++; // Incrementa el nivel de la capa
            showCover(currentCover);
        }
    }

    // Añadir el evento a cada capa para pasar a la siguiente
    const buttons = document.querySelectorAll(".cover button");
    buttons.forEach(button => {
        button.addEventListener("click", openNextCover);
    });
});
