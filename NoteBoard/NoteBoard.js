var notesList = [];

addEventListener('load', function (e) {
    getLocalStorage();
    buildNoteList();
    var form = document.querySelector('form');
    form.addEventListener('submit', submitNote);
});

function submitNote(e) {
    e.preventDefault(); // prevents required from working
    var note = e.target;
    var text = note.querySelector('textarea');
    var date = note.querySelector('input[type=date]');
    var time = note.querySelector('input[type=time]');

    if (validateNote(text, date)) // Check if date or text is empty and display a msg
    {
        var newNote = {
            text: text.value,
            date: date.value,
            time: time.value
        };
        //console.log(newNote);
        addNotesGlobal(newNote);
        addNote(newNote);
        zeroElements(text, date, time);
    }
}

function validateNote(text, date) {
    var msg = document.getElementById("msg");
    msg.style.display = "inline";

    if (text.value.length < 1)
        msg.textContent = "Please fill in note text!"
    else if (date.value === "")
        msg.textContent = "Please fill in date!"
    else {
        var today = new Date();
        var currentDate = today.getFullYear() + '-' + ("0" + (today.getMonth() + 1)).slice(-2) + '-' + ("0" + today.getDate()).slice(-2);
        if (date.value < currentDate)
            msg.textContent = "Date is illegal!"
        else {
            msg.style.display = "none";
            return true;
        }
    }
    return false;
}

function buildNoteList() {
    document.querySelector('.container').innerHTML = "";
    for (var i = 0; i < notesList.length; i++)
        addNote(notesList[i]);
}

function addNote(note) {
    var newNoteDiv = buildNote(note);
    document.querySelector('.container').appendChild(newNoteDiv);
    setTimeout(function(){newNoteDiv.style.opacity=1;},0);
}

function buildNote(noteObject) {
    //console.log(noteObject);
    var note = document.createElement('div');
    note.classList.add('note');

    var textarea = document.createElement('textarea');
    textarea.disabled = true;
    textarea.rows = 8;
    textarea.cols = 19;
    textarea.classList.add('noteText');
    textarea.textContent = noteObject.text;
    note.appendChild(textarea);

    var date = document.createElement('span');
    date.classList.add('noteDate');
    date.textContent = noteObject.date;
    note.appendChild(date);

    var time = document.createElement('span');
    time.classList.add('noteTime');
    time.textContent = noteObject.time;
    note.appendChild(time);

    var button = document.createElement('button');
    button.type = 'button';
    button.classList.add('glyphicon');
    button.classList.add('glyphicon-remove');
    button.addEventListener('click', deleteNote);
    note.appendChild(button);

    return note;
}

function deleteNote(e){
    var note = e.target.parentNode;
    note.style.opacity=0;
    setTimeout(function(){removeFromNotesGlobal(note);note.remove();},1500);
}

function removeFromNotesGlobal(noteDiv) {
    var index = Array.from(document.querySelectorAll('.note')).indexOf(noteDiv);
    //console.log(index);
    notesList.splice(index, 1);
    saveLocalStorage();
}

function addNotesGlobal(newNote) {
    notesList.push(newNote);
    saveLocalStorage();
}

function saveLocalStorage() {
    var myJSON = JSON.stringify(notesList);
    localStorage.setItem('mySavedList', myJSON);
    //console.log(myJSON);
}

function getLocalStorage() {
    var savedList = localStorage.getItem('mySavedList');
    if (savedList)
        notesList = JSON.parse(savedList);
    //console.log(notesList);
}

function zeroElements(text, date, time) {
    text.value = "";
    date.value = "";
    time.value = "";
}
