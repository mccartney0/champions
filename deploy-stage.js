const SftpUpload = require('sftp-upload');

const options = {
  host: 'know-stage.oraclecorp.com',
  username: 'oracle',
  path: './dist',
  remoteDir: '/u03/app/apache-tomcat-rgo/webapps/ROOT/call-for-ambassadors',
  excludedFolders: ['./.git', 'node_modules'],
  password: 'LKC#Orcl123_',
};
const sftp = new SftpUpload(options);

sftp
  .on('error', (err) => {
    throw err;
  })
  .on('uploading', (progress) => {
    console.log('Uploading', progress.file);
    console.log(`${progress.percent}% completed`);
  })
  .on('completed', () => {
    console.log('Upload Completed');
  })
  .upload();

console.log('---------------------------------------------------------');
