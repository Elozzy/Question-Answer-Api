'use strict';

let mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017/sandbox");

let db = mongoose.connection;

db.on("error", (err) => {
    console.error("connection error:" , err);
});

db.once("open", () => {
    console.log("db connection successful");
    // All database communication goes here

    let Schema = mongoose.Schema;
    let AnimalSchema = new Schema({
        type: String,
        color: String,
        size: String,
        mass: Number,
        name: String
    });

    let Animal = mongoose.model("Animal", AnimalSchema);

    let elephant = new Animal({
        type: "elephant",
        color: "gray",
        size: "big",
        mass: 6000,
        name: "Lawrence"
    });

    elephant.save((err) => {
        if (err) console.error("Save Failed", err);
        else console.log("Saved!");
        db.close(() => {
            console.log("db connection closed");
        });
    });


});
