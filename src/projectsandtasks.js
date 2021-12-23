const projects = [];




const Project = (name, text) => {
    const title = name;
    const tasks = [];
    let id = text;
    return {tasks, title, id};
};




export {Project, projects};
