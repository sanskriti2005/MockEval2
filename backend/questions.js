import { quizEndpoint } from "./endpoint.js";
import { endpoint } from "./endpoint.js";

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
        </div>`
        }
        })
        
    } catch (error) {
        console.log(error)
    }
    
}
displayData()