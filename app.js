// $(document).ready(function(){
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

    console.log(trainName, destination, firstTrainTime, frequency);
// Push this data into the firebase as a child object of the root
    database.ref().push({
      trainName: trainName,
      destination: destination,
      firstTrainTime: firstTrainTime,
      frequency: frequency
      
    });

})

// });