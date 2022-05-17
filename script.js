const score = document.querySelector(".score-number");
const questionEl = document.querySelector(".question-text");
const answerOptions = document.querySelectorAll(".option");

const questionData = {
  questions: [],
  answers: [],
};

const getQuestions = async function () {
  const res = await fetch(`https://opentdb.com/api.php?amount=10`);

  const { results: data } = await res.json();
  console.log(data);

  data.forEach(function (obj) {
    questionData.questions.push(obj.question);
    questionData.answers.push([...obj.incorrect_answers, obj.correct_answer]);
  });
};

getQuestions();
console.log(questionData);
