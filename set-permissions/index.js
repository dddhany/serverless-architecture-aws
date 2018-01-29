"use strict";

const AWS = require("aws-sdk");
const s3 = new AWS.S3();

exports.handler = function(event, context, callback) {
  let message = JSON.parse(event.Records[0].Sns.Message);

  let sourceBucket = message.Records[0].s3.bucket.name;
  let sourceKey = decodeURIComponent(
    message.Records[0].s3.object.key.replace(/\+/g, " ")
  );

  let params = {
    Bucket: sourceBucket,
    Key: sourceKey,
    ACL: "public-read"
  };

  s3.putObjectAcl(params, function(err, data){
      if(err){
          callback(err);
      }
  })
};
