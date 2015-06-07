
// ************************************
// *********** Global Stuff! **********
// ************************************

// -- global Audio Vars --
var audioContext;
var arraybuffer;
var fftObject;
var audioSource;
var samples = 1024;

// -- global var for svg --
var svg;






// ************************************
// ********** |\   ---  ***************
// ********** | |     | ***************
// ********** | |   --  ***************
// ********** | |     | ***************
// ********** |/   ---  ***************
// ************************************
// *** Data-Driven-Documents Domain ***
// ************************************


var colorGradient = d3.scale.linear()
    .domain([0.5, 0.75, 1])
    .range(['#ff0000', '#0000ff', '#00ff00']);

function d3Project(data){

  svg.selectAll('circle')
      .data(data)
      .enter()
        .append('circle');

  // NOTE!!!!
    //    Numbers here... are chosen for effect... they do not come from ANYWHERE...
    //    Someone played with random numbers... till... it... looked.... nice
    //    Play with these numbers... see what happens!!
  svg.selectAll('circle')
    .data(data)
        .attr('r', function(d){ return d/10 +'px';})
        .attr('cx', function(y, x){ return (100-(data.length/(x+1)))+'%';})
        .attr('cy', function(d){ return Math.abs(500-d*2) +'px';})
        .attr('class','bubble')
        .style('fill',function(d){ return colorGradient(320/d);})
        .style('opacity', function(d){ return d/100;});

    return svg;
}

// ************************************









// ************************************
// ********* Audio Handling ***********
// ************************************

function loadFile(mp3file) {
    var reqest = new XMLHttpRequest();
    reqest.open("GET", mp3file,true);
    reqest.responseType = "arraybuffer";
    reqest.onload = function() {
      audioContext.decodeAudioData(reqest.response, function(buffer) {
        audioBuffer = buffer;
        setAudioHandlers();
      });
    };
    reqest.send();
}


function setAudioHandlers() {

  var audioSource = audioContext.createBufferSource();
  audioSource.buffer = audioBuffer;
  fftObject = audioContext.createAnalyser();
  fftObject.fftSize = samples;
  audioSource.connect(fftObject);
  fftObject.connect(audioContext.destination);
  audioSource.start = audioSource.start || audioSource.noteOn;
  audioSource.start(0); // Drop the needle (play audio)

  var data = new Uint8Array(samples);

  setInterval(function(){
    fftObject.getByteFrequencyData(data);
    d3Project(data);
  }, 10); // repeat rendering project
}


// ************************************
// **** Let's get it started... Ha! ****
// ************************************

window.onload = function(){

  svg = d3.select('body')
          .append('svg')
            .attr('width', '95%')
            .attr('height', '800px');

  audioContext = new webkitAudioContext();
  loadFile('audio/Pusher.mp3');
  // loadFile('audio/YOUR AWESOME SONG');

};


// Andrew's code...
// function d3Project(data){
//
//   svg.selectAll('image')
//       .data(data)
//       .enter()
//       .append('image')
//         .attr("xlink:href", "http://cecelious.com/cecelious.gif")
//         .attr('width', '100px')
//         .attr('height', '100px')
//         .style('rx', '0.5');
//
//   // Numbers here... are chosen for effect... they do not come from anywhere...
//   svg.selectAll('image')
//     .data(data)
//         // .attr('r', function(d){ return d/12 +'px';})
//         .attr('x', function(y, x){ return (100-(data.length/(x+1)))+'%';})
//         .attr('y', function(d){ return Math.abs(500-d*2) +'px';})
//         .attr('class','bubble')
//         // .style('fill',function(d){ return colorGradient(120/d);})
//         .style('opacity', function(d){ return d/200;});
//     return svg;
// }
