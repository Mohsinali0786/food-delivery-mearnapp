const cloudinaryModule = require('cloudinary');
const dotenv = require('dotenv');

const multer = require('multer');
dotenv.config()

const cloudinary = cloudinaryModule.v2
console.log(process.env.API_KEY,'Api KEy')
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET,
  });
  module.exports = cloudinary
// module.exports={
//     async  ImageUploader(req) {   
//         console.log(req.file,'req.fiile') 
//             if (req.file) {
//                 await new Promise((resolve, reject) => {
//                     const uploadStream = cloudinary.uploader.upload_stream(
//                         { resource_type: 'image' },
//                         (error, result) => {
//                             if (error) {
//                                 return reject(error);
//                             }
//                             imageUrl = result.secure_url;
//                             resolve(result);
//                         }
//                     );
//                     uploadStream.end(req.file.buffer);
//                 });
//                 return imageUrl
//             }
    
//     }
// }