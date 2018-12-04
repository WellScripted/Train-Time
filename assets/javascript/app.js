$(document).ready(function () {
    var config = {
        apiKey: "AIzaSyB7L8TB5xrQug8dlQC7Tt41DAD6EGLzQqo",
        authDomain: "train-time-ee7c5.firebaseapp.com",
        databaseURL: "https://train-time-ee7c5.firebaseio.com",
        projectId: "train-time-ee7c5",
        storageBucket: "train-time-ee7c5.appspot.com",
        messagingSenderId: "694258523219"
    };
    firebase.initializeApp(config);
    console.log(firebase);

    var database = firebase.database();
    //var ref = database.ref();

    //onClick event variables
    var name;
    var destination;
    var firstTrain;
    var frequency = 0;

    //onClick Event
    $("#add-train").on("click", function () {
        event.preventDefault(); //clear variables
        name = $("#train-name").val().trim();
        destination = $("#destination").val().trim();
        firstTrain = $("#first-train").val().trim();
        frequency = $("#frequency").val().trim();

        //Push to firebase
        database.ref('trains').push({
            name: name,
            destination: destination,
            firstTrain: firstTrain,
            frequency: frequency
        });
        $("form")[0].reset();
    });

    //Database reference to added child
    database.ref('trains').on("child_added", function (childSnapshot) {
        console.log(childSnapshot)
        var nextArr;
        var minAway;
        //change year for first train
        var firstTrainNew = moment(childSnapshot.val().firstTrain, "hh:mm").subtract(1, "years");
        //Diff for current and first train
        var diffTime = moment().diff(moment(firstTrainNew), "minutes");
        var remainder = diffTime % childSnapshot.val().frequency;
        //Minutes until the arrival of the next train
        var minAway = childSnapshot.val().frequency - remainder;
        //Next train arrival time
        var nextTrain = moment().add(minAway, "minutes");
        nextTrain = moment(nextTrain).format("hh:mm");

        $("#add-row").append(`<tr>
        <td> ${childSnapshot.val().name} </td>
        <td> ${childSnapshot.val().destination} </td>
        <td> ${childSnapshot.val().frequency} </td>
        <td> ${nextTrain} </td>
        <td> ${minAway} </td>
        </tr>`);

        //To handle errors    
    }, function (errorObject) {
        console.log("Errors handled: " + errorObject.code);

    });

});