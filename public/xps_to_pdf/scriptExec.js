const shell = require('shelljs')
const fs = require('fs')

const execution = (res)=>{
    shell.exec('../public/xps_to_pdf/script.sh',()=>{
        res.download('./input.pdf','output.pdf',()=>{
            fs.unlink('./input.xps',(err)=>{
                if(err){
                    console.log('input.xps file could not be deleted')
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
}

module.exports = execution