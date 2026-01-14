   // Code content with proper Kotlin formatting
        const kotlinCode = {
            about: `package com.veliulabs.portfolio

/**
 * Personal Information
 * About Astrit Veliu - Android Software Engineer
 */
data class Developer(
    val name: String = "Astrit Veliu",
    val role: String = "Android Software Engineer",
    val experience: String = "10+ years",
    val location: String = "Köln, Germany",
    val company: String = "Veliu Labs"
)

class Profile {
    private val developer = Developer()
    
    fun getEducation(): List<String> = listOf(
        "MSc in Information Technology (2016-2018)",
        "BSc in Information Technology (2013-2016)",
        "CyberSecurity Specialist (2018-2019)",
        "CCNA Certification - Score: 961/1000"
    )
    
    fun getCurrentWork(): String {
        return "Building innovative Android apps: My DNS & My IP"
    }
    
    fun getAchievements(): Map<String, String> = mapOf(
        "users" to "60,000+ active app users",
        "apps" to "3 published production apps",
        "architecture" to "Migrated CHECK24 from MVI to MVVM"
    )
}`,

            skills: `package com.veliulabs.portfolio

/**
 * Technical Skills & Expertise
 * Modern Android Development Stack
 */
object TechStack {
    
    // Programming Languages
    val languages = mapOf(
        "Kotlin" to "Advanced Level",
        "Java" to "Advanced Level"
    )
    
    // UI Frameworks
    val uiFrameworks = listOf(
        "Jetpack Compose - Modern declarative UI",
        "Material Design 3 - Latest design system",
        "XML Layouts - Traditional Android UI"
    )
    
    // Architecture Patterns
    val architecture = listOf(
        "MVVM - Model-View-ViewModel",
        "MVI - Model-View-Intent",
        "Clean Architecture principles"
    )
    
    // Dependency Injection
    val dependencyInjection = listOf(
        "Dagger 2 - Compile-time DI",
        "Hilt - Android-specific wrapper"
    )
    
    // Libraries & Tools
    val libraries = mapOf(
        "Networking" to "Retrofit, OkHttp",
        "Database" to "Room, SQLite",
        "Async" to "Coroutines, Flow",
        "Testing" to "JUnit, Mockito, Espresso"
    )
    
    // Development Tools
    val tools = listOf(
        "Android Studio",
        "Git & GitHub",
        "CI/CD Pipelines",
        "Jira & Bamboo",
        "Cyber Security"
    )
}`,

            experience: `package com.veliulabs.portfolio

/**
 * Professional Experience
 * Career Journey as Android Developer
 */
data class WorkExperience(
    val company: String,
    val role: String,
    val period: String,
    val location: String,
    val achievements: List<String>
)

object CareerHistory {
    
    val experiences = listOf(
        WorkExperience(
            company = "Veliu Labs",
            role = "Founder & Android Engineer",
            period = "January 2026 - Present",
            location = "Köln, Germany",
            achievements = listOf(
                "Developing My DNS app (25,000+ users)",
                "Building My IP network tool",
                "Implementing modern Android architecture",
                "Focus on user privacy and security"
            )
        ),
        
        WorkExperience(
            company = "CHECK24 Vergleichsportal Mobilfunk GmbH",
            role = "Senior Android Developer",
            period = "October 2020 - December 2025",
            location = "Köln, Germany",
            achievements = listOf(
                "Maintained and refactored Mobilfunk SIM Only module",
                "Successfully migrated from MVI to MVVM architecture",
                "Implemented multiple features",
                "Delivered extensive UI/UX optimizations",
                "Collaborated with cross-functional teams"
            )
        ),
        
        WorkExperience(
            company = "Optima Italia",
            role = "Android Developer",
            period = "August 2019 - September 2020",
            location = "Tirana, Albania",
            achievements = listOf(
                "Developed MyOptima Android application",
                "Built Tuttonizatore app with modern features",
                "Enhanced UI/UX with Material Design"
            )
        ),
        
        WorkExperience(
            company = "ASL Tech Web",
            role = "Android Developer",
            period = "March 2019 - June 2019",
            location = "Tirana, Albania",
            achievements = listOf(
                "Developed Android applications with UI/UX improvements"
            )
        ),
        
        WorkExperience(
            company = "Almotech",
            role = "Android Developer",
            period = "November 2016 - September 2018",
            location = "Tirana, Albania",
            achievements = listOf(
                "Led Shife te Shife e-Commerce app",
                "Built and maintained multiple Android apps",
                "Implemented RESTful API integrations"
            )
        )
    )
}`,

            projects: `package com.veliulabs.portfolio

/**
 * Published Android Applications
 * Available on Google Play Store
 */
data class AndroidApp(
    val name: String,
    val packageName: String,
    val description: String,
    val stats: AppStats,
    val technologies: List<String>
)

data class AppStats(
    val users: String,
    val rating: String
)

object PublishedApps {
    
    val myDNS = AndroidApp(
        name = "My DNS",
        packageName = "website.techalbania.generaldns",
        description = """
            Fast & secure DNS switching application with VPN-based 
            architecture. Provides optimal privacy and modern UI/UX 
            built with Material Design 3.
        """.trimIndent(),
        stats = AppStats(
            users = "60,000+",
            rating = "4.5★"
        ),
        technologies = listOf(
            "Jetpack Compose",
            "VPN Service",
            "Material Design 3",
            "MVVM Architecture",
            "Kotlin Coroutines"
        )
    )
    
    val fitAL = AndroidApp(
        name = "Fit AL",
        packageName = "website.techalbania.fit",
        description = """
            Pedometer and health tracker application with engaging 
            animations. Tracks steps, calories, and provides health 
            insights with modern Android architecture.
        """.trimIndent(),
        stats = AppStats(
            users = "Active",
            rating = "Health & Fitness"
        ),
        technologies = listOf(
            "Step Detection Sensors",
            "Health Connect API",
            "Animated UI",
            "Material Design"
        )
    )
    
    val myIP = AndroidApp(
        name = "My IP",
        packageName = "website.techalbania.mynetworkip",
        description = """
            Network information tool to check IP address and network 
            details instantly. Clean interface with fast performance.
        """.trimIndent(),
        stats = AppStats(
            users = "Network Tool",
            rating = "Utilities"
        ),
        technologies = listOf(
            "Network API",
            "Clean Architecture",
            "Minimal UI",
            "Kotlin"
        )
    )
    
    // Play Store Developer Pages
    const val PERSONAL_APPS = "https://play.google.com/store/apps/dev?id=8902247989998999802"
    const val VELIU_LABS_APPS = "https://play.google.com/store/apps/dev?id=9023809209412327612"
}`,

            contact: `package com.veliulabs.portfolio

/**
 * Contact Information
 * Get in touch for opportunities and collaborations
 */
data class ContactInfo(
    val email: String,
    val github: String,
    val medium: String,
    val dribbble: String
)

object Contact {
    
    val info = ContactInfo(
        email = "astrit-veliu@hotmail.com",
        github = "https://github.com/astrit-veliu/",
        medium = "https://medium.com/@astrit.veliu95",
        dribbble = "https://dribbble.com/astrit_veliu"
    )
    
    val availability = true
    val openToOpportunities = true
    
    /**
     * Send a message
     * @param name Sender's name
     * @param email Sender's email
     * @param subject Message subject
     * @param message Message content
     */
    fun sendMessage(
        name: String,
        email: String,
        subject: String,
        message: String
    ): Boolean {
        // Message handling logic
        println("New message from: $name")
        println("Email: $email")
        println("Subject: $subject")
        println("Message: $message")
        
        return true
    }
    
    companion object {
        const val RESPONSE_TIME = "Within 24 hours"
        const val PREFERRED_CONTACT = "Email"
        const val TIMEZONE = "CET (Central European Time)"
    }
}`
        };

        // Emulator page content
        const emulatorPages = {
            about: `
                <div class="emu-content">
                    <h2 class="emu-section-title">About Me</h2>
                    <div class="emu-card">
                        <div class="emu-card-title">Astrit Veliu</div>
                        <div class="emu-card-text">Android Software Engineer with 10+ years of experience building innovative mobile applications.</div>
                    </div>
                    <div class="emu-card">
                        <div class="emu-card-title">Current Role</div>
                        <div class="emu-card-text">Founder & Android Engineer at Veliu Labs, focused on developing My DNS and My IP applications.</div>
                    </div>
                    <div class="emu-card">
                        <div class="emu-card-title">Location</div>
                        <div class="emu-card-text">Köln, Germany</div>
                    </div>
                    <div class="emu-stats">
                        <div class="emu-stat">
                            <div class="emu-stat-value">10+</div>
                            <div class="emu-stat-label">Years Experience</div>
                        </div>
                        <div class="emu-stat">
                            <div class="emu-stat-value">60K+</div>
                            <div class="emu-stat-label">App Users</div>
                        </div>
                        <div class="emu-stat">
                            <div class="emu-stat-value">3</div>
                            <div class="emu-stat-label">Published Apps</div>
                        </div>
                        <div class="emu-stat">
                            <div class="emu-stat-value">10+</div>
                            <div class="emu-stat-label">Projects</div>
                        </div>
                    </div>
                    <div class="emu-card" style="margin-top: 2rem;">
                        <div class="emu-card-title">Education</div>
                        <div class="emu-card-text">
                            • MSc in Information Technology (2016-2018)<br>
                            • BSc in Information Technology (2013-2016)<br>
                            • CyberSecurity Specialist (2018-2019)<br>
                            • CCNA Certification (961/1000)
                        </div>
                    </div>
                    <button class="emu-btn-outline" onclick="downloadCV()">Open CV</button>
                </div>
            `,
            
            skills: `
                <div class="emu-content">
                    <h2 class="emu-section-title">Technical Skills</h2>
                    <div class="emu-card">
                        <div class="emu-card-title">Languages</div>
                        <div class="emu-skill-grid">
                            <div class="emu-skill">Kotlin</div>
                            <div class="emu-skill">Java</div>
                        </div>
                    </div>
                    <div class="emu-card">
                        <div class="emu-card-title">UI Development</div>
                        <div class="emu-skill-grid">
                            <div class="emu-skill">Jetpack Compose</div>
                            <div class="emu-skill">Material Design 3</div>
                            <div class="emu-skill">XML Layouts</div>
                            <div class="emu-skill">Custom Views</div>
                        </div>
                    </div>
                    <div class="emu-card">
                        <div class="emu-card-title">Architecture</div>
                        <div class="emu-skill-grid">
                            <div class="emu-skill">MVVM</div>
                            <div class="emu-skill">MVI</div>
                            <div class="emu-skill">Clean Architecture</div>
                            <div class="emu-skill">Repository Pattern</div>
                        </div>
                    </div>
                    <div class="emu-card">
                        <div class="emu-card-title">Libraries & Tools</div>
                        <div class="emu-skill-grid">
                            <div class="emu-skill">Dagger 2</div>
                            <div class="emu-skill">Hilt</div>
                            <div class="emu-skill">Retrofit</div>
                            <div class="emu-skill">Room DB</div>
                            <div class="emu-skill">Coroutines</div>
                            <div class="emu-skill">Flow</div>
                            <div class="emu-skill">Git</div>
                            <div class="emu-skill">CI/CD</div>
                            <div class="emu-skill">Cyber Security</div>
                        </div>
                    </div>
                </div>
            `,
            
            experience: `
                <div class="emu-content">
                    <h2 class="emu-section-title">Experience</h2>
                    <div class="emu-card">
                        <div class="emu-card-title">Veliu Labs</div>
                        <div class="emu-card-text" style="color: var(--primary); margin-bottom: 0.5rem;">Founder & Android Developer</div>
                        <div class="emu-card-text" style="font-size: 0.8rem; color: #858585; margin-bottom: 0.75rem;">Jan 2026 - Present</div>
                        <div class="emu-card-text">
                            • Developing My DNS (60K+ users)<br>
                            • Building My IP network tool<br>
                            • Modern Android architecture
                        </div>
                    </div>
                    <div class="emu-card">
                        <div class="emu-card-title">CHECK24</div>
                        <div class="emu-card-text" style="color: var(--primary); margin-bottom: 0.5rem;">Senior Android Developer</div>
                        <div class="emu-card-text" style="font-size: 0.8rem; color: #858585; margin-bottom: 0.75rem;">Oct 2020 - Dec 2025</div>
                        <div class="emu-card-text">
                            • Maintained and refactored Mobilfunk SIM Only module<br>
                            • Migrated MVI to MVVM<br>
                            • Implemented multiple features<br>
                            • UI/UX optimizations
                        </div>
                    </div>
                    <div class="emu-card">
                        <div class="emu-card-title">Optima Italia</div>
                        <div class="emu-card-text" style="color: var(--primary); margin-bottom: 0.5rem;">Android Developer</div>
                        <div class="emu-card-text" style="font-size: 0.8rem; color: #858585; margin-bottom: 0.75rem;">Aug 2019 - Sep 2020</div>
                        <div class="emu-card-text">
                            • MyOptima app development<br>
                            • Tuttonizatore Android app
                        </div>
                    </div>
                    <div class="emu-card">
                        <div class="emu-card-title">ASL Tech Web</div>
                        <div class="emu-card-text" style="color: var(--primary); margin-bottom: 0.5rem;">Android Developer</div>
                        <div class="emu-card-text" style="font-size: 0.8rem; color: #858585; margin-bottom: 0.75rem;">Mar 2019 - Jun 2019</div>
                        <div class="emu-card-text">
                            • Developed Android apps<br>
                            • UI/UX improvements
                        </div>
                    </div>
                    <div class="emu-card">
                        <div class="emu-card-title">Almotech</div>
                        <div class="emu-card-text" style="color: var(--primary); margin-bottom: 0.5rem;">Android Developer</div>
                        <div class="emu-card-text" style="font-size: 0.8rem; color: #858585; margin-bottom: 0.75rem;">Nov 2016 - Sep 2018</div>
                        <div class="emu-card-text">
                            • Led e-Commerce app<br>
                            • Multiple Android apps
                        </div>
                    </div>
                </div>
            `,
            
            projects: `
                <div class="emu-content">
                    <h2 class="emu-section-title">Projects</h2>
                    <div class="emu-card" onclick="window.open('https://play.google.com/store/apps/details?id=website.techalbania.generaldns', '_blank')">
                        <div class="emu-card-title">My DNS</div>
                        <div class="emu-card-text">Fast & secure DNS switching with VPN-based architecture. Modern UI/UX with Material Design 3.</div>
                        <div class="emu-stats" style="margin-top: 1rem;">
                            <div class="emu-stat">
                                <div class="emu-stat-value">60K+</div>
                                <div class="emu-stat-label">Users</div>
                            </div>
                            <div class="emu-stat">
                                <div class="emu-stat-value">4.5★</div>
                                <div class="emu-stat-label">Rating</div>
                            </div>
                        </div>
                    </div>
                    <div class="emu-card" onclick="window.open('https://play.google.com/store/apps/details?id=website.techalbania.fit', '_blank')">
                        <div class="emu-card-title">Fit AL</div>
                        <div class="emu-card-text">Pedometer & health tracker with modern Android architecture and engaging animations.</div>
                        <div class="emu-card-text" style="margin-top: 0.5rem; color: var(--primary);">Health & Fitness</div>
                    </div>
                    <div class="emu-card" onclick="window.open('https://play.google.com/store/apps/details?id=website.techalbania.mynetworkip', '_blank')">
                        <div class="emu-card-title">My IP</div>
                        <div class="emu-card-text">Network information tool to check IP address and network details instantly.</div>
                        <div class="emu-card-text" style="margin-top: 0.5rem; color: var(--primary);">Network Tools</div>
                    </div>
                    <div class="emu-card">
                        <div class="emu-card-title">Play Store</div>
                        <div class="emu-card-text">
                            <a href="https://play.google.com/store/apps/dev?id=9023809209412327612" target="_blank" style="color: var(--primary);">Veliu Labs Apps</a><br>
                            <a href="https://play.google.com/store/apps/dev?id=8902247989998999802" target="_blank" style="color: var(--primary);">Personal Apps</a>
                        </div>
                    </div>
                </div>
            `,
            
            contact: `
                <div class="emu-content">
                    <h2 class="emu-section-title">Contact</h2>
                    <div class="emu-card">
                        <div class="emu-card-title">Get in Touch</div>
                        <form class="emu-form" onsubmit="handleContactForm(event)">
                            <input type="text" class="emu-input" placeholder="Your Name" required>
                            <input type="email" class="emu-input" placeholder="Your Email" required>
                            <input type="text" class="emu-input" placeholder="Subject" required>
                            <textarea class="emu-input emu-textarea" placeholder="Your Message" required></textarea>
                            <button type="submit" class="emu-btn">Send Message</button>
                        </form>
                    </div>
                    <div class="emu-card">
                        <div class="emu-card-title">Connect With Me</div>
                        <div class="emu-social">
                            <a href="https://github.com/astrit-veliu/" target="_blank" class="emu-social-link">
                                <div class="emu-social-icon">G</div>
                                <div>
                                    <div style="font-weight: 600;">GitHub</div>
                                    <div style="font-size: 0.8rem; color: #858585;">@astrit-veliu</div>
                                </div>
                            </a>
                            <a href="https://medium.com/@astrit.veliu95" target="_blank" class="emu-social-link">
                                <div class="emu-social-icon">M</div>
                                <div>
                                    <div style="font-weight: 600;">Medium</div>
                                    <div style="font-size: 0.8rem; color: #858585;">@astrit.veliu95</div>
                                </div>
                            </a>
                            <a href="https://dribbble.com/astrit_veliu" target="_blank" class="emu-social-link">
                                <div class="emu-social-icon">D</div>
                                <div>
                                    <div style="font-weight: 600;">Dribbble</div>
                                    <div style="font-size: 0.8rem; color: #858585;">@astrit_veliu</div>
                                </div>
                            </a>
                        </div>
                    </div>
                </div>
            `
        };

        // Open tabs tracking
        let openTabs = [];
        let currentTab = null;

        // Welcome Screen - Start Portfolio
        function startPortfolio() {
            const bootScreen = document.getElementById('bootScreen');
            bootScreen.classList.add('hidden');
            setTimeout(() => {
                openFile('about', document.querySelector('.file.active'));
                showToast('Opening Astrit Veliu Portfolio...', 'success');
            }, 500);
        }

        // Auto-start after delay
        setTimeout(() => {
            // Welcome screen stays visible until user clicks
        }, 1000);

        // Toast notification system
        function showToast(message, type = 'success') {
            const toast = document.getElementById('toast');
            const icon = document.getElementById('toastIcon');
            const msg = document.getElementById('toastMessage');
            
            toast.className = 'toast show ' + type;
            icon.textContent = type === 'success' ? '✓' : '✗';
            msg.textContent = message;
            
            setTimeout(() => {
                toast.classList.remove('show');
            }, 3000);
        }

        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            // Ctrl/Cmd + K for command palette
            if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
                e.preventDefault();
                showCommandPalette();
            }
            
            // Ctrl/Cmd + B to run build
            if ((e.ctrlKey || e.metaKey) && e.key === 'b') {
                e.preventDefault();
                runApp();
            }
            
            // Ctrl/Cmd + / for help
            if ((e.ctrlKey || e.metaKey) && e.key === '/') {
                e.preventDefault();
                showAbout();
            }

            // ESC to close modals
            if (e.key === 'Escape') {
                closeCommandPalette();
                closeModal();
                closeAboutModal();
                hideContextMenu();
            }

            // Arrow keys for command palette
            if (document.getElementById('commandPalette').classList.contains('active')) {
                if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
                    e.preventDefault();
                    navigatePaletteItems(e.key === 'ArrowDown' ? 1 : -1);
                } else if (e.key === 'Enter') {
                    e.preventDefault();
                    executeSelectedCommand();
                }
            }
        });

        // Command Palette
        let selectedPaletteIndex = 0;
        const paletteCommands = [
            { name: 'Run App', desc: 'Build and run the application', icon: 'play', action: () => runApp(), shortcut: 'Ctrl+B' },
            { name: 'Open About', desc: 'View about information', icon: 'user', action: () => { navigateToSection('about'); closeCommandPalette(); } },
            { name: 'Open Skills', desc: 'View technical skills', icon: 'lightbulb', action: () => { navigateToSection('skills'); closeCommandPalette(); } },
            { name: 'Open Experience', desc: 'View work experience', icon: 'briefcase', action: () => { navigateToSection('experience'); closeCommandPalette(); } },
            { name: 'Open Projects', desc: 'View projects', icon: 'mobile', action: () => { navigateToSection('projects'); closeCommandPalette(); } },
            { name: 'Open Contact', desc: 'Contact information', icon: 'mail', action: () => { navigateToSection('contact'); closeCommandPalette(); } },
            { name: 'Download CV', desc: 'Download resume', icon: 'download', action: () => { downloadCV(); closeCommandPalette(); } },
            { name: 'Clear Terminal', desc: 'Clear terminal output', icon: 'delete', action: () => { executeCommand('clear'); closeCommandPalette(); } },
            { name: 'Show Portfolio Summary', desc: 'Display portfolio stats', icon: 'chart', action: () => { executeCommand('portfolio'); closeCommandPalette(); } },
            { name: 'About Studio', desc: 'About this portfolio', icon: 'info', action: () => { showAbout(); closeCommandPalette(); }, shortcut: 'Ctrl+/' }
        ];

        const iconSVGs = {
            play: '<path d="M8 5v14l11-7z"/>',
            user: '<path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>',
            lightbulb: '<path d="M9 21c0 .5.4 1 1 1h4c.6 0 1-.5 1-1v-1H9v1zm3-19C8.1 2 5 5.1 5 9c0 2.4 1.2 4.5 3 5.7V17c0 .5.4 1 1 1h6c.6 0 1-.5 1-1v-2.3c1.8-1.3 3-3.4 3-5.7 0-3.9-3.1-7-7-7z"/>',
            briefcase: '<path d="M20 6h-4V4c0-1.1-.9-2-2-2h-4c-1.1 0-2 .9-2 2v2H4c-1.1 0-2 .9-2 2v11c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zM10 4h4v2h-4V4zm10 15H4V8h16v11z"/>',
            mobile: '<path d="M17 1H7c-1.1 0-2 .9-2 2v18c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V3c0-1.1-.9-2-2-2zm0 18H7V5h10v14z"/>',
            mail: '<path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>',
            download: '<path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z"/>',
            delete: '<path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/>',
            chart: '<path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z"/>',
            info: '<path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/>'
        };

        function showCommandPalette() {
            const palette = document.getElementById('commandPalette');
            palette.classList.add('active');
            document.getElementById('paletteInput').focus();
            renderPaletteCommands(paletteCommands);
            selectedPaletteIndex = 0;
        }

        function closeCommandPalette() {
            document.getElementById('commandPalette').classList.remove('active');
            document.getElementById('paletteInput').value = '';
        }

        function renderPaletteCommands(commands) {
            const results = document.getElementById('paletteResults');
            results.innerHTML = commands.map((cmd, index) => `
                <div class="command-palette-item ${index === selectedPaletteIndex ? 'selected' : ''}" onclick="executeCommandByIndex(${index})" data-index="${index}">
                    <div class="command-palette-icon">
                        <svg viewBox="0 0 24 24" fill="currentColor">${iconSVGs[cmd.icon]}</svg>
                    </div>
                    <div class="command-palette-text">
                        <div class="command-palette-name">${cmd.name}</div>
                        <div class="command-palette-desc">${cmd.desc}</div>
                    </div>
                    ${cmd.shortcut ? `<div class="command-palette-shortcut">${cmd.shortcut}</div>` : ''}
                </div>
            `).join('');
        }

        function filterCommands(e) {
            const query = e.target.value.toLowerCase();
            const filtered = paletteCommands.filter(cmd => 
                cmd.name.toLowerCase().includes(query) || 
                cmd.desc.toLowerCase().includes(query)
            );
            renderPaletteCommands(filtered);
            selectedPaletteIndex = 0;
        }

        function navigatePaletteItems(direction) {
            const items = document.querySelectorAll('.command-palette-item');
            selectedPaletteIndex = Math.max(0, Math.min(items.length - 1, selectedPaletteIndex + direction));
            renderPaletteCommands(paletteCommands.filter(cmd => {
                const query = document.getElementById('paletteInput').value.toLowerCase();
                return cmd.name.toLowerCase().includes(query) || cmd.desc.toLowerCase().includes(query);
            }));
        }

        function executeSelectedCommand() {
            const query = document.getElementById('paletteInput').value.toLowerCase();
            const filtered = paletteCommands.filter(cmd => 
                cmd.name.toLowerCase().includes(query) || 
                cmd.desc.toLowerCase().includes(query)
            );
            if (filtered[selectedPaletteIndex]) {
                filtered[selectedPaletteIndex].action();
            }
        }

        function executeCommandByIndex(index) {
            const query = document.getElementById('paletteInput').value.toLowerCase();
            const filtered = paletteCommands.filter(cmd => 
                cmd.name.toLowerCase().includes(query) || 
                cmd.desc.toLowerCase().includes(query)
            );
            if (filtered[index]) {
                filtered[index].action();
            }
        }

        function handlePaletteBackdropClick(e) {
            if (e.target.id === 'commandPalette') {
                closeCommandPalette();
            }
        }

        // Progress Bar
        function showProgress() {
            const bar = document.getElementById('progressBar');
            let width = 0;
            const interval = setInterval(() => {
                width += 10;
                bar.style.width = width + '%';
                if (width >= 100) {
                    clearInterval(interval);
                    setTimeout(() => {
                        bar.style.width = '0%';
                    }, 500);
                }
            }, 100);
        }

        // Scroll to Top
        window.addEventListener('scroll', () => {
            const scrollTop = document.getElementById('scrollTop');
            if (window.scrollY > 300) {
                scrollTop.classList.add('show');
            } else {
                scrollTop.classList.remove('show');
            }
        });

        function scrollToTop() {
            window.scrollTo({ top: 0, behavior: 'smooth' });
            showToast('Scrolled to top', 'success');
        }

        // Context Menu
        document.addEventListener('contextmenu', (e) => {
            if (e.target.closest('.emu-card') || e.target.closest('.device-screen')) {
                e.preventDefault();
                showContextMenu(e.pageX, e.pageY);
            }
        });

        document.addEventListener('click', () => {
            hideContextMenu();
        });

        function showContextMenu(x, y) {
            const menu = document.getElementById('contextMenu');
            menu.classList.add('show');
            menu.style.left = x + 'px';
            menu.style.top = y + 'px';
        }

        function hideContextMenu() {
            document.getElementById('contextMenu').classList.remove('show');
        }

        function copyToClipboard() {
            navigator.clipboard.writeText(window.location.href);
            showToast('Link copied to clipboard!', 'success');
            hideContextMenu();
        }

        function openInNewTab() {
            window.open(window.location.href, '_blank');
            hideContextMenu();
        }

        function sharePortfolio() {
            if (navigator.share) {
                navigator.share({
                    title: 'Astrit Veliu - Android Developer Portfolio',
                    text: 'Check out my portfolio!',
                    url: window.location.href
                });
            } else {
                copyToClipboard();
            }
            hideContextMenu();
        }

        // Particles
        function createParticles() {
            const container = document.getElementById('particles');
            for (let i = 0; i < 20; i++) {
                const particle = document.createElement('div');
                particle.className = 'particle';
                particle.style.left = Math.random() * 100 + '%';
                particle.style.animationDelay = Math.random() * 10 + 's';
                particle.style.animationDuration = (Math.random() * 10 + 10) + 's';
                container.appendChild(particle);
            }
        }

        // Konami Code Easter Egg
        const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
        let konamiIndex = 0;

        document.addEventListener('keydown', (e) => {
            if (e.key === konamiCode[konamiIndex]) {
                konamiIndex++;
                if (konamiIndex === konamiCode.length) {
                    document.body.classList.toggle('konami-active');
                    showToast('🎮 Konami Code Activated! Rainbow Mode!', 'success');
                    konamiIndex = 0;
                }
            } else {
                konamiIndex = 0;
            }
        });

        // Initialize particles
        createParticles();

        // Click sound effect (macOS-like)
        function playClickSound() {
		if (!isSoundEnabled) return;

            // Create a more pleasant click sound using Web Audio API
            const audioContext = new (window.AudioContext || window.webkitAudioContext)();
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);
            
            oscillator.frequency.value = 800;
            oscillator.type = 'sine';
            
            gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
            
            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + 0.1);
        }
        
        // Add click sound to interactive elements
        document.addEventListener('click', (e) => {
            if (e.target.closest('button, .menu-item, .file, .nav-item, .emu-card, .command-palette-item, .submenu-item, .emu-btn, .emu-btn-outline, .welcome-btn, .project-item')) {
                playClickSound();
            }
        });

        // Device control functions
        let isSoundEnabled = true;
        let isLightMode = false;

        function toggleSound() {
            isSoundEnabled = !isSoundEnabled;
            const btn = document.getElementById('soundToggle');
            const icon = document.getElementById('soundIcon');
            
            if (isSoundEnabled) {
                btn.classList.remove('muted');
                icon.innerHTML = '<path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/>';
                showToast('Sound enabled', 'success');
            } else {
                btn.classList.add('muted');
                icon.innerHTML = '<path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z"/>';
                showToast('Sound muted', 'success');
            }
        }

        function toggleDeviceMode() {
            const screen = document.querySelector('.device-screen');
            const cards = document.querySelectorAll('.emu-card');
            const stats = document.querySelectorAll('.emu-stat');
            const statLabels = document.querySelectorAll('.emu-stat-label');
            const sectionTitle = document.querySelectorAll('.emu-section-title');
            const cardTexts = document.querySelectorAll('.emu-card-text');
            const btn = event.currentTarget;
            
            isLightMode = !isLightMode;
            
            if (isLightMode) {
                screen.style.background = '#f8f8f8';
                cards.forEach(card => card.classList.add('light-mode'));
                stats.forEach(stat => stat.classList.add('light-mode'));
                statLabels.forEach(label => label.classList.add('light-mode'));
                sectionTitle.forEach(title => title.style.color = '#1a1a1a');
                btn.classList.add('active');
                showToast('Light mode enabled', 'success');
            } else {
                screen.style.background = 'var(--background)';
                cards.forEach(card => card.classList.remove('light-mode'));
                stats.forEach(stat => stat.classList.remove('light-mode'));
                statLabels.forEach(label => label.classList.remove('light-mode'));
                sectionTitle.forEach(title => title.style.color = '#d4d4d4');
                btn.classList.remove('active');
                showToast('Dark mode enabled', 'success');
            }
        }

        function refreshDevice() {
            const loader = document.getElementById('loadingIndicator');
            loader.classList.add('active');
            showProgress();
            
            setTimeout(() => {
                const currentPage = document.querySelectorAll('.nav-item.active')[0];
                const pages = ['about', 'skills', 'experience', 'projects', 'contact'];
                const currentIndex = Array.from(currentPage.parentElement.children).indexOf(currentPage);
                goToPage(pages[currentIndex]);
                loader.classList.remove('active');
                showToast('Refreshed successfully', 'success');
            }, 1000);
        }

        // Animated counter for stats
        function animateCounter(element, target) {
            const duration = 1000;
            const start = 0;
            const isDecimal = target.toString().includes('.');
            const suffix = target >= 1000 ? 'K+' : isDecimal ? '+' : '+';
            const displayTarget = target >= 1000 ? Math.floor(target / 1000) : target;
            const increment = displayTarget / (duration / 16);
            let current = start;
            
            const timer = setInterval(() => {
                current += increment;
                if (current >= displayTarget) {
                    if (isDecimal) {
                        element.textContent = target + '+';
                    } else if (target >= 1000) {
                        element.textContent = Math.floor(target / 1000) + 'K+';
                    } else {
                        element.textContent = target + '+';
                    }
                    clearInterval(timer);
                } else {
                    if (target >= 1000) {
                        element.textContent = Math.floor(current) + 'K+';
                    } else if (isDecimal) {
                        element.textContent = current.toFixed(1) + '+';
                    } else {
                        element.textContent = Math.floor(current) + '+';
                    }
                }
            }, 16);
        }

        // Intersection Observer for animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.animation = 'fadeIn 0.6s ease-out forwards';
                    
                    // No counter animation - just display static values
                    if (entry.target.classList.contains('emu-stat-value')) {
                        entry.target.classList.add('counting');
                    }
                }
            });
        }, observerOptions);

        // Typing animation for terminal commands
        function typeCommand(text, callback) {
            const input = document.getElementById('terminalInput');
            let index = 0;
            
            const typeInterval = setInterval(() => {
                if (index < text.length) {
                    input.value += text[index];
                    index++;
                } else {
                    clearInterval(typeInterval);
                    if (callback) setTimeout(callback, 300);
                }
            }, 50);
        }

        // Swipe gestures for emulator
        let touchStartX = 0;
        let touchEndX = 0;
        
        const deviceScreen = document.getElementById('deviceScreen');
        
        deviceScreen.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        });
        
        deviceScreen.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        });
        
        function handleSwipe() {
            const swipeThreshold = 50;
            const diff = touchStartX - touchEndX;
            
            if (Math.abs(diff) > swipeThreshold) {
                const pages = ['about', 'skills', 'experience', 'projects', 'contact'];
                const currentIndex = pages.findIndex(p => document.getElementById('deviceScreen').innerHTML.includes(emulatorPages[p]));
                
                if (diff > 0 && currentIndex < pages.length - 1) {
                    // Swipe left - next page
                    navigateEmu(pages[currentIndex + 1]);
                } else if (diff < 0 && currentIndex > 0) {
                    // Swipe right - previous page
                    navigateEmu(pages[currentIndex - 1]);
                }
            }
        }

        // Load Kotlin code with syntax highlighting
        function loadKotlinCode(file) {
            const code = kotlinCode[file];
            const lines = code.split('\n');
            let html = '';
            
            lines.forEach((line, index) => {
                // Escape HTML first
                let escapedLine = line
                    .replace(/&/g, '&amp;')
                    .replace(/</g, '&lt;')
                    .replace(/>/g, '&gt;');
                
                // Apply syntax highlighting
                let highlighted = escapedLine
                    .replace(/\b(package|import|class|object|data class|val|var|fun|return|listOf|mapOf|const|companion|if|else|when|private|public|override|data)\b/g, '<span class="keyword">$1</span>')
                    .replace(/&quot;([^&quot;]*)&quot;/g, '<span class="string">"$1"</span>')
                    .replace(/\/\*\*([\s\S]*?)\*\//g, '<span class="comment">/**$1*/</span>')
                    .replace(/\/\*([^*][\s\S]*?)\*\//g, '<span class="comment">/*$1*/</span>')
                    .replace(/\/\/(.*)/g, '<span class="comment">//$1</span>')
                    .replace(/@(\w+)/g, '<span class="annotation">@$1</span>')
                    .replace(/\b([A-Z][a-zA-Z0-9]*)\b/g, '<span class="class-name">$1</span>')
                    .replace(/\b(true|false|null)\b/g, '<span class="keyword">$1</span>');
                
                html += `<div class="code-line">
                    <span class="line-number">${index + 1}</span>
                    <span class="code-text">${highlighted}</span>
                </div>`;
            });
            
            document.getElementById('editorContent').innerHTML = html;
            
            // Observe cards for animation
            setTimeout(() => {
                const cards = document.querySelectorAll('.emu-card');
                cards.forEach(card => observer.observe(card));
            }, 100);
        }

        // Terminal commands
        const terminalCommands = {
            help: `Available commands:
  help       - Show this help message
  about      - Show information about Astrit
  skills     - List technical skills
  apps       - Show published applications
  experience - Show work history
  contact    - Display contact information
  portfolio  - Show portfolio summary
  clear      - Clear terminal
  run        - Build and run app
  git status - Check repository status
  git log    - Show commit history
  ls         - List project files
  pwd        - Print working directory
  whoami     - Display current user
  date       - Show current date and time
  uname      - System information`,
            
            about: `Astrit Veliu - Android Software Engineer
Location: Köln, Germany
Experience: 10+ years
Company: Veliu Labs
Specialization: Modern Android Development`,
            
            skills: `Technical Skills:
├── Languages: Kotlin, Java
├── UI: Jetpack Compose, Material Design 3
├── Architecture: MVVM, MVI, Clean Architecture
├── DI: Dagger 2, Hilt
├── Libraries: Retrofit, Room, Coroutines, Flow
└── Tools: Git, CI/CD, Android Studio`,
            
            apps: `Published Applications:
1. My DNS - 60,000+ users (4.5★)
2. Fit AL - Health & Fitness tracker
3. My IP - Network information tool

Play Store: https://play.google.com/store/apps/dev?id=9023809209412327612`,
            
            experience: `Work Experience:
• Veliu Labs (2026-Present) - Founder & Android Engineer
• CHECK24 (2020-2025) - Senior Android Developer
• Optima Italia (2019-2020) - Android Developer
• ASL Tech Web (2019) - Android Developer
• Almotech (2016-2018) - Android Developer`,

            contact: `Contact Information:
Email: astrit-veliu@hotmail.com
GitHub: https://github.com/astrit-veliu/
Medium: https://medium.com/@astrit.veliu95
Dribbble: https://dribbble.com/astrit_veliu

Availability: Open to opportunities
Response Time: Within 24 hours
Timezone: CET (Central European Time)`,

            portfolio: `Portfolio Summary:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Statistics:
   • Experience: 10+ years
   • Active Users: 60,000+
   • Published Apps: 3
   • Total Projects: 10+

Expertise:
   • Modern Android Development
   • Jetpack Compose & Material Design 3
   • MVVM & Clean Architecture
   • Kotlin & Java

Achievements:
   • Migrated CHECK24 from MVI to MVVM
   • Built My DNS app (60K+ users)
   • Delivered multiple production apps

Links:
   • GitHub: github.com/astrit-veliu
   • Play Store: Veliu Labs Apps`,
            
            clear: 'CLEAR',
            
            run: `Building application...
✓ Gradle build completed
✓ Installing APK on device
✓ Launching application
App running successfully!`,
            
            'git status': `On branch main
Your branch is up to date with 'origin/main'.

Changes not staged for commit:
  (use "git add <file>..." to update what will be committed)
  (use "git restore <file>..." to discard changes in working directory)
        modified:   README.md

no changes added to commit (use "git add" and/or "git commit -a")`,

            'git log': `commit 3f8d2a1c4b6e9d7a2f5c8e1b3d6a9c2e5f8b1d4a (HEAD -> main, origin/main)
Author: Astrit Veliu <astrit-veliu@hotmail.com>
Date:   Mon Jan 12 15:42:33 2026 +0100

    feat: Add portfolio projects section with app showcase

commit 7e2b9c4f8a1d3e6b9c2f5a8e1d4b7c9e2f5a8b1
Author: Astrit Veliu <astrit-veliu@hotmail.com>
Date:   Sun Jan 11 18:27:14 2026 +0100

    refactor: Migrate architecture to MVVM pattern

commit 1a4c7e9b2d5f8a1c4e7b9d2f5a8c1e4b7d9c2f5
Author: Astrit Veliu <astrit-veliu@hotmail.com>
Date:   Sat Jan 10 22:15:07 2026 +0100

    docs: Update README with new tech stack

commit 9c2f5a8e1d4b7c9e2f5a8b1d4a7c9e2f5a8b1d4
Author: Astrit Veliu <astrit-veliu@hotmail.com>
Date:   Fri Jan 9 14:38:52 2026 +0100

    feat: Implement Jetpack Compose UI components`,

            ls: `total 48
drwxr-xr-x  12 astrit  staff   384 Jan 12 15:42 .
drwxr-xr-x   8 astrit  staff   256 Jan 10 09:15 ..
drwxr-xr-x  15 astrit  staff   480 Jan 12 15:42 .git
-rw-r--r--   1 astrit  staff   125 Jan 10 09:15 .gitignore
-rw-r--r--   1 astrit  staff  2847 Jan 11 18:27 AboutMe.kt
-rw-r--r--   1 astrit  staff  1932 Jan 11 18:27 Skills.kt
-rw-r--r--   1 astrit  staff  3421 Jan 11 18:27 Experience.kt
-rw-r--r--   1 astrit  staff  2756 Jan 12 15:42 Projects.kt
-rw-r--r--   1 astrit  staff  1654 Jan 11 18:27 Contact.kt
-rw-r--r--   1 astrit  staff  4532 Jan 11 22:15 README.md
drwxr-xr-x   8 astrit  staff   256 Jan 10 09:15 assets
drwxr-xr-x  12 astrit  staff   384 Jan 11 18:27 build`,

            pwd: `/Users/astrit/Documents/Portfolio/AstritVeliu_2025`,

            whoami: `astrit
Current User: Astrit Veliu
Role: Android Software Engineer
Company: Veliu Labs`,

            date: new Date().toString(),

            uname: `Darwin AstritMacBook.local 23.2.0 Darwin Kernel Version 23.2.0
Android Studio Veliu Labs | 2026.1.12
Build #AS-252.25557.131, built on January 8, 2025`
        };

        function handleTerminalCommand(event) {
            if (event.key === 'Enter') {
                const input = document.getElementById('terminalInput');
                const command = input.value.trim();
                const commandLower = command.toLowerCase();
                const terminal = document.getElementById('terminalContent');
                
                if (command === '') {
                    input.value = '';
                    return;
                }
                
                // Add command to terminal
                const commandLine = document.createElement('div');
                commandLine.className = 'terminal-line';
                commandLine.innerHTML = `<span style="color: var(--primary);">astrit@veliu-labs:~$</span> ${command}`;
                
                // Remove input line temporarily
                const inputLine = terminal.lastElementChild;
                terminal.removeChild(inputLine);
                terminal.appendChild(commandLine);
                
                // Check if command matches a page section
                const pageCommands = ['about', 'skills', 'experience', 'projects', 'contact'];
                if (pageCommands.includes(commandLower)) {
                    navigateToSection(commandLower);
                }
                
                // Process command
                if (commandLower === 'clear') {
                    terminal.innerHTML = '';
                } else {
                    // Look up command with quotes for exact match
                    const output = terminalCommands[commandLower] || 
                                  terminalCommands[`'${commandLower}'`] || 
                                  terminalCommands[command] ||
                                  `Command not found: ${command}. Type 'help' for available commands.`;
                    const outputLines = output.split('\n');
                    
                    outputLines.forEach(line => {
                        const outputLine = document.createElement('div');
                        outputLine.className = line.includes('✓') ? 'terminal-line terminal-success' : 
                                              line.includes('Error') || line.includes('not found') ? 'terminal-line terminal-error' : 
                                              'terminal-line';
                        outputLine.textContent = line;
                        terminal.appendChild(outputLine);
                    });
                    
                    const emptyLine = document.createElement('div');
                    emptyLine.className = 'terminal-line';
                    terminal.appendChild(emptyLine);
                }
                
                // Re-add input line
                terminal.appendChild(inputLine);
                
                // Scroll to bottom
                terminal.scrollTop = terminal.scrollHeight;
                
                // Clear input
                input.value = '';
                input.focus();
            }
        }

        // Run app function
        function runApp() {
            // Show loading indicator
            const loader = document.getElementById('loadingIndicator');
            loader.classList.add('active');
            
            showToast('Starting build process...', 'success');
            showProgress();
            
            const terminal = document.getElementById('buildContent');
            terminal.innerHTML = '';
            
            // Switch to Build tab
            document.querySelectorAll('.terminal-tab').forEach(t => t.classList.remove('active'));
            document.querySelectorAll('.terminal-tab')[1].classList.add('active');
            document.querySelectorAll('.terminal-content').forEach(c => c.classList.remove('active'));
            terminal.classList.add('active');
            
            const messages = [
                'Gradle build started...',
                '> Task :app:preBuild UP-TO-DATE',
                '> Task :app:compileDebugKotlin',
                '✓ Compiled 42 Kotlin files in 2.3s',
                '> Task :app:processDebugResources',
                '> Task :app:dexBuilderDebug',
                '✓ Dex processing complete',
                '> Task :app:packageDebug',
                '✓ APK built successfully',
                '> Task :app:installDebug',
                '✓ Installing APK on Emulator',
                '> Task :app:runDebug',
                '✓ App launched successfully',
                '',
                'BUILD SUCCESSFUL in 2.8s',
                '12 actionable tasks: 12 executed'
            ];
            
            messages.forEach((msg, index) => {
                setTimeout(() => {
                    const line = document.createElement('div');
                    line.className = msg.includes('✓') || msg.includes('SUCCESS') ? 'terminal-line terminal-success' : 'terminal-line';
                    line.textContent = msg;
                    terminal.appendChild(line);
                    terminal.scrollTop = terminal.scrollHeight;
                    
                    if (index === messages.length - 1) {
                        // Hide loading, navigate and update states
                        setTimeout(() => {
                            loader.classList.remove('active');
                            goToPage('about');
                            document.getElementById('deviceScreen').scrollTop = 0;
                            showToast('App launched successfully!', 'success');
                            
                            // Update bottom nav active state
                            document.querySelectorAll('.nav-item').forEach(item => item.classList.remove('active'));
                            document.querySelector('.nav-item').classList.add('active');
                        }, 500);
                    }
                }, index * 200);
            });
        }

        // Open file and create tab
        function openFile(file, element) {
            // Update sidebar
            document.querySelectorAll('.file').forEach(f => f.classList.remove('active'));
            element.classList.add('active');
            
            // Update bottom nav to match
            const fileMap = {
                'about': 0,
                'skills': 1,
                'experience': 2,
                'projects': 3,
                'contact': 4
            };
            const navItems = document.querySelectorAll('.nav-item');
            navItems.forEach(item => item.classList.remove('active'));
            if (fileMap[file] !== undefined) {
                navItems[fileMap[file]].classList.add('active');
            }
            
            // Check if tab already open
            const existingTab = openTabs.find(t => t.file === file);
            if (existingTab) {
                switchToTab(file);
                return;
            }
            
            // Add new tab
            const fileNames = {
                about: 'AboutMe.kt',
                skills: 'Skills.kt',
                experience: 'Experience.kt',
                projects: 'Projects.kt',
                contact: 'Contact.kt'
            };
            
            openTabs.push({ file, name: fileNames[file] });
            currentTab = file;
            renderTabs();
            loadKotlinCode(file);
            goToPage(file);
        }

        // Render tabs
        function renderTabs() {
            const tabsContainer = document.getElementById('editorTabs');
            tabsContainer.innerHTML = openTabs.map(tab => `
                <div class="editor-tab ${tab.file === currentTab ? 'active' : ''}" onclick="switchToTab('${tab.file}')">
                    <span>${tab.name}</span>
                    <span class="tab-close" onclick="event.stopPropagation(); closeTab('${tab.file}')">&times;</span>
                </div>
            `).join('');
        }

        // Switch to tab
        function switchToTab(file) {
            currentTab = file;
            renderTabs();
            loadKotlinCode(file);
            goToPage(file);
            
            // Update bottom nav to match
            const fileMap = {
                'about': 0,
                'skills': 1,
                'experience': 2,
                'projects': 3,
                'contact': 4
            };
            const navItems = document.querySelectorAll('.nav-item');
            navItems.forEach(item => item.classList.remove('active'));
            if (fileMap[file] !== undefined) {
                navItems[fileMap[file]].classList.add('active');
            }
        }

        // Close tab
        function closeTab(file) {
            openTabs = openTabs.filter(t => t.file !== file);
            if (currentTab === file && openTabs.length > 0) {
                currentTab = openTabs[openTabs.length - 1].file;
                loadKotlinCode(currentTab);
                goToPage(currentTab);
            }
            renderTabs();
        }

        // Switch terminal tabs
        function switchTerminalTab(tab) {
            // Update tab active state
            document.querySelectorAll('.terminal-tab').forEach(t => t.classList.remove('active'));
            event.currentTarget.classList.add('active');
            
            // Update content active state
            document.querySelectorAll('.terminal-content').forEach(c => c.classList.remove('active'));
            if (tab === 'terminal') {
                document.getElementById('terminalContent').classList.add('active');
            } else {
                document.getElementById('buildContent').classList.add('active');
            }
        }

        // Navigate emulator with bottom nav
        function navigateEmu(page) {
            // Update bottom nav active state
            document.querySelectorAll('.nav-item').forEach(item => item.classList.remove('active'));
            event.currentTarget.classList.add('active');
            
            // Update sidebar file active state
            const fileMap = {
                'about': 0,
                'skills': 1,
                'experience': 2,
                'projects': 3,
                'contact': 4
            };
            const files = document.querySelectorAll('.file');
            files.forEach(f => f.classList.remove('active'));
            if (fileMap[page] !== undefined) {
                files[fileMap[page]].classList.add('active');
            }
            
            // Navigate to page
            goToPage(page);
            
            // Scroll to top
            document.getElementById('deviceScreen').scrollTop = 0;
        }

        // Navigate to emulator page
        function goToPage(page) {
            const screen = document.getElementById('deviceScreen');
            screen.classList.add('transitioning');
            
            setTimeout(() => {
                screen.innerHTML = emulatorPages[page] || emulatorPages.about;
                
                // Apply light mode classes if active
                if (isLightMode) {
                    const cards = screen.querySelectorAll('.emu-card');
                    const stats = screen.querySelectorAll('.emu-stat');
                    const statLabels = screen.querySelectorAll('.emu-stat-label');
                    const sectionTitle = screen.querySelectorAll('.emu-section-title');
                    
                    cards.forEach(card => card.classList.add('light-mode'));
                    stats.forEach(stat => stat.classList.add('light-mode'));
                    statLabels.forEach(label => label.classList.add('light-mode'));
                    sectionTitle.forEach(title => title.style.color = '#1a1a1a');
                }
                
                screen.classList.remove('transitioning');
                
                // Observe new cards for animation
                const cards = screen.querySelectorAll('.emu-card');
                cards.forEach(card => observer.observe(card));
                
                // Animate stats
                const stats = screen.querySelectorAll('.emu-stat-value');
                stats.forEach(stat => observer.observe(stat));
            }, 200);
        }

        // Menu actions
        function showTools() {
            document.getElementById('toolsModal').classList.add('active');
        }

        function closeModal() {
            document.getElementById('toolsModal').classList.remove('active');
        }

        function showAbout() {
            document.getElementById('copyrightYear').textContent = new Date().getFullYear();
            document.getElementById('aboutModal').classList.add('active');
        }

        function closeAboutModal() {
            document.getElementById('aboutModal').classList.remove('active');
        }

        function navigateToSection(section) {
            // Update file explorer
            const fileMap = {
                'about': 0,
                'skills': 1,
                'experience': 2,
                'projects': 3,
                'contact': 4
            };
            const files = document.querySelectorAll('.file');
            files.forEach(f => f.classList.remove('active'));
            if (fileMap[section] !== undefined) {
                files[fileMap[section]].classList.add('active');
            }
            
            // Update bottom nav
            const navItems = document.querySelectorAll('.nav-item');
            navItems.forEach(item => item.classList.remove('active'));
            if (fileMap[section] !== undefined) {
                navItems[fileMap[section]].classList.add('active');
            }
            
            // Open file if not already open
            const existingTab = openTabs.find(t => t.file === section);
            if (!existingTab) {
                const fileNames = {
                    about: 'AboutMe.kt',
                    skills: 'Skills.kt',
                    experience: 'Experience.kt',
                    projects: 'Projects.kt',
                    contact: 'Contact.kt'
                };
                openTabs.push({ file: section, name: fileNames[section] });
            }
            
            currentTab = section;
            renderTabs();
            loadKotlinCode(section);
            goToPage(section);
            
            // Scroll emulator to top
            document.getElementById('deviceScreen').scrollTop = 0;
        }

        let submenuTimeout;
        let currentSubmenu = null;
        
        function showSubmenu(event, type) {
            clearTimeout(submenuTimeout);
            
            // Hide all other submenus
            document.querySelectorAll('.submenu').forEach(s => s.classList.remove('active'));
            
            const submenu = document.getElementById(type + 'Submenu');
            if (submenu) {
                submenu.classList.add('active');
                currentSubmenu = submenu;
            }
        }

        function hideSubmenu() {
            submenuTimeout = setTimeout(() => {
                if (currentSubmenu) {
                    currentSubmenu.classList.remove('active');
                    currentSubmenu = null;
                }
            }, 200);
        }

        function showHelp() {
            const helpText = `
╔══════════════════════════════════════════════╗
║   Android Studio Portfolio - Help Guide     ║
╚══════════════════════════════════════════════╝

🎨 FEATURES:

⌨️  KEYBOARD SHORTCUTS:
   • Ctrl/Cmd + K  →  Open Command Palette (Spotlight)
   • Ctrl/Cmd + B  →  Run & Build App
   • Ctrl/Cmd + /  →  Show About
   • ESC           →  Close Modals/Palette
   • ↑/↓ Arrows    →  Navigate Command Palette
   • Enter         →  Execute Selected Command

🔍 COMMAND PALETTE:
   Click the search icon (⚡) in bottom-right or press Ctrl+K
   to open Spotlight-style command palette. Search and execute
   any action quickly!

📱 MOBILE GESTURES:
   • Swipe Left/Right  →  Navigate between pages
   • Long Press        →  Context menu (coming soon)
   • Pull to Refresh   →  Reload content

🖱️  CONTEXT MENU:
   Right-click on any card or emulator to access:
   • Copy Link
   • Open in New Tab
   • Share Portfolio
   • Download CV

🎯 INTERACTIVE FEATURES:
   • Animated Statistics  →  Scroll to see counters animate
   • Toast Notifications  →  Action feedback
   • Progress Bar        →  Build progress
   • Scroll to Top       →  Quick navigation
   • Live Indicator      →  Real-time status

🎮 EASTER EGG:
   Type the Konami Code for a surprise:
   ↑ ↑ ↓ ↓ ← → ← → B A

💡 TIPS:
   • Use terminal for quick commands
   • Hover over cards for effects
   • Click file tabs to switch sections
   • Navigate with bottom bar on mobile

📚 TERMINAL COMMANDS:
   help, about, skills, experience, projects, contact,
   portfolio, git status, git log, ls, pwd, whoami,
   date, uname, clear, run

Created with ❤️ by Astrit Veliu
            `;
            
            showToast('Opening Help Guide...', 'success');
            
            // Switch to terminal and show help
            document.querySelectorAll('.terminal-tab').forEach(t => t.classList.remove('active'));
            document.querySelectorAll('.terminal-tab')[0].classList.add('active');
            document.querySelectorAll('.terminal-content').forEach(c => c.classList.remove('active'));
            const terminal = document.getElementById('terminalContent');
            terminal.classList.add('active');
            
            const inputLine = terminal.lastElementChild;
            terminal.removeChild(inputLine);
            
            const helpLines = helpText.split('\n');
            helpLines.forEach(line => {
                const helpLine = document.createElement('div');
                helpLine.className = 'terminal-line';
                helpLine.textContent = line;
                helpLine.style.color = line.includes('║') || line.includes('╔') || line.includes('╚') ? 'var(--primary)' : 
                                      line.includes('•') || line.includes('→') ? '#4ec9b0' :
                                      line.includes('🎨') || line.includes('⌨️') || line.includes('🔍') || line.includes('📱') || line.includes('🖱️') || line.includes('🎯') || line.includes('🎮') || line.includes('💡') || line.includes('📚') ? 'var(--primary)' :
                                      '#d4d4d4';
                terminal.appendChild(helpLine);
            });
            
            terminal.appendChild(inputLine);
            terminal.scrollTop = terminal.scrollHeight;
        }

        function executeCommand(cmd) {
            closeModal();
            hideSubmenu();
            
            const cmdLower = cmd.toLowerCase();
            
            // Check if command matches a page section
            const pageCommands = {
                'about': 'about',
                'skills': 'skills', 
                'experience': 'experience',
                'projects': 'projects',
                'contact': 'contact'
            };
            
            if (pageCommands[cmdLower]) {
                navigateToSection(pageCommands[cmdLower]);
            }
            
            // Switch to terminal tab
            document.querySelectorAll('.terminal-tab').forEach(t => t.classList.remove('active'));
            document.querySelectorAll('.terminal-tab')[0].classList.add('active');
            document.querySelectorAll('.terminal-content').forEach(c => c.classList.remove('active'));
            document.getElementById('terminalContent').classList.add('active');
            
            const terminal = document.getElementById('terminalContent');
            const inputLine = terminal.lastElementChild;
            
            // Add command to terminal
            const commandLine = document.createElement('div');
            commandLine.className = 'terminal-line';
            commandLine.innerHTML = `<span style="color: var(--primary);">astrit@veliu-labs:~$</span> ${cmd}`;
            terminal.removeChild(inputLine);
            terminal.appendChild(commandLine);
            
            // Process command
            if (cmdLower === 'clear') {
                terminal.innerHTML = '';
            } else if (cmdLower === 'run') {
                runApp();
                return;
            } else {
                // Look up command with quotes for exact match
                const output = terminalCommands[cmdLower] || 
                              terminalCommands[`'${cmdLower}'`] || 
                              terminalCommands[cmd] ||
                              `Command not found: ${cmd}`;
                const outputLines = output.split('\n');
                
                outputLines.forEach(line => {
                    const outputLine = document.createElement('div');
                    outputLine.className = line.includes('✓') ? 'terminal-line terminal-success' : 
                                          line.includes('Error') || line.includes('not found') ? 'terminal-line terminal-error' : 
                                          'terminal-line';
                    outputLine.textContent = line;
                    terminal.appendChild(outputLine);
                });
                
                const emptyLine = document.createElement('div');
                emptyLine.className = 'terminal-line';
                terminal.appendChild(emptyLine);
            }
            
            // Re-add input line
            terminal.appendChild(inputLine);
            terminal.scrollTop = terminal.scrollHeight;
        }

        function downloadCV() {
            window.open('assets/cv/Astrit_Veliu_CV_EN.pdf', '_blank');
        }

        function toggleBuild() {
            document.getElementById('buildWindow').classList.toggle('active');
        }

        function closeBuild() {
            document.getElementById('buildWindow').classList.remove('active');
        }

        function toggleSidebar() {
            const overlay = document.getElementById('mobileOverlay');
            overlay.classList.add('active');
        }

        function closeMobileMenu() {
            const overlay = document.getElementById('mobileOverlay');
            overlay.classList.remove('active');
        }

        // Contact form handler
        function handleContactForm(e) {
            e.preventDefault();
            const formData = new FormData(e.target);
            const name = formData.get('name') || e.target[0].value;
            const email = formData.get('email') || e.target[1].value;
            const subject = formData.get('subject') || e.target[2].value;
            const message = formData.get('message') || e.target[3].value;
            
            const mailtoLink = `mailto:astrit-veliu@hotmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`)}`;
            window.location.href = mailtoLink;
            
            e.target.reset();
            alert('Opening email client...');
        }

        // Focus terminal input
        setTimeout(() => {
            const termInput = document.getElementById('terminalInput');
            if (termInput) termInput.focus();
        }, 3000);
		
		function updateDynamicDates() {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    
    // Update project path with current year
    const projectPath = document.getElementById('projectPath');
    if (projectPath) {
        projectPath.textContent = `~/Documents/Portfolio/AstritVeliu_${year}`;
    }
    
    // Update studio version with current date
    const studioVersion = document.getElementById('studioVersion');
    if (studioVersion) {
        studioVersion.textContent = `Veliu Labs | ${year}.${month}.${day}`;
    }
    
    // Update copyright year in about modal (already exists but ensure it's set)
    const copyrightYear = document.getElementById('copyrightYear');
    if (copyrightYear) {
        copyrightYear.textContent = year;
    }
	const buildDate = document.getElementById('buildDate');
    if (buildDate) {
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 
                   'July', 'August', 'September', 'October', 'November', 'December'];
    const buildNumber = `AS-${year}${month}${day}.${Math.floor(Math.random() * 90000) + 10000}`;
    buildDate.textContent = `Build #${buildNumber}, built on ${months[now.getMonth()]} ${day}, ${year}`;
}
}

