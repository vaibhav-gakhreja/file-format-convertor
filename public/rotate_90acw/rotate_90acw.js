const formidable = require('formidable')
const fs = require('fs')
const shell = require('shelljs')
const pdfjsLib = require('pdfjs-dist')

const rotate_90 = (req,res)=>{
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
            pdfjsLib.getDocument(newpath).then(function (doc) {
                var numPages = Number(doc.numPages);
                if(start>1&&end<numPages)
                {
                    fs.writeFileSync('./public/rotate_90acw/script.sh','pdftk input.pdf cat 1-' + (start-1) + ' ' + start + '-' + end + 'north ' + (end+1) + '-end output output.pdf');
                }else if(start==1&&end<numPages)
                {
                    fs.writeFileSync('./public/rotate_90acw/script.sh','pdftk input.pdf cat ' + start + '-' + end + 'north ' + (end+1) + '-end output output.pdf');
                }else if(start>1&&end==numPages)
                {
                    fs.writeFileSync('./public/rotate_90acw/script.sh','pdftk input.pdf cat 1-' + (start-1) + ' ' + start + '-' + end + 'north output output.pdf');
                }else
                {
                    fs.writeFileSync('./public/rotate_90acw/script.sh','pdftk input.pdf cat ' + start + '-' + end + 'north output output.pdf');
                }
                shell.exec('./public/rotate_90acw/script.sh',()=>{
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

module.exports = rotate_90