const userName = prompt("Please enter your name:");
const startDate = prompt("Please enter the date of travel start: ");
const endDate = prompt("Please enter the date of travel end: ");

// base functionality for the app
function calculateReimbursement(projects) {
  let days = {}; // To store each day and its type (travel or full) and city cost
  let totalReimbursement = 0;

  // Sort projects by start date
  projects.sort((a, b) => new Date(a.startDate) - new Date(b.startDate));

  projects.forEach((project) => {
    let startDate = new Date(project.startDate);
    let endDate = new Date(project.endDate);

    for (let d = startDate; d <= endDate; d.setDate(d.getDate() + 1)) {
      let dayStr = d.toISOString().split("T")[0];

      // If the day is already registered, mark it as a 'full' day
      if (days[dayStr]) {
        days[dayStr].type = "full";
      } else {
        days[dayStr] = {
          type: "travel",
          city: project.city,
        };
      }
    }
  });

  // Convert days object to array and sort it
  let sortedDays = Object.keys(days)
    .sort((a, b) => new Date(a) - new Date(b))
    .map((date) => days[date]);

  // Compute the total reimbursement based on the day type and city
  sortedDays.forEach((day) => {
    if (day.type === "travel") {
      totalReimbursement += day.city === "high" ? 55 : 45;
    } else {
      totalReimbursement += day.city === "high" ? 85 : 75;
    }
  });

  return totalReimbursement;
}

// Test the function
const projectSet1 = [
  { city: "low", startDate: "2015-09-01", endDate: "2015-09-03" },
];

const projectSet2 = [
  { city: "low", startDate: "2015-09-01", endDate: "2015-09-01" },
  { city: "high", startDate: "2015-09-02", endDate: "2015-09-06" },
  { city: "low", startDate: "2015-09-06", endDate: "2015-09-08" },
];

console.log(
  "Total reimbursement for project set 1:",
  calculateReimbursement(projectSet1)
);
console.log(
  "Total reimbursement for project set 2:",
  calculateReimbursement(projectSet2)
);
