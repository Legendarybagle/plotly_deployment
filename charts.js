function init() {
  // Grab a reference to the dropdown select element
  var selector = d3.select("#selDataset");

  // Use the list of sample names to populate the select options
  d3.json("samples.json").then((data) => {
    var sampleNames = data.names;
    sampleNames.forEach((sample) => {
      selector
        .append("option")
        .text(sample)
        .property("value", sample);
    });

    // Use the first sample from the list to build the initial plots
    var firstSample = sampleNames[0];
    buildCharts(firstSample);
    buildMetadata(firstSample);
  });
}

// Initialize the dashboard
init();

function optionChanged(newSample) {
  // Fetch new data each time a new sample is selected
  buildMetadata(newSample);
  buildCharts(newSample);
  
}

// Demographics Panel 
function buildMetadata(sample) {
  d3.json("samples.json").then((data) => {
    var metadata = data.metadata;
    // Filter the data for the object with the desired sample number
    var resultArray = metadata.filter(sampleObj => sampleObj.id == sample);
    var result = resultArray[0];
    // Use d3 to select the panel with id of `#sample-metadata`
    var PANEL = d3.select("#sample-metadata");

    // Use `.html("") to clear any existing metadata
    PANEL.html("");

    // Use `Object.entries` to add each key and value pair to the panel
    // Hint: Inside the loop, you will need to use d3 to append new
    // tags for each key-value in the metadata.
    Object.entries(result).forEach(([key, value]) => {
      PANEL.append("h6").text(`${key.toUpperCase()}: ${value}`);
    });

  });
}

// 1. Create the buildCharts function.
function buildCharts(sample) {
  // 2. Use d3.json to load and retrieve the samples.json file 
  d3.json("samples.json").then((data) => {
    // 3. Create a variable that holds the samples array. 
    var samples = data.samples;
    // 4. Create a variable that filters the samples for the object with the desired sample number.
    // var desired = samples.filter(mothman => mothman.id == sample);
    const desired = samples.filter(function(item){
      return item.id == sample;
  })


    console.log(desired)
    //  5. Create a variable that holds the first sample in the array.
    var first = desired[0];
    console.log(first)
    // 6. Create variables that hold the otu_ids, otu_labels, and sample_values.
    var otuIds = desired.map(x => x.otu_ids)[0];
    console.log(otuIds)
    var otuLabels = desired.map(x => x.otu_labels)[0];
    console.log(otuLabels)
    var sampleValues = desired.map(x => x.sample_values)[0];
    console.log(sampleValues)

    // 7. Create the yticks for the bar chart.
    // Hint: Get the the top 10 otu_ids and map them in descending order  
    //  so the otu_ids with the most bacteria are last. 
    var yticks = otuIds.slice(0,10).map(x => "Otu " + x.toString()).reverse();
    var xvalues = sampleValues.slice(0,10).reverse();
    // 8. Create the trace for the bar chart. 
    var barData ={
        x: xvalues,
        y: yticks,
        type: 'bar',
        orientation: 'h'
      };
    console.log(yticks);
    console.log(xvalues);
    // 9. Create the layout for the bar chart. 
    var barLayout = {
     title: 'Top 10 Bacteria Found',
     xaxis: {title: 'otuValue'},
     yaxis: {title: 'otuId'}
    };
    // 10. Use Plotly to plot the data with the layout. 
    Plotly.newPlot("bar", [barData], barLayout);
  



// Bar and Bubble charts
// Create the buildCharts function.
    // 1. Create the trace for the bubble chart.
    var bubbleData = [{
      x: otuIds,
      y: sampleValues,
      text: otuLabels,
      mode: "markers",
      marker:{
           color: otuIds,
            size: sampleValues
      }
    }];

    // 2. Create the layout for the bubble chart.
    var bubbleLayout = {
      title: 'Bacteria Cultures Per Sample',
      showlegend: false,
      height: 600,
      width: 1200
    };

    // 3. Use Plotly to plot the data with the layout.
    Plotly.newPlot('bubble', bubbleData, bubbleLayout); 





    // 1. Create a variable that filters the metadata array for the object with the desired sample number.

    // Create a variable that holds the first sample in the array.
    d3.json("samples.json").then((data) => {
      var metadata = data.metadata;
      // Filter the data for the object with the desired sample number
      var resultArray = metadata.filter(sampleObj => sampleObj.id == sample);
      var result = resultArray[0];
    // 3. Create a variable that holds the washing frequency.
    washingFrequency = parseFloat(result.wfreq);
    // 4. Create the trace for the gauge chart.
    var gaugeData = [{
     value: washingFrequency,
     type: 'indicator',
     mode: "gauge+number",
     title: {text: 'Belly Button Washing Frequency'},
     gauge: {
      axis: { range: [null, 10], tickwidth: 1, tickcolor: "black" },
      bar: { color: "darkblue" },
      bgcolor: "white",
      borderwidth: 2,
      bordercolor: "gray",
      steps: [
        { range: [0, 2], color: "red" },
        { range: [2, 4], color: "orange" },
        { range: [4, 6], color: "yellow" },
        { range: [6, 8], color: "green" },
        { range: [2, 4], color: "cyan" },

      ],
      threshold: {
        line: { color: "red", width: 4 },
        thickness: 0.75,
        value: 490
      }
    }
    }];
        
    // 5. Create the layout for the gauge chart.
    var gaugeLayout = { 
      width: 500,
      height: 400,
      margin: { t: 25, r: 25, l: 25, b: 25 },
      paper_bgcolor: "lavender",
      font: { color: "darkblue", family: "Arial" }
    };
    
    // 6. Use Plotly to plot the gauge data and layout.
    Plotly.newPlot('gauge', gaugeData, gaugeLayout);
  })
  });
  }