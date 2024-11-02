const cloudinary = require('cloudinary');

cloudinary.v2.config({
  cloud_name: 'dciv8zipz',
  api_key: '194662765585872',
  api_secret: 'g6XHfGiRSiNzxqT9Lu7s8QOL12E',
  secure: true,
});

module.exports = cloudinary