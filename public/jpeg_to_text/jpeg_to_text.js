const formidable = require('formidable')
const fs = require('fs')
const shell = require('shelljs')

const jpeg_to_text = (req,res)=>{
    var form = new formidable.IncomingForm()
    form.parse(req, function (err, fields, files){
        if(err){
            return res.send('Please give a valid jpeg file as input')
        }
        var oldpath = files.filetoupload.path
        var newpath = './input.jpeg'
        fs.rename(oldpath, newpath, function(err){
            if(err){
                res.send('Error occured, please try again!')
                return res.end()
            }
            shell.exec('../public/jpeg_to_text/script.sh',()=>{
                res.download('./output.txt','output.txt',()=>{
                    fs.unlink('./output.txt',(err)=>{
                        if(err){
                            console.log('output.txt file could not be deleted')
                            return res.end()
                        }
                    })
                    fs.unlink('./input.jpeg',(err)=>{
                        if(err){
                            console.log('input.jpeg file could not be deleted')
                            return res.end()
                        }
                    })
                    fs.unlink('./inter.tif',(err)=>{
                        if(err){
                            console.log('inter.tif file could not be deleted')
                            return res.end()
                        }
                    })
                })
            })
        })
    })
}

module.exports = jpeg_to_text