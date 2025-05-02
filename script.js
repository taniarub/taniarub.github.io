document.addEventListener('DOMContentLoaded', function() {
    // Modal functionality
    const calculateBtn = document.getElementById('calculate-btn');
    const calculatorModal = document.getElementById('calculator-modal');
    const closeModal = document.querySelector('.close-modal');
    
    if (calculateBtn && calculatorModal && closeModal) {
        calculateBtn.addEventListener('click', function() {
            calculatorModal.style.display = 'block';
        });
        
        closeModal.addEventListener('click', function() {
            calculatorModal.style.display = 'none';
            resetCalculator();
        });
        
        window.addEventListener('click', function(event) {
            if (event.target === calculatorModal) {
                calculatorModal.style.display = 'none';
                resetCalculator();
            }
        });
    }
    
    // Original Calculator functionality (basic)
    const calculatorForm = document.getElementById('calculator-form');
    const calculationResult = document.getElementById('calculation-result');
    const resultPrice = document.getElementById('result-price');
    
    if (calculatorForm) {
        calculatorForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const windowType = document.getElementById('window-type').value;
            const width = parseInt(document.getElementById('window-width').value);
            const height = parseInt(document.getElementById('window-height').value);
            
            // Calculate area in square meters
            const area = (width * height) / 10000;
            
            // Base prices per square meter
            const basePrices = {
                'plastic': 200,
                'aluminum': 300,
                'double': 150
            };
            
            // Calculate price
            let price = basePrices[windowType] * area;
            
            // Add additional costs based on size
            if (area > 2) {
                price += 50; // Additional cost for large windows
            }
            
            // Round to nearest 10
            price = Math.ceil(price / 10) * 10;
            
            // Display result
            resultPrice.textContent = `${price} BYN`;
            calculationResult.classList.remove('hidden');
        });
    }
    
    function resetCalculator() {
        if (calculatorForm) {
            calculatorForm.reset();
            if (calculationResult) {
                calculationResult.classList.add('hidden');
            }
        }
    }
    
    // Contact form functionality
    const requestForm = document.getElementById('request-form');
    
    if (requestForm) {
        requestForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('name').value;
            const phone = document.getElementById('phone').value;
            
            alert(`Спасибо, ${name}! Ваша заявка принята. Мы свяжемся с вами в ближайшее время.`);
            requestForm.reset();
        });
    }
    
    // Multi-step calculator functionality
    const detailedCalculatorForm = document.getElementById('detailed-calculator-form');
    
    if (detailedCalculatorForm) {
        // Step navigation functionality
        const prevButtons = document.querySelectorAll('.btn-prev');
        const nextButtons = document.querySelectorAll('.btn-next');
        const steps = document.querySelectorAll('.calculator-step');
        const currentStepDisplay = document.querySelector('.current-step');
        const totalStepsDisplay = document.querySelector('.total-steps');
        const stepDescription = document.querySelector('.step-description');
        
        // Set total steps
        if (totalStepsDisplay) {
            totalStepsDisplay.textContent = steps.length;
        }
        
        // Step descriptions
        const stepDescriptions = [
            'Выберите тип окна, чтобы продолжить расчет',
            'Выберите тип оконной створки для вашего окна',
            'Укажите точные размеры окна',
            'Выберите дополнительные опции для вашего заказа',
            'Оставьте контактные данные для получения точной стоимости'
        ];
        
        // Handle window type selection for opening type options
        const windowTypeRadios = document.querySelectorAll('input[name="window-type"]');
        const singleWindowOptions = document.getElementById('single-window-options');
        const doubleWindowOptions = document.getElementById('double-window-options');
        const tripleWindowOptions = document.getElementById('triple-window-options');
        const balconyBlockOptions = document.getElementById('balcony-block-options');
        const balconyDoorDoubleOptions = document.getElementById('balcony-door-double-options');
        
        // Add event listeners to window type radios
        windowTypeRadios.forEach(radio => {
            radio.addEventListener('change', function() {
                // Store the selected window type
                localStorage.setItem('selectedWindowType', this.value);
            });
        });
        
        // Handle next button clicks
        nextButtons.forEach(button => {
            button.addEventListener('click', function() {
                const currentStep = parseInt(this.getAttribute('data-next')) - 1;
                const nextStep = parseInt(this.getAttribute('data-next'));
                
                // Validate current step
                if (validateStep(currentStep)) {
                    // Special handling for step 1 to step 2 (opening type options)
                    if (currentStep === 1 && nextStep === 2) {
                        // Get the selected window type
                        const selectedWindowType = localStorage.getItem('selectedWindowType');
                        
                        // If 'other' is selected, skip to step 3
                        if (selectedWindowType === 'other') {
                            // Hide current step
                            steps[currentStep - 1].classList.remove('active');
                            // Show step 3
                            steps[2].classList.add('active');
                            // Update step indicator
                            if (currentStepDisplay) {
                                currentStepDisplay.textContent = 3;
                            }
                            // Update step description
                            if (stepDescription && stepDescriptions[2]) {
                                stepDescription.textContent = stepDescriptions[2];
                            }
                            return;
                        }
                        
                        // Hide all opening type sections first
                        singleWindowOptions.style.display = 'none';
                        doubleWindowOptions.style.display = 'none';
                        tripleWindowOptions.style.display = 'none';
                        balconyBlockOptions.style.display = 'none';
                        balconyDoorDoubleOptions.style.display = 'none';
                        
                        // Show the appropriate section based on the window type
                        if (selectedWindowType === 'single') {
                            singleWindowOptions.style.display = 'block';
                        } else if (selectedWindowType === 'double') {
                            doubleWindowOptions.style.display = 'block';
                        } else if (selectedWindowType === 'triple') {
                            tripleWindowOptions.style.display = 'block';
                        } else if (selectedWindowType === 'balcony-door-double') {
                            if (balconyDoorDoubleOptions) {
                                balconyDoorDoubleOptions.style.display = 'block';
                            }
                        } else if (selectedWindowType === 'balcony-door-triple') {
                            balconyBlockOptions.style.display = 'block';
                        }
                    }
                    
                    // Hide current step
                    steps[currentStep - 1].classList.remove('active');
                    
                    // Show next step
                    steps[nextStep - 1].classList.add('active');
                    
                    // Update step indicator
                    if (currentStepDisplay) {
                        currentStepDisplay.textContent = nextStep;
                    }
                    
                    // Update step description
                    if (stepDescription && stepDescriptions[nextStep - 1]) {
                        stepDescription.textContent = stepDescriptions[nextStep - 1];
                    }
                }
            });
        });
        
        // Handle previous button clicks
        prevButtons.forEach(button => {
            button.addEventListener('click', function() {
                if (this.hasAttribute('data-prev')) {
                    const currentStepIndex = parseInt(this.closest('.calculator-step').id.replace('step-', '')) - 1;
                    const prevStepIndex = parseInt(this.getAttribute('data-prev')) - 1;
                    
                    // Hide current step
                    steps[currentStepIndex].classList.remove('active');
                    
                    // Show previous step
                    steps[prevStepIndex].classList.add('active');
                    
                    // Update step indicator
                    if (currentStepDisplay) {
                        currentStepDisplay.textContent = prevStepIndex + 1;
                    }
                    
                    // Update step description
                    if (stepDescription && stepDescriptions[prevStepIndex]) {
                        stepDescription.textContent = stepDescriptions[prevStepIndex];
                    }
                }
            });
        });
        
        // Handle form submission
        detailedCalculatorForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('client-name').value;
            const phone = document.getElementById('client-phone').value;
            
            // Get selected window type
            const windowTypeRadios = document.querySelectorAll('input[name="window-type"]');
            let selectedWindowType = '';
            
            windowTypeRadios.forEach(radio => {
                if (radio.checked) {
                    selectedWindowType = radio.value;
                }
            });
            
            // Get dimensions
            const width = document.getElementById('detailed-width').value;
            const height = document.getElementById('detailed-height').value;
            
            // Get selected opening types
            let openingTypesInfo = '';
            
            if (selectedWindowType === 'single') {
                const singleOpeningType = document.querySelector('input[name="single-opening-type"]:checked');
                if (singleOpeningType) {
                    openingTypesInfo = `Тип створки: ${translateOpeningType(singleOpeningType.value)}`;
                }
            } else if (selectedWindowType === 'double' || selectedWindowType === 'balcony-door-double') {
                const opening1 = document.querySelector('input[name="double-opening-type-1"]:checked');
                const opening2 = document.querySelector('input[name="double-opening-type-2"]:checked');
                
                if (opening1 && opening2) {
                    openingTypesInfo = `Окно 1: ${translateOpeningType(opening1.value)}, Окно 2: ${translateOpeningType(opening2.value)}`;
                }
            } else if (selectedWindowType === 'triple') {
                const opening1 = document.querySelector('input[name="triple-opening-type-1"]:checked');
                const opening2 = document.querySelector('input[name="triple-opening-type-2"]:checked');
                const opening3 = document.querySelector('input[name="triple-opening-type-3"]:checked');
                
                if (opening1 && opening2 && opening3) {
                    openingTypesInfo = `Окно 1: ${translateOpeningType(opening1.value)}, Окно 2: ${translateOpeningType(opening2.value)}, Окно 3: ${translateOpeningType(opening3.value)}`;
                }
            } else if (selectedWindowType === 'balcony-door-triple') {
                const balconyBlockOpening = document.querySelector('input[name="balcony-block-opening-type"]:checked');
                
                if (balconyBlockOpening) {
                    openingTypesInfo = `Окно 1: ${translateOpeningType(balconyBlockOpening.value)}`;
                }
            }
            
            // Get selected options
            const options = [];
            const checkboxes = document.querySelectorAll('input[name="additional_options[]"]:checked');
            
            checkboxes.forEach(checkbox => {
                options.push(checkbox.value);
            });
            
            alert(`Спасибо, ${name}! 
Ваша заявка на расчет стоимости ${translateWindowType(selectedWindowType)} (${width}x${height} мм) принята.
${openingTypesInfo}
Мы свяжемся с вами в ближайшее время по телефону ${phone}.`);
            
            // Reset form and return to step 1
            detailedCalculatorForm.reset();
            steps.forEach(step => step.classList.remove('active'));
            steps[0].classList.add('active');
            if (currentStepDisplay) {
                currentStepDisplay.textContent = "1";
            }
            if (stepDescription) {
                stepDescription.textContent = stepDescriptions[0];
            }
        });
        
        // Validate steps
        function validateStep(stepNumber) {
            switch(stepNumber) {
                case 1:
                    // Validate window type selection
                    const windowTypeSelected = document.querySelector('input[name="window-type"]:checked');
                    if (!windowTypeSelected) {
                        alert('Пожалуйста, выберите тип окна');
                        return false;
                    }
                    return true;
                
                case 2:
                    // Validate opening type selection
                    const selectedWindowType = localStorage.getItem('selectedWindowType');
                    
                    if (selectedWindowType === 'single') {
                        const singleOpeningType = document.querySelector('input[name="single-opening-type"]:checked');
                        if (!singleOpeningType) {
                            alert('Пожалуйста, выберите тип створки');
                            return false;
                        }
                    } else if (selectedWindowType === 'double' || selectedWindowType === 'balcony-door-double') {
                        const opening1 = document.querySelector('input[name="double-opening-type-1"]:checked');
                        const opening2 = document.querySelector('input[name="double-opening-type-2"]:checked');
                        
                        if (!opening1 || !opening2) {
                            alert('Пожалуйста, выберите тип створки для обоих окон');
                            return false;
                        }
                    } else if (selectedWindowType === 'triple') {
                        const opening1 = document.querySelector('input[name="triple-opening-type-1"]:checked');
                        const opening2 = document.querySelector('input[name="triple-opening-type-2"]:checked');
                        const opening3 = document.querySelector('input[name="triple-opening-type-3"]:checked');
                        
                        if (!opening1 || !opening2 || !opening3) {
                            alert('Пожалуйста, выберите тип створки для всех трех окон');
                            return false;
                        }
                    } else if (selectedWindowType === 'balcony-door-triple') {
                        const balconyBlockOpening = document.querySelector('input[name="balcony-block-opening-type"]:checked');
                        
                        if (!balconyBlockOpening) {
                            alert('Пожалуйста, выберите тип створки для окна');
                            return false;
                        }
                    }
                    return true;
                
                case 3:
                    // Validate dimensions
                    const width = document.getElementById('detailed-width').value;
                    const height = document.getElementById('detailed-height').value;
                    
                    if (!width || !height) {
                        alert('Пожалуйста, укажите размеры окна');
                        return false;
                    }
                    
                    if (isNaN(width) || isNaN(height)) {
                        alert('Размеры должны быть числами');
                        return false;
                    }
                    
                    return true;
                
                default:
                    return true;
            }
        }
        
        function translateWindowType(type) {
            const translations = {
                'single': 'Одностворчатое окно',
                'double': 'Двухстворчатое окно',
                'triple': 'Трехстворчатое окно',
                'balcony-door-double': 'Балконная дверь с двухстворчатым окном',
                'balcony-door-triple': 'Балконный блок'
            };
            
            return translations[type] || type;
        }
        
        function translateOpeningType(type) {
            const translations = {
                'fixed': 'Глухая',
                'turn': 'Поворотная',
                'tilt-turn': 'Поворотно-откидная'
            };
            
            return translations[type] || type;
        }
    }
    
    // Scroll to top button functionality
    const scrollToTopBtn = document.getElementById('scroll-to-top');
    
    if (scrollToTopBtn) {
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 300) {
                scrollToTopBtn.classList.add('visible');
            } else {
                scrollToTopBtn.classList.remove('visible');
            }
        });
        
        scrollToTopBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Advantages section scroll functionality
    const scrollContainer = document.querySelector('.advantages-scroll');
    const leftArrow = document.querySelector('.scroll-left');
    const rightArrow = document.querySelector('.scroll-right');
    
    if (scrollContainer && leftArrow && rightArrow) {
        // Scroll amount for each click (adjust as needed)
        const scrollAmount = 300;
        
        leftArrow.addEventListener('click', () => {
            scrollContainer.scrollBy({
                left: -scrollAmount,
                behavior: 'smooth'
            });
            pauseAutoScroll();
        });
        
        rightArrow.addEventListener('click', () => {
            scrollContainer.scrollBy({
                left: scrollAmount,
                behavior: 'smooth'
            });
            pauseAutoScroll();
        });
        
        // Update arrow visibility based on scroll position
        const updateArrowVisibility = () => {
            leftArrow.style.opacity = scrollContainer.scrollLeft <= 0 ? '0.5' : '1';
            rightArrow.style.opacity = 
                scrollContainer.scrollLeft >= (scrollContainer.scrollWidth - scrollContainer.clientWidth - 1) ? '0.5' : '1';
        };
        
        scrollContainer.addEventListener('scroll', () => {
            updateArrowVisibility();
            pauseAutoScroll();
        });
        window.addEventListener('resize', updateArrowVisibility);
        
        // Initial check
        updateArrowVisibility();

        // --- Carousel auto-scroll logic ---
        let autoScrollInterval = null;
        let autoScrollPaused = false;
        let autoScrollTimeout = null;

        function startAutoScroll() {
            if (autoScrollInterval) return;
            autoScrollInterval = setInterval(() => {
                if (autoScrollPaused) return;
                // If at the end, scroll back to start
                if (scrollContainer.scrollLeft >= scrollContainer.scrollWidth - scrollContainer.clientWidth - 1) {
                    scrollContainer.scrollTo({ left: 0, behavior: 'smooth' });
                } else {
                    scrollContainer.scrollBy({ left: scrollAmount, behavior: 'smooth' });
                }
            }, 3000);
        }

        function pauseAutoScroll() {
            autoScrollPaused = true;
            clearInterval(autoScrollInterval);
            autoScrollInterval = null;
            clearTimeout(autoScrollTimeout);
            autoScrollTimeout = setTimeout(() => {
                autoScrollPaused = false;
                startAutoScroll();
            }, 6000); // Resume after 6 seconds of inactivity
        }

        scrollContainer.addEventListener('mouseenter', pauseAutoScroll);
        scrollContainer.addEventListener('mouseleave', () => {
            autoScrollPaused = false;
            startAutoScroll();
        });

        // Start auto-scroll
        startAutoScroll();
    }

    // About Us Carousel functionality
    const carousel = document.querySelector('.about-us-carousel');
    if (carousel) {
        const track = carousel.querySelector('.carousel-track');
        let images = Array.from(track.querySelectorAll('img'));
        const leftArrow = carousel.querySelector('.carousel-arrow.left');
        const rightArrow = carousel.querySelector('.carousel-arrow.right');
        let currentIndex = 0;
        let isDragging = false;
        let isTransitioning = false;

        // Clone first and last images for infinite effect
        const firstClone = images[0].cloneNode(true);
        const lastClone = images[images.length - 1].cloneNode(true);
        track.appendChild(firstClone);
        track.insertBefore(lastClone, images[0]);
        images = Array.from(track.querySelectorAll('img'));
        currentIndex = 1; // Start at the real first image

        function getVisibleCount() {
            if (window.innerWidth <= 700) return 1;
            if (window.innerWidth <= 900) return 2;
            return 3;
        }

        function getImgWidth() {
            return images[0].clientWidth + parseInt(getComputedStyle(images[0]).marginLeft) + parseInt(getComputedStyle(images[0]).marginRight);
        }

        function updateCarousel(animate = true) {
            if (isTransitioning) return;
            const imgWidth = getImgWidth();
            track.style.transition = animate ? 'transform 0.6s cubic-bezier(0.45, 0, 0.35, 1)' : 'none';
            track.style.transform = `translateX(-${currentIndex * imgWidth}px)`;
        }

        function handleTransitionEnd() {
            if (!isTransitioning) return;
            isTransitioning = false;
            
            const lastIndex = images.length - getVisibleCount();
            if (currentIndex === 0) {
                // Jumped to the end
                currentIndex = lastIndex - 1;
                track.style.transition = 'none';
                track.style.transform = `translateX(-${currentIndex * getImgWidth()}px)`;
                // Force reflow to apply the transform instantly
                void track.offsetWidth;
                // Restore transition for next move
                track.style.transition = 'transform 0.6s cubic-bezier(0.45, 0, 0.35, 1)';
            } else if (currentIndex >= lastIndex) {
                // Jumped to the start
                currentIndex = 1;
                track.style.transition = 'none';
                track.style.transform = `translateX(-${currentIndex * getImgWidth()}px)`;
                void track.offsetWidth;
                track.style.transition = 'transform 0.6s cubic-bezier(0.45, 0, 0.35, 1)';
            }
        }

        function slideNext() {
            if (isTransitioning) return;
            isTransitioning = true;
            currentIndex++;
            updateCarousel(true);
        }

        function slidePrev() {
            if (isTransitioning) return;
            isTransitioning = true;
            currentIndex--;
            updateCarousel(true);
        }

        leftArrow.addEventListener('click', slidePrev);
        rightArrow.addEventListener('click', slideNext);

        track.addEventListener('transitionend', handleTransitionEnd);
        window.addEventListener('resize', () => {
            updateCarousel(false);
        });

        // Initial position
        updateCarousel(false);
    }
}); 