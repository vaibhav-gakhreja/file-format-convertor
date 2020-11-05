const shell = require('shelljs')
const fs = require('fs')

const execution = (scriptName,res)=>{
    shell.exec('./public/pdf_to_text/' + scriptName,()=>{
        res.download('./converted_output.txt','converted_output.txt',()=>{
            fs.unlink('./input.pdf',(err)=>{
                if(err){
                    console.log('input.pdf file could not be deleted')
                    return res.end()
                }
            })
            fs.unlink('./converted_output.txt',(err)=>{
                if(err){
                    console.log('converted_output.txt file could not be deleted')
                    return res.end()
                }
            })
        })
    })
}

module.exports = execution