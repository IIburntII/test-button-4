document.addEventListener('DOMContentLoaded', () => {
    const button = document.getElementById('trickyButton');
    const container = document.querySelector('.container');
    let isMoving = false;

    function getRandomPosition() {
        const containerRect = container.getBoundingClientRect();
        const buttonRect = button.getBoundingClientRect();
        const maxX = containerRect.width - buttonRect.width;
        const maxY = containerRect.height - buttonRect.height;

        return {
            x: Math.random() * maxX,
            y: Math.random() * maxY
        };
    }

    function moveButtonRandomly() {
        if (isMoving) return;

        isMoving = true;

        const duration = 3000; // Time in milliseconds for the button to bounce around
        const startTime = Date.now();

        function animate() {
            const elapsed = Date.now() - startTime;
            if (elapsed < duration) {
                const progress = (elapsed / duration) % 1;
                const amplitude = 50; // Amplitude of bounce
                const containerRect = container.getBoundingClientRect();
                const buttonRect = button.getBoundingClientRect();
                const maxX = containerRect.width - buttonRect.width;
                const maxY = containerRect.height - buttonRect.height;

                // Generate random direction and position
                const offsetX = Math.sin(progress * Math.PI * 2) * amplitude;
                const offsetY = Math.cos(progress * Math.PI * 2) * amplitude;
                
                let newX = buttonRect.left + offsetX - containerRect.left;
                let newY = buttonRect.top + offsetY - containerRect.top;

                // Ensure the button bounces within the container
                if (newX < 0 || newX > maxX) {
                    newX = Math.min(maxX, Math.max(0, newX));
                }
                if (newY < 0 || newY > maxY) {
                    newY = Math.min(maxY, Math.max(0, newY));
                }

                button.style.transform = `translate(${newX}px, ${newY}px)`;
                requestAnimationFrame(animate);
            } else {
                button.style.transform = 'none';
                button.style.opacity = 1;
                isMoving = false;
            }
        }

        button.style.transition = 'none';
        button.style.opacity = 0; // Make button disappear
        requestAnimationFrame(animate);
    }

    function handleInteraction(e) {
        if (isMoving) return;

        moveButtonRandomly();
    }

    // Event listeners for desktop and mobile
    container.addEventListener('mousemove', handleInteraction);
    container.addEventListener('touchstart', handleInteraction);

    // Center the button initially
    window.addEventListener('resize', () => {
        button.style.position = 'absolute';
        button.style.left = `calc(50% - ${button.offsetWidth / 2}px)`;
        button.style.top = `calc(50% - ${button.offsetHeight / 2}px)`;
    });

    window.dispatchEvent(new Event('resize'));
});