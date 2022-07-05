const englishQuestionCheck = (question: string) => {
  return question.substring(question.length - 1) === '?';
};

const persianQuestionCheck = (question: string) => {
  return question.substring(question.length - 1) === '؟';
};

const questionCheckers = [englishQuestionCheck, persianQuestionCheck];

export default function questionIsValid(question: string) {
  let isValid = false;

  questionCheckers.forEach((checker) => {
    if (checker(question)) {
      isValid = true;
      return;
    }
  });

  return isValid;
}
