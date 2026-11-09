let projects = [
    { id: 101, name: 'EcoSystem', country: 'Україна', teamSize: 5, duration: 12, cost: 50000 },
    { id: 102, name: 'AlphaWeb', country: 'США', teamSize: 10, duration: 24, cost: 120000 },
    { id: 103, name: 'AgroTech', country: 'Польща', teamSize: 4, duration: 6, cost: 20000 },
    { id: 104, name: 'CyberShield', country: 'Німеччина', teamSize: 8, duration: 18, cost: 95000 },
    { id: 105, name: 'HealthAI', country: 'Японія', teamSize: 12, duration: 36, cost: 200000 },
    { id: 106, name: 'EduSoft', country: 'Україна', teamSize: 5, duration: 10, cost: 45000 },
    { id: 107, name: 'GreenEnergy', country: 'Канада', teamSize: 7, duration: 14, cost: 80000 },
    { id: 108, name: 'SmartCity', country: 'Китай', teamSize: 15, duration: 48, cost: 300000 },
    { id: 109, name: 'BioLab', country: 'Бразилія', teamSize: 6, duration: 9, cost: 35000 },
    { id: 110, name: 'FinTech', country: 'США', teamSize: 10, duration: 20, cost: 110000 }
];

console.log("--- Початковий список проєктів ---");
console.table(projects, ['id', 'name', 'country', 'teamSize', 'duration', 'cost']);

let sortedProjects = [...projects].sort((a, b) => a.country.localeCompare(b.country));
console.log("--- Відсортовано за країною ---");
console.table(sortedProjects, ['id', 'name', 'country', 'teamSize', 'duration', 'cost']);

let teams = {};
projects.forEach(p => {
    if (!teams[p.teamSize]) teams[p.teamSize] = { sum: 0, count: 0 };
    teams[p.teamSize].sum += p.cost;
    teams[p.teamSize].count += 1;
});

for (let size in teams) {
    if (teams[size].count > 1) {
        console.log(`Середня вартість для команди з ${size} осіб: ${teams[size].sum / teams[size].count}`);
    }
}

let maxTeamProject = projects.reduce((max, p) => p.teamSize > max.teamSize ? p : max, projects[0]);
console.log(`ID проєкту з найбільшою командою (${maxTeamProject.teamSize} осіб): ${maxTeamProject.id}`);

function addNewProject(projectsArray, newProject) {
    const requiredKeys = ['id', 'name', 'country', 'teamSize', 'duration', 'cost'];
    let isMissingInfo = requiredKeys.some(key => newProject[key] === undefined || newProject[key] === null || newProject[key] === "");

    if (isMissingInfo) {
        projectsArray.push(newProject);
        console.log(`Інформація неповна. Проєкт ${newProject.name} додано в кінець.`);
    } else {
        let insertIndex = projectsArray.findIndex(p => p.cost > newProject.cost);
        if (insertIndex === -1) insertIndex = projectsArray.length;
        projectsArray.splice(insertIndex, 0, newProject);
        console.log(`Інформація повна. Проєкт ${newProject.name} вставлено на позицію ${insertIndex} (сортування за вартістю).`);
    }
}

let incompleteProj = { id: 111, name: 'Incomplete Proj', country: '', teamSize: 2 };
addNewProject(projects, incompleteProj);

let midCostProj = { id: 112, name: 'MidCost Proj', country: 'Польща', teamSize: 3, duration: 5, cost: 60000 };
addNewProject(projects, midCostProj);

console.log("--- Список після додавання ---");
console.table(projects, ['id', 'name', 'country', 'teamSize', 'duration', 'cost']);