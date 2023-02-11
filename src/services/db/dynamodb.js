const AWS = require('aws-sdk');

AWS.config.update({
  region: 'local',
  endpoint: 'http://localhost:8000',
  // aws_access_key_id: process.env.AWS_ACCESS_KEY_ID,
  // aws_secret_access_key: process.env.AWS_SECRET_ACCESS_KEY,
});

const dynamodb = new AWS.DynamoDB();

const params = {
  TableName: 'user',
  KeySchema: [
    { AttributeName: 'type', KeyType: 'HASH' },
    { AttributeName: 'name', KeyType: 'RANGE' },
  ],
  AttributeDefinitions: [
    { AttributeName: 'type', AttributeType: 'S' },
    { AttributeName: 'name', AttributeType: 'S' },
  ],
  ProvisionedThroughput: {
    ReadCapacityUnits: 1,
    WriteCapacityUnits: 1,
  },
};
dynamodb.createTable(params, (err, data) => {
  if (err && (!/^Table already/.test(err.message) && err.code !== 'ResourceInUseException')) {
    console.error(`${params.TableName} Unable to create table. Error JSON: ${JSON.stringify(err, null, 2)}`);
  } else if (!err) {
    console.log(`Created table. Table description JSON:  ${JSON.stringify(data, null, 2)}`);
  }
});
