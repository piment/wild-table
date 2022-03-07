let sessions = require("./sessions.json");
const getWeekNumber = require("current-week-number");
// Loading require ressource for the app core
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const ejs = require("ejs");

// Creating the express app for route management
const app = express();

// Settings the app
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));




//VARIABLES
const students = sessions.toulouse.js.students;
const tablesListForWeek = {};
const currentWeekNumber = getWeekNumber();

const checkTablesList = (weekNumber) => {
    return tablesListForWeek[currentWeekNumber] == undefined ? false : tablesListForWeek[weekNumber];
}

const randomStudentsOrder = studentsList => {
    newStudentsOrderList = [];

    while(studentsList.length > 0){
        const student = studentsList.splice(Math.random() * studentsList.length, 1);
        newStudentsOrderList.push(...student);
    }

    return newStudentsOrderList;
};

 async function getStudentsListForThisWeek(currentWeekNumber) {
    if(tablesListForWeek[currentWeekNumber] !== undefined) {
        return tablesListForWeek[currentWeekNumber];
    }
    else {
        const orderedStudentsList = randomStudentsOrder(students);
        const orderedByTables = {
            0 : orderedStudentsList.slice(0,4),
            1 : orderedStudentsList.slice(4,8),
            2 : orderedStudentsList.slice(8,12),
            3 : orderedStudentsList.slice(12,16)
        }
        tablesListForWeek[currentWeekNumber] = orderedByTables;
        return tablesListForWeek[currentWeekNumber];
    }
}

/* 
Routes definitions for the app
*/

// Route for site index
app.get("/", cors(), async (req, res) => {
    const data = await getStudentsListForThisWeek(currentWeekNumber);
    res.render(".back/index", {studentsList: data, week: currentWeekNumber});
    // res.json(getStudentsListForThisWeek(currentWeekNumber));
});


// Start the server on port 3000
app.listen(3001, function() {
    console.log("Server started on port 3000");
});


