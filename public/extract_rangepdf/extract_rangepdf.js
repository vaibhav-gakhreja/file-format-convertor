const formidable = require('formidable')
const fs = require('fs')
const shell = require('shelljs')
const pdfjsLib = require('pdfjs-dist')

const extract_rangepdf = (req,res)=>{
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
            const start=Number(fields.start)
            const end=Number(fields.end)
            fs.writeFileSync('../public/extract_rangepdf/script.sh','pdftk input.pdf cat ' + start + '-' + end + ' output output.pdf')
            shell.exec('../public/extract_rangepdf/script.sh',()=>{
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
}

module.exports = extract_rangepdf