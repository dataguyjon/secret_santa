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
  { name: "Family Member 1", partner: "Family Member 2" },
  { name: "Family Member 2", partner: "Family Member 1" },
  { name: "Family Member 3", partner: "Family Member 4" },
  { name: "Family Member 4", partner: "Family Member 3" },
  { name: "Family Member 5", restrictions: [] },
  { name: "Family Member 6", restrictions: [] },
  { name: "Family Member 7", restrictions: [] },
  { name: "Family Member 8", restrictions: [] },
];

// Initialize the Secret Santa application for Wilhelm family
initSecretSanta(people);
