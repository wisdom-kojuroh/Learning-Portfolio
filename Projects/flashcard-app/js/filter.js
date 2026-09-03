// js/filter.js
function getValidCards() { return flashcards.filter(c => !c.isMastered); }
function getMasteredCards() { return flashcards.filter(c => c.isMastered); }

function getReviewCards() {
  const now = new Date();
  return getValidCards().filter(c => {
    if (!c.nextReview) return true;
    return new Date(c.nextReview) <= now;
  });
}

function shuffleArray(array) {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}