const formidable = require('formidable')
const fs = require('fs')
const shell = require('shelljs')

const docx_to_pdf = (req,res)=>{
    var form = new formidable.IncomingForm()
    form.parse(req, function (err, fields, files){
        if(err){
            return res.send('Please give a valid pdf file as input')
        }
        var oldpath = files.filetoupload.path
        var newpath = './input.docx'
        fs.rename(oldpath, newpath, function(err){
            if(err){
                res.send('Error occured, please try again!')
                return res.end()
            }
            shell.exec('../public/docx_to_pdf/script.sh',()=>{
                res.download('./input.pdf','output.pdf',()=>{
                    fs.unlink('./input.docx',(err)=>{
                        if(err){
                            console.log('input.docx file could not be deleted')
                            return res.end()
                        }
                    })
                    fs.unlink('./input.pdf',(err)=>{
                        if(err){
                            console.log('./input.pdf file could not be deleted')
                            return res.end()
                        }
                    })
                })
            })
        })
    })
}

module.exports = docx_to_pdf