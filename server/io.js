const fs = require('fs');
const path = require('path');
exports.read = function() {
	return new Promise((resolve, reject) => {
		fs.readFile(path.resolve(__dirname, 'user.json'), 'utf-8', function(error, data) {
				if (!error) {
					resolve(JSON.parse(data));
				} else {
					reject(error);
				}
			}
		);
	});
};

exports.write = function(data, cb) {
	fs.writeFile(path.resolve(__dirname, 'user.json'), JSON.stringify(data), cb);
};
