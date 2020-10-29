const formidable = require('formidable')
const fs = require('fs')
const shell = require('shelljs')

const pdfs_merger = (req,res)=>{
    var form = new formidable.IncomingForm()
    form.parse(req, function (err, fields, files){
        if(err){
            return res.send('Please give a valid pdf file as input')
        }
        var oldpath = files.filetoupload2.path
        var newpath = './input2.pdf'
        fs.rename(oldpath, newpath, function(err){
            if(err){
                res.send('Error occured, please try again!')
                return res.end()
            }
            shell.exec('../public/pdfs_merger/script.sh',()=>{
                res.download('./output.pdf','output.pdf',()=>{
                    fs.unlink('./input1.pdf',(err)=>{
                        if(err){
                            console.log('input1.pdf file could not be deleted')
                            return res.end()
                        }
                    })
                    fs.unlink('./input2.pdf',(err)=>{
                        if(err){
                            console.log('input1.pdf file could not be deleted')
                            return res.end()
                        }
                    })
                    fs.unlink('./output.pdf',(err)=>{
                        if(err){
                            console.log('output.pdf file could not be deleted')
                            return res.end()
                        }
                    })
                })
            })
        })
    })
}

module.exports = pdfs_merger