// Call the function when page loads
updateDynamicDates();

// Terminal auto-hide functionality
let terminalActivityTimeout;
let isTerminalActive = false;

function resetTerminalTimeout() {
    clearTimeout(terminalActivityTimeout);
    
    // Only auto-hide on mobile
    if (window.innerWidth <= 1024) {
        terminalActivityTimeout = setTimeout(() => {
            if (isTerminalActive) {
                hideTerminal();
            }
        }, 10000); // 10 seconds
    }
}

function showTerminal() {
    const terminal = document.querySelector('.terminal-panel');
    const toggle = document.getElementById('terminalToggle');
    
    if (terminal) {
        terminal.classList.remove('hidden');
        isTerminalActive = true;
        if (toggle) toggle.classList.add('active');
        resetTerminalTimeout();
    }
}

function hideTerminal() {
    const terminal = document.querySelector('.terminal-panel');
    const toggle = document.getElementById('terminalToggle');
    
    if (terminal && window.innerWidth <= 1024) {
        terminal.classList.add('hidden');
        isTerminalActive = false;
        if (toggle) toggle.classList.remove('active');
        clearTimeout(terminalActivityTimeout);
    }
}

function toggleTerminal() {
    const terminal = document.querySelector('.terminal-panel');
    
    if (terminal.classList.contains('hidden')) {
        showTerminal();
    } else {
        hideTerminal();
    }
}

