function checkDays(isWeek6Days) {
    if (!is6days)
    {
        document.getElementById("Суббота").style.display = "none";
        document.getElementById("Суббота-button").style.display = "none";
    }
    else 
    {
        document.getElementById("Суббота").style.display = "";
        document.getElementById("Суббота-button").style.display = "";
    }
}

class Lesson {

    constructor(object) {
        for (var prop in object) this[prop] = object[prop];
    }
    static putHeader(table) {
        let columns = ["Время", "Преподаватель", "Аудитория", "Предмет"];
        let headerColumns = document.createElement("tr");
        for (var i=0; i < 4; i++) {
            let element = document.createElement("th");
            element.innerText = columns[i];
            element.className = columns[i];
            headerColumns.appendChild(element);
        }
        table.appendChild(headerColumns);
    }
    putInTable(table) {
        this.table = table;
        let row = document.createElement("tr");
        this.uniqueId = Math.floor(Math.random()*1000000);
        row.id = this.uniqueId;
        let time = document.createElement("td");
        let timeField = document.createElement("input");
        timeField.value = this.time;
        time.appendChild(timeField);
        time.className = "Время";

        let teacher = document.createElement("td");
        let teacherField = document.createElement("input");
        teacherField.value = this.teacher;
        teacher.appendChild(teacherField);
        teacher.className = "Преподаватель";

        let room = document.createElement("td");
        let roomField = document.createElement("input");
        roomField.value = this.room;
        room.appendChild(roomField);
        room.className = "Аудитория";

        let subject = document.createElement("td");
        let subjectField = document.createElement("input");
        subjectField.value = this.subject;
        subject.appendChild(subjectField);
        subject.className = "Предмет";

        let remove = document.createElement("td");
        remove.innerText = "-";
        remove.className = "remove";
        remove.addEventListener("click", this.removeFromDocument.bind(this), false);
        row.appendChild(time);
        row.appendChild(teacher);
        row.appendChild(room);
        row.appendChild(subject);
        row.appendChild(remove);
        table.appendChild(row);
        row.addEventListener("mouseenter", this.onMouseEnter.bind(this), false);
        row.addEventListener("mouseleave", this.onMouseLeave.bind(this), false);
    }
    onMouseEnter(event) {
    }
    onMouseLeave(event) {
        let fields = event.target.children;

        let inputTime = fields[0].getElementsByTagName("input")[0];
        this.time = inputTime.value;

        let inputTeacher = fields[1].getElementsByTagName("input")[0];
        this.teacher = inputTeacher.value;

        let inputRoom = fields[2].getElementsByTagName("input")[0];
        this.room = inputRoom.value;

        let inputSubject = fields[3].getElementsByTagName("input")[0];
        this.subject = inputSubject.value;

        WeekStorage.setItem("Week-schedule", JSON.stringify(week));
    }
    isEmpty() {
        if (this.time === "" && this.teacher === "" && this.room === "" && this.subject === "")
            return true;
        else 
            return false;
    }
    removeFromDocument(event) {
        let row = document.getElementById(this.uniqueId);
        let weekday = row.parentElement.id;
        row.remove();
        for (var i = 0; i < week[weekday].lessons.length; i++)
        {
            if (week[weekday].lessons[i].uniqueId == this.uniqueId)
            {
                week[weekday].lessons.splice(i, 1);
                break;
            }
        }
        WeekStorage.setItem("Week-schedule", JSON.stringify(week));
    }
}
class Weekday {
    constructor(object) {
        for (var prop in object) this[prop] = object[prop];
    }
    putInSchedule(schedule) {
        this.schedule = schedule;
        let mainTable = document.createElement("table");
        mainTable.className = "schedule-table"
        this.table = mainTable;
        mainTable.id = this.name;
        let headerNameRow = document.createElement("tr");
        let headerName = document.createElement("th");
        headerName.innerText = this.name;
        headerName.colSpan = "5";
        headerNameRow.appendChild(headerName);
        mainTable.appendChild(headerNameRow);
        Lesson.putHeader(mainTable);
        schedule.appendChild(mainTable);
        for (var i=0; i < this.lessons.length;i++) {
            this.lessons[i].putInTable(mainTable);
        }
        let additionButton = document.createElement("button");
        additionButton.innerText = "+";
        additionButton.id = this.name + "-button";
        additionButton.addEventListener("click", this.addNewLessons.bind(this), false);
        schedule.appendChild(additionButton);
    }
    addNewLessons() {
        if (this.lessons.length != 0 && this.lessons[this.lessons.length - 1].isEmpty() )
            return;
        let lesson = new Lesson({"time":"", "teacher":"", "room":"", "subject":""});
        this.lessons.push(lesson);
        lesson.putInTable(this.table);
    }
}

let WeekStorage = window.localStorage;

let week = {"Понедельник": new Weekday({"name":"Понедельник", "lessons":[]}),
"Вторник": new Weekday({"name":"Вторник", "lessons":[]}),
"Среда": new Weekday({"name":"Среда", "lessons":[]}),
"Четверг": new Weekday({"name":"Четверг", "lessons":[]}),
"Пятница": new Weekday({"name":"Пятница", "lessons":[]}), 
"Суббота": new Weekday({"name":"Суббота", "lessons":[]})};
if (!WeekStorage.isEmpty)
{
     weekInJSON = JSON.parse(WeekStorage.getItem('Week-schedule'));
     for (key in weekInJSON)
     {
         week[key] = new Weekday(weekInJSON[key]);
         for (keyLesson in week[key]['lessons'])
         {
            week[key]['lessons'][keyLesson] = new Lesson(week[key]['lessons'][keyLesson]);
         }
     }
}
let schedule = document.getElementById("interactive-schedule");
for (key in week) {
    week[key].putInSchedule(schedule);
}
let button5 = document.getElementById("5-day");
let button6 = document.getElementById("6-day");
button6.addEventListener("click", function(event) {
    is6days = event.target.checked;
    checkDays(is6days);
}, false);
button5.addEventListener("click", function(event) {
    is6days = !event.target.checked;
    checkDays(is6days);
}, false);

let is6days = WeekStorage.getItem("6-day_week");
if (is6days === null)
{
    WeekStorage.setItem("6-day_week", false);
    is6days = false;
}
is6days = (is6days == "true");
button5.checked = !is6days;
button6.checked = is6days;

if (!is6days)
{
    document.getElementById("Суббота").style.display = "none";
    document.getElementById("Суббота-button").style.display = "none";
}
