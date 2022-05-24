const scoreEl = document.querySelector('.score-number');
const questionEl = document.querySelector('.question-text');
const optionsContainer = document.querySelector('.answer-options');
const resetEl = document.querySelector('.reset');

const questionData = {
  questions: [],
  answers: [],
};

let score = 0;

///////////////////////////////////////////////////
// Getting Question data and storing them in object

const getQuestions = async function () {
  const res = await fetch(`https://opentdb.com/api.php?amount=10`);

  const { results: data } = await res.json();

  data.forEach(obj => {
    questionData.questions.push(obj.question);
    questionData.answers.push({
      correctAnswer: obj.correct_answer,
      options: [...obj.incorrect_answers, obj.correct_answer],
    });
  });
  // console.log(questionData.questions);
};

///////////////////////////////////////////////////
// Promisifying functionality for waiting for question to be answered in order to display next question
const waitForUser = function () {
  return new Promise(function (resolve) {
    optionsContainer.addEventListener('click', function (e) {
      // Find closest option button
      const btnClicked = e.target.closest('.option');
      if (!btnClicked) return;
      resolve(btnClicked);
    });
  });
};

// Promisifying setTimeout function
const wait = function (sec) {
  return new Promise(resolve => setTimeout(resolve, sec * 1000));
};

// Function to shuffle the array using
const shuffle = function (array) {
  // Using Fisher-Yates algorithm
  let currentIndex = array.length,
    randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [array[randomIndex], array[currentIndex]] = [
      array[currentIndex],
      array[randomIndex],
    ];
  }

  return array;
};

// Display question and answers
const setQuestionAndAnswer = async function () {
  await getQuestions();

  // Display answer options with data from object
  let html = ``;

  // Displays next question
  for (let i = 0; i < questionData.questions.length; i++) {
    html = ``;
    optionsContainer.innerHTML = '';

    questionEl.textContent = questionData.questions[i];

    // Display answer options for question
    shuffle(questionData.answers[i].options);
    questionData.answers[i].options.forEach(option => {
      html += `<button class="option">${option}</button>`;
    });

    // Insert buttons into HTML
    optionsContainer.insertAdjacentHTML('beforeend', html);

    // Check for click on an answer option
    const btn = await waitForUser();

    // Check if user chose correct answer
    if (btn.textContent === questionData.answers[i].correctAnswer) {
      // Updates score
      score++;
      scoreEl.textContent = score;

      // Adds CSS classes to element
      btn.classList.add('correct');
      if (i !== questionData.questions.length - 1) await wait(2);
    } else {
      btn.classList.add('incorrect');

      const options = Array.from(document.querySelectorAll('.option'));
      const optionCorrect = options.find(
        op => op.textContent === questionData.answers[i].correctAnswer
      );
      optionCorrect?.classList.add('correct');
      // console.log(optionCorrect);
      if (i !== questionData.questions.length - 1) await wait(2);
    }
  }

  // Show reset button
  resetEl.classList.remove('hidden');

  // Listen for click event on reset button and reset quiz
  resetEl.addEventListener('click', function () {
    // Clear score
    score = 0;
    scoreEl.textContent = '0';

    // Clear questionData object
    questionData.questions = [];
    questionData.answers = [];

    // Hide reset button
    resetEl.classList.add('hidden');

    // Repeat quiz
    setQuestionAndAnswer();
  });
};

setQuestionAndAnswer();
