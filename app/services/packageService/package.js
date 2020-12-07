module.exports = (membersNames, membersType) => {
  const members = membersNames.reduce((acc, name) => {
    acc += `\t\t\t\t<members>${name}</members>\n`;
    return acc;
  }, "");
  return `<?xml version="1.0" encoding="UTF-8"?>
<Package xmlns="http://soap.sforce.com/2006/04/metadata">
    <types>
${members}
        <name>${membersType}</name>
    </types>
    <version>48.0</version>
</Package>
`;
};
