const menuButton = document.querySelector(".mobile");
const navLinks = document.querySelector(".links");

if (menuButton && navLinks) {
    menuButton.addEventListener("click", () => {
        const isOpen = navLinks.classList.toggle("open");

        menuButton.setAttribute(
            "aria-label",
            isOpen ? "Close navigation menu" : "Open navigation menu"
        );
    });

    // Close menu when a navigation link is clicked
    navLinks.querySelectorAll("a").forEach(link => {
        link.addEventListener("click", () => {
            navLinks.classList.remove("open");
            menuButton.setAttribute("aria-label", "Open navigation menu");
        });
    });
}

function order(name) {
    const msg = encodeURIComponent(
        `Hello Liivhuu's Baking Adventure! I'd like to order: ${name}`
    );

    location.href = "https://wa.me/27000000000?text=" + msg;
}