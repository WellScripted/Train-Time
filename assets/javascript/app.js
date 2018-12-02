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

    //onClick event variables
    const name;
    const destination;
    const firstTrain;
    const frequency = 0;

    //onClick Event
    $("#add-train").on("click", function() {
        empty(); //clear variables
        name = $("#train-name").val().trim();
        destination = $("#destination").val().trim();
        firstTrain = $("#first-train").val().trim();
        frequency = $("#frequency").val().trim();

        //Push to firebase
        database.ref().push({
            name: name,
            destination: destination,
            firstTrain: firstTrain,
            frequency: frequency,
            dateAdded: firebase.database.Servervalue.TIMESTAMP
        });
        $("form")[0].reset();
    });
    //Database reference to added child

    //Database refernce to order by Child


});