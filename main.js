// ========================================
// GLOBAL VARIABLES
// ========================================
const preloader = document.getElementById('preloader');
const navbar = document.getElementById('navbar');
const navMenu = document.getElementById('nav-menu');
const hamburger = document.getElementById('hamburger');
const navLinks = document.querySelectorAll('.nav-link');
const themeToggle = document.getElementById('themeToggle');
const scrollTopBtn = document.getElementById('scrollTop');
const portfolioGrid = document.querySelector('.portfolio-grid');
const filterBtns = document.querySelectorAll('.filter-btn');
const contactForm = document.getElementById('contact-form');

// Portfolio Data
const portfolioData = [
    {
        id: 1,
        img: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=280&fit=crop',
        title: 'E-Commerce Platform',
        category: 'web',
        tags: ['React', 'Node.js'],
        description: 'Modern e-commerce website with payment integration'
    },
    {
        id: 2,
        img: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=400&h=280&fit=crop',
        title: 'Travel Booking App',
        category: 'mobile',
        tags: ['React Native', 'Firebase'],
        description: 'Cross-platform travel booking application'
    },
    {
        id: 3,
        img: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400&h=280&fit=crop',
        title: 'Admin Dashboard',
        category: 'web',
        tags: ['Vue.js', 'Chart.js'],
        description: 'Interactive dashboard with real-time analytics'
    },
    {
        id: 4,
        img: 'https://images.unsplash.com/photo-1516321310764-9f7c4901fc62?w=400&h=280&fit=crop',
        title: 'Fitness Tracker',
        category: 'mobile',
        tags: ['Flutter', 'API'],
        description: 'Mobile fitness tracking application'
    },
    {
        id: 5,
        img: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=280&fit=crop',
        title: 'Brand Identity',
        category: 'branding',
        tags: ['Design', 'Logo'],
        description: 'Complete brand identity package'
    },
    {
        id: 6,
        img: 'https://images.unsplash.com/photo-1559028005-4002385b8f6b?w=400&h=280&fit=crop',
        title: 'SaaS Landing Page',
        category: 'web',
        tags: ['Next.js', 'Tailwind'],
        description: 'High-converting SaaS landing page'
    }
];

// ========================================
// INIT FUNCTIONS
// ========================================
window.addEventListener('load', () => {
    initPage();
});

function initPage() {
    // Hide preloader
    setTimeout(() => {
        preloader.classList.add('hidden');
    }, 1500);
    
    // Init AOS
    AOS.init({
        duration: 1000,
        once: true,
        offset: 100
    });
    
    // Generate portfolio
    generatePortfolio();
    
    // Event listeners
    setupEventListeners();
    
    // Animate skills
    animateSkills();
    
    // Animate stats
    animateStats();
}

// ========================================
// EVENT LISTENERS
// ========================================
function setupEventListeners() {
    // Navbar scroll effect
    window.addEventListener('scroll', handleScroll);
    
    // Navbar mobile toggle
    hamburger.addEventListener('click', toggleMobileMenu);
    
    // Navbar links
    navLinks.forEach(link => {
        link.addEventListener('click', handleNavClick);
    });
    
    // Theme toggle
    themeToggle.addEventListener('click', toggleTheme);
    
    // Scroll top
    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
    
    // Portfolio filter
    filterBtns.forEach(btn => {
        btn.addEventListener('click', handleFilter);
    });
    
    // Contact form
    contactForm.addEventListener('submit', handleContactForm);
    
    // Intersection Observer for animations
    setupIntersectionObserver();
}

// ========================================
// SCROLL HANDLER
// ========================================
function handleScroll() {
    const scrollY = window.scrollY;
    
    // Navbar scroll effect
    if (scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    // Scroll top button
    if (scrollY > 500) {
        scrollTopBtn.classList.add('show');
    } else {
        scrollTopBtn.classList.remove('show');
    }
    
    // Navbar active link
    updateActiveNavLink();
}

// ========================================
// MOBILE MENU
// ========================================
function toggleMobileMenu() {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
    document.body.classList.toggle('no-scroll');
}

function handleNavClick(e) {
    e.preventDefault();
    const targetId = this.getAttribute('href');
    const targetSection = document.querySelector(targetId);
    
    targetSection.scrollIntoView({ behavior: 'smooth' });
    
    // Close mobile menu
    if (navMenu.classList.contains('active')) {
        toggleMobileMenu();
    }
    
    // Update active link
    updateActiveNavLink();
}

function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}

// ========================================
// THEME TOGGLE
// ========================================
function toggleTheme() {
    document.body.classList.toggle('dark-theme');
    const isDark = document.body.classList.contains('dark-theme');
    themeToggle.innerHTML = isDark 
        ? '<i class="fas fa-sun"></i>' 
        : '<i class="fas fa-moon"></i>';
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
}

// Load theme on init
if (localStorage.getItem('theme') === 'dark') {
    document.body.classList.add('dark-theme');
    themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
}

// ========================================
// PORTFOLIO
// ========================================
function generatePortfolio() {
    portfolioGrid.innerHTML = portfolioData.map(item => `
        <div class="portfolio-item" data-category="${item.category}">
            <img src="${item.img}" alt="${item.title}" loading="lazy">
            <div class="portfolio-tags">
                ${item.tags.map(tag => `<span class="portfolio-tag">${tag}</span>`).join('')}
            </div>
            <div class="portfolio-overlay">
                <h3>${item.title}</h3>
                <p>${item.description}</p>
                <div class="portfolio-links">
                    <a href="#"><i class="fas fa-external-link-alt"></i></a>
                    <a href="#"><i class="fas fa-eye"></i></a>
                </div>
            </div>
        </div>
    `).join('');
}

function handleFilter(e) {
    const filter = e.target.dataset.filter;
    
    filterBtns.forEach(btn => btn.classList.remove('active'));
    e.target.classList.add('active');
    
    portfolioGrid.innerHTML = '';
    
    const filteredData = filter === 'all' 
        ? portfolioData 
        : portfolioData.filter(item => item.category === filter);
    
    filteredData.forEach((item, index) => {
        setTimeout(() => {
            const itemHTML = `
                <div class="portfolio-item" data-category="${item.category}">
                    <img src="${item.img}" alt="${item.title}" loading="lazy">
                    <div class="portfolio-tags">
                        ${item.tags.map(tag => `<span class="portfolio-tag">${tag}</span>`).join('')}
                    </div>
                    <div class="portfolio-overlay">
                        <h3>${item.title}</h3>
                        <p>${item.description}</p>
                        <div class="portfolio-links">
                            <a href="#"><i class="fas fa-external-link-alt"></i></a>
                            <a href="#"><i class="fas fa-eye"></i></a>
                        </div>
                    </div>
                </div>
            `;
            portfolioGrid.innerHTML += itemHTML;
        }, index * 100);
    });
}

// ========================================
// ANIMATIONS
// ========================================
function animateSkills() {
    const skillProgress = document.querySelectorAll('.skill-progress');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progress = entry.target;
                const width = progress.dataset.width;
                progress.style.width = width;
            }
        });
    });
    