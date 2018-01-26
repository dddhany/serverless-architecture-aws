"use strict";

var AWS = require("aws-sdk");
var elasticTranscoder = new AWS.ElasticTranscoder({
  region: "ap-southeast-1"
});

exports.handler = function(event, context, callback) {
  var key = event.Records[0].s3.object.key;
  var sourceKey = decodeURIComponent(key.replace(/\+/g, " "));
  var outputKey = sourceKey.split(".")[0];
  console.log("key:", key, sourceKey, outputKey);
  var params = {
    PipelineId: "1516866322699-052do3",
    OutputKeyPrefix: outputKey + "/",
    Input: {
      Key: sourceKey
    },
    Outputs: [
      {
        Key: outputKey + "-1080p" + ".mp4",
        PresetId: "1351620000001-000001" //Generic 1080p
      },
      {
        Key: outputKey + "-720p" + ".mp4",
        PresetId: "1351620000001-000010" //Generic 720p
      },
      {
        Key: outputKey + "-web-720p" + ".mp4",
        PresetId: "1351620000001-100070" //Web Friendly 720p
      }
    ]
  };
  elasticTranscoder.createJob(params, function(error, data) {
    if (error) {
      callback(error);
    }
  });
};
