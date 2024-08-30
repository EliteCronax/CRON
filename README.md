<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>CRON</title>
    <style>
        body {
            margin: 0;
            padding: 0;
            font-family: ui-monospace, SFMono-Regular, SF Mono, Menlo, Consolas, Liberation Mono, monospace;
            background-color: black;
            color: white;
            overflow-x: hidden;
            font-size: 14px;
            line-height: 1.5;
            transition: background-color 0.5s ease;
        }
        .sliding-text {
            position: fixed;
            top: 0;
            left: -100%;
            width: 100%;
            padding: 10px 0;
            background-color: rgba(255, 255, 255, 0.1);
            white-space: nowrap;
            overflow: hidden;
        }
        .sliding-text span {
            display: inline-block;
            padding-left: 100%;
            animation: slide 20s linear infinite;
        }
        @keyframes slide {
            0% {
                transform: translate(0, 0);
            }
            100% {
                transform: translate(-100%, 0);
            }
        }
        .floating-language {
            position: fixed;
            bottom: -50px;
            opacity: 0.3;
            font-size: 12px;
            pointer-events: none;
            z-index: -1;
            transition: bottom 10s linear, opacity 10s linear;
        }
    </style>
</head>
<body>
    <div class="sliding-text">
        <span>&lt;//   CLAIM PRE-RELEASE BADGE BEFORE IT IS GONE FOREVER   //&gt;</span>
    </div>
    <div class="content">
        <h1>CRON</h1>
        <p>?</p>
    </div>
    <div id="countdown"></div>
    <div id="languages"></div>

    <script>
        function updateCountdown() {
            const now = new Date();
            const targetDate = new Date(now.getFullYear() + 1, now.getMonth(), now.getDate());
            targetDate.setDate(targetDate.getDate() + 100);

            const timeDiff = targetDate - now;

            const years = 1;
            const days = 365;
            const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);

            document.getElementById('countdown').innerHTML = `
                ${years} year${years !== 1 ? 's' : ''}, 
                ${days} day${days !== 1 ? 's' : ''}, 
                ${hours} hour${hours !== 1 ? 's' : ''}, 
                ${minutes} minute${minutes !== 1 ? 's' : ''}, 
                ${seconds} second${seconds !== 1 ? 's' : ''}
            `;
        }

        setInterval(updateCountdown, 1000);
        updateCountdown();

        const languages = [
            { name: "Python", description: "Versatile, readable, and powerful high-level programming language" },
            { name: "JavaScript", description: "Dynamic scripting language for web development and beyond" },
            { name: "Java", description: "Object-oriented language known for its 'write once, run anywhere' philosophy" },
            { name: "C++", description: "Powerful systems programming language with object-oriented features" },
            { name: "Ruby", description: "Dynamic, object-oriented language focused on simplicity and productivity" },
            { name: "Go", description: "Efficient, concurrent, and minimalist language by Google" },
            { name: "Rust", description: "Systems language focusing on safety, concurrency, and performance" },
            { name: "TypeScript", description: "Typed superset of JavaScript for large-scale applications" },
            { name: "Swift", description: "Modern language for iOS, macOS, and beyond" },
            { name: "Kotlin", description: "Concise and expressive language for Android and multiplatform development" }
        ];

        function createFloatingLanguage(language) {
            const element = document.createElement('div');
            element.className = 'floating-language';
            element.textContent = `${language.name}: ${language.description}`;
            element.style.left = `${Math.random() * 100}vw`;
            document.body.appendChild(element);

            setTimeout(() => {
                element.style.bottom = '120vh';
                element.style.opacity = '0';
            }, 100);

            setTimeout(() => {
                element.remove();
            }, 10000);
        }

        function animateLanguages() {
            setInterval(() => {
                const randomLanguage = languages[Math.floor(Math.random() * languages.length)];
                createFloatingLanguage(randomLanguage);
            }, 2000);
        }

        animateLanguages();
    </script>
</body>
</html>
