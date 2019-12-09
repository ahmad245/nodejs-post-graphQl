const config=require('config');
const AWS=require('aws-sdk');
const uuid=require('uuid/v1');
// const multer = require('multer');

// const multerS3 = require('multer-s3');

// const mime = require('mime-types');

// AWS.config(
//   region: 'eu-central-1',
//   s3_signature_version: :v4
// );
const s3=new AWS.S3({
    // accessKeyId:config.get('accessKeyId'),
    // secretAccessKey:config.get('secretAccessKey'),

    accessKeyId:"AKIATYA3ZZ43I33MGMVI",
    secretAccessKey:"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",
    signatureVersion: 'v4',
    region: 'eu-west-3',
   // endpoint:"apigateway.eu-west-3.amazonaws.com"
     

});


module.exports.get=async(req,res,next)=>{
   const file=req.query.file;
   console.log(file);
   

      if(file==='image/jpg'||file==='image/jpeg'  ||file==='image/png'||file==='image/GIF'||file==='image/PSD' )
      {
         const key=`${req.user._id}/${uuid()}`;
         const url=await s3.getSignedUrl('putObject',{
            Bucket:'my-quiz-app',
          //   ContentType:'image/jpg',
            ContentType:'image/*',
            Key:key
          });
          res.send({url,key});
      }else{
         res.status(404).send('Invalid file type, only JPG, JPEG and PNG is allowed!');
      }
   
   
   
}


// const fileFilter = (req, file, cb) => {

//    cb(null, true);
   
//    if (req.query.type === 'document') {
   
//    if (file.mimetype === 'application/pdf' || file.mimetype === 'application/msword' || file.mimetype === 'text/plain' || file.mimetype === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
   
//    cb(null, true);
   
//    } else {
   
//    cb(new Error('Invalid file type, only PDF, DOC, DOCX and TXT is allowed!'), false);
   
//    } else {
   
//    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/jpg' || file.mimetype === 'image/png') {
   
//    cb(null, true);
   
//    } else {
   
//    cb(new Error('Invalid file type, only JPG, JPEG and PNG is allowed!'), false);
   
//    }
   
//    const upload = multer({
   
//    fileFilter,
   
//    limits:{
   
//    files: 1, // allow only 1 file per request
   
//    fileSize: 1024 * 1024 * 10 // 10 MB (max file size)
   
//    },
   
//    storage: multerS3({
   
//    acl: 'public-read',
   
//    s3,
   
//    contentType: multerS3.AUTO_CONTENT_TYPE,
   
//    bucket: process.env.AWS_BUCKET,
   
//    metadata: function (req, file, cb) {
   
//    cb(null, {fieldName: 'TESTING_METADATA'});
   
//    },
   
//    key: function (req, file, cb) {
   
//    let path = '';
   
//    let filename = Date.now().toString()+'.'+mime.extension(file.mimetype);
   
//    if (req.query.module) {
   
//    let dir_path = process.env.AWS_DIRECTORY_PATH;
   
//    dir_path = dir_path.substring(0, dir_path.indexOf("/")) + `/${req.query.module}/`;
   
//    path = dir_path + filename;
   
//    } else {
   
//    path = process.env.AWS_DIRECTORY_PATH + filename;
   
//    cb(null, path);
   
//    })
   
//    });
   
//    module.exports = {
   
//    uploadImage: function (req, res, key, callback) {
   
//    const singleUpload = upload.single(key);
   
//    singleUpload(req, res, function(err) {
   
//    if (err) {
   
//    callback({error: {title: 'File Upload Error', detail: err.message}});
   
//    } else {
   
//    callback(null, {url: req.file.location, key: req.file.key});
   
//    });
   
//    };
      