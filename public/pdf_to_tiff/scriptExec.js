const shell = require('shelljs')
const fs = require('fs')

const execution = (scriptName,res)=>{
    shell.exec('./public/pdf_to_tiff/' + scriptName,()=>{
        shell.exec('./public/pdf_to_tiff/scriptToCompress.sh',()=>{
            res.download('./output.tar.gz','output.tar.gz',()=>{
                fs.unlink('./input.pdf',(err)=>{
                    if(err){
                        console.log('input.pdf file could not be deleted')
                        return res.end()
                    }
                })
                shell.exec('./public/pdf_to_tiff/' + 'scriptToDel.sh')
            })
        })
    })
}

module.exports = execution