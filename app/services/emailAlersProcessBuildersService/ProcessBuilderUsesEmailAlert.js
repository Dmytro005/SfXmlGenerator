module.exports = (pbName, emailAlerts) => {
  return {
    filename: `${pbName}.flow`,
    xml: `<?xml version="1.0" encoding="UTF-8"?>
<Flow xmlns="http://soap.sforce.com/2006/04/metadata">
    ${emailAlerts
      .map((emailAlert, i) => {
        return `
        <actionCalls>
            <processMetadataValues>
                <name>emailAlertSelection</name>
                <value>
                    <stringValue>${emailAlert.split(".")[1]}</stringValue>
                </value>
            </processMetadataValues>
            <name>myRule_1_A${i + 1}</name>
            <label>Test action</label>
            <locationX>100</locationX>
            <locationY>300</locationY>
            <actionName>${emailAlert}</actionName>
            <actionType>emailAlert</actionType>
            ${
              i + 1 < emailAlerts.length
                ? `<connector>
                <targetReference>myRule_1_A${i + 2}</targetReference>
            </connector>`
                : ""
            }
            <inputParameters>
                <name>SObjectRowId</name>
                <value>
                    <elementReference>myVariable_current.Id</elementReference>
                </value>
            </inputParameters>
        </actionCalls>
      `;
      })
      .join("")}
    <apiVersion>50.0</apiVersion>
    <decisions>
        <processMetadataValues>
            <name>index</name>
            <value>
                <numberValue>0.0</numberValue>
            </value>
        </processMetadataValues>
        <name>myDecision</name>
        <label>myDecision</label>
        <locationX>50</locationX>
        <locationY>0</locationY>
        <defaultConnectorLabel>default</defaultConnectorLabel>
        <rules>
            <name>myRule_1</name>
            <conditionLogic>and</conditionLogic>
            <conditions>
                <processMetadataValues>
                    <name>inputDataType</name>
                    <value>
                        <stringValue>String</stringValue>
                    </value>
                </processMetadataValues>
                <processMetadataValues>
                    <name>leftHandSideType</name>
                    <value>
                        <stringValue>String</stringValue>
                    </value>
                </processMetadataValues>
                <processMetadataValues>
                    <name>operatorDataType</name>
                    <value>
                        <stringValue>String</stringValue>
                    </value>
                </processMetadataValues>
                <processMetadataValues>
                    <name>rightHandSideType</name>
                    <value>
                        <stringValue>String</stringValue>
                    </value>
                </processMetadataValues>
                <leftValueReference>myVariable_current.PhotoUrl</leftValueReference>
                <operator>EqualTo</operator>
                <rightValue>
                    <stringValue>asdf</stringValue>
                </rightValue>
            </conditions>
            <connector>
                <targetReference>myRule_1_A1</targetReference>
            </connector>
            <label>My test email alert criteria</label>
        </rules>
    </decisions>
    <description>PB that users 2 email alerts</description>
    <interviewLabel>${pbName}_interviewLabel</interviewLabel>
    <label>${pbName}</label>
    <processMetadataValues>
        <name>ObjectType</name>
        <value>
            <stringValue>Account</stringValue>
        </value>
    </processMetadataValues>
    <processMetadataValues>
        <name>ObjectVariable</name>
        <value>
            <elementReference>myVariable_current</elementReference>
        </value>
    </processMetadataValues>
    <processMetadataValues>
        <name>OldObjectVariable</name>
        <value>
            <elementReference>myVariable_old</elementReference>
        </value>
    </processMetadataValues>
    <processMetadataValues>
        <name>TriggerType</name>
        <value>
            <stringValue>onCreateOnly</stringValue>
        </value>
    </processMetadataValues>
    <processType>Workflow</processType>
    <startElementReference>myDecision</startElementReference>
    <status>Active</status>
    <variables>
        <name>myVariable_current</name>
        <dataType>SObject</dataType>
        <isCollection>false</isCollection>
        <isInput>true</isInput>
        <isOutput>true</isOutput>
        <objectType>Account</objectType>
    </variables>
    <variables>
        <name>myVariable_old</name>
        <dataType>SObject</dataType>
        <isCollection>false</isCollection>
        <isInput>true</isInput>
        <isOutput>false</isOutput>
        <objectType>Account</objectType>
    </variables>
</Flow>
    `,
  };
};
