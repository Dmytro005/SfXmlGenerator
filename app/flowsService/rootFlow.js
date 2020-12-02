module.exports = (i) => {
  return { filename: `Root_flow${i}.flow`, xml: `<?xml version="1.0" encoding="UTF-8"?>
<Flow xmlns="http://soap.sforce.com/2006/04/metadata">
    <decisions>
        <name>very_tought_decision</name>
        <label>tangled decision</label>
        <locationX>578</locationX>
        <locationY>158</locationY>
        <defaultConnector>
            <targetReference>Master_Flow_2${i}</targetReference>
        </defaultConnector>
        <defaultConnectorLabel>Default Outcome</defaultConnectorLabel>
        <rules>
            <name>master_outcome_1</name>
            <conditionLogic>and</conditionLogic>
            <conditions>
                <leftValueReference>$Flow.FaultMessage</leftValueReference>
                <operator>EqualTo</operator>
                <rightValue>
                    <stringValue>stage</stringValue>
                </rightValue>
            </conditions>
            <connector>
                <targetReference>Master_Flow${i}</targetReference>
            </connector>
            <label>master outcome 1</label>
        </rules>
        <rules>
            <name>third_outcome</name>
            <conditionLogic>and</conditionLogic>
            <conditions>
                <leftValueReference>$Flow.FaultMessage</leftValueReference>
                <operator>EqualTo</operator>
                <rightValue>
                    <stringValue>fault outcome</stringValue>
                </rightValue>
            </conditions>
            <connector>
                <targetReference>Test_Subflow_3${i}</targetReference>
            </connector>
            <label>third outcome</label>
        </rules>
        <rules>
            <name>second_outcome</name>
            <conditionLogic>and</conditionLogic>
            <conditions>
                <leftValueReference>$Flow.FaultMessage</leftValueReference>
                <operator>EqualTo</operator>
                <rightValue>
                    <stringValue>first outcome 2</stringValue>
                </rightValue>
            </conditions>
            <connector>
                <targetReference>TestSubflow2${i}</targetReference>
            </connector>
            <label>second outcome</label>
        </rules>
        <rules>
            <name>first_outcome</name>
            <conditionLogic>and</conditionLogic>
            <conditions>
                <leftValueReference>$Flow.FaultMessage</leftValueReference>
                <operator>EqualTo</operator>
                <rightValue>
                    <stringValue>message</stringValue>
                </rightValue>
            </conditions>
            <connector>
                <targetReference>Test_Subflow_1${i}</targetReference>
            </connector>
            <label>first outcome</label>
        </rules>
    </decisions>
    <description>Contains 5 links 
 - Master Flow 2${i}
 - Master Flow${i} 
 - Test Subflow 1${i}
 - Test Subflow 2${i}
 - Test Subflow 3${i}</description>
    <interviewLabel>Root flow${i} {!$Flow.CurrentDateTime}</interviewLabel>
    <label>Root flow${i}</label>
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
        <locationX>452</locationX>
        <locationY>0</locationY>
        <connector>
            <targetReference>very_tought_decision</targetReference>
        </connector>
    </start>
    <status>Active</status>
    <subflows>
        <name>Master_Flow${i}</name>
        <label>Master Flow${i}</label>
        <locationX>50</locationX>
        <locationY>278</locationY>
        <flowName>Master_Flow${i}</flowName>
    </subflows>
    <subflows>
        <name>Master_Flow_2${i}</name>
        <label>Master Flow 2${i}</label>
        <locationX>1106</locationX>
        <locationY>278</locationY>
        <flowName>Master_Flow_2${i}</flowName>
    </subflows>
    <subflows>
        <name>Test_Subflow_1${i}</name>
        <label>Test Subflow 1${i}</label>
        <locationX>842</locationX>
        <locationY>278</locationY>
        <flowName>Test_Subflow_1${i}</flowName>
    </subflows>
    <subflows>
        <name>Test_Subflow_3${i}</name>
        <label>Test Subflow 3${i}</label>
        <locationX>314</locationX>
        <locationY>278</locationY>
        <flowName>Test_Subflow_3${i}</flowName>
    </subflows>
    <subflows>
        <name>TestSubflow2${i}</name>
        <label>Test Subflow 2${i}</label>
        <locationX>578</locationX>
        <locationY>278</locationY>
        <flowName>Test_Subflow_2${i}</flowName>
    </subflows>
</Flow>
`}
}