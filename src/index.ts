// 是整个系统的入口
import {
  dynamodbCreateTable,
  dynamodbDescribeTable,
  dynamodbDeleteTable,
  dynamodbCreateRecord,
} from './aws';
// 用花括号括起来的是export的函数
// 不用花括号的是variable
import vendors from './data/vendors';

// 这段代码主要是调用之前定义的 dynamodbCreateTable 函数来创建一个 DynamoDB 表

const init = async () => {
  const TABLE_NAME_CONST = 'vendors';

  const vendorsTestTableParams: AWS.DynamoDB.CreateTableInput = {
    TableName: TABLE_NAME_CONST,
    // 定义表中主键和其类型，HASH主键用于唯一标识表中的每个项目
    KeySchema: [{ AttributeName: 'twitterId', KeyType: 'HASH' }],
    // AttributeDefinitions 用于定义表中使用的属性（Attributes）。
    AttributeDefinitions: [
    // AttributeName意为属性，AttributeType意为属性的类型是 'S'，表示字符串类型。
      { AttributeName: 'twitterId', AttributeType: 'S' },
    ],
    ProvisionedThroughput: {
      ReadCapacityUnits: 10,
      WriteCapacityUnits: 10,
    },
  };

  // 1 - create table
    // dynamodbCreateTable(vendorsTestTableParams);

  // 2 - describe table
    dynamodbDescribeTable(TABLE_NAME_CONST);

  // 3 - delete table
    // dynamodbDeleteTable(TABLE_NAME_CONST);

  // 4 - Insert a record
  // const DUMMY_DATA = vendors[0];
  // dynamodbCreateRecord(TABLE_NAME_CONST, DUMMY_DATA);

    // 5 - Seed all data
  // for (const vendorData of vendors) {
  //     const res = dynamodbCreateRecord(TABLE_NAME_CONST, vendorData);
  //     if (res instanceof Error) {
  //       console.log('Error', vendorData, res);
  //     }
  //   }
  };
// 每个函数都是异步的，所以只能一步一注释
init();
//优化：
// 1、创建已存在的表，返回已创建的表的基本信息
// 2、describe不存在的表，若不存在则创建它
// （注意异步问题！！不仅要用await和async，还要把throw error改成return error，不然出错会卡主await）
