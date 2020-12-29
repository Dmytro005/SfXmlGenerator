module.exports = (membersNames, membersType) => {
  return `<?xml version="1.0" encoding="UTF-8"?>
<Package xmlns="http://soap.sforce.com/2006/04/metadata">
    ${membersType.map(
      (type) => `
      <types>
          ${membersNames[type]
            .map((name) => `<members>${name}</members>`)
            .join("\n")}
          <name>${type}</name>
      </types>
      `
    ).join("")}
    <version>48.0</version>
</Package>
`;
};
