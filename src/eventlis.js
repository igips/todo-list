import { getNavButtons, changeListName, getAddProjectButton, removeAddProjectButton, showProjectInput, getAddButton, getProjectNameInput, hideProjectInput, createAddProjectButton, getCancelButton, displayProjects, removeProject, getElementById, createTaskEditor, getDataFromTaskFormAndCreateTask, validateForm, removeTask, editTask, displayTasksInProject, removeAllTasks, displayTasks, returnTaskById, displayTodayTasks, displayThisWeekTasks, displayTaskManager} from "./domMani";
import { Project, projects, tasks, updateMyProjectsLocal, updateMyTasksLocal } from "./projectsandtasks";

function tabSwitchEvent() {
    const buttons = getNavButtons();

    buttons.forEach((button) => {
        button.addEventListener("click", () => {
            changeListName(button.textContent);
            if(document.getElementById("list-name").textContent == "Home") {
                document.getElementById("tasks").textContent = "";
                removeAllTasks();
                displayTasks();
                document.getElementById("add-task").style.visibility = "visible";
            } else if (document.getElementById("list-name").textContent == "Today") {
                removeAllTasks();
                displayTodayTasks();
                document.getElementById("add-task").style.visibility = "hidden";
            } else if (document.getElementById("list-name").textContent == "This Week") {
                removeAllTasks();
                displayThisWeekTasks();
                document.getElementById("add-task").style.visibility = "hidden";
            }
        });
    });

}


function addProjectEvent() {
    const button = getAddProjectButton();

    button.addEventListener("click", () => {
        removeAddProjectButton();
        showProjectInput();
    });

}

function addProjectToList() {
    const button = getAddButton();

    button.addEventListener("click", () => {
        const input = getProjectNameInput();
        const project = Project(input.value, setIdForProject());

        projects.push(project);

        input.value = "";

        hideProjectInput();
        displayProjects();
        createAddProjectButton();
        updateMyProjectsLocal();

        document.getElementById(project.id).click();
    });
}



function cancelAddingProject() {
    const button = getCancelButton();

    button.addEventListener("click", () => {
        const input = getProjectNameInput();

        input.value = "";

        hideProjectInput();
        createAddProjectButton();
    });
}

function setIdForProject() {
    let number = randomNumber();
    if(projects.length < 1) {
        return number;
    } else {
        for(let i = 0; i < projects.length; i++) {
            if(projects[i].id == number) {
                setIdForProject();
            } else {
                return number;
            }
        }
    }

}

function setIdForTask() {
    let number = randomNumber();
    if(tasks.length < 1) {
        return number + "t";
    } else {
        for (let i = 0; i < tasks.length; i++) {
            if(tasks[i].id == number + "t") {
                setIdForTask();
            } else {
                return number + "t";
            }
        }
    }
}
    

function randomNumber() {
    const number = Math.floor(Math.random() * 1000);
    return number;
}

function addEventListenerToProjectButton(button) {
    button.addEventListener("click", () => {
        changeListName(button.textContent);
        document.getElementById("tasks").textContent = "";
        document.getElementById("add-task").style.visibility = "visible";
        removeAllTasks();
        displayTasksInProject(button.textContent.replace(/\s+/g, ''));

    });
}

function addEventListenerToDeleteProjectButton(ele, id) {
    ele.addEventListener("click", () => {
        event.stopPropagation();
        for(let i = 0; i < tasks.length; i++) {
            if(tasks[i].project == ele.parentNode.textContent.replace(/\s+/g, '')) {
                tasks.splice(i, 1);
                
            }
        }
        
        removeProject(id);
        if(ele.textContent.replace(/\s+/g, '') == document.getElementById("list-name").textContent.replace(/\s+/g, '')) {
            document.getElementById("home").click();
        }

        updateMyProjectsLocal();
        updateMyTasksLocal();
        
        
        

    });
}



function addEventListenerToEditTaskButton(ele, id) {
   
    ele.addEventListener("click", () => {
        ele.style.cursor = "default";
        if(event.currentTarget !== event.target) {
            return;
        }
        //event.stopPropagation();
        editTask(id);
        
        let aab = Array.from(document.getElementsByClassName("task"));

        aab.forEach((c) => {
            if(c.getAttribute("id") != id ) {
                let elClone = c.cloneNode(true);
                c.parentNode.replaceChild(elClone, c);
                elClone.style.cursor = "default";
            }
        });
        let aa = Array.from(document.getElementsByClassName("delete-edit-task"));
        aa.forEach((a) =>{
            a.style.visibility = "hidden";
        });
        
    });
}

