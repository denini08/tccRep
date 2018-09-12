const {google} = require('googleapis');
const fs = require('fs');
const sampleClient = require('./sampleClient');
const path = require('path');
var key = require('./private_key.json');
const folderID = '1LHhMUFdC2u3CtBheK_uNFdTdoJtiEZ24';

var authenticator = new google.auth.JWT(
    key.client_email,
    null,
    key.private_key,
    ['https://www.googleapis.com/auth/drive'],
    null
);

const drive = google.drive({
  version: 'v3',
  auth: authenticator
});

function uploadFile (fileName) {

  return new Promise((resolve, reject) => {
    const metaData = {
      'name' : fileName,
      parents: [folderID]
    };
    
    const mediaH = {
      mimeType : 'application/pdf',
      body: fs.createReadStream(path.join(__dirname, './' + fileName))
    };
    
    drive.files.create({
      resource: metaData,
      media: mediaH,
      fields: 'id'
    }, (err, file) => {
      if(err) {
        reject(err); 
      } else {
        resolve(file.data.id);
      }
    });  
  });  
};

function downloadFile(id) {
  
  return new Promise((resolve, reject) => {
    drive.files.get({
      fileId: id,
      fields: 'webContentLink'
    }, (err, res) => {
      if(err) {
        reject(err);
      }else {
        resolve(res.data.webContentLink);
      }
    });
  });
};

module.exports =  {uploadFile, downloadFile};