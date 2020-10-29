const formidable = require('formidable')
const fs = require('fs')
const shell = require('shelljs')

const remove_pages = (req,res)=>{
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
            const start=Number(fields.start);
            const end=Number(fields.end);
            fs.writeFile('../public/remove_pages/script.sh','pdftk input.pdf cat 1-' + (start-1) + ' ' + (end+1) + '-end output output.pdf',()=>{
                shell.exec('../public/remove_pages/script.sh',()=>{
                    res.download('./output.pdf','output.pdf',()=>{
                        fs.unlink('./input.pdf',(err)=>{
                            if(err){
                                console.log('input.pdf file could not be deleted')
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
    })
}

module.exports = remove_pages