const formidable = require('formidable')
const fs = require('fs')
const shell = require('shelljs')

const mp3_to_wav = (req,res)=>{
    var form = new formidable.IncomingForm()
    form.parse(req, function (err, fields, files){
        if(err){
            return res.send('Please give a valid mp3 file as input')
        }
        var oldpath = files.filetoupload.path
        var newpath = './input.mp3'
        fs.rename(oldpath, newpath, function(err){
            if(err){
                res.send('Error occured, please try again!')
                return res.end()
            }
            shell.exec('../public/mp3_to_wav/script.sh',()=>{
                res.download('./output.wav','output.wav',()=>{
                    fs.unlink('./output.wav',(err)=>{
                        if(err){
                            console.log('output.wav file could not be deleted')
                            return res.end()
                        }
                    })
                    fs.unlink('./input.mp3',(err)=>{
                        if(err){
                            console.log('./input.mp3 file could not be deleted')
                            return res.end()
                        }
                    })
                })
            })
        })
    })
}

module.exports = mp3_to_wav