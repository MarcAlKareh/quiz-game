const score = document.querySelector('.score-number');
const questionEl = document.querySelector('.question-text');
const optionsContainer = document.querySelector('.answer-options');

const questionData = {
  questions: [],
  answers: [],
};

const getQuestions = async function () {
  const res = await fetch(`https://opentdb.com/api.php?amount=10`);

  const { results: data } = await res.json();
  console.log(data);

  data.forEach(obj => {
    questionData.questions.push(obj.question);
    questionData.answers.push({
      correctAnswer: obj.correct_answer,
      options: [...obj.incorrect_answers, obj.correct_answer],
    });
  });
  console.log(questionData.questions);
};

const setQuestionAndAnswer = async function () {
  await getQuestions();
  console.log(questionData.answers);
  questionEl.textContent = questionData.questions[0];

  let html = ``;

  questionData.answers.forEach(optionsData => {
    optionsData.options.forEach(option => {
      html += `<button class="option">${option}</button>`;
    });
  });

  optionsContainer.insertAdjacentHTML('beforeend', html);
};

setQuestionAndAnswer();
