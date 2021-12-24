const projects = [];
const tasks = [];




const Project = (name, text) => {
    const title = name;
    let id = text;
    return {title, id};
};

const Task = (n, d, da, p, f, i) => {
    let name = n;
    let description = d;
    let date = da;
    let project = p;
    let finished = f;
    let id = i;

    return {name, description, date, project, finished, id};
}




export {Project, projects, tasks, Task};
