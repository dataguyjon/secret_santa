// Secret Santa Engine with Backtracking Derangement Algorithm

function shuffle(array) {
  const copy = [...array];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function getRestrictions(person) {
  const restricted = new Set();
  if (person.partner) {
    restricted.add(person.partner);
  }
  if (Array.isArray(person.restrictions)) {
    person.restrictions.forEach((r) => restricted.add(r));
  }
  return restricted;
}

function generateAssignments(people) {
  const assignments = new Map();
  const assignedRecipients = new Set();

  // Try multiple attempts if needed to find a valid derangement
  const maxAttempts = 50;
  for (let attempt = 0; attempt < maxAttempts; attempt++) {
    assignments.clear();
    assignedRecipients.clear();

    const shuffledGivers = shuffle(people);

    function backtrack(index) {
      if (index === shuffledGivers.length) return true;

      const giver = shuffledGivers[index];
      const restrictions = getRestrictions(giver);
      const candidates = shuffle(people);

      for (const recipient of candidates) {
        if (
          recipient.name !== giver.name &&
          !restrictions.has(recipient.name) &&
          !assignedRecipients.has(recipient.name)
        ) {
          assignments.set(giver.name, recipient.name);
          assignedRecipients.add(recipient.name);

          if (backtrack(index + 1)) return true;

          assignments.delete(giver.name);
          assignedRecipients.delete(recipient.name);
        }
      }
      return false;
    }

    if (backtrack(0)) {
      return assignments;
    }
  }

  throw new Error("Unable to find a valid Secret Santa assignment. Please check restrictions.");
}

function initSecretSanta(peopleList) {
  let people = [...peopleList];
  let assignments;

  const instructionText = document.getElementById("instruction-text");
  const nameList = document.getElementById("name-list");
  const resultSection = document.getElementById("result-section");
  const assignmentResult = document.getElementById("assignment-result");
  const backButton = document.getElementById("back-button");
  const doneSection = document.getElementById("done-section");
  const resetButton = document.getElementById("reset-button");

  function start() {
    try {
      assignments = generateAssignments(people);
    } catch (err) {
      alert(err.message);
      return;
    }

    renderList();
    if (instructionText) instructionText.style.display = "block";
    nameList.style.display = "block";
    resultSection.style.display = "none";
    doneSection.style.display = "none";
  }

  function renderList() {
    nameList.innerHTML = "";
    people.forEach((person) => {
      // Only show people who haven't drawn their match yet
      if (!assignments.has(person.name)) return;

      const li = document.createElement("li");
      li.textContent = person.name;
      li.setAttribute("role", "button");
      li.setAttribute("tabindex", "0");
      li.addEventListener("click", () => handlePersonClick(person));
      li.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          handlePersonClick(person);
        }
      });
      nameList.appendChild(li);
    });
  }

  function handlePersonClick(person) {
    const recipient = assignments.get(person.name);
    // Remove giver from active assignments so their name won't appear again
    assignments.delete(person.name);

    if (instructionText) instructionText.style.display = "none";
    nameList.style.display = "none";
    resultSection.style.display = "block";
    backButton.disabled = true;

    assignmentResult.textContent = "Making a List...";

    setTimeout(() => {
      assignmentResult.textContent = "Checking it Twice...";
      setTimeout(() => {
        assignmentResult.innerHTML = `
          <p class="reveal-intro">${person.name} is buying for:</p>
          <p class="reveal-name"><strong>${recipient.toUpperCase()}</strong></p>
        `;
        backButton.disabled = false;
      }, 1000);
    }, 1000);
  }

  backButton.addEventListener("click", () => {
    resultSection.style.display = "none";
    renderList();

    if (assignments.size === 0) {
      if (instructionText) instructionText.style.display = "none";
      nameList.style.display = "none";
      doneSection.style.display = "block";
    } else {
      if (instructionText) instructionText.style.display = "block";
      nameList.style.display = "block";
    }
  });

  if (resetButton) {
    resetButton.addEventListener("click", () => {
      if (confirm("Are you sure you want to start over and generate new assignments?")) {
        start();
      }
    });
  }

  start();
}
