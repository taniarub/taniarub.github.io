document.addEventListener('DOMContentLoaded', function() {
    // Modal functionality
    const calculateBtn = document.getElementById('calculate-btn');
    const calculatorModal = document.getElementById('calculator-modal');
    const closeModal = document.querySelector('.close-modal');
    
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
    
    // Calculator functionality
    const calculatorForm = document.getElementById('calculator-form');
    const calculationResult = document.getElementById('calculation-result');
    const resultPrice = document.getElementById('result-price');
    
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
    
    // Detailed Calculator functionality
    const detailedCalculatorForm = document.getElementById('detailed-calculator-form');
    
    if (detailedCalculatorForm) {
        detailedCalculatorForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const configuration = document.getElementById('window-configuration').value;
            const width = document.getElementById('detailed-width').value;
            const height = document.getElementById('detailed-height').value;
            const profile = document.getElementById('profile-type').value;
            const glassType = document.getElementById('glass-type').value;
            const name = document.getElementById('client-name').value;
            const phone = document.getElementById('client-phone').value;
            
            // Display confirmation message
            alert(`Спасибо, ${name}! Ваша заявка на расчет стоимости принята. Наш менеджер свяжется с вами в ближайшее время по телефону ${phone}.`);
            
            // Reset form
            detailedCalculatorForm.reset();
        });
    }
    
    function resetCalculator() {
        calculatorForm.reset();
        calculationResult.classList.add('hidden');
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
    
    // Scroll to top button functionality
    const scrollToTopBtn = document.getElementById('scroll-to-top');
    
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
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const href = this.getAttribute('href');
            // Only try to scroll if the href is more than just "#"
            if (href && href.length > 1) {
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
}); 