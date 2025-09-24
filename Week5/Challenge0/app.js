


/* Task 6 - API call */
function get_all_drinks() {
    console.log("[START] get_all_drinks()");

    // const api_endpoint_url = 'drinks.json'; // local file
    const api_endpoint_url = 'http://localhost/DrinksAPI/api/drink/read.php'; // external api

    axios.get(api_endpoint_url).
    then(response => {
        console.log("Axios call completed successfully!");
        console.log(response.data);
        

        let section_results = document.getElementById('results');

        // Build a string of Bootstrap cards
        let result_str = ``;
        let drinks_array = response.data.records; // Array of drink objects
        console.log(drinks_array); // Array of drink objects

        /* loop through this drink array
        - each item is a drink
        - each drink should be a bootstrap card 
        */

        // Task 4 - Display Drinks
        //   Each drink is a Bootstrap card
        // Replace all the hard-coded strings with actual values as read from the JSON file
        for(let drink of drinks_array) {
            let photo = 'http://localhost/DrinksAPI/'+ drink.photo_url
            
            result_str += `
                <div class="col">
                    <div class="card h-100">
                        <img src="${photo}" 
                             class="card-img-top"
                             alt="${drink.name}">
                        <div class="card-body">
                            <h5 class="card-title">
                                ${drink.name}
                            </h5>
                            <p class="card-text small text-muted mb-0">
                                ${drink.category} • ${drink.alcoholic}
                            </p>
                        </div>
                    </div>
                </div>
            `;
        }
        
        // Inject the cards into the #results section
        section_results.innerHTML = result_str;
    }).
    catch(error => {
        console.log(error.message);

        // Task 5 - Data can't be loaded, display alert
        //   "Failed to load drinks data."
        // YOUR CODE GOES HERE
        section_alert = document.getElementById("alerts");
        section_alert.innerHTML = `
        <div class="alert alert-danger" role="alert">
        Failed to load drinks
        </div>
        `;
    });

    console.log("[END] get_all_drinks()");
}


/* Task 7 - Category Dropdown Menu */
function populate_category_dropdown() {
    console.log("[START] populate_category_dropdown()");

    const api_endpoint_url = 'http://localhost/DrinksAPI/api/drink/category.php'; // API endpoint

    axios.get(api_endpoint_url).
    then(response => {

        console.log("Axios call completed successfully!");
        category = response.data.records;
        
        // YOUR CODE GOES HERE
        let CategoryDropDownElement = document.getElementById("category");
        for (cat of category){
            let selectElement = document.createElement("option");
            selectElement.value = cat;
            let textNode = document.createTextNode(cat);
            selectElement.appendChild(textNode);
            CategoryDropDownElement.appendChild(selectElement);
        }
    }).
    catch(error => {
        console.log(error.message);
    });

    console.log("[END] populate_category_dropdown()");
}


let c = "";
let a = "";
let n = ""; 

/* Task 8 - Category Dropdown Event Listener */
const CategoryDropDownElement = document.getElementById("category");

CategoryDropDownElement.addEventListener("change", function(){dropdownEvent(this);});

function dropdownEvent(obj){
    console.log("Category pressed")
    c = obj.value;
    fieldChanged()
    
}



/* Task 9 - Alcoholic Dropdown Event Listener */
const alcoholicDropdown = document.getElementById("alcoholic");

alcoholicDropdown.addEventListener("change", function(){alcoholicDropdownEvent(this);});

function alcoholicDropdownEvent(obj){
    console.log("Category pressed")
    a = obj.value;
    fieldChanged()
}


/* Task 10 - Name search input Event Listener */

const nameElement = document.getElementById("name_search");

nameElement.addEventListener("input", function(){nameEvent(this);});

function nameEvent(obj){

    n = obj.value;
    fieldChanged()
}







function fieldChanged(){
    const apiEndpointCategory = `http://localhost/DrinksAPI/api/drink/search.php?c=${c}&a=${a}&n=${n}`;


    let resultsElement = document.getElementById("results");
    resultsElement.innerHTML = "";

    axios.get(apiEndpointCategory).
    then(
        response => {
            let drinksArr = response.data.records;
            let section_results = document.getElementById("results");
            for (drink of drinksArr){
                let divElementCol = document.createElement("div");
                divElementCol.className = "col";

                let divCard = document.createElement("div");
                divCard.className = "card h-100";

                let imgElement = document.createElement("img");
                imgElement.src = "http://localhost/DrinksAPI/" + drink.photo_url;
                imgElement.className = "card-img-top";

                let divCardBody = document.createElement("div");
                divCardBody.className = "card-body";

                let h5CardTitle = document.createElement("h5");
                h5CardTitle.className = "card-title";
                let h5CardTitleTextNode = document.createTextNode(drink.name);
                h5CardTitle.appendChild(h5CardTitleTextNode);

                let pElement = document.createElement("p");
                pElement.className = "card-text small text-muted mb-0";
                let pElementTextNode = document.createTextNode(drink.category + " • " + drink.alcoholic);
                pElement.appendChild(pElementTextNode);

                divCardBody.appendChild(h5CardTitle);
                divCardBody.appendChild(pElement);
                divCard.appendChild(imgElement);
                divCard.appendChild(divCardBody);
                divElementCol.appendChild(divCard);

                console.log(divElementCol);
                resultsElement.appendChild(divElementCol)
                
            }
        }
    ).
    catch(error=>{
        console.error(error.message);
    })
}
// DO NOT MODIFY THE BELOW LINES
get_all_drinks();
populate_category_dropdown();