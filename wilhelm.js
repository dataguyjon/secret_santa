// ============================================================================
// Wilhelm Family - Secret Santa Configuration
// ============================================================================
// Replace the placeholder names below with your real family members.
//
// Configuration options for each person:
//   name: "Person Name"            (Required)
//   partner: "Spouse/Partner"      (Optional: prevents drawing each other)
//   restrictions: ["Name1", ...]  (Optional: array of people they cannot draw)
//
// Note: The program automatically ensures no one draws themselves.
// ============================================================================

const people = [
  { name: "Steve", partner: "Deanna" },
  { name: "Deanna", partner: "Steve" },
  { name: "Tim", partner: "Angie" },
  { name: "Angie", partner: "Tim" },
  { name: "Jon", partner: "Carmen" },
  { name: "Carmen", partner: "Jon" },
  { name: "Nathan", partner: "Marcy" },
  { name: "Marcy", partner: "Nathan" },
  // { name: "Person 1", restrictions: ["Person 2", "Person 3"] },
  // { name: "Person 2", restrictions: ["Person 1", "Person 3"] },
  // { name: "Person 4" },
];

// Initialize the Secret Santa application for Wilhelm family
initSecretSanta(people);

