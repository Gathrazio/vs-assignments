const employees = [];

function Employee (name, jobTitle, salary) {
    this.name = name;
    this.jobTitle = jobTitle;
    this.salary = salary;
    this.status = "Full Time"
}

Employee.prototype.printEmployeeForm = function () {
    console.log("Name: " + this.name + ", Job Title: " + this.jobTitle + ", Salary: " + this.salary + ", Status: " + this.status)
}

// Employees, don't know of a dryer way to denote them all

employees[0] = new Employee("Sandra Mertins", "Head Consultant", "$45/hour");
employees[1] = new Employee("Harry Rutherford", "Janitor", "$12/hour");
employees[2] = new Employee("Jerry Richards", "Web Developer", "$10000/hour")

employees[1].status = "Contract";

for (i = 0; i < employees.length; i++) {
    employees[i].printEmployeeForm()
}