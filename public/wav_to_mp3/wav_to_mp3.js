const formidable = require('formidable')
const fs = require('fs-extra')
const shell = require('shelljs')

const wav_to_mp3 = (req,res)=>{
    var form = new formidable.IncomingForm()
    form.parse(req, function (err, fields, files){
        if(err){
            return res.send('Please give a valid wav file as input')
        }
        var oldpath = files.filetoupload.path
        var newpath = './input.wav'
        fs.copy(oldpath, newpath, function(err){
            if(err){
                res.send('Error occured, please try again!')
                return res.end()
            }
            shell.exec('./public/wav_to_mp3/script.sh',()=>{
                res.download('./output.mp3','output.mp3',()=>{
                    fs.unlink('./output.mp3',(err)=>{
                        if(err){
                            console.log('output.mp3 file could not be deleted')
                            return res.end()
                        }
                    })
                    fs.unlink('./input.wav',(err)=>{
                        if(err){
                            console.log('input.wav file could not be deleted')
                            return res.end()
                        }
                    })
                })
            })
        })
    })
}

module.exports = wav_to_mp3