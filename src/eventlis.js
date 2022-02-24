import {
	getNavButtons,
	changeListName,
	getAddProjectButton,
	removeAddProjectButton,
	showProjectInput,
	getAddButton,
	getProjectNameInput,
	hideProjectInput,
	createAddProjectButton,
	getCancelButton,
	displayProjects,
	removeProject,
	getElementById,
	createTaskEditor,
	getDataFromTaskFormAndCreateTask,
	validateForm,
	removeTask,
	editTask,
	displayTasksInProject,
	removeAllTasks,
	displayTasks,
	returnTaskById,
	displayTodayTasks,
	displayThisWeekTasks,
	displayTaskManager,
} from "./domMani";
import { Project, projects, tasks, updateMyProjectsLocal, updateMyTasksLocal } from "./projectsandtasks";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { collection, addDoc, setDoc, getFirestore, getDocs, getDoc, deleteDoc, doc } from "firebase/firestore";
import { db, logged, userID } from "./index.js";

async function addProjectToCloud(id) {
	try {
		await setDoc(doc(db, "projects", id), { projects });
	} catch (e) {
		console.error("Error adding document: ", e);
	}
}

async function addTaskToCloud(id) {
	try {
		await setDoc(doc(db, "tasks", id), { tasks });
	} catch (e) {
		console.error("Error adding document: ", e);
	}
}

