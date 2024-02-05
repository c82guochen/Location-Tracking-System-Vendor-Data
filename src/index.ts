import { dynamodbCreateTable } from './aws';

const vendorsTestTableParams: AWS.DynamoDB.CreateTableInput = {
    TableName: 'vendors',
    // primary key and related type,HASH means unique
    KeySchema: [{ AttributeName: 'twitterId', KeyType: 'HASH' }],
    AttributeDefinitions: [
        { AttributeName: 'twitterId', AttributeType: 'S' },
    ],
    ProvisionedThroughput: {
        ReadCapacityUnits: 10,
        WriteCapacityUnits: 10,
    },
};

dynamodbCreateTable(vendorsTestTableParams);