const scoreEl = document.querySelector('.score-number');
const questionEl = document.querySelector('.question-text');
const optionsContainer = document.querySelector('.answer-options');

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
  console.log(questionData.questions);
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

const wait = function (sec) {
  return new Promise(resolve => setTimeout(resolve, sec * 1000));
};

// Display question and answers
const setQuestionAndAnswer = async function () {
  await getQuestions();
  console.log(questionData.answers);

  // Display answer options with data from object
  let html = ``;

  // Displays next question
  for (let i = 0; i < questionData.questions.length; i++) {
    html = ``;
    optionsContainer.innerHTML = '';

    questionEl.textContent = questionData.questions[i];

    // Display answer options for question
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
      await wait(2);
    } else {
      btn.classList.add('incorrect');
      await wait(2);
    }
  }
};

setQuestionAndAnswer();
