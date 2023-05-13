

function addClasses(form){
    var formData = new FormData(form);
    var classes = [];
    var temp = 0;
    for(const pair of formData.entries()){
        classes[temp] = pair[1];
        temp = temp + 1;
    }

    localStorage.setItem("class1", classes[0]);
    localStorage.setItem("class2", classes[1]);
    localStorage.setItem("class3", classes[2]);
    localStorage.setItem("class4", classes[3]);
}