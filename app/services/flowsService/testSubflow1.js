module.exports = (i) => {
  return  { filename: `Test_Subflow_1${i}.flow`, xml: `<?xml version="1.0" encoding="UTF-8"?>
<Flow xmlns="http://soap.sforce.com/2006/04/metadata">
    <interviewLabel>Test Subflow 1${i} {!$Flow.CurrentDateTime}</interviewLabel>
    <label>Test Subflow 1${i}</label>
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
        <name>Test_screen</name>
        <label>Test screen</label>
        <locationX>669</locationX>
        <locationY>203</locationY>
        <allowBack>true</allowBack>
        <allowFinish>true</allowFinish>
        <allowPause>true</allowPause>
        <showFooter>true</showFooter>
        <showHeader>true</showHeader>
    </screens>
    <start>
        <locationX>544</locationX>
        <locationY>48</locationY>
        <connector>
            <targetReference>Test_screen</targetReference>
        </connector>
    </start>
    <status>Active</status>
</Flow>
`}
}