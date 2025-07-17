document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);

        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth'
            });
        }

        const mobileNavOverlay = document.getElementById('mobile-nav-overlay');
        if (mobileNavOverlay && mobileNavOverlay.classList.contains('active')) {
            mobileNavOverlay.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
});

const hamburgerMenu = document.querySelector('.hamburger-menu');
const closeMenuButton = document.querySelector('.close-menu');
const mobileNavOverlay = document.querySelector('.mobile-nav-overlay');
const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

if (hamburgerMenu) {
    hamburgerMenu.addEventListener('click', () => {
        mobileNavOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    });
}

if (closeMenuButton) {
    closeMenuButton.addEventListener('click', () => {
        mobileNavOverlay.classList.remove('active');
        document.body.style.overflow = '';
    });
}

mobileNavLinks.forEach(link => {
    link.addEventListener('click', () => {
        mobileNavOverlay.classList.remove('active');
        document.body.style.overflow = '';
    });
});

const contactForm = document.querySelector('.contact-form');
const feedbackModal = document.getElementById('feedback-modal');
const modalMessage = document.getElementById('modal-message');
const closeModalButton = document.querySelector('.modal .close-button');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const name = document.getElementById('name').value;
        const message = document.getElementById('message').value;

        if (name.trim() === '' || message.trim() === '') {
            showModal('Por favor, preencha todos os campos obrigatórios (Nome e Mensagem).');
            return;
        }

        showModal('Mensagem enviada com sucesso (apenas demonstração)!');
        contactForm.reset();
    });
}

function showModal(message) {
    modalMessage.textContent = message;
    feedbackModal.style.display = 'flex';
}

if (closeModalButton) {
    closeModalButton.addEventListener('click', () => {
        feedbackModal.style.display = 'none';
    });
}

window.addEventListener('click', (event) => {
    if (event.target === feedbackModal) {
        feedbackModal.style.display = 'none';
    }
});