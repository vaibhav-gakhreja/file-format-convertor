const formidable = require('formidable')
const fs = require('fs')
const shell = require('shelljs')

const mov_to_mp4 = (req,res)=>{
    var form = new formidable.IncomingForm()
    form.parse(req, function (err, fields, files){
        if(err){
            return res.send('Please give a valid mp4 file as input')
        }
        var oldpath = files.filetoupload.path
        var newpath = './input.mov'
        fs.rename(oldpath, newpath, function(err){
            if(err){
                res.send('Error occured, please try again!')
                return res.end()
            }
            shell.exec('../public/mov_to_mp4/script.sh',()=>{
                res.download('./output.mp4','output.mp4',()=>{
                    fs.unlink('./output.mp4',(err)=>{
                        if(err){
                            console.log('output.mp4 file could not be deleted')
                            return res.end()
                        }
                    })
                    fs.unlink('./input.mov',(err)=>{
                        if(err){
                            console.log('./input.mov file could not be deleted')
                            return res.end()
                        }
                    })
                })
            })
        })
    })
}

module.exports = mov_to_mp4