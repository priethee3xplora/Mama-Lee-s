// ============================================
// MOBILE NAVIGATION
// ============================================

const menuButton = document.querySelector(".mobile");
const navLinks = document.querySelector(".links");

if (menuButton && navLinks) {

    menuButton.addEventListener("click", () => {

        const isOpen =
            navLinks.classList.toggle("open");

        menuButton.setAttribute(
            "aria-label",
            isOpen
                ? "Close navigation menu"
                : "Open navigation menu"
        );

    });


    navLinks.querySelectorAll("a").forEach((link) => {

        link.addEventListener("click", () => {

            navLinks.classList.remove("open");

            menuButton.setAttribute(
                "aria-label",
                "Open navigation menu"
            );

        });

    });

}



// ============================================
// REGULAR MENU PRODUCTS
// ============================================
//
// Add new products here.
// You only need:
// name
// price
// images
//
// The first image becomes the main card image.
// All images become available inside the gallery.
// ============================================

const menuItems = [

    {
        name: "....",
        price: "....",
        images: [
            "assets/6.png"
        ]
    },

    {
        name: "....",
        price: "...",
        images: [
            "assets/10.png"
        ]
    },


    {
        name: "...",
        price: "...",
        images: [
            "assets/13.png"
        ]
    },

    {
        name: "...",
        price: "...",
        images: [
            "assets/14.png"
        ]
    },

    {
        name: "....",
        price:"from..",

        images: [
            "assets/18.png"
        ]
    },

    {
        name: "....",
        price:"from..",

        images: [
            "assets/19.png"
        ]
    },


];



// ============================================
// BIRTHDAY CAKES
// ============================================
//
// Birthday cakes use the SAME gallery system.
// ============================================

const birthdayCakes = [

    {
        name: "...",
        price: "...",

        description:
            ".......",

        images: [
            "assets/4.png"
        ]
    },


    {
        name: "....",
        price: "....",

        description:
            "....",

        images: [
            "assets/5.png"
        ]
    },


    {
        name: "...",
        price: "...",

        description:
            "...",

        images: [
            "assets/7.png"
        ]
    },


    {
        name: "...",
        price: "...",

        description:
            "...",

        images: [
            "assets/8.png"
        ]
    },

    {
        name: "....",
        price:"from..",

        description:
            "....",

        images: [
            "assets/9.png"
        ]
    
    },

    {
        name: "....",
        price:"from..", 

        description:
            "....",

        images: [
            "assets/11.png"
        ]
    },

    {
        name: "....",
        price:"from..",

        description:
            "....",

        images: [
            "assets/12.png"
        ]

    },

    {
        name: "....",
        price:"from..",

        description:
            "....",

        images: [
            "assets/15.png"
        ]
    },

    {
        name: "....",
        price:"from..",

        description:
            "....",

        images: [
            "assets/16.png"
        ]
    },

    {
        name: "....",
        price:"from..",

        description:
            "....",

        images: [
            "assets/17.png"
        ]
    },



];



// ============================================
// GENERATE REGULAR MENU
// ============================================

const menuGrid =
    document.querySelector("#menu-grid");

if (menuGrid) {

    menuItems.forEach((item) => {

        const card =
            document.createElement("article");

        card.className = "card";


        const galleryData =
            item.images.join(",");


        card.innerHTML = `

            <div class="product-image">

                <img
                    src="${item.images[0]}"
                    alt="${item.name}"
                    loading="lazy"
                >


                <button
                    class="view-gallery"
                    type="button"
                    data-images="${galleryData}"
                    aria-label="View photos of ${item.name}"
                >
                    View photos
                </button>

            </div>


            <div class="card-body">

                <h3>
                    ${item.name}
                </h3>


                <div class="price">
                    ${item.price}
                </div>


                <button
                    class="order"
                    type="button"
                    data-order="${item.name}"
                >
                    Order via WhatsApp →
                </button>

            </div>

        `;


        menuGrid.appendChild(card);

    });

}



// ============================================
// GENERATE BIRTHDAY CAKES
// ============================================

const birthdayGallery =
    document.querySelector("#birthday-gallery");

if (birthdayGallery) {

    birthdayCakes.forEach((cake) => {

        const card =
            document.createElement("article");

        card.className =
            "birthday-card";


        const galleryData =
            cake.images.join(",");


        card.innerHTML = `

            <div class="birthday-image">

                <img
                    src="${cake.images[0]}"
                    alt="${cake.name}"
                    loading="lazy"
                >


                <button
                    class="view-gallery"
                    type="button"
                    data-images="${galleryData}"
                    aria-label="View photos of ${cake.name}"
                >
                    View photos
                </button>

            </div>


            <div class="birthday-info">

                <h3>
                    ${cake.name}
                </h3>


                <p>
                    ${cake.description}
                </p>


                <div class="birthday-bottom">

                    <span class="price">
                        ${cake.price}
                    </span>


                    <button
                        class="order"
                        type="button"
                        data-order="${cake.name}"
                    >
                        Order Cake →
                    </button>

                </div>

            </div>

        `;


        birthdayGallery.appendChild(card);

    });

}



// ============================================
// WHATSAPP ORDERING
// ============================================

function order(name) {

    const message = encodeURIComponent(
        `Hello Liivhuu's Baking Adventure! I'd like to order: ${name}`
    );


    window.location.href =
        "https://wa.me/27816503881?text=" +
        message;

}



