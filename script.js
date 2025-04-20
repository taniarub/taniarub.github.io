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
            'Укажите точные размеры окна',
            'Выберите дополнительные опции для вашего заказа',
            'Оставьте контактные данные для получения точной стоимости'
        ];
        
        // Handle next button clicks
        nextButtons.forEach(button => {
            button.addEventListener('click', function() {
                const currentStep = parseInt(this.getAttribute('data-next')) - 1;
                const nextStep = parseInt(this.getAttribute('data-next'));
                
                // Validate current step
                if (validateStep(currentStep)) {
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
                    const currentStep = parseInt(this.getAttribute('data-prev'));
                    const prevStep = parseInt(this.getAttribute('data-prev')) - 1;
                    
                    // Hide current step
                    steps[currentStep].classList.remove('active');
                    
                    // Show previous step
                    steps[prevStep].classList.add('active');
                    
                    // Update step indicator
                    if (currentStepDisplay) {
                        currentStepDisplay.textContent = prevStep + 1;
                    }
                    
                    // Update step description
                    if (stepDescription && stepDescriptions[prevStep]) {
                        stepDescription.textContent = stepDescriptions[prevStep];
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
            
            // Get selected options
            const options = [];
            const checkboxes = document.querySelectorAll('input[name="additional_options[]"]:checked');
            
            checkboxes.forEach(checkbox => {
                options.push(checkbox.value);
            });
            
            alert(`Спасибо, ${name}! Ваша заявка на расчет стоимости ${translateWindowType(selectedWindowType)} (${width}x${height} мм) принята. Мы свяжемся с вами в ближайшее время по телефону ${phone}.`);
            
            // Reset form and return to step 1
            detailedCalculatorForm.reset();
            steps.forEach(step => step.classList.remove('active'));
            steps[0].classList.add('active');
            
            if (currentStepDisplay) {
                currentStepDisplay.textContent = '1';
            }
            
            if (stepDescription) {
                stepDescription.textContent = stepDescriptions[0];
            }
        });
        
        // Helper function to validate steps
        function validateStep(stepNumber) {
            switch (stepNumber) {
                case 1:
                    // Validate window type selection
                    const windowTypeRadios = document.querySelectorAll('input[name="window-type"]');
                    let isWindowTypeSelected = false;
                    
                    windowTypeRadios.forEach(radio => {
                        if (radio.checked) {
                            isWindowTypeSelected = true;
                        }
                    });
                    
                    if (!isWindowTypeSelected) {
                        alert('Пожалуйста, выберите тип окна');
                        return false;
                    }
                    return true;
                    
                case 2:
                    // Validate dimensions
                    const width = document.getElementById('detailed-width').value;
                    const height = document.getElementById('detailed-height').value;
                    
                    if (!width || isNaN(width)) {
                        alert('Пожалуйста, введите корректную ширину');
                        return false;
                    }
                    
                    if (!height || isNaN(height)) {
                        alert('Пожалуйста, введите корректную высоту');
                        return false;
                    }
                    return true;
                    
                case 3:
                    // No validation needed for options
                    return true;
                    
                default:
                    return true;
            }
        }
        
        // Helper function to translate window type
        function translateWindowType(type) {
            const translations = {
                'single': 'одностворчатого окна',
                'double': 'двухстворчатого окна',
                'triple': 'трехстворчатого окна',
                'balcony-door-double': 'балконной двери с окном',
                'balcony-door-triple': 'балконного блока'
            };
            
            return translations[type] || type;
        }
        
        // Extra functionality - allow only one option to be none
        const noneOption = document.getElementById('option-none');
        const otherOptions = document.querySelectorAll('input[name="additional_options[]"]:not(#option-none)');
        
        if (noneOption) {
            noneOption.addEventListener('change', function() {
                if (this.checked) {
                    otherOptions.forEach(option => {
                        option.checked = false;
                        option.disabled = true;
                    });
                } else {
                    otherOptions.forEach(option => {
                        option.disabled = false;
                    });
                }
            });
            
            otherOptions.forEach(option => {
                option.addEventListener('change', function() {
                    if (this.checked) {
                        noneOption.checked = false;
                    }
                });
            });
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
}); 