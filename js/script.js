window.onload = function() {
    display();

}

async function display() {
    let response = await fetch("http://localhost:5001/students");
    let json;
    if (response.ok) {
        json = await response.json();
        //
        addOptionToUpd("[Select]");
        for (let e of json) {
            addRowToTable(e.id, e.name, e.program);
            // add options for select tag
            addOptions(e.id);
            addOptionToUpd(e.id);
        }
    }
    else alert("Error" + response.status);

}

function addOptionToUpd(id) {
    let selectNode = document.getElementById("ddlStudentForUpdate"); //update form - select tag
    let optionNode = document.createElement('option');
    optionNode.setAttribute("id", "option_"+id);
    optionNode.appendChild(document.createTextNode(id));
    selectNode.appendChild(optionNode);
}


function addOptions(id) {
    let selectNode = document.getElementById("ddlStudent");
    let optionNode = document.createElement('option');
    optionNode.appendChild(document.createTextNode(id));
    selectNode.appendChild(optionNode);
}
function removeOption() {  
    var x = document.getElementById("ddlStudent");  
    x.remove(x.selectedIndex);
}
function removeElementById(elementId) {
    document.getElementById(elementId).remove();
}
function addRowToTable(id, name, program) {
    let row = document.createElement('tr');
    row.setAttribute("id", id);
    for (let e of arguments) {
        let cell = document.createElement('td');
        cell.appendChild(document.createTextNode(e));
        row.appendChild(cell);
    }
    document.getElementById('tbodyStudentList').appendChild(row);
}

async function addStudent(id, name, program) {
    let obj = { id, name, program };
    let setting = {
        method: "POST",
        body: JSON.stringify(obj),
        headers: { "Content-Type": 'application/json' }
    }
    let response = await fetch("http://localhost:5001/students", setting);
    if (response.ok) {
        addRowToTable(id, name, program);
        addOptions(id);
        addOptionToUpd(id);
    } else alert("Error " + response.status);

}

document.getElementById('btnRegister').addEventListener("click", () => {
    let id = document.getElementById('id').value;
    let name = document.getElementById('name').value;
    let program = document.getElementById('program').value;
    addStudent(id, name, program);
    reset();
});

document.getElementById("btnDelete").addEventListener("click", ()=>{
    let selectedIdValue = document.getElementById("ddlStudent").value;
    //call deleteStudent
    deleteStudent(selectedIdValue);
    
})

async function deleteStudent(id) {
    let setting = {
        method: "DELETE",
        //body: JSON.stringify(obj),
        //headers: { "Content-Type": 'application/json' }
    }
    let response = await fetch("http://localhost:5001/students/" + id, setting);
    if (response.ok) {
        removeElementById(id);
        alert("DELETED SUCCESSFULL");
        removeOption();
        removeElementById("option_"+id);
        reset();
    } else alert("Error " + response.status);

}
function reset() {
    document.getElementById('myform').reset();
}

document.getElementById("ddlStudentForUpdate").addEventListener("change", ()=>{
    let selectNode = document.getElementById("ddlStudentForUpdate");
    console.log(selectNode.selectedIndex + ":" + selectNode.value);
    //
    if (selectNode.selectedIndex == 0) {
        //alert('Please select an Id of student to update');
        reset();
    } else {
        loadStudent(selectNode.value);//value = id of student
    }
})
async function loadStudent(id) {
    let setting = {
        method: "GET"
    }
    let response = await fetch("http://localhost:5001/students/" + id, setting);
    if (response.ok) {
            let e = await response.json();
            console.log(e.name);
            document.getElementById("idForUpdate").value = e.id;
            document.getElementById("nameForUpdate").value = e.name;
            document.getElementById("programForUpdate").value = e.program;
    }
    else alert("Not found the given student " + response.status);

}

document.getElementById("btnUpdate").addEventListener("click", ()=>{
    let id = document.getElementById("idForUpdate").value;
    let name = document.getElementById("nameForUpdate").value;
    let program = document.getElementById("programForUpdate").value;
    updateStudent(id, name, program);//call REST
    updateTableRow(id, name, program);//UI
    reset();
})

function updateTableRow(id, name, program) {
    let elementRow = document.getElementById(id);
    console.log(elementRow); //tr
    // let HTMLCollection = elementRow.children; //td list
    // Array.from(HTMLCollection).forEach(function (td) {
            console.log(elementRow.children[0]);
            elementRow.children[1].textContent = name;
            elementRow.children[2].textContent = program;

}

async function updateStudent(id, name, program) {
    let body = {name, program};
    let setting = {
        method: "PUT",
        body: JSON.stringify(body),
        headers: { "Content-Type": 'application/json' }
    }
    let response = await fetch("http://localhost:5001/students/" + id, setting);
    if (response.ok) {
        alert("UPDATED SUCCESSFULL");
        let updatedObj = response.json();
        console.log("updatedObj" + updatedObj);
        
    }
    else alert("Error during update the student " + response.status);

}