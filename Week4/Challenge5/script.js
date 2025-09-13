let score = 0;
let cards_this_round = [];
let cards_total_rounds =[];
let total_score = 0;



function generate_board() {

    //============================================================================
    // Task 1
    // Retrieve the friend name(s) from the 'friends' multi-select dropdown menu
    //============================================================================

    // Array to contain the names of user-selected friend(s)
    // For example, if the user selected 'Darryl' and 'Yin Kit',
    //   this array's value will be:
    //      [ 'darryl', 'yinkit' ]
    //
    let friends = []; // Initialize to empty


    // YOUR CODE GOES HERE
    
    let dropdown = document.getElementById("friends");
    let options = dropdown.getElementsByTagName("option");
    for(opt of options){
        if(opt.selected){
            friends.push(opt.value);
        }
    }
    
    
    // Display user's selection in Developer Tools --> Console.
    console.log(friends);



    //============================================================================
    // Task 2
    // Given one or more selected friends and given 4 fruit names,
    //   generate a 'randomized' Array of finalized card names.
    // 
    // Card names are as follows:
    //    apple_brandon.png
    //    banana_brandon.png
    //    kiwi_brandon.png
    //    orange_brandon.png
    //
    // where 'brandon' can be replaced with another friend's name,
    // e.g.
    //    apple_nick.png
    // (and so on)
    //
    // Display all 4 fruit cards of one or more selected friends.
    //
    // NOTE: Each card must be displayed TWO and ONLY TWO times (thus, a "pair")
    //       (such that the user can attempt to 'match').
    //
    // Check out this utility function (declared at the bottom of this file)
    //   for randomizing the order of Array elements.
    //        shuffleArray()
    //============================================================================
    const fruits = [ 'apple', 'banana', 'kiwi', 'orange' ];

    // YOUR CODE GOES HERE
    let listImage = [];

    for(friend of friends){
        for(fruit of fruits){
            listImage.push(fruit+"_"+friend+".png");
            listImage.push(fruit+"_"+friend+".png");
        }
    }
    console.log(shuffleArray(listImage))



    //============================================================================
    // Task 3
    // Display the cards in <div id="game-board">
    //
    // For this, we will make use of Template Literal (using backticks).
    //
    // NOTE: The game board will always have 4 columns and N rows, where N denotes
    //       (number of selected friends) x 2.
    //
    //       For example, if I chose 'Brandon', 'Darryl', and 'Nick' (3 friends),
    //         then the newly generated game board will be
    //         6 (rows) by 4 (columns).
    //============================================================================
    const num_cols = fruits.length;
    const num_rows = friends.length * 2;

    total_score = num_cols*num_rows;

    console.log("# of columns: " + num_cols)
    console.log("# of rows: " + num_rows);


    // YOUR CODE GOES HERE
    let counter =0
    let newHtml = ""
    for(i = 0; i<num_rows; i++){
        newHtml += "<div class = 'row'>"
        
        for (ix = 0; ix<num_cols; ix++){
            newHtml += "<div class = 'column'>"
            newHtml += "<img src='./cards/hidden.png' name='"+listImage[counter]+"'>"
            newHtml+="</div>"
            counter++;
        }
        newHtml += "</div>"
        
    }

    
    // You will need to rewrite the value of this result_str (String).
    let result_str = newHtml;


    // DO NOT MODIFY THE FOLLOWING
    // Replace the innerHTML of <div id="game-board">
    //   with a newly prepared HTML string (result_str).
    document.getElementById('game-board').innerHTML = result_str;

    document.getElementById("totalScore").innerHTML = "Total Score: " + score;

    addEventListener();
}


// Utility Function
// DO NOT MODIFY
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]]; // Swap elements
    }
    return array;
}

function addEventListener(){
    let table = document.getElementById("game-board");
    let cards = table.getElementsByTagName("img");
    for(card of cards){
        card.addEventListener("click",function() {
            clickedCard(this);
        });
    }

}

function clickedCard(obj){

    if(cards_this_round.length == 1 && cards_this_round[0] == obj){
            console.log("Do not select the same card");
            return
        }
    if(cards_total_rounds.includes(obj)){
        console.log("Do not select the card that has already won");
        return
    }

    obj.src = "./cards/" + obj.name;
    cards_this_round.push(obj);
    
    if(cards_this_round.length == 2){
        console.log("i have 2 cards");
        if(cards_this_round[0].name == cards_this_round[1].name){
            cards_this_round[0].style.opacity = 0.5;
            cards_this_round[1].style.opacity = 0.5;
            cards_total_rounds.push(cards_this_round[0]);
            cards_total_rounds.push(cards_this_round[1]);
            cards_this_round = [];
            score += 1;
            if(total_score/2 == score){
                document.getElementById("totalScore").innerHTML = "All matched congrats!";
            }
            else{
                document.getElementById("totalScore").innerHTML = "Total Score: " + score;
            }
            

        }
        else{
            
            setTimeout(() => {
            cards_this_round[0].src = "./cards/hidden.png";
            cards_this_round[1].src = "./cards/hidden.png";
            cards_this_round = [];
            }, 2000);
            
        }
    }


    
    
    

}
    
    
