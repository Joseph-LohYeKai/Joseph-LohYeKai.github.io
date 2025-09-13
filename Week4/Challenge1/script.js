function calculate() {

    // YOUR CODE GOES HERE
    let no1 = document.getElementById("number1").value;
    let no2 = document.getElementById("number2").value;

    let sum = 0;
    for(i = Number(no1); i< Number(no2)+1 ; i++){
        sum += i;
    }

    document.getElementById("result").innerHTML = "The sum is: " + sum;
}