const formidable = require('formidable')
const fs = require('fs')
const shell = require('shelljs')

const compress_pdf = (req,res)=>{
    var form = new formidable.IncomingForm()
    form.parse(req, function (err, fields, files){
        if(err){
            return res.send('Please give a valid pdf file as input')
        }
        var oldpath = files.filetoupload.path
        var newpath = './input.pdf'
        fs.rename(oldpath, newpath, function(err){
            if(err){
                res.send('Error occured, please try again!')
                return res.end()
            }
            shell.exec('../public/compress_pdf/script.sh',()=>{
                res.download('./compressed_output.pdf','compressed_'+ files.filetoupload.name,()=>{
                    fs.unlink('./input.pdf',(err)=>{
                        if(err){
                            console.log('input.pdf file could not be deleted')
                            return res.end()
                        }
                    })
                    fs.unlink('./compressed_output.pdf',(err)=>{
                        if(err){
                            console.log('compressed_output.pdf file could not be deleted')
                            return res.end()
                        }
                    })
                })
            })
        })
    })
}

module.exports = compress_pdf