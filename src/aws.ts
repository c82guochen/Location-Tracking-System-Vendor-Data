import AWS from 'aws-sdk';
import { AWSRegions } from './types/aws';
import { Vendor } from './types/twitter';
import { marshall } from '@aws-sdk/util-dynamodb';

// 通过 AWS.config.update 方法，设置 AWS SDK 的配置。
// 在这里，将默认的 AWS 区域设置为 US_EAST_1。这表示后续对 AWS 服务的调用将在美国东部（北弗吉尼亚）区域进行。
AWS.config.update({ region: AWSRegions.US_EAST_1 });

// 通过解构赋值，从 AWS 对象中获取 DynamoDB 类，
// 然后创建一个 DynamoDB 的实例（dynamodb）。
const { DynamoDB } = AWS;
const dynamodb = new DynamoDB();

// 1 -  Create a table
// 该函数叫做 dynamodbCreateTable，它接受一个参数 params
export const dynamodbCreateTable = async (
  // 该参数应该是一个符合 AWS.DynamoDB.CreateTableInput 接口定义的对象。
  params: AWS.DynamoDB.CreateTableInput
) => {
  try {
  // promise()是将 AWS 请求转换为 Promise 的方法。
  // 在 JavaScript 中，很多异步操作使用 Promise 进行管理，因为 Promise 提供了一种更清晰和可管理的异步编程方式。
  // AWS SDK 的很多操作都是异步的，例如在上面的代码中，`dynamodb.createTable(params)` 是一个异步操作，它向 DynamoDB 发送创建表的请求。为了方便处理这种异步操作，AWS SDK 提供了 `.promise()` 方法，该方法返回一个 Promise 对象，使得可以使用 `async/await` 语法或 `.then()` 方法来处理异步操作的结果。
    const res = await dynamodb.createTable(params).promise();
    console.log('Table created', res);
    return res;
  } catch (error) {
    console.error(error);
    throw new Error('dynamodbCreateTable error');
  }
};

// 2 - Describe a table
export const dynamodbDescribeTable = async (tableName: string) => {
  try {
    const res = await dynamodb
      .describeTable({ TableName: tableName })
      .promise();
    console.log('Table retrieved', res);
    return res;
  } catch (error) {
    console.error(error);
    throw new Error('dynamodbDescribeTable error');
  }
};

// 3 - Delete a table
export const dynamodbDeleteTable = async (tableName: string) => {
  try {
    const res = await dynamodb
      .deleteTable({ TableName: tableName })
      .promise();
    console.log('Table deleted', res);
    return res;
  } catch (error) {
    console.error(error);
    throw new Error('dynamodbDeleteTable error');
  }
};

// 4 - Insert a record
export const dynamodbCreateRecord = async (
  tableName: string,
  vendorData: Vendor
) => {
  try {
    // marshall是为了把vendorData变成dynamoDB能接受的key-value形式，key是value的type
    const res = await dynamodb
      .putItem({ TableName: tableName, Item: marshall(vendorData) })
      .promise();
    // 所以等拿到数据的时候需要inmarshall下
    console.log('Record created', res);
    return res;
  } catch (error) {
    console.error(error);
    throw new Error('dynamodbCreateRecord error');
  }
};