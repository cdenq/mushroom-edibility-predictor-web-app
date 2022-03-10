document.querySelector("#predictButton").addEventListener("click", function(event) {
  event.preventDefault();
  console.log("Edison")
  prediction()
});

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

  //populate html with data
  //table with model name & prediction

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

  // chart of accuracy scores
  let models = data.amodelName;
  let f1Scores = [77,22]; //***********
  let accuracyScores = data.cmodelAccuracy;
  
  let trace1 = {
    type: 'scatter',
    x: f1Scores,
    y: models,
    mode: 'markers',
    name: 'F1',
    marker: {
      color: 'rgba(156, 165, 196, 0.95)',
      line: {
        color: 'rgba(156, 165, 196, 1.0)',
        width: 1,
      },
      symbol: 'circle',
      size: 16
    }
  };
  
  let trace2 = {
    x: accuracyScores,
    y: models,
    mode: 'markers',
    name: 'Accuracy',
    marker: {
      color: 'rgba(204, 204, 204, 0.95)',
      line: {
        color: 'rgba(217, 217, 217, 1.0)',
        width: 1,
      },
      symbol: 'circle',
      size: 16
    }
  };
  
  let plot_data = [trace1, trace2];
  
  let layout = {
    title: 'Metrics per model',
    xaxis: {
      showgrid: false,
      showline: true,
      linecolor: 'rgb(102, 102, 102)',
      titlefont: {
        font: {
          color: 'rgb(204, 204, 204)'
        }
      },
      tickfont: {
        font: {
          color: 'rgb(102, 102, 102)'
        }
      },
      autotick: false,
      dtick: 10,
      ticks: 'outside',
      tickcolor: 'rgb(102, 102, 102)'
    },
    margin: {
      l: 140,
      r: 40,
      b: 50,
      t: 80
    },
    legend: {
      font: {
        size: 10,
      },
      yanchor: 'middle',
      xanchor: 'right'
    },
    width: 600,
    height: 600,
    paper_bgcolor: 'rgb(254, 247, 234)',
    plot_bgcolor: 'rgb(254, 247, 234)',
    hovermode: 'closest'
  };
  
  Plotly.newPlot('scores', plot_data, layout);

};