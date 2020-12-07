<?xml version="1.0" encoding="UTF-8"?>
<Workflow xmlns="http://soap.sforce.com/2006/04/metadata">
    <alerts>
        <fullName>Email_alert_for_account</fullName>
        <description>Email alert for account</description>
        <protected>false</protected>
        <recipients>
            <type>owner</type>
        </recipients>
        <recipients>
            <recipient>dmytro.harazdovskiy@elements.co</recipient>
            <type>user</type>
        </recipients>
        <recipients>
            <recipient>insightssecurity@00d3v000000bwteuak.com</recipient>
            <type>user</type>
        </recipients>
        <recipients>
            <recipient>integration@00d3v000000bwteuak.com</recipient>
            <type>user</type>
        </recipients>
        <senderType>CurrentUser</senderType>
        <template>unfiled$public/SupportCaseResponse</template>
    </alerts>
</Workflow>
