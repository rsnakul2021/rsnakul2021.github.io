document.addEventListener('DOMContentLoaded', function() {
    const background = document.querySelector('.binary-background');
    if (!background) return; // Exit if background element doesn't exist

    function createBit() {
        const bit = document.createElement('div');
        bit.className = 'binary-bit';
        bit.textContent = Math.random() < 0.5 ? '0' : '1';
        bit.style.left = Math.random() * 100 + '%';
        
        // Slower animation duration between 2.4 and 6 seconds (20% slower)
        const duration = Math.random() * 3.6 + 2.4;
        bit.style.animationDuration = duration + 's';
        
        // Randomize starting position
        bit.style.top = (Math.random() * 100) + '%';
        
        background.appendChild(bit);

        // Remove the bit after animation completes
        bit.addEventListener('animationend', () => {
            bit.remove();
        });
    }

    // Create 10% fewer initial bits (180 instead of 200)
    for (let i = 0; i < 180; i++) {
        setTimeout(() => {
            createBit();
        }, Math.random() * 1000);
    }

    // Create bits less frequently (60ms instead of 50ms, 20% slower)
    setInterval(createBit, 60);
}); 