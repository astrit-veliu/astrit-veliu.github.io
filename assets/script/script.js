        // Custom Cursor
        const cursor = document.querySelector('.cursor');
        const cursorFollower = document.querySelector('.cursor-follower');
        const androidRobot = document.querySelector('.android-robot');
        const robotLight = document.querySelector('.robot-light');

        document.addEventListener('mousemove', (e) => {
            cursor.style.left = e.clientX + 'px';
            cursor.style.top = e.clientY + 'px';
            
            setTimeout(() => {
                cursorFollower.style.left = e.clientX + 'px';
                cursorFollower.style.top = e.clientY + 'px';
            }, 100);

            // Update background gradient position
            const x = (e.clientX / window.innerWidth) * 100;
            const y = (e.clientY / window.innerHeight) * 100;
            document.querySelector('.background-gradient').style.setProperty('--mouse-x', x + '%');
            document.querySelector('.background-gradient').style.setProperty('--mouse-y', y + '%');

            // Reveal Android robot near mouse (only on hero section)
            const heroSection = document.getElementById('home');
            if (heroSection) {
                const heroRect = heroSection.getBoundingClientRect();
                const isInHero = heroRect.top < window.innerHeight && heroRect.bottom > 0;
                
                if (isInHero) {
                    // Calculate distance from mouse to robot position
                    const robotX = window.innerWidth * 0.85; // right: 10% roughly
                    const robotY = window.innerHeight * 0.4;
                    const distance = Math.sqrt(
                        Math.pow(e.clientX - robotX, 2) + 
                        Math.pow(e.clientY - robotY, 2)
                    );
                    
                    // Reveal robot when mouse is within 300px
                    if (distance < 300) {
                        const opacity = Math.max(0, 1 - (distance / 300));
                        androidRobot.style.opacity = opacity * 0.7;
                        robotLight.style.opacity = opacity * 0.5;
                        robotLight.style.left = (robotX - 250) + 'px';
                        robotLight.style.top = (robotY - 250) + 'px';
                    } else {
                        androidRobot.style.opacity = '0';
                        robotLight.style.opacity = '0';
                    }
                } else {
                    androidRobot.style.opacity = '0';
                    robotLight.style.opacity = '0';
                }
            }
        });

        // Expand cursor on hover
        const hoverElements = document.querySelectorAll('a, button, .app-card, .skill-tag, .social-card');
        hoverElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursor.classList.add('expand');
            });
            el.addEventListener('mouseleave', () => {
                cursor.classList.remove('expand');
            });
        });

        // Navbar scroll effect
        window.addEventListener('scroll', () => {
            const nav = document.querySelector('nav');
            if (window.scrollY > 50) {
                nav.classList.add('scrolled');
            } else {
                nav.classList.remove('scrolled');
            }

            // Update section indicator
            updateSectionIndicator();

            // Show/hide scroll to top button
            const scrollTop = document.querySelector('.scroll-top');
            if (window.scrollY > 500) {
                scrollTop.classList.add('visible');
            } else {
                scrollTop.classList.remove('visible');
            }
        });

        // Update section indicator based on scroll position
        function updateSectionIndicator() {
            const sections = ['home', 'apps', 'about', 'contact'];
            const dots = document.querySelectorAll('.section-dot');
            
            let currentSection = 'home';
            sections.forEach(section => {
                const element = document.getElementById(section);
                if (element) {
                    const rect = element.getBoundingClientRect();
                    if (rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2) {
                        currentSection = section;
                    }
                }
            });

            dots.forEach((dot, index) => {
                dot.classList.remove('active');
                if (sections[index] === currentSection) {
                    dot.classList.add('active');
                }
            });
        }

        // Scroll to section
        function scrollToSection(sectionId) {
            const section = document.getElementById(sectionId);
            if (section) {
                section.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        }

        // Scroll to top
        function scrollToTop() {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }

        // Set dynamic year
        document.getElementById('year').textContent = new Date().getFullYear();

        // Mobile menu toggle
        function toggleMenu() {
            const navLinks = document.getElementById('navLinks');
            navLinks.classList.toggle('active');
        }

        function closeMenu() {
            const navLinks = document.getElementById('navLinks');
            navLinks.classList.remove('active');
        }

        // Scroll reveal animation
        function revealOnScroll() {
            const reveals = document.querySelectorAll('.scroll-reveal');
            
            reveals.forEach(element => {
                const elementTop = element.getBoundingClientRect().top;
                const elementVisible = 150;
                
                if (elementTop < window.innerHeight - elementVisible) {
                    element.classList.add('revealed');
                    element.classList.add('morph-reveal');
                }
            });
        }

        window.addEventListener('scroll', revealOnScroll);
        window.addEventListener('load', revealOnScroll);

        // Form submission handler
        function handleSubmit(event) {
            event.preventDefault();
            
            const form = event.target;
            const name = form.name.value;
            const email = form.email.value;
            const subject = form.subject.value;
            const message = form.message.value;
            
            // Create mailto link
            const mailtoLink = `mailto:astrit-veliu@hotmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`)}`;
            
            // Open email client
            window.location.href = mailtoLink;
            
            // Show success message
            const successMessage = document.getElementById('successMessage');
            successMessage.classList.add('show');
            
            // Reset form
            form.reset();
            
            // Hide success message after 5 seconds
            setTimeout(() => {
                successMessage.classList.remove('show');
            }, 5000);
        }

        // Smooth scroll enhancement with easing
        let scrollTimeout;
        let isScrolling = false;

        window.addEventListener('wheel', (e) => {
            clearTimeout(scrollTimeout);
            
            scrollTimeout = setTimeout(() => {
                isScrolling = false;
            }, 150);
            
            if (!isScrolling) {
                isScrolling = true;
            }
        }, { passive: true });

        // Add momentum scroll effect
        document.addEventListener('DOMContentLoaded', () => {
            const scrollContainer = document.documentElement;
            let scrollVelocity = 0;
            let lastScrollTime = Date.now();
            
            window.addEventListener('wheel', (e) => {
                const currentTime = Date.now();
                const deltaTime = currentTime - lastScrollTime;
                lastScrollTime = currentTime;
                
                scrollVelocity = e.deltaY / deltaTime;
            }, { passive: true });
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', (event) => {
            const navLinks = document.getElementById('navLinks');
            const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
            
            if (!navLinks.contains(event.target) && !mobileMenuBtn.contains(event.target)) {
                navLinks.classList.remove('active');
            }
        });