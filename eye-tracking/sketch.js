var table;

function preload() {
  //table is comma separated value "csv"
  //and has a header specifying the columns labels
  table = loadTable("eyetrackingA.csv", "csv", "header");
}

//create a global index, and initialize it to 1!

var index = 1;
function setup() {
  //create canvas and load background image
  //make sure that your background image isn't
  //too big of a file, as its going to be 
  //rerendered a lot
  bg = loadImage("versiona.png");
  createCanvas(1200, 552);
  background(bg);

  //initialize variables and store the columns in
  //them, using the getColumn accessor  
  var x_array = table.getColumn("X");
  var y_array = table.getColumn("Y");
  var times_array = table.getColumn("EpochTime");

  //find the max and min epoch times
  //so that you can map them into usable
  //time intervals
  var min_epoch = min(times_array);
  var max_epoch = max(times_array);

  //initialize an list to store the time values
  //then map each epoch time value to a reasonable
  //range and add them to the list
  //Heres a map() example:
  //m = map(value, 0, 100, 0, width);
  var x_y_time_list = [];
  for (i = 0; i < times_array.length; i++) {
    var mapped_epoch = map(times_array[i], min_epoch, max_epoch, 0, 30);
    var x_y_time = {
      x: x_array[i],
      y: y_array[i],
      time: mapped_epoch
    } 
    x_y_time_list.push(x_y_time);
  }

  //draw realtimes by calling anonymous function after timeouts - 
  //note that we have to redraw the entire background image and 
  //every line each time too because of the way processing
  //draw works :'(
  for (; index < x_y_time_list.length; ) {
    // setTimeout(function () {
    //   console.log(index);
    //   //redraw the background
    // background(bg);
    line(x_y_time_list[index-1].x,
        x_y_time_list[index-1].y,
        x_y_time_list[index].x,
        x_y_time_list[index].y);

    //   //draw every everyline again
      // for (inner_counter = 1; inner_counter <= index; inner_counter++) {
      //   line(x_y_time_list[inner_counter-1].x, 
      //       x_y_time_list[inner_counter-1].y,
      //       x_y_time_list[inner_counter].x,
      //       x_y_time_list[inner_counter].y);
      // }
       //call redraw()
    //   redraw();
    //   //incredment the global index
       index++;
    //  }, 
    // // add the proper
    // x_y_time_list[index-1].time // * 1000
    // );
  }
}