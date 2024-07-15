// Get all the cards
const cards = document.querySelectorAll('.card');

// Add event listeners to each card
cards.forEach((card) => {
  let startX;
  let isSwiping = false;

  card.addEventListener('mousedown', (e) => {
    startX = e.clientX;
    isSwiping = true;
  });

  document.addEventListener('mousemove', (e) => {
    if (isSwiping) {
      const moveX = e.clientX - startX;

      // Apply the transform to the card
      card.style.transform = `translateX(${moveX}px)`;

      // Check if the card has been swiped far enough
      if (Math.abs(moveX) > card.offsetWidth / 2) {
        // Swipe right or left
        if (moveX > 0) {
          swipeRight(card);
        } else {
          swipeLeft(card);
        }
        isSwiping = false;
      }
    }
  });

  document.addEventListener('mouseup', () => {
    isSwiping = false;
    // Remove the event listeners
    document.removeEventListener('mousemove', null, false);
    document.removeEventListener('mouseup', null, false);

    // Reset the card position
    card.style.transform = '';
  });
});

// Function to swipe right
function swipeRight(card) {
  card.style.transform = 'translateX(1000px)';
  card.style.opacity = '0';
  setTimeout(() => {
    card.remove();
  }, 500);

  // Add glitter popup
  const glitter = document.createElement('div');
  glitter.className = 'glitter';
  glitter.innerHTML = '❤️';
  document.body.appendChild(glitter);

  // Animate the glitter
  glitter.style.top = `${Math.random() * window.innerHeight}px`;
  glitter.style.left = `${Math.random() * window.innerWidth}px`;
  glitter.style.animation = 'glitter 2s ease-out';

  // Remove the glitter after animation
  setTimeout(() => {
    glitter.remove();
  }, 2000);
}

// Function to swipe left
function swipeLeft(card) {
  card.style.transform = 'translateX(-1000px)';
  card.style.opacity = '0';
  setTimeout(() => {
    card.remove();
  }, 500);
}