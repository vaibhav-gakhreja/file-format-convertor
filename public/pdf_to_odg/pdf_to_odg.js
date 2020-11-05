const formidable = require('formidable')
const fs = require('fs-extra')
const shell = require('shelljs')

const pdf_to_odg = (req,res)=>{
    var form = new formidable.IncomingForm()
    form.parse(req, function (err, fields, files){
        if(err){
            return res.send('Please give a valid pdf file as input')
        }
        var oldpath = files.filetoupload.path
        var newpath = './input.pdf'
        fs.copy(oldpath, newpath, function(err){
            if(err){
                res.send('Error occured, please try again!')
                return res.end()
            }
            shell.exec('./public/pdf_to_odg/script.sh',()=>{
                res.download('./output.tar.gz','output.tar.gz',()=>{
                    fs.unlink('./input.pdf',(err)=>{
                        if(err){
                            console.log('input.pdf file could not be deleted')
                            return res.end()
                        }
                    })
                    shell.exec('./public/pdf_to_odg/scriptToDel.sh')
                })
            })
        })
    })
}

module.exports = pdf_to_odg