function tabSwitchEvent() {
	const buttons = getNavButtons();

	buttons.forEach((button) => {
		button.addEventListener("click", () => {
			changeListName(button.textContent);
			if (document.getElementById("list-name").textContent == "Home") {
				document.getElementById("tasks").textContent = "";
				removeAllTasks();
				displayTasks();
				document.getElementById("add-task").style.visibility = "visible";
			} else if (document.getElementById("list-name").textContent == "Today") {
				document.getElementById("tasks").textContent = "";
				removeAllTasks();
				displayTodayTasks();
				document.getElementById("add-task").style.visibility = "hidden";
			} else if (document.getElementById("list-name").textContent == "This Week") {
				document.getElementById("tasks").textContent = "";
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
		if (logged) {
			removeAddProjectButton();
			showProjectInput();
		} else {
			document.getElementById("loginModal").style.display = "block";
		}
	});
}

async function addProjectToList() {
	const button = getAddButton();

	button.addEventListener("click", () => {
		const input = getProjectNameInput();
		const project = Project(input.value, setIdForProject());

		projects.push(project);

		input.value = "";

		hideProjectInput();
		displayProjects();
		createAddProjectButton();
		addProjectToCloud(userID);
		// updateMyProjectsLocal();

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
	if (projects.length < 1) {
		return number;
	} else {
		for (let i = 0; i < projects.length; i++) {
			if (projects[i].id == number) {
				setIdForProject();
			} else {
				return number;
			}
		}
	}
}

function setIdForTask() {
	let number = randomNumber();
	if (tasks.length < 1) {
		return number + "t";
	} else {
		for (let i = 0; i < tasks.length; i++) {
			if (tasks[i].id == number + "t") {
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
		displayTasksInProject(button.textContent.replace(/\s+/g, ""));
	});
}

function addEventListenerToDeleteProjectButton(ele, id) {
	ele.addEventListener("click", () => {
		event.stopPropagation();
		for (let i = 0; i < tasks.length; i++) {
			if (tasks[i].project == ele.parentNode.textContent.replace(/\s+/g, "")) {
				tasks.splice(i, 1);
			}
		}

		removeProject(id);
		if (
			ele.textContent.replace(/\s+/g, "") == document.getElementById("list-name").textContent.replace(/\s+/g, "")
		) {
			document.getElementById("home").click();
		}

		// updateMyProjectsLocal();
		addProjectToCloud(userID);
		addTaskToCloud(userID);
		// updateMyTasksLocal();
	});
}

function addEventListenerToEditTaskButton(ele, id) {
	ele.addEventListener("click", () => {
		ele.style.cursor = "default";
		if (event.currentTarget !== event.target) {
			return;
		}
		//event.stopPropagation();
		editTask(id);

		let aab = Array.from(document.getElementsByClassName("task"));

		aab.forEach((c) => {
			if (c.getAttribute("id") != id) {
				let elClone = c.cloneNode(true);
				c.parentNode.replaceChild(elClone, c);
				elClone.style.cursor = "default";
			}
		});
		let aa = Array.from(document.getElementsByClassName("delete-edit-task"));
		aa.forEach((a) => {
			a.style.visibility = "hidden";
		});
	});
}

function addEventListenerToRemoveTaskButton(ele, id) {
	ele.addEventListener("click", () => {
		event.stopPropagation();
		removeTask(id);
		addTaskToCloud(userID);
		// updateMyTasksLocal();
	});
}

function addTaskButton() {
	const button = getElementById("add-task");

	button.addEventListener("click", () => {
		if (logged) {
			const divTaskEditor = createTaskEditor();
			document.getElementById("tasks").appendChild(divTaskEditor);
			document.getElementById("add-task").style.visibility = "hidden";
			cancelAddTaskButton();
			createTaskEvent();
			let aa = Array.from(document.getElementsByClassName("delete-edit-task"));

			aa.forEach((a) => {
				a.style.visibility = "hidden";
			});

		} else {
            document.getElementById("loginModal").style.display = "block";
        }
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
		if (validateForm() == true) {
			getDataFromTaskFormAndCreateTask();
			addTaskToCloud(userID);
			// updateMyTasksLocal();
		}
	});
}

function checkBoxEvent(ele, div, div2, id) {
	let a = returnTaskById(id);

	ele.addEventListener("change", function () {
		if (this.checked) {
			div.style.setProperty("text-decoration", "line-through");
			div.style.setProperty("opacity", 0.3);
			div2.style.setProperty("text-decoration", "line-through");
			div2.style.setProperty("opacity", 0.3);
			a.checked = true;
			// updateMyTasksLocal();
			addTaskToCloud(userID);
		} else {
			div.style.setProperty("text-decoration", "none");
			div.style.setProperty("opacity", 1);
			div2.style.setProperty("text-decoration", "none");
			div2.style.setProperty("opacity", 1);
			a.checked = false;
			// updateMyTasksLocal();
			addTaskToCloud(userID);
		}
	});
}

function sortUP() {
	tasks.sort(function (a, b) {
		// updateMyTasksLocal();
		addTaskToCloud(userID);
		return b.dateObj - a.dateObj;
	});
}

function sortDown() {
	tasks.sort(function (a, b) {
		// updateMyTasksLocal();
		addTaskToCloud(userID);
		return a.dateObj - b.dateObj;
	});
}

function sortByDate() {
	const sorter = document.getElementById("arrow-sort");

	sorter.addEventListener("click", () => {
		event.stopPropagation();
		const a = sorter.getAttribute("data-way");

		if (a == "DOWN") {
			sorter.setAttribute("src", "img/uparrow.png");
			sorter.setAttribute("data-way", "UP");
			displayTaskManager();
		} else {
			sorter.setAttribute("src", "img/downarrow.png");
			sorter.setAttribute("data-way", "DOWN");
			displayTaskManager();
		}
	});
}

function dropDownEvent() {
	const button = document.getElementById("drop-down");
	let ele = document.getElementById("side-bar");

	button.addEventListener("click", () => {
		if (!ele.classList.contains("active")) {
			ele.classList.add("active");
		} else {
			ele.classList.remove("active");
		}
	});
}

document.getElementById("login").addEventListener("click", () => {
	document.getElementById("loginModal").style.display = "block";
});

document.getElementsByClassName("close")[0].addEventListener("click", () => {
	document.getElementById("loginModal").style.display = "none";
});

window.onclick = (event) => {
	if (event.target == document.getElementById("loginModal")) {
		document.getElementById("loginModal").style.display = "none";
	}
};

document.getElementById("register").addEventListener("click", () => {
	document.getElementById("regModal").style.display = "block";
});

document.getElementsByClassName("close")[1].addEventListener("click", () => {
	document.getElementById("regModal").style.display = "none";
});

window.onclick = (event) => {
	if (event.target == document.getElementById("regModal")) {
		document.getElementById("regModal").style.display = "none";
	}
};

document.getElementById("reg-form").addEventListener("submit", () => {
	const p = document.getElementById("reg-pas").value;
	const p1 = document.getElementById("reg-rep-pas").value;
	const e = document.getElementById("reg-email").value;

	if (p === p1) {
		createUserWithEmailAndPassword(getAuth(), e, p)
			.then((userCredential) => {
				const user = userCredential.user;
				document.getElementById("reg-pas").value = "";
				document.getElementById("reg-rep-pas").value = "";
				const e = (document.getElementById("reg-email").value = "");
				document.getElementById("regModal").style.display = "none";
			})
			.catch((error) => {
				const errorCode = error.code;
				const errorMessage = error.message;
				if (errorCode == "auth/email-already-in-use") {
					alert("Email already in use!");
				}
			});
	} else {
		alert("Password must match!");
	}
});

document.getElementById("log-form").addEventListener("submit", () => {
	const e = document.getElementById("login-email").value;
	const p = document.getElementById("login-pas").value;

	signInWithEmailAndPassword(getAuth(), e, p)
		.then((userCredential) => {
			const user = userCredential.user;
			document.getElementById("loginModal").style.display = "none";
			document.getElementById("login-email").value = "";
			document.getElementById("login-pas").value = "";
		})
		.catch((error) => {
			const errorCode = error.code;
			const errorMessage = error.message;
			if (error.code === "auth/wrong-password") {
				alert("Wrong password!");
			} else if (error.code === "auth/user-not-found") {
				alert("User not found!");
			}
		});
});

document.getElementById("sign-out-span").addEventListener("click", () => {
	signOut(getAuth())
		.then(() => {})
		.catch((error) => {});
});

document.getElementById("reg-info").addEventListener("click", () => {
    document.getElementById("loginModal").style.display = "none";
    document.getElementById("regModal").style.display = "block";

})

export {
	tabSwitchEvent,
	addProjectEvent,
	addProjectToList,
	cancelAddingProject,
	addEventListenerToProjectButton,
	addEventListenerToDeleteProjectButton,
	addTaskButton,
	cancelAddTaskButton,
	randomNumber,
	setIdForProject,
	setIdForTask,
	addEventListenerToEditTaskButton,
	addEventListenerToRemoveTaskButton,
	checkBoxEvent,
	sortByDate,
	sortUP,
	sortDown,
	dropDownEvent,
	addTaskToCloud,
	addProjectToCloud,
};
