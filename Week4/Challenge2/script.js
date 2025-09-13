let button = document.getElementById("justin-btn");
let result = document.getElementById("result");


// Task 1
// Add an event listner to the button (the user drags his mouse over the button)
button.addEventListener("mouseenter",mousein)

function mousein(){
    result.style.color = "blue";
    result.style.backgroundColor = "pink";
    result.innerText = "Welcome to my heart"
}

// Task 2
// Add an event listner to the button (the user drags his mouse out of the button)
button.addEventListener("mouseout",mouseout)

function mouseout(){
    result.style.color = "red";
    result.style.backgroundColor = "black";
    result.innerText = "Don't Leave my heart"
}