// Update the existing runApp function to show terminal
function runApp() {
    // Show terminal on mobile
    if (window.innerWidth <= 1024) {
        showTerminal();
    }
    
    // Show loading indicator
    const loader = document.getElementById('loadingIndicator');
    loader.classList.add('active');
    
    showToast('Starting build process...', 'success');
    showProgress();
    
    const terminal = document.getElementById('buildContent');
    terminal.innerHTML = '';
    
    // Switch to Build tab
    document.querySelectorAll('.terminal-tab').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.terminal-tab')[1].classList.add('active');
    document.querySelectorAll('.terminal-content').forEach(c => c.classList.remove('active'));
    terminal.classList.add('active');
    
    const messages = [
        'Gradle build started...',
        '> Task :app:preBuild UP-TO-DATE',
        '> Task :app:compileDebugKotlin',
        '✓ Compiled 42 Kotlin files in 2.3s',
        '> Task :app:processDebugResources',
        '> Task :app:dexBuilderDebug',
        '✓ Dex processing complete',
        '> Task :app:packageDebug',
        '✓ APK built successfully',
        '> Task :app:installDebug',
        '✓ Installing APK on Emulator',
        '> Task :app:runDebug',
        '✓ App launched successfully',
        '',
        'BUILD SUCCESSFUL in 2.8s',
        '12 actionable tasks: 12 executed'
    ];
    
    messages.forEach((msg, index) => {
        setTimeout(() => {
            const line = document.createElement('div');
            line.className = msg.includes('✓') || msg.includes('SUCCESS') ? 'terminal-line terminal-success' : 'terminal-line';
            line.textContent = msg;
            terminal.appendChild(line);
            terminal.scrollTop = terminal.scrollHeight;
            
            // Reset terminal timeout on activity
            resetTerminalTimeout();
            
            if (index === messages.length - 1) {
                setTimeout(() => {
                    loader.classList.remove('active');
                    goToPage('about');
                    document.getElementById('deviceScreen').scrollTop = 0;
                    showToast('App launched successfully!', 'success');
                    
                    document.querySelectorAll('.nav-item').forEach(item => item.classList.remove('active'));
                    document.querySelector('.nav-item').classList.add('active');
                }, 500);
            }
        }, index * 200);
    });
}

