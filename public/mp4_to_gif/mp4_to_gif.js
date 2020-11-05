const formidable = require('formidable')
const fs = require('fs-extra')
const shell = require('shelljs')

const mp4_to_gif = (req,res)=>{
    var form = new formidable.IncomingForm()
    form.parse(req, function (err, fields, files){
        if(err){
            return res.send('Please give a valid mp4 file as input')
        }
        var oldpath = files.filetoupload.path
        var newpath = './input.mp4'
        fs.copy(oldpath, newpath, function(err){
            if(err){
                res.send('Error occured, please try again!')
                return res.end()
            }
            shell.exec('./public/mp4_to_gif/script.sh',()=>{
                res.download('./output.gif','output.gif',()=>{
                    fs.unlink('./output.gif',(err)=>{
                        if(err){
                            console.log('output.gif file could not be deleted')
                            return res.end()
                        }
                    })
                    fs.unlink('./input.mp4',(err)=>{
                        if(err){
                            console.log('./input.mp4 file could not be deleted')
                            return res.end()
                        }
                    })
                })
            })
        })
    })
}

module.exports = mp4_to_gif