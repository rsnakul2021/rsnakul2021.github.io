class BitsAnimation {
    constructor() {
        this.container = document.createElement('div');
        this.container.className = 'bits-animation';
        document.body.appendChild(this.container);
        this.bits = [];
        this.isAnimating = true;
        this.init();
        this.setupScrollListener();
    }

    init() {
        // Create initial bits
        for (let i = 0; i < 50; i++) {
            this.createBit();
        }
        // Continue creating new bits
        setInterval(() => {
            if (this.isAnimating && this.bits.length < 50) {
                this.createBit();
            }
        }, 500);
    }

    generateBinaryString() {
        let length = Math.floor(Math.random() * 30) + 20; // Random length between 20 and 50
        let binary = '';
        for (let i = 0; i < length; i++) {
            binary += Math.random() > 0.5 ? '1' : '0';
        }
        return binary;
    }

    createBit() {
        const bit = document.createElement('div');
        bit.className = 'bit';
        bit.textContent = this.generateBinaryString();
        
        // Random vertical position
        bit.style.top = `${Math.random() * 100}vh`;
        // Random size
        bit.style.fontSize = `${Math.random() * 12 + 10}px`;
        // Random opacity
        bit.style.opacity = `${Math.random() * 0.4 + 0.4}`;
        // Random animation duration
        bit.style.animationDuration = `${Math.random() * 10 + 10}s`;
        
        this.container.appendChild(bit);
        this.bits.push(bit);

        // Remove bit after animation
        bit.addEventListener('animationend', () => {
            if (this.isAnimating) {
                this.container.removeChild(bit);
                this.bits = this.bits.filter(b => b !== bit);
            }
        });
    }

    setupScrollListener() {
        let lastScrollTop = 0;
        window.addEventListener('scroll', () => {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            
            // Stop animation when scrolling down past threshold
            if (scrollTop > lastScrollTop && scrollTop > 100) {
                this.stop();
            }
            
            // Restart animation when back at top
            if (scrollTop === 0 && !this.isAnimating) {
                this.restart();
            }
            
            lastScrollTop = scrollTop;
        });
    }

    stop() {
        this.isAnimating = false;
        this.bits.forEach(bit => {
            bit.style.animation = 'none';
            bit.style.opacity = '0';
        });
        setTimeout(() => {
            this.container.style.display = 'none';
        }, 1000);
    }

    restart() {
        this.container.style.display = 'block';
        this.isAnimating = true;
        this.bits = [];
        this.container.innerHTML = '';
        this.init();
    }
}

// Initialize animation when page loads
window.addEventListener('load', () => {
    new BitsAnimation();
}); 