// Update executeCommandByIndex to close palette on mobile
function executeCommandByIndex(index) {
    const query = document.getElementById('paletteInput').value.toLowerCase();
    const filtered = paletteCommands.filter(cmd => 
        cmd.name.toLowerCase().includes(query) || 
        cmd.desc.toLowerCase().includes(query)
    );
    if (filtered[index]) {
        filtered[index].action();
        
        // Close palette on mobile after executing command
        if (window.innerWidth <= 1024) {
            closeCommandPalette();
        }
    }
}

// Track terminal activity
document.addEventListener('DOMContentLoaded', () => {
    const terminalInput = document.getElementById('terminalInput');
    const terminalPanel = document.querySelector('.terminal-panel');
    
    if (terminalInput) {
        terminalInput.addEventListener('keypress', resetTerminalTimeout);
        terminalInput.addEventListener('focus', resetTerminalTimeout);
    }
    
    if (terminalPanel) {
        terminalPanel.addEventListener('click', resetTerminalTimeout);
        terminalPanel.addEventListener('touchstart', resetTerminalTimeout);
    }
    
    // Hide terminal on mobile by default
    if (window.innerWidth <= 1024) {
        setTimeout(() => {
            hideTerminal();
        }, 100);
    }
});

// Handle window resize - todo: decide to keep same behaviour for desktop too
window.addEventListener('resize', () => {
    if (window.innerWidth > 1024) {
        // Desktop: always show terminal
        const terminal = document.querySelector('.terminal-panel');
        if (terminal) {
            terminal.classList.remove('hidden');
        }
        clearTimeout(terminalActivityTimeout);
    }
});