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
    console.log(data)
    // console.log(data.0modelName[0])


    //sort data object into correct order************
    

    //populate html with data
    // table with model name & prediction

    // remove any old data
    let previous_data = document.querySelectorAll('.results');
    for (let k=0;k<previous_data.length;k++) {
        previous_data[k].remove();
    };

    //select location to insert data
    tBody = document.querySelector('tbody'); 
    
    //add rows per # results received--this is always the same tho?
    let len = data.amodelName.length
 
    for (let i=0;i<len;i++){
        let newtr = document.createElement('tr');
        newtr.setAttribute('class',`row${i} results`); //new row class
        for (const [key, value] of Object.entries(data)) {
            let newtd = document.createElement('td');
            newtd.textContent = value[i] //add data to cell
            let newAtt = document.createAttribute('class')
            //new class for cell
            if (value[i] == 'edible') {
                newAtt.value = 'table-success results';
                newtd.setAttributeNode(newAtt);
            } else if (value[i] == 'inedible') {
                newAtt.value = 'table-danger results';
                newtd.setAttributeNode(newAtt);
            } else {
                newAtt.value = 'results';
                newtd.setAttributeNode(newAtt);
            };
            newtr.appendChild(newtd); // add new cell to new row
        };
        tBody.appendChild(newtr); // add new row to tbody
    };

    

    





    // chart of accuracy scores--will this be the same every time? 
};