const formidable = require('formidable')
const fs = require('fs-extra')
const shell = require('shelljs')

const flac_to_mp3 = (req,res)=>{
    var form = new formidable.IncomingForm()
    form.parse(req, function (err, fields, files){
        if(err){
            return res.send('Please give a valid flv file as input')
        }
        var oldpath = files.filetoupload.path
        var newpath = './input.flac'
        fs.copy(oldpath, newpath, function(err){
            if(err){
                res.send('Error occured, please try again!')
                return res.end()
            }
            shell.exec('./public/flac_to_mp3/script.sh',()=>{
                res.download('./output.mp3','output.mp3',()=>{
                    fs.unlink('./output.mp3',(err)=>{
                        if(err){
                            console.log('output.mp3 file could not be deleted')
                            return res.end()
                        }
                    })
                    fs.unlink('./input.flac',(err)=>{
                        if(err){
                            console.log('./input.flac file could not be deleted')
                            return res.end()
                        }
                    })
                })
            })
        })
    })
}

module.exports = flac_to_mp3