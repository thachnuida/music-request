var request = require('request'),
    zlib = require('zlib');
/*
 * Get Mp3 link from Zing url song
 * @param {Function} cb - function(error, link)
 */
exports.getMp3Zing = function(url, cb) {
  var body = '';
  
  console.log(url);

  var options = {
    url: url,
    headers: {
        'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/31.0.1650.63 Safari/537.36',
        'Host': 'mp3.zing.vn',
        'Accept-Encoding': 'gzip'
    }
  };

  // Thang zing.mp3 no nen trang kieu Gzip
  
  var gzip = zlib.createGunzip();
  var titleReg = /class="detail-title">(.*)<\/h1>/;
  var linkReg = /mp3: "(.*)"/;

  request(options, function(error, response, body){
    if (response.headers['content-encoding'] && response.headers['content-encoding'] == 'gzip') {

      body = '';
      request(options).pipe(gzip);
        gzip.on('data', function(data){
          data = data.toString('utf-8');
          body += data;
        });

        gzip.on('end', function() {
          var title = body.match(titleReg)[1];
          var link = body.match(linkReg)[1];
          cb(null, {title: title, realLink: link});
        });
    } else {
      var title = body.match(titleReg)[1];
      var link = body.match(linkReg)[1];
      cb(null, {title: title, realLink: link});
    }
  });
}