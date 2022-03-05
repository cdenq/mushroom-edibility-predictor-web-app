async function main(){

};

main();

async function prediction(){
    // values class options collated
    predict_list = ['this','is','a','test'];

    //build object to pass************
    let purple = document.getElementById('cap_shape')
    console.log(purple.value)

    let feature_list = {'cap_shape': purple};


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