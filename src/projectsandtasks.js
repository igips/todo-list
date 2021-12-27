const projects = [];
const tasks = [];




const Project = (name, text) => {
    const title = name;
    let id = text;
    return {title, id};
};

const Task = (n, d, da, p, f, i, dateObje) => {
    let name = n;
    let description = d;
    let date = da;
    let project = p;
    let checked = f;
    let id = i;
    let dateObj = dateObje;

    return {name, description, date, project, checked, id, dateObj};
}




export {Project, projects, tasks, Task};
