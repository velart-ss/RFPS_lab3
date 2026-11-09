class User {
    constructor(surname, name, age, education, detailLength, dateStr, timeStr) {
        this.surname = surname;
        this.name = name;
        this.age = age;
        this.education = education;
        this.detailLength = detailLength;
        this.date = dateStr; 
        this.time = timeStr; 
        this.requestDate = new Date(dateStr); 
    }

    getBirthYear(currentYear = 2026) {
        return currentYear - this.age;
    }

    getSeason() {
        let month = this.requestDate.getMonth(); 
        if (month === 11 || month === 0 || month === 1) return "зима";
        if (month >= 2 && month <= 4) return "весна";
        if (month >= 5 && month <= 7) return "літо";
        return "осінь";
    }
}

let users = [
    new User("Шевченко", "Андрій", 45, "Вища", 120, "2026-10-15", "10:30"),
    new User("Бойко", "Олена", 60, "Середня", 50, "2026-06-20", "14:00"),
    new User("Коваленко", "Іван", 38, "Вища", 300, "2026-01-10", "10:30"),
    new User("Ткачук", "Марія", 25, "Бакалавр", 80, "2026-10-15", "16:45"),
    new User("Кравченко", "Олег", 50, "Вища", 410, "2026-04-05", "11:20"),
    new User("Мороз", "Анна", 65, "Середня", 30, "2026-07-12", "08:00"),
    new User("Лисенко", "Сергій", 40, "Вища", 210, "2026-11-22", "13:40"),
    new User("Мельник", "Яна", 22, "Студент", 150, "2026-10-15", "18:05"),
    new User("Волков", "Павло", 58, "Професійна", 95, "2026-08-30", "12:10"),
    new User("Гриценко", "Юлія", 36, "Вища", 180, "2026-03-18", "15:55")
];

console.log("--- Початковий список користувачів ---");
console.table(users, ['surname', 'name', 'age', 'education', 'detailLength', 'date', 'time']);

let filteredUsers = users.filter(u => u.requestDate.getMonth() === 9 && u.time === "10:30");
console.log("--- Звернулися у жовтні о 10:30 ---");
console.table(filteredUsers, ['surname', 'name', 'date', 'time']);

let maxDetailUser = users.reduce((max, u) => u.detailLength > max.detailLength ? u : max, users[0]);
console.log("--- Користувач із максимальною кількістю символів у полі детально ---");
console.table([maxDetailUser], ['surname', 'name', 'age', 'education', 'detailLength']);

let classCounts = {
    "Бізнес-активні (середній вік)": 0,
    "Бізнес-пасивні (похилий вік)": 0,
    "Інші": 0
};

users.forEach(u => {
    let season = u.getSeason();
    let isMiddleAged = u.age >= 35 && u.age <= 55;
    let isSenior = u.age >= 56;

    if (isMiddleAged && (season === "осінь" || season === "зима" || season === "весна")) {
        classCounts["Бізнес-активні (середній вік)"]++;
    } else if (isSenior && season === "літо") {
        classCounts["Бізнес-пасивні (похилий вік)"]++;
    } else {
        classCounts["Інші"]++;
    }
});

console.log("--- Кількість користувачів за класами ---");
console.table(classCounts);

let sortedUsers = [...users].sort((a, b) => {
    let nameA = a.surname + " " + a.name;
    let nameB = b.surname + " " + b.name;
    return nameA.localeCompare(nameB);
}).map(u => ({
    surname: u.surname,
    name: u.name,
    age: u.age,
    birthYear: u.getBirthYear(), 
    education: u.education
}));

console.log("--- Відсортовані користувачі за алфавітом (з роком народження) ---");
console.table(sortedUsers, ['surname', 'name', 'age', 'birthYear', 'education']);