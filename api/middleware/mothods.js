import { thumb } from "node-thumbnail";
import { apply } from "json-patch";
import { image } from "image-downloader";
import { sign } from "jsonwebtoken";

const JWT_KEY = 'secret'

const appRoot = process.cwd().split("\\").join("/")

const methods = {}


methods.patchFunc = function (doc, patch){
    return apply(doc, patch);
}

//image  Downloader
methods.imageDownload = function(url, name){
    const options = {
        url: url,
        dest: appRoot+'/api/uploads/'+name+'.jpg'
    }
    image(options)
}

methods.thumbnailCreator = function (name){
    const src = appRoot +'/api/uploads/'+name+'.jpg';
    const dest = appRoot +'/api/thumbnails';

    thumb({
        source: src,
        destination: dest,
        suffix: '',
        width: 50
    });
}

methods.tokenGen = function (body){
    
    const token = sign(
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
