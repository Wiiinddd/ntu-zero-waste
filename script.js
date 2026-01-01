const leftContainer = document.getElementById('left');
const rightContainer = document.getElementById('right');
const message = document.getElementById('message');

let selectedLeft = null;
let selectedRight = null;
let pairs = 0;
let lockBoard = false;

/* ---------- DATA ---------- */
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
  "Plastic condiment packets"
];

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
  "Use your own glass jar",
  "Buy eggs in refillable tray",
  "Buy bulk snacks with container",
  "Bring reusable dessert cup",
  "Carry refillable sauce container"
];

/* ---------- CREATE BLOCKS ---------- */
function createBlocks() {
  leftItems.forEach((text, id) => {
    const block = document.createElement('div');
    block.className = 'block';
    block.dataset.id = id;
    block.textContent = text;

    block.addEventListener('click', () => handleLeft(block));
    leftContainer.appendChild(block);
  });

  rightItems.forEach((text, id) => {
    const block = document.createElement('div');
    block.className = 'block';
    block.dataset.id = id;

    block.innerHTML = `
      <div class="inner">
        <div class="front"></div>
        <div class="back">${text}</div>
      </div>
    `;

    block.addEventListener('click', () => handleRight(block));
    rightContainer.appendChild(block);
  });
}

/* ---------- SHUFFLE ---------- */
function shuffle(container) {
  [...container.children]
    .sort(() => Math.random() - 0.5)
    .forEach(el => container.appendChild(el));
}

/* ---------- CLICK HANDLERS ---------- */
function handleLeft(block) {
  if (lockBoard || block.classList.contains('matched-success')) return;

  if (selectedLeft && selectedLeft !== block) {
    selectedLeft.classList.remove('selected');
  }

  block.classList.add('selected');
  selectedLeft = block;

  if (selectedRight) checkPair();
}

function handleRight(block) {
  if (lockBoard || block.classList.contains('paired')) return;
  
  if (selectedRight && !selectedRight.classList.contains('paired')) {
    selectedRight.classList.remove('open');
  }

  block.classList.add('open');
  selectedRight = block;

  if (selectedLeft) checkPair();
}

/* ---------- PAIR CHECK ---------- */
function checkPair() {
  const leftId = selectedLeft.dataset.id;
  const rightId = selectedRight.dataset.id;

  if (leftId === rightId) {
    selectedLeft.classList.remove('selected');
    selectedLeft.classList.add('matched-success');
    selectedRight.classList.add('paired');

    message.textContent = `Correct! (${++pairs}/15)`;

    selectedLeft = null;
    selectedRight = null;
  } else {
    message.textContent = 'Wrong pair!';
    lockBoard = true;

    setTimeout(() => {
      selectedLeft.classList.remove('selected');
      selectedRight.classList.remove('open');
      selectedLeft = null;
      selectedRight = null;
      lockBoard = false;
    }, 900);
  }
}

/* ---------- INIT ---------- */
createBlocks();
shuffle(rightContainer);
