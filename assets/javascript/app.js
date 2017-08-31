// Firebase
    var config = {
    apiKey: "AIzaSyCTooFYRwP8yWyg6vPMUAD5Sor_WYeD5e4",
    authDomain: "f-train-schedule.firebaseapp.com",
    databaseURL: "https://f-train-schedule.firebaseio.com",
    projectId: "f-train-schedule",
    storageBucket: "",
    messagingSenderId: "597881979395"
    };
    firebase.initializeApp(config);


   var database = firebase.database();



// Submit button
$("#submit").on("click", function() {

// Vars for html on page
	var trainName = $('#nameInput').val().trim();
    var destination = $('#destInput').val().trim();
    var firstTrainTime = moment($("#timeInput").val().trim(), "HH:mm").subtract(10, "years").format("X");
    var frequency = $('#freqInput').val().trim();

// Push to firebase
	database.ref().push({
		name: trainName,
		destination: destination,
    	trainTime: firstTrainTime,
    	frequency: frequency,
    	
	});

	// To stop refesh
	$("input").val('');
    return false;
});


// On click child_added function 
    database.ref().on("child_added", function(childSnapshot){
    //  console.log(childSnapshot.val());
    

    // Vars for firebase
        var Name = childSnapshot.val().name;
        var theDestination = childSnapshot.val().destination;
        var theFrequency = childSnapshot.val().frequency;
        var firstTrain = childSnapshot.val().trainTime;
        var currentTime = moment();


        // console.log("Name: " + name);
        // console.log("Destination: " + theDestination);
        // console.log("Time: " + firstTrain);
        // console.log("Frequency: " + theFrequency);
        // console.log(moment().format("HH:mm"));


    // Train time math
        var differenceTimes = moment().diff(moment.unix(firstTrain), "minutes");
        var timeRemainder = moment().diff(moment.unix(firstTrain), "minutes") % theFrequency ;
        var minutesAway = theFrequency - timeRemainder;
        var arrivalTime = moment().add(minutesAway, "m").format("hh:mm A");

    // Append to train table
        $('#currentTime').text(currentTime);
        $('#trainTable').append(
        "<tr><td id='nameDisplay'>" + Name +
        "</td><td id='destDisplay'>" + theDestination +
        "</td><td id='freqDisplay'>" + theFrequency +
        "</td><td id='nextDisplay'>" + arrivalTime +
        "</td><td id='awayDisplay'>" + minutesAway + "</td></tr>");
 },

function(errorObject){
    console.log("Read failed: " + errorObject.code)
});

