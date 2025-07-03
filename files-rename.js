const fs = require('fs');

const directoryPath = './BOX/';

fs.readdir(directoryPath, (err, files) => {
  if (err) {
    console.log('Error reading directory:', err);
    return;
  }

  files.forEach((file) => {
    const oldFilePath = directoryPath + file;
    const newFilePath = directoryPath + file.replace('BOX ', '');

    fs.rename(oldFilePath, newFilePath, (error) => {
      if (error) {
        console.log('Error renaming file:', error);
      } else {
        console.log(`File ${file} renamed successfully!`);
      }
    });
  });
});