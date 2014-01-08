exports.index = function(req, res) {
	if (req.session.login) {
		res.render('main');
	} else {
		res.render('index');
	}
};

exports.debug = function(req, res) {
	req.session.login = true;

	var common = require('./common');
	var fs = common.getfs();

	fs.readFile('config.json', 'utf8', function(err, data) {
		if (err) {
			console.log("fs error : " + err);
		} else {
			var key = JSON.parse(data);
			req.session.akid = key.accessKeyId;
			req.session.sak = key.secretAccessKey;
			console.log(req.session.akid);
			console.log(req.session.sak);
			res.render('main');
		}
	});

};

exports.login = function(req, res) {

	console.log("Route : login");

	if (req.session.login) {
		res.redirect('/');
		return;
	}

	var sdk = require('./aws');
	var aws = sdk.createService(req.body.akid, req.body.sak);
	var ec2 = new aws.EC2({
		region : "us-east-1"
	});

	ec2.describeRegions(null, function(err, data) {
		if (err) {
			res.send({
				result : err.code,
				message : err.message
			});
		} else {
			req.session.login = true;
			req.session.akid = req.body.akid;
			req.session.sak = req.body.sak;
			res.send();
		}
	});
};

exports.logout = function(req, res) {
	req.session.login = null;
	res.send();
};
