const score = document.querySelector(".score-number");
const question = document.querySelector(".question-text");
const answerOptions = document.querySelectorAll(".option");

const getQuestions = async function () {
  const res = await fetch(`https://opentdb.com/api.php?amount=10`);

  const data = await res.json();
  console.log(data);
};
getQuestions();
