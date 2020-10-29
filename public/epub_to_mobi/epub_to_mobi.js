const formidable = require('formidable')
const fs = require('fs')
const shell = require('shelljs')

const epub_to_mobi = (req,res)=>{
    var form = new formidable.IncomingForm()
    form.parse(req, function (err, fields, files){
        if(err){
            return res.send('Please give a valid epub file as input')
        }
        var oldpath = files.filetoupload.path
        var newpath = './input.epub'
        fs.rename(oldpath, newpath, function(err){
            if(err){
                res.send('Error occured, please try again!')
                return res.end()
            }
            shell.exec('../public/epub_to_mobi/script.sh',()=>{
                res.download('./input.mobi','output.mobi',()=>{
                    fs.unlink('./input.mobi',(err)=>{
                        if(err){
                            console.log('input.mobi file could not be deleted')
                            return res.end()
                        }
                    })
                    fs.unlink('./input.epub',(err)=>{
                        if(err){
                            console.log('./input.epub file could not be deleted')
                            return res.end()
                        }
                    })
                })
            })
        })
    })
}

module.exports = epub_to_mobi