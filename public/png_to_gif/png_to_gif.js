const formidable = require('formidable')
const fs = require('fs-extra')
const shell = require('shelljs')

const png_to_gif = (req,res)=>{
    var form = new formidable.IncomingForm()
    form.parse(req, function (err, fields, files){
        if(err){
            return res.send('Please give a valid png file as input')
        }
        var oldpath = files.filetoupload.path
        var newpath = './input.png'
        fs.copy(oldpath, newpath, function(err){
            if(err){
                res.send('Error occured, please try again!')
                return res.end()
            }
            shell.exec('./public/png_to_gif/script.sh',()=>{
                res.download('./input.gif','output.gif',()=>{
                    fs.unlink('./input.gif',(err)=>{
                        if(err){
                            console.log('input.gif file could not be deleted')
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

module.exports = png_to_gif