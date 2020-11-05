const formidable = require('formidable')
const fs = require('fs-extra')
const shell = require('shelljs')

const flv_to_mp4 = (req,res)=>{
    var form = new formidable.IncomingForm()
    form.parse(req, function (err, fields, files){
        if(err){
            return res.send('Please give a valid flv file as input')
        }
        var oldpath = files.filetoupload.path
        var newpath = './input.flv'
        fs.copy(oldpath, newpath, function(err){
            if(err){
                res.send('Error occured, please try again!')
                return res.end()
            }
            shell.exec('./public/flv_to_mp4/script.sh',()=>{
                res.download('./output.mp4','output.mp4',()=>{
                    fs.unlink('./output.mp4',(err)=>{
                        if(err){
                            console.log('output.mp4 file could not be deleted')
                            return res.end()
                        }
                    })
                    fs.unlink('./input.flv',(err)=>{
                        if(err){
                            console.log('./input.flv file could not be deleted')
                            return res.end()
                        }
                    })
                })
            })
        })
    })
}

module.exports = flv_to_mp4