import { collection, getDocs } from "firebase/firestore";
import { db } from "./index.js";

let projects = [];
let tasks = [];



function myProjectsLocal() {
	let myProjects = [];
	if (localStorage.getItem("myProjects")) {
		myProjects = JSON.parse(localStorage.getItem("myProjects"));
		return myProjects;
	} else {
		return myProjects;
	}
}

function myTasksLocal() {
	let myTasks = [];
	if (localStorage.getItem("myTasks")) {
		myTasks = JSON.parse(localStorage.getItem("myTasks"));
		for (let i = 0; i < myTasks.length; i++) {
			myTasks[i].dateObj = new Date(myTasks[i].dateObj);
			console.log(myTasks[i].dateObj);
		}
		return myTasks;
	} else {
		return myTasks;
	}
}

function updateMyProjectsLocal() {
	localStorage.setItem("myProjects", JSON.stringify(projects));
}

function updateMyTasksLocal() {
	localStorage.setItem("myTasks", JSON.stringify(tasks));
}

const Project = (name, text) => {
	const title = name;
	let id = text;
	return { title, id };
};

const Task = (n, d, da, p, f, i, dateObje) => {
	let name = n;
	let description = d;
	let date = da;
	let project = p;
	let checked = f;
	let id = i;
	let dateObj = dateObje;

	return { name, description, date, project, checked, id, dateObj };
};

export { Project, projects, tasks, Task, updateMyProjectsLocal, updateMyTasksLocal };
