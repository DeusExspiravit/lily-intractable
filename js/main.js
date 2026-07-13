document.addEventListener('DOMContentLoaded', () => {
  let currentStage = 1;
  const stages = [
    'assets/stage1-bud.svg',
    'assets/stage2-bloom.svg',
    'assets/stage3-bloomed.svg'
  ];

  const memories = {
    1: [
      { message: 'Every love story has a beginning. This is ours — small, quiet, and full of promise, just like a bud waiting to bloom.', photo: 'assets/photos/memory1.jpeg' }
    ],
    2: [
      { message: 'I remember the first time you laughed at something I said. I decided right then that I would spend my life trying to make you laugh like that again.', photo: 'assets/photos/memory2.jpeg' },
      { message: 'There are ordinary days and then there are days with you. The difference is everything.', photo: 'assets/photos/memory3.jpeg' },
      { message: 'You have this way of making the whole world feel smaller and warmer, just by being in it.', photo: 'assets/photos/memory4.jpeg' }
    ],
    3: [
      { message: 'I never understood what home felt like until I found it in you.', photo: 'assets/photos/memory5.jpeg' },
      { message: 'You are the first person I want to tell when something good happens, and the only person I need when something goes wrong.', photo: 'assets/photos/memory6.jpeg' },
      { message: 'Loving you has been the easiest thing I have ever done and the most important thing I will ever do.', photo: 'assets/photos/memory7.jpeg' },
      { message: 'I choose you. Not just today, not just when it is easy — every day, in every version of this life.', photo: 'assets/photos/memory8.jpeg' },
      { message: 'Thank you for seeing me, truly seeing me, and staying anyway. That is the greatest gift anyone has ever given me.', photo: 'assets/photos/memory9.jpeg' },
      { message: 'There is no one else I would rather build a life with. No one else who makes ordinary moments feel like something worth remembering.', photo: 'assets/photos/memory10.jpeg' }
    ]
  };

  const curtain = document.getElementById('reveal-curtain');
  const cardOverlay = document.getElementById('card-overlay');
  const hint = document.getElementById('hint');
  const flowerContainer = document.getElementById('flower-container');
  const progressionButton = document.getElementById('progression-button');
  const message = document.getElementById('message');
  const cardImg = document.querySelector('#memory-card img');
  const cardClosure = document.getElementById('card-closure');

  function loadSVG(path) {
    fetch(path)
      .then(response => response.text())
      .then(svgData => {
        flowerContainer.innerHTML = svgData;
        attachClickableAreas();
      });
  }

  function attachClickableAreas() {
    const clickables = document.querySelectorAll('.clickable');
    clickables.forEach((el, index) => {
      el.style.cursor = 'pointer';
      el.addEventListener('click', () => openCard(index));
    });
  }

  function openCard(index) {
    const memory = memories[currentStage][index];
    message.textContent = memory.message;
    cardImg.src = memory.photo;
    cardOverlay.style.visibility = 'visible';
    requestAnimationFrame(() => {
      cardOverlay.classList.add('visible');
    });
  }

  function closeCard() {
    cardOverlay.classList.remove('visible');
    setTimeout(() => {
      cardOverlay.style.visibility = 'hidden';
    }, 500);
  }

  function transitionToNextStage() {
    if (currentStage >= 3) return;
    curtain.classList.add('active');
    flowerContainer.classList.add('flash');
    setTimeout(() => {
      currentStage++;
      loadSVG(stages[currentStage - 1]);
      if (currentStage === 3) progressionButton.style.display = 'none';
    }, 800);
    setTimeout(() => {
      curtain.classList.remove('active');
      flowerContainer.classList.remove('flash');
    }, 1600);
  }

  cardClosure.addEventListener('click', closeCard);
  progressionButton.addEventListener('click', transitionToNextStage);

  setTimeout(() => { hint.style.opacity = '1'; }, 1000);

  setTimeout(() => {
    const footer = document.getElementById('footer-message');
    if (footer) footer.classList.add('visible');
  }, 60000);

  loadSVG(stages[0]);
});