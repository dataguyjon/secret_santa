const people = [
    { name: "Papa", partner: "Mema" },
    { name: "Mema", partner: "Papa" },
    { name: "Mark", partner: "Nan" },
    { name: "Nan", partner: "Mark" },
    { name: "Steve", partner: "Jenny" },
    { name: "Jenny", partner: "Steve" },
    { name: "Bryson", partner: "Emily" },
    { name: "Emily", partner: "Bryson" },
    { name: "Jon", partner: "Carmen" },
    { name: "Carmen", partner: "Jon" },
    { name: "Sheri" },
    { name: "Josh" },
  ];
  
  let remaining = [...people];
  let assignments = [];
  let assignedRecipients = new Set();
  
  const nameList = document.getElementById("name-list");
  const resultSection = document.getElementById("result-section");
  const assignmentResult = document.getElementById("assignment-result");
  const backButton = document.getElementById("back-button");
  const doneSection = document.getElementById("done-section");
  const resetYes = document.getElementById("reset-yes");
  const resetNo = document.getElementById("reset-no");
  
  // Populate the list of names
  function populateList() {
    nameList.innerHTML = "";
    remaining.forEach((person) => {
      if (!assignedRecipients.has(person.name)) {
        const li = document.createElement("li");
        li.textContent = person.name;
        li.dataset.name = person.name; // Add a data attribute for identification
        li.addEventListener("click", () => assignRecipient(person, li));
        nameList.appendChild(li);
      }
    });
  }
  
  // Assign a recipient
  function assignRecipient(person, listItem) {
    // Hide the name list and show the results section
    nameList.style.display = "none"; // Ensure the name list is hidden
    resultSection.style.display = "block"; // Ensure the result section is shown
    backButton.disabled = true; // Disable the back button initially
  
    // Show the "Making a List..." and "Checking it Twice" messages
    assignmentResult.textContent = "Making a List...";
    setTimeout(() => {
      assignmentResult.textContent = "Checking it Twice...";
      setTimeout(() => {
        // Filter eligible recipients: no duplicate recipients or partners
        const eligibleRecipients = remaining.filter(
          (p) =>
            p.name !== person.name && // Not assigning themselves
            p.name !== person.partner && // Not assigning their partner
            !assignedRecipients.has(p.name) // Not already assigned
        );
  
        if (eligibleRecipients.length === 0) {
          alert("Assignment failed. Please reset and try again.");
          return;
        }
  
        // Randomly assign a recipient from eligible recipients
        const recipientIndex = Math.floor(Math.random() * eligibleRecipients.length);
        const recipient = eligibleRecipients[recipientIndex];
  
        assignments.push({ giver: person.name, recipient: recipient.name });
        assignedRecipients.add(recipient.name); // Mark recipient as assigned
        listItem.remove(); // Remove the clicked name from the screen
  
        // Format and display the result
        assignmentResult.innerHTML = `
          <p>${person.name} is buying for:</p>
          <p><strong>${recipient.name.toUpperCase()}</strong></p>
        `;
  
        backButton.disabled = false; // Enable the back button
      }, 1000); // "Checking it Twice" delay
    }, 1000); // "Making a List..." delay
  }  
  
  
  // Reset the app
  function resetApp() {
    remaining = [...people]; // Reset the remaining pool
    assignments = []; // Clear previous assignments
    assignedRecipients.clear(); // Clear the assigned recipients
    populateList(); // Repopulate the name list
    nameList.style.display = "block"; // Show the name list
    resultSection.style.display = "none"; // Hide the result section
    doneSection.style.display = "none"; // Hide the "Reset?" section
  }
  
  
  // Event Listeners
  backButton.addEventListener("click", () => {
    resultSection.style.display = "none"; // Hide the result section
    nameList.style.display = "block"; // Show the name list
  
    // Check if all names are assigned
    if (assignedRecipients.size === people.length) {
      resultSection.style.display = "none"; // Ensure result section is hidden
      doneSection.style.display = "block"; // Show the "Done" section
    }
  });
  
  resetYes.addEventListener("click", resetApp);
  resetNo.addEventListener("click", () => alert("Goodbye!"));
  
  
  // Initialize
  populateList();
  