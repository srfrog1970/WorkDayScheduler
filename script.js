//This loads the entirety of the HTML document before it loads the JS code
$(document).ready(function() {
  // listen for save button clicks
  //using JS to reference the class .saveBtn.
  // Becasue it is a button, we listen for the click and then perform a function
  $(".saveBtn").on("click", function() {
    // get nearby values
    //creates a variable called value and using 'this' specifys the object that  was clicked and retrives the data entered into it's sibling with the class .description. Text is selected from the class .description with the .val()
    var value = $(this)
      .siblings(".description")
      .val();
    //time variable is located using the id of the buttons parent tag where the hour id is located
    var time = $(this)
      .parent()
      .attr("id");

    // save in localStorage
    // we enter the time and value data captured above into the user local storage.
    localStorage.setItem(time, value);
    hourUpdater();
  });

  // this function hourUpdater is changing the classes of the hour to allow for css to change the colors.
  function hourUpdater() {
    // get current number of hours
    // create a new variable currentHour to capture the  current time
    var currentHour = moment().hours();
    // new variable created to capture the number of items in local storage that are in the present or future
    var countItems = 0;

    // loop over time blocks
    //selecting time-block and calling a function to select each time block and perform the following evaluation
    $(".time-block").each(function() {
      // Creates a variable blockHour that takes the current object and grabs the value of the attribute "ID", splits the value using a "-" as the delimiterr and grabs the second position in the array.
      var blockHour = parseInt(
        $(this)
          .attr("id")
          .split("-")[1]
      );

      // check if we've moved past this time
      // using the variable of blockHour and check if it is less that the time, if true then perform the fuctions
      if (blockHour < currentHour) {
        // referencing 'this' object add the class "past". This will trigger a change the color of block to gray per our CSS
        $(this).addClass("past");
      }
      // it the blockHour is equal to the current hour,  remove the class "past" and add the class "present" which changes the color to red
      else if (blockHour === currentHour) {
        $(this).removeClass("past");
        $(this).addClass("present");

        // check the local storage for task items, for each incriment the countItems variabe by 1
        hourValue = $(this).attr("id");
        if (localStorage.getItem(hourValue)) {
          countItems += 1;
        }
        //   if (localStorage.getItem() {
        //   countItems += 1;
        // }
      }
      // if none of the previous conditions apply,  remove the class "present", and the class "past"  and add the class "future" which changes the color to green
      else {
        $(this).removeClass("past");
        $(this).removeClass("present");
        $(this).addClass("future");

        // check the local storage for task items, for each incriment the countItems variabe by 1
        hourValue = $(this).attr("id");
        if (localStorage.getItem(hourValue)) {
          // console.log(hourValue);
          countItems += 1;
        }
      }
    });

    //render the count of items into the new p tag with the id "task-number"
    $("#task-number").text(countItems);
  }

  // call the function hourupdater to run
  hourUpdater();

  // set up interval to check if current time needs to be updated
  // the interval  varaiable runs the function hourUpdater every 15 seconds
  var interval = setInterval(hourUpdater, 15000);

  // load any saved data from localStorage
  // sets the value of locally stored getitem("hour-9") to the  ID (hour-9) and the class within that ID of .descriprion
  $("#hour-9 .description").val(localStorage.getItem("hour-9"));
  $("#hour-10 .description").val(localStorage.getItem("hour-10"));
  $("#hour-11 .description").val(localStorage.getItem("hour-11"));
  $("#hour-12 .description").val(localStorage.getItem("hour-12"));
  $("#hour-13 .description").val(localStorage.getItem("hour-13"));
  $("#hour-14 .description").val(localStorage.getItem("hour-14"));
  $("#hour-15 .description").val(localStorage.getItem("hour-15"));
  $("#hour-16 .description").val(localStorage.getItem("hour-16"));
  $("#hour-17 .description").val(localStorage.getItem("hour-17"));

  // display current day on page
  //selecting the currentDay id we render the date in the page
  $("#currentDay").text(moment().format("dddd, MMMM Do"));
});
