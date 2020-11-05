const formidable = require('formidable')
const fs = require('fs-extra')
const shell = require('shelljs')

const pdf_to_excel = (req,res)=>{
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
            if(!fields.convertSpacesToTabs){
                shell.exec('./public/pdf_to_excel/script2.sh',()=>{
                    res.download('./output.xls','output.xls',()=>{
                        fs.unlink('./input.pdf',(err)=>{
                            if(err){
                                console.log('input.pdf file could not be deleted')
                                return res.end()
                            }
                        })
                        fs.unlink('./input.txt',(err)=>{
                            if(err){
                                console.log('input.txt file could not be deleted')
                                return res.end()
                            }
                        })
                        fs.unlink('./output.csv',(err)=>{
                            if(err){
                                console.log('output.csv file could not be deleted')
                                return res.end()
                            }
                        })
                        fs.unlink('./output.xls',(err)=>{
                            if(err){
                                console.log('output.xls file could not be deleted')
                                return res.end()
                            }
                        })
                    })
                })
            }else{
                shell.exec('./public/pdf_to_excel/script1.sh',()=>{
                    res.download('./output.xls','output.xls',()=>{
                        fs.unlink('./input.pdf',(err)=>{
                            if(err){
                                console.log('input.pdf file could not be deleted')
                                return res.end()
                            }
                        })
                        fs.unlink('./input.txt',(err)=>{
                            if(err){
                                console.log('input.txt file could not be deleted')
                                return res.end()
                            }
                        })
                        fs.unlink('./input1.txt',(err)=>{
                            if(err){
                                console.log('input1.txt file could not be deleted')
                                return res.end()
                            }
                        })
                        fs.unlink('./output.csv',(err)=>{
                            if(err){
                                console.log('output.csv file could not be deleted')
                                return res.end()
                            }
                        })
                        fs.unlink('./output.xls',(err)=>{
                            if(err){
                                console.log('output.xls file could not be deleted')
                                return res.end()
                            }
                        })
                    })
                })
            }
        })
    })
}

module.exports = pdf_to_excel