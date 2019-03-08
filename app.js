$(document).ready(function(){
  var config = {
      apiKey: "AIzaSyCkvf-3gihIqhgt5PiqwAiLDauzlZg1918",
      authDomain: "trainscheduleapp-73dc4.firebaseapp.com",
      databaseURL: "https://trainscheduleapp-73dc4.firebaseio.com",
      projectId: "trainscheduleapp-73dc4",
      storageBucket: "trainscheduleapp-73dc4.appspot.com",
      messagingSenderId: "151619763461"
  };
      firebase.initializeApp(config);

// Create a variable for the database
      var database = firebase.database();

// Initialize the variables for data collection
      var trainName = "";
      var destination = "";
      var firstTrainTime = "";
      var frequency = "";

// Add on click function to take data from input fields upon btn submission

    $("#add-train").on("click", function(event){
        event.preventDefault();

        trainName = $("#train-name-input").val().trim();
        destination = $("#train-dest-input").val().trim();
        firstTrainTime = $("#train-start-input").val().trim();
        frequency = $("#train-freq-input").val().trim();

    // Convert incoming first train time input into unix. Set it back 1 year to ensure it doesn't conflict w/ current time
        var firstTimeConverted = moment(firstTrainTime, "HH:mm");
        firstTimeConverted = moment(firstTimeConverted).format("X");


        console.log(trainName, destination, firstTimeConverted, frequency);
    // Push this data into the firebase as a child object of the root
        database.ref().push({
          trainName: trainName,
          destination: destination,
          firstTimeConverted: firstTimeConverted,
          frequency: frequency,
          dateAdded: firebase.database.ServerValue.TIMESTAMP
        });

    });

// Create a snapshot function on the child elements of the root database
    // To push data to the HTML every time a val changes
      database.ref().on("child_added", function(childSnapshot){

        var cSVal = childSnapshot.val();
        console.log(cSVal.frequency);
        
        // Convert unix firstTime back from unix and perform necessary calculations
        var firstTimeConvertedBack = moment.unix(cSVal.firstTimeConverted);
        firstTimeConvertedBack = moment(firstTimeConvertedBack, "HH:mm");
        console.log(firstTimeConvertedBack);
       
        // Find the current time
        var currentTime = moment().format("HH:mm");
        console.log(currentTime);
        
        // Find the difference between the current time and the first time
        var timeDifference = moment().diff(moment(firstTimeConvertedBack), "minutes");
        console.log(timeDifference);
        
        // Use cSVal Frequency to divide and find remainder, then subtract from frequency to get min away
        var timeRemainder = parseInt(timeDifference) % parseInt(cSVal.frequency);
        console.log(timeRemainder);
        
        var minutesAway = cSVal.frequency - timeRemainder; 
        console.log(minutesAway);

        // Add minutes away to the current time in minutes to get next arrival
        var nextArrival = moment().add(minutesAway, "minutes");
        nextArrival = moment(nextArrival).format("h:mm A");
        console.log(nextArrival);
        
        // Create a new row for the table
        var newTableRow = $("<tr>");
        
        // Create new data cells for each variable
        var tableTrainName = $("<td>").text(cSVal.trainName);

        var tableDestination = $("<td>").text(cSVal.destination);

        var tableNextArrival = $("<td>").text(nextArrival);

        var tableFrequency = $("<td>").text(cSVal.frequency);

        var tableMinAway = $("<td>").text(minutesAway);

        // Append data cells to row and then row to #table-data
        $(newTableRow).append(tableTrainName)
                    .append(tableDestination)
                    .append(tableFrequency)
                   .append(tableNextArrival)
                    .append(tableMinAway);
        $("#table-data").append(newTableRow);
                  

      }, function(errorObject){
        console.log("Errors encountered: " + errorOject);
      })


});