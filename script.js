let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

showTasks();

function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function addTask() {
    const subject = document.getElementById("subject").value;
    const task = document.getElementById("task").value;
    const deadline = document.getElementById("deadline").value;

    if (subject === "" || task === "" || deadline === "") {
        alert("Lūdzu, aizpildi visus laukus!");
        return;
    }

    tasks.push({
        subject: subject,
        task: task,
        deadline: deadline,
        done: false
    });

    saveTasks();

    document.getElementById("subject").value = "";
    document.getElementById("task").value = "";
    document.getElementById("deadline").value = "";

    showTasks();
}

function showTasks() {
    const taskList = document.getElementById("taskList");
    const filter = document
        .getElementById("filterSubject")
        .value
        .toLowerCase();

    taskList.innerHTML = "";

    tasks.forEach((item, index) => {

        if (
            filter !== "" &&
            !item.subject.toLowerCase().includes(filter)
        ) {
            return;
        }

        const li = document.createElement("li");

        li.innerHTML = `
            <strong>${item.subject}</strong><br>
            ${item.task}<br>
            Termiņš: ${item.deadline}<br>
            Statuss: ${item.done ? "Izpildīts" : "Neizpildīts"}<br><br>

            <button onclick="markDone(${index})">
                Izpildīts
            </button>

            <button onclick="deleteTask(${index})">
                Dzēst
            </button>
        `;

        taskList.appendChild(li);
    });
}

function markDone(index) {
    tasks[index].done = true;
    saveTasks();
    showTasks();
}

function deleteTask(index) {
    tasks.splice(index, 1);
    saveTasks();
    showTasks();
}
function showTodayTasks() {
    const taskList = document.getElementById("taskList");
    const today = new Date().toISOString().split("T")[0];

    taskList.innerHTML = "";

    tasks.forEach((item, index) => {
        if (item.deadline === today) {
            const li = document.createElement("li");

            li.innerHTML = `
                <strong>${item.subject}</strong><br>
                ${item.task}<br>
                Termiņš: ${item.deadline}<br>
                Statuss: ${item.done ? "Izpildīts" : "Neizpildīts"}<br><br>

                <button onclick="markDone(${index})">
                    Izpildīts
                </button>

                <button onclick="deleteTask(${index})">
                    Dzēst
                </button>
            `;

            taskList.appendChild(li);
        }
    });
}