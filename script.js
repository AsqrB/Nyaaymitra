document.addEventListener('DOMContentLoaded', function() {
    const progressCarousel = document.getElementById('progressCarousel')
    const carouselItems = progressCarousel.querySelectorAll('.carousel-item');
    const progressBar = document.getElementById('progress-bar');
    const carouselButtonsContainer = document.querySelector('.carousel-buttons');
    let currentIndex = 0;
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const carouselSlides = document.getElementById('carousel-slides');
    const carouselInner = document.getElementById('carousel-inner');

    // update crousel on reponsiveness
    function updateCarouselClasses() {
        if (window.innerWidth < 500) {
            // Remove 'col-1' class from buttons
            prevBtn.classList.remove('col-1');
            nextBtn.classList.remove('col-1');
            prevBtn.classList.add('abs');
            nextBtn.classList.add('abs');
            prevBtn.classList.add('carousel-control-prev');
            nextBtn.classList.add('carousel-control-next');
            prevBtn.classList.remove('carousel-control');
            nextBtn.classList.remove('carousel-control');

            // Change 'col-10' class to 'col-12' for carousel-inner
            carouselInner.classList.remove('col-10');
            carouselInner.classList.add('col-12');

        } else {
            // Optionally, you can revert the classes if the screen size is greater than or equal to 360
            prevBtn.classList.add('col-1');
            nextBtn.classList.add('col-1');
            prevBtn.classList.remove('abs');
            nextBtn.classList.remove('abs');
            prevBtn.classList.remove('carousel-control-prev');
            nextBtn.classList.remove('carousel-control-next');
            prevBtn.classList.add('carousel-control');
            nextBtn.classList.add('carousel-control');
            carouselInner.classList.remove('col-12');
            carouselInner.classList.add('col-10');
        }
    }
    // Initial check on page load
    updateCarouselClasses();

    // Add event listener for window resize
    window.addEventListener('resize', updateCarouselClasses);

    // Create buttons for each carousel item
    carouselItems.forEach((item, index) => {
        const button = document.createElement('button');
        button.textContent = index + 1; // Button text as page number
        button.style.left = `${(index / (carouselItems.length - 1)) * 100}%`; // Position buttons over the progress bar
        button.classList.add('inactive'); // Add inactive class initially
        button.addEventListener('click', () => {
            goToSlide(index);
        });
        carouselButtonsContainer.appendChild(button);
    });

    function goToSlide(index) {
        carouselItems[currentIndex].classList.remove('active');
        carouselItems[index].classList.add('active');
        currentIndex = index;
        updateProgressBar();
        updateButtonColors(); // Update button colors when slide changes
    }

    function updateProgressBar() {
        const percentage = (currentIndex / (carouselItems.length - 1)) * 100;
        progressBar.style.width = percentage + '%';
        progressBar.setAttribute('aria-valuenow', percentage);
    }

    function updateButtonColors() {
        const buttons = carouselButtonsContainer.querySelectorAll('button');
        buttons.forEach((button, index) => {
            if (index <= currentIndex) {
                button.classList.remove('inactive');
                button.classList.add('active');
            } else {
                button.classList.remove('active');
                button.classList.add('inactive');
            }
        });
    }

    document.getElementById('prevBtn').addEventListener('click', () => {
        const newIndex = (currentIndex - 1 + carouselItems.length) % carouselItems.length;
        goToSlide(newIndex);
    });

    document.getElementById('nextBtn').addEventListener('click', () => {
        const newIndex = (currentIndex + 1) % carouselItems.length;
        goToSlide(newIndex);
    });

    // Initialize the progress bar and button colors
    updateProgressBar();
    updateButtonColors();

    // Touch and drag functionality
    let startX = 0;
    let endX = 0;

    function handleTouchStart(event) {
        startX = event.touches[0].clientX;
    }

    function handleTouchMove(event) {
        endX = event.touches[0].clientX;
    }

    function handleTouchEnd() {
        if (startX > endX + 50) { // Swipe left
            const newIndex = (currentIndex + 1) % carouselItems.length;
            goToSlide(newIndex);
        } else if (startX + 50 < endX) { // Swipe right
            const newIndex = (currentIndex - 1 + carouselItems.length) % carouselItems.length;
            goToSlide(newIndex);
        }
    }

    // Mouse drag functionality
    let isDragging = false;

    function handleMouseDown(event) {
        startX = event.clientX;
        isDragging = true;
    }

    function handleMouseMove(event) {
        if (isDragging) {
            endX = event.clientX;
        }
    }

    function handleMouseUp() {
        if (isDragging) {
            if (startX > endX + 50) { // Drag left
                const newIndex = (currentIndex + 1) % carouselItems.length;
                goToSlide(newIndex);
            } else if (startX + 50 < endX) { // Drag right
                const newIndex = (currentIndex - 1 + carouselItems.length) % carouselItems.length;
                goToSlide(newIndex);
            }
            isDragging = false;
        }
    }

    // Attach touch event listeners
    document.querySelector('#carousel-inner').addEventListener('touchstart', handleTouchStart);
    document.querySelector('#carousel-inner').addEventListener('touchmove', handleTouchMove);
    document.querySelector('#carousel-inner').addEventListener('touchend', handleTouchEnd);

    // Attach mouse event listeners
    document.querySelector('#carousel-inner').addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
});
