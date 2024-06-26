const express = require("express");
const multer = require('multer');
const cors = require('cors');
const fs = require('fs');
const crypto = require('crypto');

var app = express();
app.use(cors()); 

// reating some disk storage options
const storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, __dirname + '/uploads');
    },
    
    filename: function (req, file, callback) {
        callback(null, file.originalname);
    }
    
  })
  
const upload = multer({ storage: storage })

app.post("/api", upload.array("files"), (req, res) => {

    const fileHashes = [];//hash calculating
    for (let i = 0; i < req.files.length; i++) {
        const file = req.files[i];
        const fileBuffer = fs.readFileSync(file.path);
        const hash = crypto.createHash('sha256');
        hash.update(fileBuffer);
        const fileHash = hash.digest('hex');
        fileHashes.push(fileHash);
    }
    
    
    // Generating digital signature 
    const privateKey = fs.readFileSync('./Keys/private.pem');
    const fileBuffer = fs.readFileSync(req.files[0].path);
    const signature = crypto.sign('sha256', fileBuffer, privateKey);

     // Saving the digital signature to a file
     fs.writeFileSync('signature.sig', signature,'utf-8');

     // Verifying the digital signature using the public key
    const publicKey = fs.readFileSync('./Keys/public.pem');
    const verified = crypto.verify('sha256', fileBuffer, publicKey, signature);
    if (verified) {
        console.log("File has not been tampered with!");
        
        res.json({ message: "File uploaded successfully and digitally signed" });
    } else {
        console.error("File has been tampered with!");
        res.status(400).json({ message: "File has been tampered with!" });
    }    
   

});

app.listen(5000, function(){
    console.log("Server running on port 5000");
});

