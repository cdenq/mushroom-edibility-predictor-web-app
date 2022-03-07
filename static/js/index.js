async function prediction(){
    //build object to pass
    let feature_list = {};

    let selections = document.getElementsByClassName('mushroom_traits');
    for (let i = 0; i < selections.length; i++) {
        feature_list[selections[i].id] = selections[i].value
    };

    console.log(feature_list)

    //feature_list in correct order for python fnc--or build that as part of the python function?
    //how to handle default "select xx" values (if user doesn't input answer for every field)
    //submit button inside form--how to make it call this function 
    


    //call flask route
    let response = await fetch('/predict', {
        method: "POST",
        credentials: "include",
        body: JSON.stringify(feature_list), 
        cache: "no-cache",
        headers: new Headers({
            "content-type": "application/json"
        })
    });
    let data = await response.json();

    //populate html with data
    document.querySelector("#predictions").textContent = data;
};