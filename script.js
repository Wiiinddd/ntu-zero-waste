const leftContainer = document.getElementById('left');
const rightContainer = document.getElementById('right');
const message = document.getElementById('message');

let selectedLeft = null;
let selectedRight = null;
let pairs = 0;
let lockBoard = false; // Prevent clicking while flipping back

// Generate blocks dynamically
function createBlocks() {
  for (let i = 1; i <= 15; i++) {
    const leftBlock = createBlock(i, `L${i}`);
    const rightBlock = createBlock(i, `R${i}`);
    leftContainer.appendChild(leftBlock);
    rightContainer.appendChild(rightBlock);
  }
}

// Helper to create a block element
function createBlock(id, text) {
  const block = document.createElement('div');
  block.classList.add('block');
  block.dataset.id = id;

  block.innerHTML = `
    <div class="inner">
      <div class="front">?</div>
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
  if (lockBoard) return; // Prevent clicks while flipping back
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
    lockBoard = true; // Prevent clicking other cards

    setTimeout(() => {
      selectedLeft.classList.remove('open');
      selectedRight.classList.remove('open');
      selectedLeft = null;
      selectedRight = null;
      lockBoard = false;
    }, 1000); // 1 second delay
  }
}

// Initialize game
createBlocks();
shuffleColumns();
