async function main(){

};

main();

async function prediction(){
    // values class options collated
    predict_list = ['this','is','a','test']
    //call flask route
    let response = await fetch('/${predict_list}');
    let data = await response.json();

    //populate html with data
    document.querySelector("#predictions").textContent = data;
};