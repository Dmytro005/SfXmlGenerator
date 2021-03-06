module.exports = (i) => {
  return {
    filename: `Master_Flow${i}.flow`,
    xml: `<?xml version="1.0" encoding="UTF-8"?>
<Flow xmlns="http://soap.sforce.com/2006/04/metadata">
    <decisions>
        <description>Too much for me</description>
        <name>A_hard_decision</name>
        <label>A hard decision</label>
        <locationX>182</locationX>
        <locationY>158</locationY>
        <defaultConnector>
            <targetReference>Bad_idea</targetReference>
        </defaultConnector>
        <defaultConnectorLabel>Default Outcome</defaultConnectorLabel>
        <rules>
            <name>Lets_try_this_one</name>
            <conditionLogic>and</conditionLogic>
            <conditions>
                <leftValueReference>$System.OriginDateTime</leftValueReference>
                <operator>GreaterThan</operator>
                <rightValue>
                    <dateTimeValue>2020-04-22T23:00:00.000Z</dateTimeValue>
                </rightValue>
            </conditions>
            <connector>
                <targetReference>Nice_idea</targetReference>
            </connector>
            <label>Lets try this one</label>
        </rules>
    </decisions>
    <interviewLabel>Master Flow${i} {!$Flow.CurrentDateTime}</interviewLabel>
    <label>Master Flow${i}</label>
    <processMetadataValues>
        <name>BuilderType</name>
        <value>
            <stringValue>LightningFlowBuilder</stringValue>
        </value>
    </processMetadataValues>
    <processMetadataValues>
        <name>CanvasMode</name>
        <value>
            <stringValue>AUTO_LAYOUT_CANVAS</stringValue>
        </value>
    </processMetadataValues>
    <processMetadataValues>
        <name>OriginBuilderType</name>
        <value>
            <stringValue>LightningFlowBuilder</stringValue>
        </value>
    </processMetadataValues>
    <processType>Flow</processType>
    <start>
        <locationX>56</locationX>
        <locationY>0</locationY>
        <connector>
            <targetReference>A_hard_decision</targetReference>
        </connector>
    </start>
    <status>Active</status>
    <subflows>
        <name>Bad_idea</name>
        <label>Bad idea</label>
        <locationX>314</locationX>
        <locationY>278</locationY>
        <connector>
            <targetReference>Okay_idea</targetReference>
        </connector>
        <flowName>Test_Subflow_2${i}</flowName>
    </subflows>
    <subflows>
        <name>Nice_idea</name>
        <label>Nice idea</label>
        <locationX>50</locationX>
        <locationY>278</locationY>
        <connector>
            <targetReference>Okay_idea</targetReference>
        </connector>
        <flowName>Test_Subflow_1${i}</flowName>
    </subflows>
    <subflows>
        <name>Okay_idea</name>
        <label>Okay idea</label>
        <locationX>182</locationX>
        <locationY>494</locationY>
        <flowName>Test_Subflow_3${i}</flowName>
    </subflows>
</Flow>
`,
  };
};
