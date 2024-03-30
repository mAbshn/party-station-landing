~function () {
  const ACTIVE_CLASS = 'active'
  const allQuestions = document.querySelectorAll('.faq__question-block')

  allQuestions.forEach((question) => {
    question.addEventListener('click', () => handleClick(question.id))
  })

  function handleClick(id) {
    const activeQuestion = document.getElementById(id)

    if (activeQuestion.classList.contains(ACTIVE_CLASS)) {
      activeQuestion.classList.remove(ACTIVE_CLASS)
    } else {
      allQuestions.forEach((question) => {
        question.classList.remove(ACTIVE_CLASS)
      })
      activeQuestion.classList.add(ACTIVE_CLASS)
    }
  }
}()
