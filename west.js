// West Family - Secret Santa Configuration
const people = [
  { name: "Papa", partner: "Mema" },
  { name: "Mema", partner: "Papa" },
  { name: "Mark", restrictions: ["Nan", "Sheri"] },
  { name: "Nan", restrictions: ["Mark", "Sheri"] },
  { name: "Steve", partner: "Jenny" },
  { name: "Jenny", partner: "Steve" },
  { name: "Bryson", partner: "Emily" },
  { name: "Emily", partner: "Bryson" },
  { name: "Jon", partner: "Carmen" },
  { name: "Carmen", partner: "Jon" },
  { name: "Sheri", restrictions: ["Mark", "Nan"] },
  { name: "Josh" },
];

// Initialize the Secret Santa application for West family
initSecretSanta(people);
