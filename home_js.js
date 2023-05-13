// helper function to change a date Object into just Weekday, Date, Month Year format
// input: n/a
// output: a String with format Weekday, Date, Month Year
function changeIntoDateFormat(date){
    var allInfo = date.toString(); // not UTC but that's okay because I am the only one using this
    var lastSpaceIndex = 0;
    var counter = 0;
    for(let i = 0; i < allInfo.length; i++){
        if(allInfo[i] === ' ' && (counter != 4)){
            lastSpaceIndex = i;
            counter++;
        }
    }
    return allInfo.substring(0, lastSpaceIndex);
}

// helper function that gets the span of the week in [Date, Date] format
// input: n/a
// output: an array with format [Date, Date] (always size 2)
function getFirstAndLastDaysOfWeek(){
    Date.prototype.GetFirstDayOfWeek = function() {
        return (new Date(this.setDate(this.getDate() - this.getDay() + (this.getDay() == 0 ? -6 : 1) )));
    }
    Date.prototype.GetLastDayOfWeek = function() {
        return (new Date(this.setDate(this.getDate() - this.getDay() +7)));
    }
    
    var today = new Date();
    
    var firstDayOfWeek = today.GetFirstDayOfWeek();
    var lastDayOfWeek = today.GetLastDayOfWeek();
    const datesArray = [firstDayOfWeek, lastDayOfWeek];
    return datesArray;
}

// changes the header of the home page to Weekday, Date, Month Year - Weekday, Date, Month Year
// input: n/a
function changeWeekText(){
    var text = document.getElementById("title");
    const dates = getFirstAndLastDaysOfWeek();
    var firstDayOfWeek = dates[0];
    var lastDayOfWeek = dates[1];
    text.innerHTML = changeIntoDateFormat(firstDayOfWeek) + " - " + changeIntoDateFormat(lastDayOfWeek); 
}

// changes the days on the left side to the format Weekday, Month/Day
// input: n/a
function changeDatesText(){
    const allDays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
    for(let i = 0; i < allDays.length; i++){
        var text = document.getElementById(allDays[i]);
        const dates = getFirstAndLastDaysOfWeek();
        var firstDay = dates[0];
        var month = firstDay.getMonth() > 10 ? firstDay.getMonth() : "0" + firstDay.getMonth();
        var dayNum = firstDay.getDate() + i;
        var day = dayNum > 10 ? dayNum : "0" + dayNum;
        text.innerHTML = allDays[i] + ", " + month + "/" + day;
    }
}
function setHiddens(){
    const allDays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
    for(let i = 0; i < allDays.length; i++){
        var text = document.getElementById(allDays[i]);
        text.setAttribute("hidden", "hidden");
    }
    var text = document.getElementById("title");
    text.setAttribute("hidden", "hidden");
    document.getElementById("class_schedule").setAttribute("hidden", "hidden");
    document.getElementById("wrongInput").removeAttribute("hidden");
    document.getElementById("form").removeAttribute("hidden");
}

function removeHiddens(){
    const allDays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
    for(let i = 0; i < allDays.length; i++){
        var text = document.getElementById(allDays[i]);
        text.removeAttribute("hidden");
    }
    var text = document.getElementById("title");
    text.removeAttribute("hidden");
    document.getElementById("class_schedule").removeAttribute("hidden");
    document.getElementById("wrongInput").setAttribute("hidden", "hidden");
    document.getElementById("form").setAttribute("hidden", "hidden");
    
}

function onSuccessfulInput(){
    // we need to change the title text of the website to the current week
    changeWeekText();
    // change the dates on the sidelines
    changeDatesText();
    removeHiddens();
}





function validate(form){
    setHiddens();
    var formData = new FormData(form);
    var userNamePass = [];
    var temp = 0;
    for(const pair of formData.entries()){
        userNamePass[temp] = pair[1];
        temp = temp + 1;
    }
    if(userNamePass.length > 2){
        alert("somehow more than 2");
    }
    // we can keep going
    else{
        if(userNamePass[0] === localStorage.getItem("username")){
            if(userNamePass[1] === localStorage.getItem("password")){
                // okay, we can do stuff now
                alert("Successful login");
                onSuccessfulInput();
            }
        }
        else{
            setHiddens();
            var wrongInput = document.getElementById("wrongInput");
            wrongInput.removeAttribute("hidden");
            
        }

    }
}
