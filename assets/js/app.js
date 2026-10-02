const mobileMenu = document.getElementById("mobileMenu");

if (mobileMenu) {
    mobileMenu.addEventListener("click", () => {
        document.body.classList.toggle("menu-open");
    });
}


document.addEventListener("click", (event) => {
    if (
        event.target.closest(".main-nav a") ||
        event.target.closest(".nav-actions a")
    ) {
        document.body.classList.remove("menu-open");
    }
});


document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (event) => {
        const target = document.querySelector(
            link.getAttribute("href")
        );

        if (!target) return;

        event.preventDefault();

        target.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });
    });
});


const header = document.querySelector(".site-header");

if (header) {
    let lastScroll = 0;

    window.addEventListener(
        "scroll",
        () => {
            const currentScroll = window.scrollY;

            if (currentScroll > 20) {
                header.classList.add("scrolled");
            } else {
                header.classList.remove("scrolled");
            }

            lastScroll = currentScroll;
        },
        { passive: true }
    );
}


document.querySelectorAll("[data-copy]").forEach((button) => {
    button.addEventListener("click", async () => {
        const value = button.dataset.copy;

        if (!value) return;

        try {
            await navigator.clipboard.writeText(value);

            const original = button.textContent;

            button.textContent = "Copied";

            setTimeout(() => {
                button.textContent = original;
            }, 1400);
        } catch {
            button.textContent = "Copy failed";

            setTimeout(() => {
                button.textContent = "Copy";
            }, 1400);
        }
    });
});
