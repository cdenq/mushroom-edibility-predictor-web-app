async function prediction(){
    //build object to pass
    let feature_list = {};
    //all user input elements
    let selections = document.getElementsByClassName('mushroom_traits');
    for (let i = 0; i < selections.length; i++) {
        let selection = selections[i].value;
        //filter for traits that user did not input
        if (selection.includes('Select')){
            feature_list[selections[i].id] = '0'; 
        } else {
            feature_list[selections[i].id] = selection;
        };
    };

    // console.log(feature_list);

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