const formidable = require('formidable')
const fs = require('fs')
const shell = require('shelljs')

const jpeg_to_gif = (req,res)=>{
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
            shell.exec('./public/jpeg_to_gif/script.sh',()=>{
                res.download('./input.gif','output.gif',()=>{
                    fs.unlink('./input.gif',(err)=>{
                        if(err){
                            console.log('input.gif file could not be deleted')
                            return res.end()
                        }
                    })
                    fs.unlink('./input.jpeg',(err)=>{
                        if(err){
                            console.log('./input.jpeg file could not be deleted')
                            return res.end()
                        }
                    })
                })
            })
        })
    })
}

module.exports = jpeg_to_gif