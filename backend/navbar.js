function loadNav(){
    const navbar = document.querySelector("#nav")
    navbar.innerHTML = `<div id="navbar">
            <div><a href="index.html">Login</a></div>
            <div><a href="questions.html">Questions</a></div>
            <div><a href="quiz.html">Quiz</a></div>
        </div>`
}
loadNav()