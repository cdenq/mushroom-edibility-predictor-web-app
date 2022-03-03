async function main(){

};

main();

async function prediction(){
    // values class options collated

    //call flask route
    let response = await fetch('/predict');
    let data = await response.json();

    //populate html with data
    document.querySelector("#predictions").textContent = data;
};