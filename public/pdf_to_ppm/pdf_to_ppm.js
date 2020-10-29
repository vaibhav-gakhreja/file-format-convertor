const formidable = require('formidable')
const fs = require('fs')
const shell = require('shelljs')
const execution = require('./scriptExec.js')

const pdf_to_ppm = (req,res)=>{
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
            const start = Number(fields.start)
            const end = Number(fields.end)
            var DPI = Number(fields.DPI)
            if(DPI===0){
                DPI = 150
            }
            if(start===0&&end===0){
                fs.writeFileSync('../public/pdf_to_ppm/script.sh','pdftoppm -rx ' + DPI + ' -ry ' + DPI + ' input.pdf ./output/output')
            }else if(start!==0&&end===0){
                fs.writeFileSync('../public/pdf_to_ppm/script.sh','pdftoppm -f ' + start + ' -rx ' + DPI + ' -ry ' + DPI + ' input.pdf ./output/output')
            }else if(start===0&&end!==0){
                fs.writeFileSync('../public/pdf_to_ppm/script.sh','pdftoppm -l ' + end + ' -rx ' + DPI + ' -ry ' + DPI + ' input.pdf ./output/output')
            }else if(start!==0&&end!==0){
                fs.writeFileSync('../public/pdf_to_ppm/script.sh','pdftoppm -f ' + start + ' -l ' + end +' -rx ' + DPI + ' -ry ' + DPI + ' input.pdf ./output/output')
            }
            shell.exec('../public/pdf_to_ppm/scriptToMkdir.sh',()=>{
                execution('script.sh',res)
            })
        })
    })
}

module.exports = pdf_to_ppm