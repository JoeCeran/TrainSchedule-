
 // Initialize Firebase
 var config = {
  apiKey: "AIzaSyD-efA_2sbo7AzKb0FQFTSBKWfe2igTJrs",
  authDomain: "jfc20181-5f567.firebaseapp.com",
  databaseURL: "https://jfc20181-5f567.firebaseio.com",
  projectId: "jfc20181-5f567",
  storageBucket: "jfc20181-5f567.appspot.com",
  messagingSenderId: "680150321456"
};
firebase.initializeApp(config);

var database = firebase.database();

// 2. Button for adding Trains
$("#add-train-btn").on("click", function(event) {
  event.preventDefault();

  // Grabs user input
  var trainName = $("#train-name-input").val().trim();
  var trainDest = $("#destination-input").val().trim();
  var trainTime = moment($("#time-input").val().trim(), "hh:mm").format("x");
  var trainFreq = $("#frequency-input").val().trim();

  console.log(trainTime);

  // Creates local "temporary" object for holding employee data
  var newTrain = {
    name: trainName,
    dest: trainDest,
    time: trainTime,
    freq: trainFreq
  };

  // Uploads employee data to the database
  database.ref().push(newTrain);

  // Logs everything to console
  console.log(newTrain.name);
  console.log(newTrain.dest);
  console.log(newTrain.time);
  console.log(newTrain.freq);

  alert("Train successfully added");

  // Clears all of the text-boxes
  $("#train-name-input").val("");
  $("#destination-input").val("");
  $("#time-input").val("");
  $("#frequency-input").val("");
});

// Firebase event
database.ref().on("child_added", function(childSnapshot) {
  console.log(childSnapshot.val());

  // Store everything into a variable.
  var trainName = childSnapshot.val().name;
  var trainDest = childSnapshot.val().dest;
  var trainStart = childSnapshot.val().time;
  var trainRate = childSnapshot.val().freq;

  // Calculate train times
  var diffTime = moment().diff(moment(trainStart, "X"), "minutes");
  var trainRemainder = diffTime % trainRate;
  var minsAway = trainRate - trainRemainder;
  var nextArrive = moment().add(minsAway, "minutes").format("hh:mm a");


  //append data to train table
  var newRow = $("<tr>").append(
    $("<td>").text(trainName),
    $("<td>").text(trainDest),
    $("<td>").text(trainRate),
    $("<td>").text(nextArrive),
    $("<td>").text(minsAway)
  );

  // Append the new row to the table
  $("#employee-table > tbody").append(newRow);
});