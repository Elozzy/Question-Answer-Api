'use strict';

let mongoose = require("mongoose");
let Schema = mongoose.Schema;

let sortAnswers = (a, b) => {
    // -negative a before b
    //0 no change
    // + postive a after b

    if(a.votes === b.votes){
        return a.updatedAt -b.updatedAt
    }
    return b.votes - a.votes;
} ;

let AnswerSchema = new Schema({
    text: String,
    createdAt: {type: Date, default: Date.now},
    updatedAt: {type: Date, default:Date.now},
    votes: {type: Number, default:0}
});

AnswerSchema.method("update" , (updates, callback) => {
    Object.assign(this, updates, {updatedAt: new Date()});
    this.parent().save(callback);
});

AnswerSchema.method("vote" , (vote, callback) => {
   if(vote === "up"){
        this.votes === 1;
   }else {
       this.votes -= 1;
   }
   this.parent().save(callback);
});


let QuestionSchema = new Schema({
    text: String,
    createdAt: {type: Date, default: Date.now},
    answers: [AnswerSchema]
});

QuestionSchema.pre("save", function(next){
    this.answers.sort(sortAnswers);
    next();
});

let Question = mongoose.model("Question", QuestionSchema);

module.exports.Question = Question;