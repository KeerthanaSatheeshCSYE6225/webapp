const AWS = require("aws-sdk");

AWS.config.update({
  region: "us-east-1",
  accessKeyId: "AKIAQDR62YUDBT5EF7ND",
  secretAccessKey: "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",
});

const sns = new AWS.SNS({
  // AWS Configuration settings if not already configured
  region: "us-east-1",
  accessKeyId: "AKIAQDR62YUDBT5EF7ND",
  secretAccessKey: "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",
});

exports.publishToSNS = (topicArn, message, callback) => {
  const params = {
    Message: JSON.stringify(message),
    TopicArn: topicArn,
  };

  sns.publish(params, (err, data) => {
    if (err) {
      console.error("Error publishing message to SNS:", err);
      callback(err); // Pass the error to the callback
    } else {
      console.log("Message published to SNS:", data);
      callback(null, data); // Pass the success response to the callback
    }
  });
};