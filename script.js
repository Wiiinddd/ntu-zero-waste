const leftContainer = document.getElementById('left');
const rightContainer = document.getElementById('right');
const message = document.getElementById('message');

let selectedLeft = null;
let selectedRight = null;
let pairs = 0;
let lockBoard = false; // Prevent clicking while flipping back

// Left column items
const leftItems = [
  "Plastic packet drinks",
  "Plastic takeaway lid",
  "Single-use bubble tea carrier",
  "Disposable chopsticks",
  "Plastic sushi tray",
  "Disposable plastic bag",
  "Plastic straws",
  "Single-use plastic water bottle",
  "Disposable coffee cup",
  "Single-use tissue",
  "Disposable salad container",
  "Plastic egg carton",
  "Plastic packaging for snacks",
  "Disposable ice cream cup/spoon",
  "Plastic condiment packets (chili sauce, ketchup)"
];

// Right column matching solutions
const rightItems = [
  "Fill your own reusable tumbler",
  "Use a container with a secure lid",
  "Use a reusable cup holder sling",
  "Bring reusable chopsticks",
  "Carry a bento box",
  "Bring your own tote bag",
  "Use a metal / bamboo straw",
  "Carry a reusable water bottle",
  "Bring your own reusable tumbler",
  "Use a washable cloth napkin",
  "Use your own glass jar / container",
  "Buy eggs in a refillable egg tray",
  "Buy bulk snacks with your own container",
  "Bring a small reusable dessert cup + spoon",
  "Carry a small refillable sauce container"
];

// Generate blocks dynamically
function createBlocks() {
  leftItems.forEach((item, index) => {
    const leftBlock = createBlock(index, item, 'left');
    leftContainer.appendChild(leftBlock);
  });

  rightItems.forEach((item, index) => {
    const rightBlock = createBlock(index, item, 'right');
    rightContainer.appendChild(rightBlock);
  });
}

// Helper to create a block element
function createBlock(id, text, side) {
  const block = document.createElement('div');
  block.classList.add('block');
  block.dataset.id = id;

  let back_text;
  if (side === 'left') {
    back_text = 'Situation';
  } else {
    back_text = 'Solution';
  }

  block.innerHTML = `
    <div class="inner">
      <div class="front">${back_text}</div>
      <div class="back">${text}</div>
    </div>
  `;

  block.addEventListener('click', () => handleClick(block));
  return block;
}

// Shuffle left and right columns
function shuffleColumns() {
  shuffleBlocks(leftContainer);
  shuffleBlocks(rightContainer);
}

function shuffleBlocks(container) {
  const blocks = Array.from(container.children);
  for (let i = blocks.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    container.appendChild(blocks[j]);
  }
}

// Handle block click
function handleClick(block) {
  if (lockBoard) return;
  if (block.classList.contains('paired') || block.classList.contains('open')) return;

  block.classList.add('open');

  if (block.parentElement.id === 'left') {
    if (selectedLeft) selectedLeft.classList.remove('open');
    selectedLeft = block;
  } else {
    if (selectedRight) selectedRight.classList.remove('open');
    selectedRight = block;
  }

  checkPair();
}

// Check if selected left and right blocks match
function checkPair() {
  if (!selectedLeft || !selectedRight) return;

  if (selectedLeft.dataset.id === selectedRight.dataset.id) {
    // Correct pair
    selectedLeft.classList.add('paired');
    selectedRight.classList.add('paired');
    message.textContent = `Correct! (${++pairs}/15)`;

    selectedLeft = null;
    selectedRight = null;
  } else {
    // Wrong pair → flip back after delay
    message.textContent = 'Wrong pair!';
    lockBoard = true;

    setTimeout(() => {
      selectedLeft.classList.remove('open');
      selectedRight.classList.remove('open');
      selectedLeft = null;
      selectedRight = null;
      lockBoard = false;
    }, 1000);
  }
}

// Initialize game
createBlocks();
shuffleColumns();
