const button = document.querySelector(".getList");
const tablesSection = document.querySelector("#tables");

button.addEventListener( "click", async ev => {
    ev.preventDefault();
    const studentsList = await fetch("http://localhost:3000/")
    .then(res => res.json())
    .then(res => res);
    const tables = document.querySelector(`#tables`);
    tables.innerHTML = "";
    for(const [table, students] of Object.entries(studentsList)){
        const article = document.createElement("article");
        console.log(article);
        for(const student of students){
            const p = document.createElement("p");
            console.log(p);
            p.innerHTML = `${student.firstName} ${student.lastName}`;
            article.appendChild(p);
        }
        tables.appendChild(article);
    }
})


