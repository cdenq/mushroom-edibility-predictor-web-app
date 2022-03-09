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

    // test code to make sure function is working
    // document.querySelector("#predictions").textContent = data;
    // console.log(data)
    // console.log(data.modelName[0])

    //populate html with data
    // table with model name & prediction

    // remove old data**********This isn't right
    // let previous_data = document.querySelectorAll('#results');
    // document.removeChild(previous_data); 

    tBody = document.querySelector('tbody'); //select location to insert data
    let newtr = document.createElement('tr');
    let newtd = document.createElement('td');

    //add rows per @ results received--this is always the same tho?
    let len = data.modelName.length
 
    //row class
    //add th model name
    //add th prediction
        //add attribute class = 'table-success' or 'table-danger' 
    //add th model score
    //add cell to row
    //add tr to tbody
    //set class = results 


    for (let i=0;i<len;i++){
        newtr.setAttribute('class',`row${i}`); //new row class
        for (const [key, value] of Object.entries(data)) {
            console.log(`${key}: ${value[i]}`);
            newtd.textContent = value[i] //add data to cell
            newtd.setAttribute = ('class','results'); //new class for cell
            newtr.appendChild(newtd); // add new cell to new row
        };
            // newtd.textContent = data.string[i]; 
            // newtd.textContent = data.modelPrediction[i];
            // newtd.textContent = data.modelAccuracy[i];
        tBody.appendChild(newtr); // add new row to tbody
    };

    

    





    // chart of accuracy scores--will this be the same every time? 
};