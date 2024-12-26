import { endpoint } from "./endpoint.js";


// check if it all exists in the database
async function getData() {
    try {
        let res = await fetch(endpoint)
        let data = await res.json()
        return data
    } catch (error) {
        alert("Could not fetch")
        console.log(error)
    }
}
const loginForm = document.querySelector("#login-form");
loginForm.addEventListener("submit", async (event) => {
    event.preventDefault()
    console.log("clicked")
    const email = loginForm.email.value
    const password = loginForm.password.value
    try {
        let userData = await getData()
        await userData.forEach((ele, i) => {
            console.log(email)
            if (ele.email == email) {
                if (ele.password == password) {
                    alert("Login Successful!")
                    window.location.href = "quiz.html"
                } else {
                    alert("Wrong Password")
                }
            } else {
                alert("User not found")
            }
        })
    } catch (error) {
        console.log(error)
    }


})