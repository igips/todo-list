import { createAddProjectButtona, createProjectButton, displayProjects, displayTasks, removeAllTasks } from "./domMani";
import { addProjectEvent, addProjectToList,  addTaskButton, cancelAddingProject, dropDownEvent, sortByDate, sortDown, tabSwitchEvent } from "./eventlis";

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
