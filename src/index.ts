import {
    dynamodbCreateTable,
    dynamodbDescribeTable,
    dynamodbDeleteTable,
    dynamodbCreateRecord,
    dynamodbDeleteRecord,
  } from './aws';
  import vendors from './data/vendors';

const init = async () => {
    const TABLE_NAME_CONST = 'vendors';
    // primary key and related type,HASH means unique
    const vendorsTestTableParams: AWS.DynamoDB.CreateTableInput = {
        TableName: TABLE_NAME_CONST,
        KeySchema: [{ AttributeName: 'twitterId', KeyType: 'HASH' }],
        AttributeDefinitions: [
        { AttributeName: 'twitterId', AttributeType: 'S' },
        ],
        ProvisionedThroughput: {
        ReadCapacityUnits: 10,
        WriteCapacityUnits: 10,
        },
    };

    // 1 - create table
    //   dynamodbCreateTable(vendorsTestTableParams);

    // 2 - describe table
    // dynamodbDescribeTable(TABLE_NAME_CONST);

    // 3 - delete table
    // dynamodbDeleteTable(TABLE_NAME_CONST);

    // 4 - Insert a record
    // const DUMMY_DATA = vendors[0];
    // dynamodbCreateRecord(TABLE_NAME_CONST, DUMMY_DATA);

    // 5 - Seed all data
    for (const vendorData of vendors) {
        const res = dynamodbCreateRecord(TABLE_NAME_CONST, vendorData);
        if (res instanceof Error) {
            console.log('Error', vendorData, res);
        }
    }
    
    // 6 - Delete a record
    // const vendor_id = vendors[0].twitterId;
    // dynamodbDeleteRecord(TABLE_NAME_CONST, vendor_id);


};

init();