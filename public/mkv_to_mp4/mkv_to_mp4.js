const formidable = require('formidable')
const fs = require('fs')
const shell = require('shelljs')

const mkv_to_mp4 = (req,res)=>{
    var form = new formidable.IncomingForm()
    form.parse(req, function (err, fields, files){
        if(err){
            return res.send('Please give a valid wav file as input')
        }
        var oldpath = files.filetoupload.path
        var newpath = './input.mkv'
        fs.rename(oldpath, newpath, function(err){
            if(err){
                res.send('Error occured, please try again!')
                return res.end()
            }
            shell.exec('./public/mkv_to_mp4/script.sh',()=>{
                res.download('./output.mp4','output.mp4',()=>{
                    fs.unlink('./output.mp4',(err)=>{
                        if(err){
                            console.log('output.mp4 file could not be deleted')
                            return res.end()
                        }
                    })
                    fs.unlink('./input.mkv',(err)=>{
                        if(err){
                            console.log('input.mkv file could not be deleted')
                            return res.end()
                        }
                    })
                })
            })
        })
    })
}

module.exports = mkv_to_mp4