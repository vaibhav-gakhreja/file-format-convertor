const formidable = require('formidable')
const fs = require('fs')
const execution = require('./scriptExec') 

const pdf_to_text = (req,res)=>{
    var form = new formidable.IncomingForm()
    form.parse(req,function(err,fields,files){
        if(err){
            return res.send('Please give a valid pdf file as input')
        }
        var oldpath = files.filetoupload.path
        var newpath = './input.pdf'
        fs.rename(oldpath,newpath,function(err){
            if(err){
                return res.send('error occured while uploading file. Please refresh and try again.')
            }
            const start = Number(fields.start)
            const end = Number(fields.end)
            if(start===0&&end===0){
                if(fields.layout==='on'){
                    fs.writeFileSync('../public/pdf_to_text/script.sh','pdftotext -layout /home/vaibhavgakhreja/Desktop/conversions/src/input.pdf /home/vaibhavgakhreja/Desktop/conversions/src/converted_output.txt')
                }else{
                    fs.writeFileSync('../public/pdf_to_text/script.sh','pdftotext /home/vaibhavgakhreja/Desktop/conversions/src/input.pdf /home/vaibhavgakhreja/Desktop/conversions/src/converted_output.txt')
                }
            }else if(start!==0&&end===0){
                if(fields.layout==='on'){
                    fs.writeFileSync('../public/pdf_to_text/script.sh','pdftotext -f ' + start + ' -layout /home/vaibhavgakhreja/Desktop/conversions/src/input.pdf /home/vaibhavgakhreja/Desktop/conversions/src/converted_output.txt')
                }else{
                    fs.writeFileSync('../public/pdf_to_text/script.sh','pdftotext -f ' + start + ' /home/vaibhavgakhreja/Desktop/conversions/src/input.pdf /home/vaibhavgakhreja/Desktop/conversions/src/converted_output.txt')
                }
            }else if(start===0&&end!==0){
                if(fields.layout==='on'){
                    fs.writeFileSync('../public/pdf_to_text/script.sh','pdftotext -l ' + end + ' -layout /home/vaibhavgakhreja/Desktop/conversions/src/input.pdf /home/vaibhavgakhreja/Desktop/conversions/src/converted_output.txt')
                }else{
                    fs.writeFileSync('../public/pdf_to_text/script.sh','pdftotext -l ' + end + ' /home/vaibhavgakhreja/Desktop/conversions/src/input.pdf /home/vaibhavgakhreja/Desktop/conversions/src/converted_output.txt')
                }
            }else if(start!==0&&end!==0){
                if(fields.layout==='on'){
                    fs.writeFileSync('../public/pdf_to_text/script.sh','pdftotext -f ' + start + ' -l ' + end + ' -layout /home/vaibhavgakhreja/Desktop/conversions/src/input.pdf /home/vaibhavgakhreja/Desktop/conversions/src/converted_output.txt')
                }else{
                    fs.writeFileSync('../public/pdf_to_text/script.sh','pdftotext -f ' + start + ' -l ' + end + ' /home/vaibhavgakhreja/Desktop/conversions/src/input.pdf /home/vaibhavgakhreja/Desktop/conversions/src/converted_output.txt')
                }
            }
            execution('script.sh',res)
        })
    })
}

module.exports = pdf_to_text