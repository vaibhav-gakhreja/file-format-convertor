const shell = require('shelljs')
const fs = require('fs')

const execution = (scriptName,res)=>{
    shell.exec('../public/pdf_to_ppm/' + scriptName,()=>{
        shell.exec('../public/pdf_to_ppm/scriptToCompress.sh',()=>{
            res.download('./output.tar.gz','output.tar.gz',()=>{
                fs.unlink('./input.pdf',(err)=>{
                    if(err){
                        console.log('input.pdf file could not be deleted')
                        return res.end()
                    }
                })
                shell.exec('../public/pdf_to_ppm/' + 'scriptToDel.sh')
            })
        })
    })
}

module.exports = execution