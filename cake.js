document.addEventListener('DOMContentLoaded', function() {
    const envelopeWrapper = document.getElementById('envelopeWrapper');
    const letterContent = document.getElementById('letterContent');
    const cakeContainer = document.getElementById('cakeContainer');
    const openButton = document.getElementById('openButton');
    const closeButton = document.getElementById('closeButton');
    const nextButton = document.getElementById('nextButton');
    const backButton = document.getElementById('backButton');
    const candleButton = document.getElementById('candleButton');
    const cakeGreeting = document.getElementById('cakeGreeting');
    const photoGallery = document.getElementById('photoGallery');
    const confettiContainer = document.getElementById('confettiContainer');
    const notesToggle = document.getElementById('notesToggle');
    const notesContainer = document.getElementById('notesContainer');
    const notesClose = document.getElementById('notesClose');

    let candleLit = false;
    let confettiInterval = null;
    const music = new Audio('music.mp3');
    music.loop = true;
    music.volume = 0.5;

    // Membuka surat
    openButton.addEventListener('click', function() {
        envelopeWrapper.classList.add('opened');
        letterContent.classList.add('show');
    });

    // Menutup surat
    closeButton.addEventListener('click', function() {
        envelopeWrapper.classList.remove('opened');
        letterContent.classList.remove('show');
    });

    // Lanjut ke kue
    nextButton.addEventListener('click', function() {
        console.log('MASUK KUE' );
        letterContent.classList.remove('show');
        cakeContainer.classList.add('show');
        setTimeout(updateSpotlight, 300);
        window.addEventListener('resize', updateSpotlight);

        document.body.classList.add('cake-mode');
    });

    // Kembali dari kue
    backButton.addEventListener('click', function() {
        cakeContainer.classList.remove('show');
        envelopeWrapper.classList.remove('opened');
        letterContent.classList.remove('show');
        
        // Reset candle
        candleButton.classList.remove('lit');
        cakeGreeting.classList.remove('show');
        photoGallery.classList.remove('show');
        confettiContainer.innerHTML = '';
        candleLit = false;
        music.pause();
        music.currentTime = 0;

        document.body.classList.remove('cake-mode');
        document.body.classList.remove('light-on');
        // Clear interval
        if (confettiInterval) {
            clearInterval(confettiInterval);
        }
    });
    // Toggle Notes
    notesToggle.addEventListener('click', function() {
        notesContainer.classList.add('show');
    });

    // Tutup Notes
    notesClose.addEventListener('click', function() {
        notesContainer.classList.remove('show');
    });
    // Nyalakan lilin dan konfeti
    candleButton.addEventListener('click', function() {
    if (!candleLit) {
        candleLit = true;

        // vignette
        setTimeout(() => {
            document.body.classList.add('light-on');
        }, 200);

        music.currentTime = 0;
        music.play();

        candleButton.classList.add('lit');
        cakeGreeting.classList.add('show');
        photoGallery.classList.add('show');

        createConfetti();
        confettiInterval = setInterval(createConfetti, 200);
    }
});

    // Fungsi membuat konfeti
    function createConfetti() {
        const colors = ['#ff6b6b', '#ffd93d', '#6bcf7f', '#4d96ff', '#ff9ff3', '#feca57', '#48dbfb', '#ff7675'];
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.style.left = Math.random() * 100 + '%';
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.width = Math.random() * 8 + 5 + 'px';
        confetti.style.height = confetti.style.width;
        confetti.style.borderRadius = Math.random() > 0.5 ? '50%' : '0%';
        const duration = Math.random() * 2 + 2;
        confetti.style.animationDuration = duration + 's';
        confetti.style.animationDelay = '0s';
        
        confettiContainer.appendChild(confetti);
        
        // Hapus konfeti
        setTimeout(() => confetti.remove(), duration * 1000);
    }

    // Menutup
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') {
            envelopeWrapper.classList.remove('opened');
            letterContent.classList.remove('show');
            cakeContainer.classList.remove('show');
        }
    });
});
function updateSpotlight() {
    const rect = candleButton.getBoundingClientRect();

    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;

    document.documentElement.style.setProperty('--x', x + 'px');
    document.documentElement.style.setProperty('--y', y + 'px');
}

button.addEventListener("pointerdown", handleConfetti);