function addEventListenerToRemoveTaskButton(ele, id) {
    ele.addEventListener("click", () => {
        event.stopPropagation();
        removeTask(id);
        updateMyTasksLocal();
    });
}

function addTaskButton() {
    const button = getElementById("add-task");


    button.addEventListener("click", () => {
        const divTaskEditor = createTaskEditor();
        document.getElementById("tasks").appendChild(divTaskEditor);
        document.getElementById("add-task").style.visibility = "hidden";
        cancelAddTaskButton();
        createTaskEvent();
        let aa = Array.from(document.getElementsByClassName("delete-edit-task"));

        aa.forEach((a) =>{
            a.style.visibility = "hidden";
        });
        

    });
}

function cancelAddTaskButton() {
    const button = getElementById("cancelAddTaskButton"); 

    button.addEventListener("click", () => {
        event.stopPropagation();
        const div = getElementById("divForAddTaskForm");
        div.parentNode.removeChild(div);
        document.getElementById("add-task").style.visibility = "visible";
        displayTaskManager();
    });
}

function createTaskEvent() {
    const button = getElementById("acceptButton");

    button.addEventListener("click", () => {
        event.stopPropagation();
        if(validateForm() == true) {
            getDataFromTaskFormAndCreateTask();
            updateMyTasksLocal();
        }
        
        
    });

}

function checkBoxEvent(ele, div, div2, id) {
    let a = returnTaskById(id);

    ele.addEventListener("change", function() {
        if(this.checked) {
            div.style.setProperty("text-decoration", "line-through");
            div.style.setProperty("opacity", 0.3);
            div2.style.setProperty("text-decoration", "line-through");
            div2.style.setProperty("opacity", 0.3);
            a.checked = true;
            updateMyTasksLocal();
            
        } else {
            div.style.setProperty("text-decoration", "none");
            div.style.setProperty("opacity", 1);
            div2.style.setProperty("text-decoration", "none");
            div2.style.setProperty("opacity", 1);
            a.checked = false;
            updateMyTasksLocal();
        }
    });

}

function sortUP() {
    tasks.sort(function(a,b) {
        updateMyTasksLocal();
        return b.dateObj - a.dateObj;
    });
}

function sortDown() {
    tasks.sort(function(a,b) {
        updateMyTasksLocal();
        return a.dateObj - b.dateObj;
    });
}

function sortByDate() {
    const sorter =  document.getElementById("arrow-sort");
    

    sorter.addEventListener("click", () => {
        event.stopPropagation();
        const a = sorter.getAttribute("data-way");
        
        if(a == "DOWN") {
            sorter.setAttribute("src", "img/uparrow.png");
            sorter.setAttribute("data-way", "UP");
            //sortUP();
           // updateMyTasksLocal();
          //  removeAllTasks();
            // if(document.getElementById("list-name").textContent == "Home") {
            //     displayTasks();
            // } else {
            //     displayTasksInProject(document.getElementById("list-name").textContent.replace(/\s+/g, ''));
            // }
            displayTaskManager();
        } else {
            sorter.setAttribute("src", "img/downarrow.png");
            sorter.setAttribute("data-way", "DOWN");
            // sortDown();
            // updateMyTasksLocal();
            // removeAllTasks();
            // if(document.getElementById("list-name").textContent == "Home") {
            //     displayTasks();
            // } else {
            //     displayTasksInProject(document.getElementById("list-name").textContent.replace(/\s+/g, ''));
            // }
            displayTaskManager();
            
        }
        
    });
}


export {tabSwitchEvent, addProjectEvent, addProjectToList, cancelAddingProject, addEventListenerToProjectButton, addEventListenerToDeleteProjectButton, addTaskButton, cancelAddTaskButton, randomNumber, setIdForProject, setIdForTask, addEventListenerToEditTaskButton,
addEventListenerToRemoveTaskButton, checkBoxEvent, sortByDate, sortUP, sortDown};