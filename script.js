const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('nav');
const navLinks = document.querySelectorAll('nav a');
const contactForm = document.getElementById('contactForm');
const donationModal = document.getElementById('donationModal');
const openDonationModal = document.getElementById('openDonationModal');
const closeDonationModal = document.getElementById('closeDonationModal');
const donationForm = document.getElementById('donationForm');
const donationInput = document.getElementById('donationInput');
const donationAmount = document.getElementById('donationAmount');
const year = document.getElementById('year');
const stats = document.querySelectorAll('.stats h3');

menuToggle.addEventListener('click', () => {
    nav.classList.toggle('active');
});

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        nav.classList.remove('active');
    });
});

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const formMessage = contactForm.querySelector('.form-message');
    formMessage.textContent = 'Thank you! Your message has been sent.';
    contactForm.reset();
});

function openModal() {
    donationModal.style.display = 'flex';
}

function closeModal() {
    donationModal.style.display = 'none';
}

openDonationModal.addEventListener('click', openModal);
closeDonationModal.addEventListener('click', closeModal);

donationModal.addEventListener('click', (e) => {
    if (e.target === donationModal) {
        closeModal();
    }
});

donationForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const donation = Number(donationInput.value) || 0;
    const modalMessage = donationForm.parentElement.querySelector('.modal-message');

    if (donation >= 100) {
        const currentTotal = Number(donationAmount.textContent.replace(/,/g, ''));
        const newTotal = currentTotal + donation;
        donationAmount.textContent = newTotal.toLocaleString();
        modalMessage.textContent = `Thank you for donating ₹${donation.toLocaleString()}!`;
        donationForm.reset();
        donationInput.value = 500;
        setTimeout(closeModal, 1500);
    } else {
        modalMessage.textContent = 'Please enter a donation of at least ₹100.';
    }
});

year.textContent = new Date().getFullYear();

function animateStats() {
    stats.forEach(stat => {
        const target = Number(stat.dataset.target);
        let count = 0;

        const updateCount = () => {
            if (count < target) {
                count += Math.ceil(target / 50);
                if (count > target) count = target;
                stat.textContent = count.toLocaleString();
                setTimeout(updateCount, 30);
            }
        };

        updateCount();
    });
}

window.addEventListener('scroll', () => {
    const section = document.querySelector('.about');
    const sectionTop = section.getBoundingClientRect().top;

    if (sectionTop < window.innerHeight - 100) {
        animateStats();
        window.removeEventListener('scroll', arguments.callee);
    }
});
