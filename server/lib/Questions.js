/* 
 * Questions.js 
 * 
 * Stores and gets new questions at random
 */

function Questions() {
    if ( !(this instanceof Questions) ) {
        return new Questions();
    }
    this.init([{
        question: 'What is 1 + 1?',
        choices: ['2', '11', 'blue', 'me and you']
    }]);
}



Questions.prototype.init = function(questions) {


    if (questions) {
        this.questions = questions;
    }
    this.unasked = [];
    for (var ii = 0; ii < this.questions.length; ii++) {
        this.unasked.push(ii);
    }
};


Questions.prototype.getQuestionObj = function(newQuestion) {
    if (!newQuestion) {
        return this.qo || {comment:'no newQuestion yet'};
    }
    if (this.unasked.length === 0) {
        this.init();
    }
    var unaskedIndx = Math.floor(Math.random() * this.unasked.length);
    
    var qn = this.unasked.splice(unaskedIndx, 1)[0];

    this.correctAnswer = this.questions[qn].choices[0];
    
    this.qo = {
        question: this.questions[qn].question,
        choices: randomizeArray(this.questions[qn].choices),
        points: this.questions[qn].points || 10
    };

    return this.qo;
};

Questions.prototype.getAnswer = function() {
    return this.correctAnswer;
};

Questions.prototype.isCorrect = function(data) {
    return this.correctAnswer && data.answer === this.correctAnswer && data.question === this.qo.question;
};

function randomizeArray(origArray) {
    var arr = origArray.slice(0); 
    var n = arr.length;
    var tmpArr = [];
    var indx;
    for (var ii = 0; ii < n-1; ii++) {
        indx = Math.floor(Math.random() * arr.length);
        tmpArr.push(arr.splice(indx,1)[0]);
    }
  
    tmpArr.push(arr[0]);
    return tmpArr;
}

module.exports = Questions();