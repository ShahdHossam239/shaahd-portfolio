```javascript
const menuToggle = document.getElementById("menuToggle");

const navMenu =
    document.getElementById("mainNav") ||
    document.getElementById("navMenu");

if (menuToggle && navMenu) {
    menuToggle.addEventListener("click", () => {
        const isOpen = navMenu.classList.toggle("open");

        menuToggle.setAttribute("aria-expanded", String(isOpen));

        // صفحة تفاصيل المشروع تستخدم زرًا نصيًا،
        // أما الصفحة الرئيسية فتستخدم ثلاثة خطوط.
        if (navMenu.id === "navMenu") {
            menuToggle.textContent = isOpen ? "✕" : "☰";
        }
    });

    navMenu.querySelectorAll(".nav-link").forEach((link) => {
        link.addEventListener("click", () => {
            navMenu.classList.remove("open");
            menuToggle.setAttribute("aria-expanded", "false");

            if (navMenu.id === "navMenu") {
                menuToggle.textContent = "☰";
            }
        });
    });
}

const sections = document.querySelectorAll("main section[id]");
const navLinks = document.querySelectorAll(".nav-link");

function updateActiveLink() {
    let currentSection = "home";

    sections.forEach((section) => {
        if (window.scrollY >= section.offsetTop - 150) {
            currentSection = section.id;
        }
    });

    navLinks.forEach((link) => {
        const href = link.getAttribute("href");

        link.classList.toggle(
            "active",
            href === `#${currentSection}` ||
            href === `index.html#${currentSection}`
        );
    });
}

window.addEventListener("scroll", updateActiveLink);
updateActiveLink();

const yearElement = document.getElementById("currentYear");

if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
}
```