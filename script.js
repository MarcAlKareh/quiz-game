const score = document.querySelector(".score-number");
const question = document.querySelector(".question-text");
const answerOptions = document.querySelectorAll(".option");

const getQuestions = async function () {
  const res = await fetch(
    "https://opentdb.com/api.php?amount=10&token=abf63e5533fa84f6bd5411a47d6c1e313158bb7efa4e245287f9790353251668"
  );

  const data = await res.json();
  console.log(data);
};
getQuestions();
