const formidable = require('formidable')
const fs = require('fs-extra')
const shell = require('shelljs')

const png_to_jpeg = (req,res)=>{
    var form = new formidable.IncomingForm()
    form.parse(req, function (err, fields, files){
        if(err){
            return res.send('Please give a valid jpeg file as input')
        }
        var oldpath = files.filetoupload.path
        var newpath = './input.png'
        fs.copy(oldpath, newpath, function(err){
            if(err){
                res.send('Error occured, please try again!')
                return res.end()
            }
            shell.exec('./public/png_to_jpeg/script.sh',()=>{
                res.download('./input.jpeg','output.jpeg',()=>{
                    fs.unlink('./input.jpeg',(err)=>{
                        if(err){
                            console.log('input.jpeg file could not be deleted')
                            return res.end()
                        }
                    })
                    fs.unlink('./input.png',(err)=>{
                        if(err){
                            console.log('./input.png file could not be deleted')
                            return res.end()
                        }
                    })
                })
            })
        })
    })
}

module.exports = png_to_jpeg