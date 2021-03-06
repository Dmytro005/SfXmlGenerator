function generateAlert(alertName) {
  return `<alerts>
    <fullName>${alertName}</fullName>
    <ccEmails>example@gmail.com</ccEmails>
    <ccEmails>example@gmail.com</ccEmails>
    <description>${alertName} Description</description>
    <protected>false</protected>
    <recipients>
        <type>accountOwner</type>
    </recipients>
    <recipients>
        <type>campaignMemberDerivedOwner</type>
    </recipients>
    <recipients>
        <type>creator</type>
    </recipients>
    <recipients>
        <recipient>CEO</recipient>
        <type>role</type>
    </recipients>
    <recipients>
        <recipient>CFO</recipient>
        <type>role</type>
    </recipients>
    <recipients>
        <recipient>COO</recipient>
        <type>role</type>
    </recipients>
    <recipients>
        <recipient>ChannelSalesTeam</recipient>
        <type>role</type>
    </recipients>
    <recipients>
        <recipient>CustomerSupportInternational</recipient>
        <type>role</type>
    </recipients>
    <recipients>
        <recipient>CustomerSupportNorthAmerica</recipient>
        <type>role</type>
    </recipients>
    <recipients>
        <recipient>DirectorChannelSales</recipient>
        <type>role</type>
    </recipients>
    <recipients>
        <recipient>DirectorDirectSales</recipient>
        <type>role</type>
    </recipients>
    <recipients>
        <recipient>EasternSalesTeam</recipient>
        <type>role</type>
    </recipients>
    <recipients>
        <recipient>InstallationRepairServices</recipient>
        <type>role</type>
    </recipients>
    <recipients>
        <recipient>MarketingTeam</recipient>
        <type>role</type>
    </recipients>
    <recipients>
        <recipient>SVPCustomerServiceSupport</recipient>
        <type>role</type>
    </recipients>
    <recipients>
        <recipient>SVPHumanResources</recipient>
        <type>role</type>
    </recipients>
    <recipients>
        <recipient>SVPSalesMarketing</recipient>
        <type>role</type>
    </recipients>
    <recipients>
        <recipient>VPInternationalSales</recipient>
        <type>role</type>
    </recipients>
    <recipients>
        <recipient>VPMarketing</recipient>
        <type>role</type>
    </recipients>
    <recipients>
        <recipient>VPNorthAmericanSales</recipient>
        <type>role</type>
    </recipients>
    <recipients>
        <recipient>WesternSalesTeam</recipient>
        <type>role</type>
    </recipients>
    <recipients>
        <recipient>CEO</recipient>
        <type>roleSubordinates</type>
    </recipients>
    <recipients>
        <recipient>CFO</recipient>
        <type>roleSubordinates</type>
    </recipients>
    <recipients>
        <recipient>COO</recipient>
        <type>roleSubordinates</type>
    </recipients>
    <recipients>
        <recipient>ChannelSalesTeam</recipient>
        <type>roleSubordinates</type>
    </recipients>
    <recipients>
        <recipient>CustomerSupportInternational</recipient>
        <type>roleSubordinates</type>
    </recipients>
    <recipients>
        <recipient>CustomerSupportNorthAmerica</recipient>
        <type>roleSubordinates</type>
    </recipients>
    <recipients>
        <recipient>DirectorChannelSales</recipient>
        <type>roleSubordinates</type>
    </recipients>
    <recipients>
        <recipient>DirectorDirectSales</recipient>
        <type>roleSubordinates</type>
    </recipients>
    <recipients>
        <recipient>EasternSalesTeam</recipient>
        <type>roleSubordinates</type>
    </recipients>
    <recipients>
        <recipient>InstallationRepairServices</recipient>
        <type>roleSubordinates</type>
    </recipients>
    <recipients>
        <recipient>MarketingTeam</recipient>
        <type>roleSubordinates</type>
    </recipients>
    <recipients>
        <recipient>SVPCustomerServiceSupport</recipient>
        <type>roleSubordinates</type>
    </recipients>
    <recipients>
        <recipient>SVPHumanResources</recipient>
        <type>roleSubordinates</type>
    </recipients>
    <recipients>
        <recipient>SVPSalesMarketing</recipient>
        <type>roleSubordinates</type>
    </recipients>
    <recipients>
        <recipient>VPInternationalSales</recipient>
        <type>roleSubordinates</type>
    </recipients>
    <recipients>
        <recipient>VPMarketing</recipient>
        <type>roleSubordinates</type>
    </recipients>
    <recipients>
        <recipient>VPNorthAmericanSales</recipient>
        <type>roleSubordinates</type>
    </recipients>
    <recipients>
        <recipient>WesternSalesTeam</recipient>
        <type>roleSubordinates</type>
    </recipients>
    <senderType>CurrentUser</senderType>
    <template>unfiled$public/SalesNewCustomerEmail</template>
</alerts>`;
}

function generateXml(membersNames) {
  return `<?xml version="1.0" encoding="UTF-8"?>
  <Workflow xmlns="http://soap.sforce.com/2006/04/metadata">
   ${membersNames.map((name) => generateAlert(name)).join("\n")}
  </Workflow>`;
}

module.exports = (parentObject, membersNames, prefix) => {
  return {
    xml: generateXml(membersNames),
    filename: `${parentObject}.workflow`,
    entetiesInSet: 1,
  };
};
