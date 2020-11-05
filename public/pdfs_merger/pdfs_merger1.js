const formidable = require('formidable')
const fs = require('fs-extra')
const shell = require('shelljs')

const pathToPublicFolder = __dirname;

const pdfs_merger = (req,res)=>{
    var form = new formidable.IncomingForm()
    form.parse(req, function (err, fields, files){
        if(err){
            return res.send('Please give a valid pdf file as input')
        }
        var oldpath = files.filetoupload1.path
        var newpath = './input1.pdf'
        fs.copy(oldpath, newpath, function(err){
            if(err){
                res.send('Error occured, please try again!')
                return res.end()
            }
            res.sendFile(pathToPublicFolder + '/pdfs_merger2.html')
        })
    })
}

module.exports = pdfs_merger