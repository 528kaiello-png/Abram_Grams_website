// This is an empty javascript file. Delete this line and insert your JS!

document.addEventListener("DOMContentLoaded", function () {

    const posterCards = document.querySelectorAll(".poster-card");

    posterCards.forEach(function (card) {

        function toggleCard() {

            const isAlreadyOpen = card.classList.contains("active");

            // Close all other cards
            posterCards.forEach(function (otherCard) {
                otherCard.classList.remove("active");
                otherCard.setAttribute("aria-expanded", "false");
            });

            // Open selected card if it was previously closed
            if (!isAlreadyOpen) {
                card.classList.add("active");
                card.setAttribute("aria-expanded", "true");
            }
        }

        // Mouse click
        card.addEventListener("click", toggleCard);

        // Keyboard support
        card.addEventListener("keydown", function (event) {

            if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                toggleCard();
            }

        });

    });

});
