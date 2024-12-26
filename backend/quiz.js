import { quizEndpoint } from "./endpoint.js";
import { endpoint } from "./endpoint.js";

const quizForm = document.querySelector("#quiz-form")
quizForm.addEventListener("submit", async (event) => {
    event.preventDefault()
    console.log("clicked")
    const question = quizForm.question.value
    const opt1 = quizForm.opt1.value
    const opt2 = quizForm.opt2.value
    const opt3 = quizForm.opt3.value

    const correctOpt = quizForm.correct.value
    let quizData = { question, opt1, opt2, opt3, correctOpt }
    try {
        let res = await fetch(quizEndpoint, {
            method:"POST",
            headers:{
                "Content-type":"application/json"
            },
            body: JSON.stringify(quizData)
        })
        if(res.ok){
            alert("Successfully added question!")
            quizForm.question.value = ""
            quizForm.opt1.value = ''
            quizForm.opt2.value = ''
            quizForm.opt3.value = ''
            displayData()
        }
    } catch (error) {
        alert("Could not create quiz, please try again later")
        console.log(error)
    }
})

async function getData() {
    try {
        let res = await fetch(quizEndpoint)
        let data = await res.json()
        return data
    } catch (error) {
        alert("Could not fetch")
        console.log(error)
    }
}
const quizContainer = document.querySelector("#quiz-container")
async function displayData() {
    try {
        let dataToBeDisplayed = await getData()
        quizContainer.innerHTML = ``
        await dataToBeDisplayed.forEach((ele, i) => {
        if(ele.reviewStatus){
            quizContainer.innerHTML += `<div class="question violet" id="${ele.id}">
            <h4>${ele.question}</h4>
            <p>Option 1: ${ele.option1}</p>
            <p>Option 2: ${ele.option2}</p>
            <p>Option 3: ${ele.option3}</p>
            <p>Correct Option: ${ele.correctOption}</p>
            <button type="button" onclick="review(this)">Review</button>
            <button type="button" onclick="deleteQuiz(this)">Delete</button>
        </div>`
        } else {
            quizContainer.innerHTML += `<div class="question" id="${ele.id}">
            <h4>${ele.question}</h4>
            <p>Option 1: ${ele.option1}</p>
            <p>Option 2: ${ele.option2}</p>
            <p>Option 3: ${ele.option3}</p>
            <p>Correct Option: ${ele.correctOption}</p>
            <button type="button" onclick="review(this)">Review</button>
            <button type="button" onclick="deleteQuiz(this)">Delete</button>
        </div>`
        }
        })
        
    } catch (error) {
        console.log(error)
    }

    window.review = async (buttonEl) => {
        console.log("reviewed")
        const elId = buttonEl.parentElement.id;
        try {
            let res = await fetch(`${quizEndpoint}/${elId}`, {
                method:"PATCH",
                headers:{
                    "Content-type":"application/json"
                },
                body: JSON.stringify({"reviewStatus" : "true"})
            })
            if(res.ok){
                alert("Successfully changed status")
                
            }
        } catch (error) {
            alert("Could not create quiz, please try again later")
            console.log(error)
        }
    }

    window.deleteQuiz = async (buttonEl) => {
        console.log("deleted")
        const elId = buttonEl.parentElement.id;
        try {
            let res = await fetch(`${quizEndpoint}/${elId}`, {
                method:"DELETE",
            })
            if(res.ok){
                alert("Successfully Deleted!")
                displayData()
            }
        } catch (error) {
            alert("Could not delete, please try again later")
            console.log(error)
        }
    }
    
}
displayData()