// ============================================
// ORDER BUTTONS
// ============================================
//
// Event delegation means this works for
// products generated by JavaScript too.
// ============================================

document.addEventListener("click", (event) => {

    const button =
        event.target.closest(".order");


    if (!button) {
        return;
    }


    const productName =
        button.dataset.order;


    if (productName) {
        order(productName);
    }

});



// ============================================
// IMAGE GALLERY
// ============================================

const galleryModal =
    document.querySelector(".gallery-modal");

const galleryImage =
    document.querySelector(".gallery-main-image");

const galleryCounter =
    document.querySelector(".gallery-counter");

const galleryPrevious =
    document.querySelector(".gallery-prev");

const galleryNext =
    document.querySelector(".gallery-next");

const galleryClose =
    document.querySelector(".gallery-close");


let currentImages = [];

let currentImageIndex = 0;



// ============================================
// OPEN GALLERY
// ============================================

document.addEventListener("click", (event) => {

    const button =
        event.target.closest(".view-gallery");


    if (!button || !galleryModal) {
        return;
    }


    const images =
        button.dataset.images;


    if (!images) {
        return;
    }


    currentImages =
        images
            .split(",")
            .map((image) => image.trim())
            .filter(Boolean);


    currentImageIndex = 0;


    updateGallery();


    galleryModal.classList.add("active");


    galleryModal.setAttribute(
        "aria-hidden",
        "false"
    );


    document.body.style.overflow =
        "hidden";

});



// ============================================
// UPDATE GALLERY
// ============================================

function updateGallery() {

    if (
        !galleryImage ||
        !currentImages.length
    ) {
        return;
    }


    galleryImage.src =
        currentImages[currentImageIndex];


    galleryImage.alt =
        `Product photo ${currentImageIndex + 1}`;


    if (galleryCounter) {

        galleryCounter.textContent =
            `${currentImageIndex + 1} / ${currentImages.length}`;

    }

}



// ============================================
// PREVIOUS IMAGE
// ============================================

if (galleryPrevious) {

    galleryPrevious.addEventListener(
        "click",
        () => {

            if (!currentImages.length) {
                return;
            }


            currentImageIndex =
                (
                    currentImageIndex -
                    1 +
                    currentImages.length
                ) %
                currentImages.length;


            updateGallery();

        }
    );

}



// ============================================
// NEXT IMAGE
// ============================================

if (galleryNext) {

    galleryNext.addEventListener(
        "click",
        () => {

            if (!currentImages.length) {
                return;
            }


            currentImageIndex =
                (
                    currentImageIndex +
                    1
                ) %
                currentImages.length;


            updateGallery();

        }
    );

}



// ============================================
// CLOSE GALLERY
// ============================================

function closeGallery() {

    if (!galleryModal) {
        return;
    }


    galleryModal.classList.remove(
        "active"
    );


    galleryModal.setAttribute(
        "aria-hidden",
        "true"
    );


    document.body.style.overflow =
        "";

}



if (galleryClose) {

    galleryClose.addEventListener(
        "click",
        closeGallery
    );

}



// ============================================
// CLOSE WHEN CLICKING BACKDROP
// ============================================

if (galleryModal) {

    galleryModal.addEventListener(
        "click",
        (event) => {

            if (
                event.target ===
                galleryModal
            ) {
                closeGallery();
            }

        }
    );

}



// ============================================
// KEYBOARD CONTROLS
// ============================================

document.addEventListener(
    "keydown",
    (event) => {

        if (
            !galleryModal ||
            !galleryModal.classList.contains(
                "active"
            )
        ) {
            return;
        }


        if (event.key === "Escape") {

            closeGallery();

        }


        if (
            event.key === "ArrowLeft"
        ) {

            galleryPrevious?.click();

        }


        if (
            event.key === "ArrowRight"
        ) {

            galleryNext?.click();

        }

    }
);
// ============================================
// HOMEPAGE FEATURED PRODUCTS
// ============================================
//
// These are the products shown on index.html.
// Change these whenever you want to change
// the homepage favourites.
//
// ============================================

const featuredItems = [

    {
        name: "...",
        price: "...",
        images: [
            "assets/8.png"
        ]
    },


    {
        name: "...",
        price: "...",
        images: [
            "assets/16.png"
        ]
    }

];



// ============================================
// GENERATE HOMEPAGE FEATURED PRODUCTS
// ============================================

const featuredGrid =
    document.querySelector("#featured-grid");


if (featuredGrid) {

    featuredItems.forEach((item) => {

        const card =
            document.createElement("article");

        card.className = "card";


        const galleryData =
            item.images.join(",");


        card.innerHTML = `

            <div class="product-image">

                <img
                    src="${item.images[0]}"
                    alt="${item.name}"
                    loading="lazy"
                >


                <button
                    class="view-gallery"
                    type="button"
                    data-images="${galleryData}"
                    aria-label="View photos of ${item.name}"
                >
                    View photos
                </button>

            </div>


            <div class="card-body">

                <h3>
                    ${item.name}
                </h3>


                <div class="price">
                    ${item.price}
                </div>


                <button
                    class="order"
                    type="button"
                    data-order="${item.name}"
                >
                    Order via WhatsApp →
                </button>

            </div>

        `;


        featuredGrid.appendChild(card);

    });

}

