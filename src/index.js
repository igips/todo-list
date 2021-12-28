import { createAddProjectButtona, createProjectButton, displayProjects, displayTasks, removeAllTasks } from "./domMani";
import { addProjectEvent, addProjectToList,  addTaskButton, cancelAddingProject, sortByDate, sortDown, tabSwitchEvent } from "./eventlis";

sortByDate();
sortDown();
//removeAllTasks();
displayProjects();
createAddProjectButtona();
displayTasks();
addProjectEvent();
addProjectToList();
tabSwitchEvent();
cancelAddingProject();
addTaskButton();

