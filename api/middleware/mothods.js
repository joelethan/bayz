const thumb = require('node-thumbnail').thumb;
const jsonpatch = require('json-patch');
const downloader = require('image-downloader')
const jwt = require('jsonwebtoken');

const JWT_KEY = 'secret'

const root = require('app-root-dir').get();
appRootDir = root.split("\\").join("/")
var methods = {}


methods.patchFunc = function (doc,body){
    return jsonpatch.apply(doc, body.patch);
}

//image  Downloader
methods.imageDownload = function(body){
    options = {
        url: body.url,
        dest: appRootDir+'/api/uploads/'+body.dest+'.jpg'
    }
    downloader.image(options)
}

methods.thumbnailCreator = function (body){
    var src = appRootDir+'/api/uploads/'+body.dest+'.jpg';
    var dest = appRootDir+'/api/thumbnails';

    thumb({
        source: src,
        destination: dest,
        suffix: '',
        width: 50
    });
}

methods.tokenGen = function (body){
    
    const token = jwt.sign(
        {
          email: body.email
        },
        JWT_KEY,
        {
            expiresIn: "1h"
        }
      );
      return token
}

exports.data = methods;