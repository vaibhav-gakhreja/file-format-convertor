const formidable = require('formidable')
const fs = require('fs')
const execution = require('./scriptExec.js')

const xps_to_pdf = (req,res)=>{
    var form = new formidable.IncomingForm()
    form.parse(req, function (err, fields, files){
        if(err){
            return res.send('Please give a valid pdf file as input')
        }
        const first = parseInt(fields.first)
        const last = parseInt(fields.last)
        const rx = parseInt(fields.rx)
        const ry = parseInt(fields.ry)
        var oldpath = files.filetoupload.path
        var newpath = './input.xps'
        fs.rename(oldpath, newpath, function(err){
            if(err){
                res.send('Error occured, please try again!')
                return res.end()
            }
            if(fields.rx!==''&&fields.ry!==''){
                if(fields.first!==''&&fields.last!==''){
                    fs.writeFileSync('../public/xps_to_pdf/script.sh','xpstopdf --rx ' + rx + ' --ry ' + ry + ' -f ' + first + ' -l ' + last + ' input.xps input.pdf')
                }else if(fields.first!==''){
                    fs.writeFileSync('../public/xps_to_pdf/script.sh','xpstopdf --rx ' + rx + ' --ry ' + ry + ' -f ' + first + ' input.xps input.pdf')
                }else if(fields.last!==''){
                    fs.writeFileSync('../public/xps_to_pdf/script.sh','xpstopdf --rx ' + rx + ' --ry ' + ry + ' -l ' + last + ' input.xps input.pdf')
                }else{
                    fs.writeFileSync('../public/xps_to_pdf/script.sh','xpstopdf --rx ' + rx + ' --ry ' + ry + ' input.xps input.pdf')
                }
            }else if(fields.rx!==''){
                if(fields.first!==''&&fields.last!==''){
                    fs.writeFileSync('../public/xps_to_pdf/script.sh','xpstopdf --rx ' + rx + ' -f ' + first + ' -l ' + last + ' input.xps input.pdf')
                }else if(fields.first!==''){
                    fs.writeFileSync('../public/xps_to_pdf/script.sh','xpstopdf --rx ' + rx + ' -f ' + first + ' input.xps input.pdf')
                }else if(fields.last!==''){
                    fs.writeFileSync('../public/xps_to_pdf/script.sh','xpstopdf --rx ' + rx + ' -l ' + last + ' input.xps input.pdf')
                }else{
                    fs.writeFileSync('../public/xps_to_pdf/script.sh','xpstopdf --rx ' + rx + ' input.xps input.pdf')
                }
            }else if(fields.ry!==''){
                if(fields.first!==''&&fields.last!==''){
                    fs.writeFileSync('../public/xps_to_pdf/script.sh','xpstopdf --ry ' + ry + ' -f ' + first + ' -l ' + last + ' input.xps input.pdf')
                }else if(fields.first!==''){
                    fs.writeFileSync('../public/xps_to_pdf/script.sh','xpstopdf --ry ' + ry + ' -f ' + first + ' input.xps input.pdf')
                }else if(fields.last!==''){
                    fs.writeFileSync('../public/xps_to_pdf/script.sh','xpstopdf --ry ' + ry + ' -l ' + last + ' input.xps input.pdf')
                }else{
                    fs.writeFileSync('../public/xps_to_pdf/script.sh','xpstopdf --ry ' + ry + ' input.xps input.pdf')
                }
            }else{
                if(fields.first!==''&&fields.last!==''){
                    fs.writeFileSync('../public/xps_to_pdf/script.sh','xpstopdf -f ' + first + ' -l ' + last + ' input.xps input.pdf')
                }else if(fields.first!==''){
                    fs.writeFileSync('../public/xps_to_pdf/script.sh','xpstopdf -f ' + first + ' input.xps input.pdf')
                }else if(fields.last!==''){
                    fs.writeFileSync('../public/xps_to_pdf/script.sh','xpstopdf -l ' + last + ' input.xps input.pdf')
                }else{
                    fs.writeFileSync('../public/xps_to_pdf/script.sh','xpstopdf input.xps input.pdf')
                }
            }
            execution(res)
        })
    })
}

module.exports = xps_to_pdf