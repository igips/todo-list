import {
	createAddProjectButton,
	createAddProjectButtona,
	createProjectButton,
	displayProjects,
	displayTasks,
	removeAddProjectButton,
	removeAllTasks,
} from "./domMani";
import {
	addProjectEvent,
	addProjectToList,
	addTaskButton,
	cancelAddingProject,
	dropDownEvent,
	sortByDate,
	sortDown,
	tabSwitchEvent,
} from "./eventlis";
import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getFirestore, getDocs, getDoc, collection, doc } from "firebase/firestore";
import { projects, tasks } from "./projectsandtasks";

let logged = false;
let userID = "";

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: "AIzaSyBrxM72npU5qYM79QH1vjP6fkRDZpxxK-A",
	authDomain: "todo-list-873e7.firebaseapp.com",
	projectId: "todo-list-873e7",
	storageBucket: "todo-list-873e7.appspot.com",
	messagingSenderId: "585540146936",
	appId: "1:585540146936:web:ef3f83eac92caf9d620d0d",
};

// Initialize Firebase
initializeApp(firebaseConfig);
const db = getFirestore();

async function getDataFromCloud(id) {
	const gotData = await getDoc(doc(db, "projects", id));

	if (gotData.exists()) {
		let a = gotData.data().projects;
        console.log(a);
        projects = a;
        
	} else {
		// doc.data() will be undefined in this case
		console.log("No such document!");
	}

	removeAddProjectButton();
	displayProjects();
	createAddProjectButton();
}

async function getTasksDataFromCloud(id) {
	const gotData = await getDoc(doc(db, "tasks", id));

	if (gotData.exists()) {
		let a = gotData.data().tasks;
		for (let i = 0; i < a.length; i++) {
			if (a[i].dateObj !== "") {
				a[i].dateObj = new Date(a[i].dateObj.seconds);
			}

			console.log(a[i].dateObj);
		}
		
        console.log(a);
        tasks = a;
	} else {
		// doc.data() will be undefined in this case
		console.log("No such document!");
	}

	displayTasks();
}

onAuthStateChanged(getAuth(), (user) => {
	const displayLoginDiv = document.getElementById("login-div");
	const userDiv = document.getElementById("sign-out-div");
	if (user) {
		// https://firebase.google.com/docs/reference/js/firebase.User
		const uid = user.uid;
		const displayLoginDiv = document.getElementById("login-div");
		const userNameSpan = document.getElementById("user-name-span");
		const signOutSpan = document.getElementById("sign-out-span");
		displayLoginDiv.style.display = "none";
		userDiv.style.display = "flex";
		userNameSpan.textContent = user.email + " | ";
		signOutSpan.textContent = "Sign Out!";
		logged = true;
		userID = uid;
		getDataFromCloud(uid);
		getTasksDataFromCloud(uid);
	} else {
		userDiv.style.display = "none";
		displayLoginDiv.style.display = "flex";
		logged = false;
		userID = "";
		projects = [];
		tasks = [];
        removeAllTasks();
        document.getElementById("projects").innerHTML = "";
        createAddProjectButton();
        console.log(tasks);
        console.log(projects);

	}
});

sortByDate();
sortDown();
displayProjects();
createAddProjectButtona();
displayTasks();
addProjectEvent();
addProjectToList();
tabSwitchEvent();
cancelAddingProject();
addTaskButton();
dropDownEvent();

export { db, logged, userID };
