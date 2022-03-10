document.querySelector("#predictButton").addEventListener("click", function(event) {
  event.preventDefault();
  console.log("Edison")
  prediction()
});

async function prediction(){
  document.getElementById('spinner').style.display = 'block';
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

  //turn off spinner 
  if (response) {
    document.getElementById('spinner').style.display = 'none';
  };

  // remove any old data
  let previous_data = document.querySelectorAll('.results');
  for (let k=0;k<previous_data.length;k++) {
      previous_data[k].remove();
  };

  //break off two pieces from data
  let table_info = (({amodelName, bmodelPrediction}) => ({amodelName, bmodelPrediction}))(data);
 
  //select location to insert data
  tBody = document.querySelector('tbody'); 

  //table with model name & prediction
  for (let i=0;i<5;i++){ //5 models = 5 rows
      let newtr = document.createElement('tr');
      newtr.setAttribute('class','results'); //new row class
      for (const value of Object.values(table_info)) {
          let newtd = document.createElement('td');
          let newAtt = document.createAttribute('class')
          //new class for cell
          if (value[i] == 1) {
            newtd.textContent = 'yes, edible' //add data to cell
            newAtt.value = 'table-success results';
          } else if (value[i] == 0) {
            newtd.textContent = 'no, inedible' //add data to cell
            newAtt.value = 'table-danger results';
          } else {
            newtd.textContent = value[i] //add data to cell
            newAtt.value = 'results';
          };
          newtd.setAttributeNode(newAtt);
          newtr.appendChild(newtd); // add new cell to new row
      };
      tBody.appendChild(newtr); // add new row to tbody
  };

  // chart of scores
  let models = data.amodelName;
  let accuracyScores = data.cmodelAccuracy;
  let precisionScores = data.emodelPrecision;
  let f1Scores = data.dmodelF1
  let recallScores = data.fmodelRecall;
  
  let trace1 = {
    type: 'scatter',
    x: accuracyScores,
    y: models,
    mode: 'markers',
    name: 'Accuracy',
    marker: {
      color: 'rgb(27,158,119)',
      line: {
        color: 'rgba(156, 165, 196, 1.0)',
        width: 1,
      },
      symbol: 'circle',
      size: 16
    }
  };

  let trace2 = {
    x: f1Scores,
    y: models,
    mode: 'markers',
    name: 'F1',
    marker: {
      color: 'rgb(217,95,2)',
      line: {
        color: 'rgba(217, 217, 217, 1.0)',
        width: 1,
      },
      symbol: 'circle',
      size: 16
    }
  };
  
  let trace3 = {
    x: precisionScores,
    y: models,
    mode: 'markers',
    name: 'Precision',
    marker: {
      color: 'rgb(117,112,179)',
      line: {
        color: 'rgba(217, 217, 217, 1.0)',
        width: 1,
      },
      symbol: 'circle',
      size: 16
    }
  };

  let trace4 = {
    x: recallScores,
    y: models,
    mode: 'markers',
    name: 'Recall',
    marker: {
      color: 'rgb(231,41,138)',
      line: {
        color: 'rgba(217, 217, 217, 1.0)',
        width: 1,
      },
      symbol: 'circle',
      size: 16
    }
  };

  let plot_data = [trace1, trace2, trace3, trace4];
  
  let layout = {
    title: 'Evaluation scores per model',
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
      autotick: true,
      ticks: 'outside',
      tickcolor: 'rgb(102, 102, 102)'
    },
    margin: {
      l: 160,
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