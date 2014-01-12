var AWS = {

	createService : function(akid, sak) {
		var aws = require('aws-sdk');

		aws.config.update({
			"accessKeyId" : akid,
			"secretAccessKey" : sak,
			"region" : "ap-northeast-1"
		});

		return aws;
	}
};

module.exports = AWS;

