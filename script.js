let quizData = [];
let startTime; // Variable to store the start time of the quiz
let timerInterval; // Variable to store the timer interval

async function fetchQuizData() {
  try {
    const response = await fetch(
      "https://getpantry.cloud/apiv1/pantry/3eaaabe6-b43e-455f-9164-3fafb04edac5/basket/newBasket93/"
    );
    if (!response.ok) {
      throw new Error("Failed to fetch quiz data");
    }
    const data = await response.json();
    quizData = data;
    displayQuestions();
  } catch (error) {
    console.error("Error fetching quiz data:", error.message);
  }
}

function displayQuestions() {
  const questionContainer = document.querySelector(".question-container");
  questionContainer.innerHTML = "";

  // Start the timer
  startTime = new Date();
  timerInterval = setInterval(updateTimer, 1000);

  quizData.forEach((question, index) => {
    let questionElement = document.createElement("div");
    questionElement.classList.add("question");

    const titleElement = document.createElement("p");
    titleElement.innerHTML = `${index + 1}. ${question.title} <img src="${
      question.image
    }" alt="artist" style="width : 100%">`;
    questionElement.appendChild(titleElement);

    question.options.forEach((option, optionIndex) => {
      const optionElement = document.createElement("label");
      optionElement.innerHTML = `
        <input type="radio" name="question${index}" value="${option}" />
        ${option}
      `;
      questionElement.appendChild(optionElement);
    });

    questionContainer.appendChild(questionElement);
  });

  document.getElementById("start-btn").style.display = "none";
  document.getElementById("submit-btn").style.display = "block";
}

// function updateTimer() {
//   const currentTime = new Date();
//   const timeDiff = Math.floor((currentTime - startTime) / 1000);
//   const minutes = Math.floor(timeDiff / 60);
//   const seconds = timeDiff % 60;
//   const timerContainer = document.getElementById("timer");
//   timerContainer.innerHTML = Time: ${minutes}m ${seconds}s;
// }

// function calculateScore() {
//   clearInterval(timerInterval); // Stop the timer
//   const endTime = new Date(); // Get the current time when quiz is submitted
//   const timeTaken = Math.floor((endTime - startTime) / 1000); // Calculate time taken in seconds
//   let score = 0;
//   quizData.forEach((question, index) => {
//     const selectedOption = document.querySelector(
//       input[name="question${index}"]:checked
//     );
//     if (selectedOption && selectedOption.value === question.correctArtist) {
//       score++;
//     }
//   });
//   alert(
//     Your score is: ${score}/${quizData.length}. Time taken: ${timeTaken} seconds.
//   );
// }
function updateTimer() {
    const currentTime = new Date();
    const timeDiff = Math.floor((currentTime - startTime) / 1000);
    const minutes = Math.floor(timeDiff / 60);
    const seconds = timeDiff % 60;
    const timerContainer = document.getElementById("timer");
    timerContainer.innerHTML = `Time: ${minutes}m ${seconds}s`;
  }
  
  function calculateScore() {
    clearInterval(timerInterval); // Stop the timer
    const endTime = new Date(); // Get the current time when quiz is submitted
    const timeTaken = Math.floor((endTime - startTime) / 1000); // Calculate time taken in seconds
    let score = 0;
    quizData.forEach((question, index) => {
      const selectedOption = document.querySelector(`input[name="question${index}"]:checked`);
      if (selectedOption && selectedOption.value === question.correctArtist) {
        score++;
      }
    });
    alert(`Your score is: ${score}/${quizData.length}. Time taken: ${timeTaken} seconds.`);
  }
  
function resetQuiz() {
  clearInterval(timerInterval); // Stop the timer
  document.querySelector(".question-container").innerHTML = "";
  document.getElementById("start-btn").style.display = "block";
  document.getElementById("submit-btn").style.display = "none";
  document.getElementById("reset-btn").style.display = "none";
  document.getElementById("timer").innerHTML = ""; // Clear the timer display
}

function startQuiz() {
  fetchQuizData();
  document.getElementById("reset-btn").style.display = "block"; // Display the reset button
    document.querySelector(".quiz-introtitle").style.display = "none";
}

document.getElementById("start-btn").addEventListener("click", startQuiz);
document.getElementById("submit-btn").addEventListener("click", calculateScore);
document.getElementById("reset-btn").addEventListener("click", resetQuiz);
