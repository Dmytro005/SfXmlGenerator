module.exports = (i) => {
  return { filename: `Test_Subflow_2${i}.flow`, xml: `<?xml version="1.0" encoding="UTF-8"?>
<Flow xmlns="http://soap.sforce.com/2006/04/metadata">
    <interviewLabel>Test Subflow 2${i} {!$Flow.CurrentDateTime}</interviewLabel>
    <label>Test Subflow 2${i}</label>
    <processMetadataValues>
        <name>BuilderType</name>
        <value>
            <stringValue>LightningFlowBuilder</stringValue>
        </value>
    </processMetadataValues>
    <processMetadataValues>
        <name>CanvasMode</name>
        <value>
            <stringValue>FREE_FORM_CANVAS</stringValue>
        </value>
    </processMetadataValues>
    <processMetadataValues>
        <name>OriginBuilderType</name>
        <value>
            <stringValue>LightningFlowBuilder</stringValue>
        </value>
    </processMetadataValues>
    <processType>Flow</processType>
    <screens>
        <name>Test_Screen_2</name>
        <label>Test Screen 2</label>
        <locationX>685</locationX>
        <locationY>163</locationY>
        <allowBack>true</allowBack>
        <allowFinish>true</allowFinish>
        <allowPause>true</allowPause>
        <showFooter>true</showFooter>
        <showHeader>true</showHeader>
    </screens>
    <start>
        <locationX>561</locationX>
        <locationY>17</locationY>
        <connector>
            <targetReference>Test_Screen_2</targetReference>
        </connector>
    </start>
    <status>Active</status>
</Flow>
`}
}