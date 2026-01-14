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



        // Update section indicator based on scroll position
        function updateSectionIndicator() {
            const sections = ['home', 'apps', 'about', 'contact'];
            const dots = document.querySelectorAll('.section-dot');
        
            let scrollPos = window.scrollY + window.innerHeight / 2;
        
            sections.forEach((id, index) => {
                const section = document.getElementById(id);
                if (!section) return;
        
                const top = section.offsetTop;
                const bottom = top + section.offsetHeight;
        
                dots[index].classList.toggle(
                    'active',
                    scrollPos >= top && scrollPos < bottom
                );
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
		
		window.addEventListener('scroll', updateSectionIndicator);
        window.addEventListener('load', updateSectionIndicator);

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

        // Close mobile menu when clicking outside
        document.addEventListener('click', (event) => {
            const navLinks = document.getElementById('navLinks');
            const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
            
            if (!navLinks.contains(event.target) && !mobileMenuBtn.contains(event.target)) {
                navLinks.classList.remove('active');
            }
        });
		
		const nav = document.querySelector('nav');

		window.addEventListener('scroll', () => {
		    if (window.scrollY > 5) {
		        nav.classList.add('scrolled');
		    } else {
		        nav.classList.remove('scrolled');
		    }
		});