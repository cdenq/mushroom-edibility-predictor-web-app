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

    // remove old th data

    //populate html with data
    // table with model name & prediction
    post_data = document.querySelector('tbody');
    const newtr = document.createElement('tr');
    const newth = document.createElement('th');
   

    //add rows per @ results received--this is always the same tho?
    //for (i=0;i<data.length;i++):
   
    data.map(item => {
        let newth = document.createElement('th');
        newth.textContent = item;
        newth.id = 'results';
        document.querySelector('tr').appendChild.newth
    })

    // newth.textContent = data.modelName;
    // post_data.append(newth);
//    if edible: <td class="table-success">...</td>
//   if poisonous: <td class="table-danger">...</td>

    





    // chart of accuracy scores--will this be the same every time? 
};