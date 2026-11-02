// This is an empty javascript file. Delete this line and insert your JS!

document.addEventListener("DOMContentLoaded", function () {

    const posterCards = document.querySelectorAll(".poster-card");

    posterCards.forEach(function (card) {

        function toggleCard() {

            const isAlreadyOpen = card.classList.contains("active");

            // Close all other cards
            posterCards.forEach(function (otherCard) {
                otherCard.classList.remove("active");
                otherCard.setAttribute("aria-expanded", "false");
            });

            // Open selected card if it was previously closed
            if (!isAlreadyOpen) {
                card.classList.add("active");
                card.setAttribute("aria-expanded", "true");
            }
        }

        // Mouse click
        card.addEventListener("click", toggleCard);

        // Keyboard support
        card.addEventListener("keydown", function (event) {

            if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                toggleCard();
            }

        });

    });

});
document.addEventListener('DOMContentLoaded', () => {
  // Quiz Data
  const quizData = [
    {
      question: "What was Abram Games' famous personal design motto?",
      options: [
        "Form follows function",
        "Less is more",
        "Maximum meaning, minimum means",
        "Art for the people"
      ],
      correct: 2,
      explanation: "Games believed in stripping away unnecessary ornament so that a single striking image communicated the complete message."
    },
    {
      question: "Which poster was nicknamed the 'Blonde Bombshell' and sparked debate in Parliament?",
      options: [
        "Your Britain: Fight For It Now",
        "Join the ATS",
        "Use Spades Not Ships",
        "Freedom From Hunger"
      ],
      correct: 1,
      explanation: "The 1941 'Join the ATS' recruitment poster was criticized by some MPs for being 'too glamorous' for wartime service and was briefly withdrawn."
    },
    {
      question: "What iconic 1951 symbol did Games design to represent post-war Britain?",
      options: [
        "The Festival of Britain Emblem ('Festival Star')",
        "The Royal Mail Crown",
        "The London Underground Logo",
        "The BBC Radio Logo"
      ],
      correct: 0,
      explanation: "The 'Festival Star' combined Britannia's head, a compass star, and colorful bunting, appearing across millions of souvenirs and posters."
    },
    {
      question: "In the 1960 'Freedom From Hunger' poster, what dual images blend together?",
      options: [
        "A spade and a merchant ship",
        "A head of wheat and a starving human profile",
        "A globe and a flashing eye",
        "A dove and a olive branch"
      ],
      correct: 1,
      explanation: "Games brilliantly fused an empty ear of wheat with the silhouette of a human profile to create an unforgettable humanitarian statement."
    },
    {
      question: "What nickname was given to Games' 1953 animated on-air symbol created for the BBC?",
      options: [
        "The Golden Eye",
        "The Compass Star",
        "The Bat's Wings",
        "The Spinning Globe"
      ],
      correct: 2,
      explanation: "Affectionately named 'The Bat's Wings', it was BBC's first moving identity, combining a central eye, revolving wings, and a spinning globe."
    }
  ];

  let currentQuestion = 0;
  let score = 0;

  // DOM Elements
  const questionNumberEl = document.getElementById('question-number');
  const questionTextEl = document.getElementById('question-text');
  const optionsContainerEl = document.getElementById('options-container');
  const progressBarEl = document.getElementById('quiz-progress');
  const nextBtn = document.getElementById('next-btn');
  const explanationBox = document.getElementById('explanation-box');
  const explanationText = document.getElementById('explanation-text');
  const quizContainer = document.getElementById('quiz-container');
  const resultsContainer = document.getElementById('results-container');
  const finalScoreEl = document.getElementById('final-score');
  const scoreFeedbackEl = document.getElementById('score-feedback');
  const restartBtn = document.getElementById('restart-btn');

  if (!quizContainer) return; // Guard clause if elements don't exist

  function loadQuestion() {
    const q = quizData[currentQuestion];
    questionNumberEl.textContent = `Question ${currentQuestion + 1} of ${quizData.length}`;
    questionTextEl.textContent = q.question;
    
    // Update Progress Bar
    const progressPercent = ((currentQuestion + 1) / quizData.length) * 100;
    progressBarEl.style.width = `${progressPercent}%`;

    // Reset State
    optionsContainerEl.innerHTML = '';
    explanationBox.classList.add('d-none');
    nextBtn.classList.add('d-none');

    // Render Options
    q.options.forEach((option, index) => {
      const btn = document.createElement('button');
      btn.className = 'btn option-btn';
      btn.textContent = option;
      btn.addEventListener('click', () => selectOption(index, q.correct, q.explanation));
      optionsContainerEl.appendChild(btn);
    });
  }

  function selectOption(selectedIndex, correctIndex, explanation) {
    const buttons = optionsContainerEl.querySelectorAll('.option-btn');
    
    buttons.forEach((btn, idx) => {
      btn.disabled = true;
      if (idx === correctIndex) {
        btn.classList.add('correct');
      }
      if (idx === selectedIndex && selectedIndex !== correctIndex) {
        btn.classList.add('incorrect');
      }
    });

    if (selectedIndex === correctIndex) {
      score++;
    }

    // Show explanation
    explanationText.textContent = explanation;
    explanationBox.classList.remove('d-none');

    // Show Next or Finish button
    if (currentQuestion < quizData.length - 1) {
      nextBtn.textContent = 'Next Question →';
    } else {
      nextBtn.textContent = 'See Results!!!';
    }
    nextBtn.classList.remove('d-none');
  }

  nextBtn.addEventListener('click', () => {
    currentQuestion++;
    if (currentQuestion < quizData.length) {
      loadQuestion();
    } else {
      showResults();
    }
  });

function showResults() {
  quizContainer.classList.add('d-none');
  resultsContainer.classList.remove('d-none');
  
  finalScoreEl.textContent = score;

  if (score === 5) {
    scoreFeedbackEl.textContent = 'Outstanding! You are a true Abram Games design expert!';
  } else if (score >= 3) {
    scoreFeedbackEl.textContent = 'Great job! You know your modern graphic design history well.';
  } else {
    scoreFeedbackEl.textContent = 'Good try! Explore the gallery cards above to learn more about his works.';
  }
  
  // Remove conflicting text color classes and add Bootstrap's dark text class
  finalScoreEl.classList.remove('text-white', 'text-light', 'text-muted');
  finalScoreEl.classList.add('text-dark');

  scoreFeedbackEl.classList.remove('text-white', 'text-light', 'text-muted');
  scoreFeedbackEl.classList.add('text-dark');
}


  restartBtn.addEventListener('click', () => {
    currentQuestion = 0;
    score = 0;
    resultsContainer.classList.add('d-none');
    quizContainer.classList.remove('d-none');
    loadQuestion();
  });

  // Initialize Quiz
  loadQuestion();
});