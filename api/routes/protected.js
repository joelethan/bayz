import { Router } from "express";
import urlExists from "url-exists";
import fileExists from "file-exists";
import delay from "delay";

const appRoot = process.cwd().split("\\").join("/")

const checkAuth = require('../middleware/check-auth');
const methods = require('../middleware/mothods')


// Document
var myobj = {};
const router = Router();


// API
router.get('/patch', checkAuth, (req, res, next) => {

    res.status(200).json({
        message: 'GET requests to /protected/patch',
        patchd: myobj
    });
});

router.post('/patch', checkAuth, (req, res, next) => {
    const patch = req.body.patch;
    myobj = req.body.myobj;
    
    if (!patch || !myobj){
        res.status(500).json({
            message: 'patch or body or doc not found!!'
        });
    } else if ((patch).length==0){
        res.status(500).json({
            message: 'patch can not be empty!!'
        });
    } else {
        methods.data.patchFunc(myobj, patch)
        res.status(200).json({
            message: 'POST requests to /protected/patch',
            patch: myobj
        });
    }
});

router.post('/image', checkAuth, (req, res, next) => {
    const url= req.body.url
    const imageName = req.body.imageName || 'imagename'
    var message = ''

    urlExists(url, function(err, exists) {
        if(exists){

            const imgExt = url.split('.').pop()
            if (['img','png', 'jpg'].indexOf(imgExt) === -1) {
                res.status(500).json({
                    message: 'url has no image!!!! '
                });

            }else{
                (async () => {
                    methods.data.imageDownload(url, imageName)
                    await delay(3000);
                    methods.data.thumbnailCreator(imageName)
                })();

                message = message +'Image downloaded, Thumbnail created '
                res.status(201).json({
                    message: message
                });

            }



        }else{
            message = message + 'url broken, '
            fileExists(appRoot+'/api/uploads/'+imageName+'.jpg').then(exists => {
                if(exists){
                    methods.data.thumbnailCreator(imageName)
                    message = message + 'Thumbnail created '
                    res.status(201).json({
                        message: message
                    });
                }else{
                    message = message + 'No image found '
                    res.status(404).json({
                        message: message
                    });
                }
            })
            
        }

    });
});

module.exports = router;