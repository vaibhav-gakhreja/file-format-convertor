//requiring modules
const express = require('express')
const path = require('path')
const fs = require('fs')

//requiring all utility functions
const compress_pdf = require('../public/compress_pdf/compress_pdf.js')
const pdf_to_text = require('../public/pdf_to_text/pdf_to_text.js')
const pdf_to_png = require('../public/pdf_to_png/pdf_to_png.js')
const pdf_to_excel = require('../public/pdf_to_excel/pdf_to_excel.js')
const pdf_to_jpg = require('../public/pdf_to_jpg/pdf_to_jpg.js')
const pdf_to_ppm = require('../public/pdf_to_ppm/pdf_to_ppm.js')
const pdf_to_tiff = require('../public/pdf_to_tiff/pdf_to_tiff.js')
const pdf_to_doc = require('../public/pdf_to_doc/pdf_to_doc.js')
const pdf_to_docx = require('../public/pdf_to_docx/pdf_to_docx.js')
const pdf_to_odg = require('../public/pdf_to_odg/pdf_to_odg.js')
const doc_to_pdf = require('../public/doc_to_pdf/doc_to_pdf.js')
const docx_to_pdf = require('../public/docx_to_pdf/docx_to_pdf.js')
const xlsx_to_pdf = require('../public/xlsx_to_pdf/xlsx_to_pdf.js')
const xls_to_pdf = require('../public/xls_to_pdf/xls_to_pdf.js')
const text_to_pdf = require('../public/text_to_pdf/text_to_pdf.js')
const xps_to_pdf = require('../public/xps_to_pdf/xps_to_pdf.js')
const ppt_to_pdf = require('../public/ppt_to_pdf/ppt_to_pdf.js')
const png_to_pdf = require('../public/png_to_pdf/png_to_pdf.js')
const jpeg_to_png = require('../public/jpeg_to_png/jpeg_to_png.js')
const png_to_jpeg = require('../public/png_to_jpeg/png_to_jpeg.js')
const png_to_gif = require('../public/png_to_gif/png_to_gif.js')
const jpeg_to_gif = require('../public/jpeg_to_gif/jpeg_to_gif.js')
const mp4_to_gif = require('../public/mp4_to_gif/mp4_to_gif.js')
const mov_to_mp4 = require('../public/mov_to_mp4/mov_to_mp4.js')
const mp4_to_mp3 = require('../public/mp4_to_mp3/mp4_to_mp3.js')
const mp3_to_wav = require('../public/mp3_to_wav/mp3_to_wav.js')
const wav_to_mp3 = require('../public/wav_to_mp3/wav_to_mp3.js')
const mkv_to_mp4 = require('../public/mkv_to_mp4/mkv_to_mp4.js')
const jpeg_to_text = require('../public/jpeg_to_text/jpeg_to_text.js')
const flv_to_mp4 = require('../public/flv_to_mp4/flv_to_mp4.js')
const flv_to_mp3 = require('../public/flv_to_mp3/flv_to_mp3.js')
const flac_to_mp3 = require('../public/flac_to_mp3/flac_to_mp3.js')
const epub_to_pdf = require('../public/epub_to_pdf/epub_to_pdf.js')
const epub_to_mobi = require('../public/epub_to_mobi/epub_to_mobi.js')
const djvu_to_pdf = require('../public/djvu_to_pdf/djvu_to_pdf.js')
const pdfs_merger1 = require('../public/pdfs_merger/pdfs_merger1.js')
const pdfs_merger2 = require('../public/pdfs_merger/pdfs_merger2.js')
const remove_pages = require('../public/remove_pages/remove_pages.js')
const rotate_90cw = require('../public/rotate_90cw/rotate_90cw.js')
const rotate_180 = require('../public/rotate_180/rotate_180.js')
const rotate_90acw = require('../public/rotate_90acw/rotate_90acw.js')
const extract_rangepdf = require('../public/extract_rangepdf/extract_rangepdf.js')

const app = express()

const pathToPublicFolder = path.join(__dirname,'../public')

//route handlers

function updateCounter() {
    var count=Number(fs.readFileSync(pathToPublicFolder + '/counter.txt'))
    count++
    fs.writeFileSync(pathToPublicFolder + '/counter.txt',count)
}

app.get('',(req,res)=>{
    res.sendFile(pathToPublicFolder + '/index.html')
    updateCounter()
})

app.use(express.static(pathToPublicFolder))

                                                    /* compress pdf */

app.get('/compress_pdf',(req,res)=>{
    res.sendFile(pathToPublicFolder + '/compress_pdf/compress_pdf.html')
    updateCounter()
})

app.post('/compress_pdf/fileupload',(req,res)=>{
    compress_pdf(req,res)
})

                                                    /* pdf to text */

//install ... sudo apt-get install poppler-utils ... for pdf to word
app.get('/pdf_to_text',(req,res)=>{
    res.sendFile(pathToPublicFolder + '/pdf_to_text/pdf_to_text.html')
    updateCounter()
})
//we have to give absolute path in the script. change it as per server

app.post('/pdf_to_text/fileupload',(req,res)=>{
    pdf_to_text(req,res)
})

                                                    /* pdf to png */

app.get('/pdf_to_png',(req,res)=>{
    res.sendFile(pathToPublicFolder + '/pdf_to_png/pdf_to_png.html')
    updateCounter()
})

//see bookmarked article named pdf to all images extensions
//sudo apt install poppler-utils
app.post('/pdf_to_png/fileupload',(req,res)=>{
    pdf_to_png(req,res)
})

                                                    /* pdf to excel */

//we convert pdf to text
//then text to csv
//then csv to dos
//then dos to excel
//and if spaces are to be taken into account for distinct columns then we need to convert spaces to tabs using tr on text file obtained in step one
app.get('/pdf_to_excel',(req,res)=>{
    res.sendFile(pathToPublicFolder + '/pdf_to_excel/pdf_to_excel.html')
    updateCounter()
})

//we need to install:->rm -r ./output.tar.gz
//sudo apt-get install --no-install-recommends gnumeric
//sudo apt-get update -y
//sudo apt-get install -y dos2unix
app.post('/pdf_to_excel/fileupload',(req,res)=>{
    pdf_to_excel(req,res)
})

                                                    /* pdf to jpg */

//similar to png
app.get('/pdf_to_jpg',(req,res)=>{
    res.sendFile(pathToPublicFolder + '/pdf_to_jpg/pdf_to_jpg.html')
    updateCounter()
})

app.post('/pdf_to_jpg/fileupload',(req,res)=>{
    pdf_to_jpg(req,res)
})

                                                    /* pdf to ppm */

//similar to png
app.get('/pdf_to_ppm',(req,res)=>{
    res.sendFile(pathToPublicFolder + '/pdf_to_ppm/pdf_to_ppm.html')
    updateCounter()
})

app.post('/pdf_to_ppm/fileupload',(req,res)=>{
    pdf_to_ppm(req,res)
})

                                                    /* pdf to tiff*/

app.get('/pdf_to_tiff',(req,res)=>{
    res.sendFile(pathToPublicFolder + '/pdf_to_tiff/pdf_to_tiff.html')
    updateCounter()
})

app.post('/pdf_to_tiff/fileupload',(req,res)=>{
    pdf_to_tiff(req,res)
})

                                                    /* pdf to doc */
//download abiword
app.get('/pdf_to_doc',(req,res)=>{
    res.sendFile(pathToPublicFolder + '/pdf_to_doc/pdf_to_doc.html')
    updateCounter()
})

app.post('/pdf_to_doc/fileupload',(req,res)=>{
    pdf_to_doc(req,res)
})

                                                    /* pdf to docx */

app.get('/pdf_to_docx',(req,res)=>{
    res.sendFile(pathToPublicFolder + '/pdf_to_docx/pdf_to_docx.html')
    updateCounter()
})
                                                
app.post('/pdf_to_docx/fileupload',(req,res)=>{
    pdf_to_docx(req,res)
})

                                                    /* pdf to odg */
//download libreoffice
app.get('/pdf_to_odg',(req,res)=>{
    res.sendFile(pathToPublicFolder + '/pdf_to_odg/pdf_to_odg.html')
    updateCounter()
})
                                                
app.post('/pdf_to_odg/fileupload',(req,res)=>{
    pdf_to_odg(req,res)
})

                                                    /* doc to pdf */

//libreoffice 
app.get('/doc_to_pdf',(req,res)=>{
    res.sendFile(pathToPublicFolder + '/doc_to_pdf/doc_to_pdf.html')
    updateCounter()
})

app.post('/doc_to_pdf/fileupload',(req,res)=>{
    doc_to_pdf(req,res);
})


                                                    /* docx to pdf */

//libreoffice 
app.get('/docx_to_pdf',(req,res)=>{
    res.sendFile(pathToPublicFolder + '/docx_to_pdf/docx_to_pdf.html')
    updateCounter()
})

app.post('/docx_to_pdf/fileupload',(req,res)=>{
    docx_to_pdf(req,res);
})

                                                    /* xlsx to pdf */

//libreoffice 
app.get('/xlsx_to_pdf',(req,res)=>{
    res.sendFile(pathToPublicFolder + '/xlsx_to_pdf/xlsx_to_pdf.html')
    updateCounter()
})

app.post('/xlsx_to_pdf/fileupload',(req,res)=>{
    xlsx_to_pdf(req,res);
})

                                                    /* xlsx to pdf */

//libreoffice 
app.get('/xls_to_pdf',(req,res)=>{
    res.sendFile(pathToPublicFolder + '/xls_to_pdf/xls_to_pdf.html')
    updateCounter()
})

app.post('/xls_to_pdf/fileupload',(req,res)=>{
    xls_to_pdf(req,res);
})

                                                    /* text to pdf */

//libreoffice 
app.get('/text_to_pdf',(req,res)=>{
    res.sendFile(pathToPublicFolder + '/text_to_pdf/text_to_pdf.html')
    updateCounter()
})

app.post('/text_to_pdf/fileupload',(req,res)=>{
    text_to_pdf(req,res);
})

                                                    /* xps to pdf */

//sudo apt install libgxps-utils
app.get('/xps_to_pdf',(req,res)=>{
    res.sendFile(pathToPublicFolder + '/xps_to_pdf/xps_to_pdf.html')
    updateCounter()
})

app.post('/xps_to_pdf/fileupload',(req,res)=>{
    xps_to_pdf(req,res)
})

                                                    /* ppt to pdf */
//libreoffice
app.get('/ppt_to_pdf',(req,res)=>{
    res.sendFile(pathToPublicFolder + '/ppt_to_pdf/ppt_to_pdf.html')
    updateCounter()
})

app.post('/ppt_to_pdf/fileupload',(req,res)=>{
    ppt_to_pdf(req,res)
})

                                                    /* png to pdf */
//libreoffice
app.get('/png_to_pdf',(req,res)=>{
    res.sendFile(pathToPublicFolder + '/png_to_pdf/png_to_pdf.html')
    updateCounter()
})

app.post('/png_to_pdf/fileupload',(req,res)=>{
    png_to_pdf(req,res)
})

                                                    /* jpeg to png */
//sudo apt-get install mogrify
app.get('/jpeg_to_png',(req,res)=>{
    res.sendFile(pathToPublicFolder + '/jpeg_to_png/jpeg_to_png.html')
    updateCounter()
})

app.post('/jpeg_to_png/fileupload',(req,res)=>{
    jpeg_to_png(req,res)
})

                                                    /* png to jpeg */
//sudo apt-get install mogrify
app.get('/png_to_jpeg',(req,res)=>{
    res.sendFile(pathToPublicFolder + '/png_to_jpeg/png_to_jpeg.html')
    updateCounter()
})

app.post('/png_to_jpeg/fileupload',(req,res)=>{
    png_to_jpeg(req,res)
})

                                                    /* png to gif */
//sudo apt-get install mogrify
app.get('/png_to_gif',(req,res)=>{
    res.sendFile(pathToPublicFolder + '/png_to_gif/png_to_gif.html')
    updateCounter()
})

app.post('/png_to_gif/fileupload',(req,res)=>{
    png_to_gif(req,res)
})

                                                    /* jpeg to gif */
//sudo apt-get install mogrify
app.get('/jpeg_to_gif',(req,res)=>{
    res.sendFile(pathToPublicFolder + '/jpeg_to_gif/jpeg_to_gif.html')
    updateCounter()
})

app.post('/jpeg_to_gif/fileupload',(req,res)=>{
    jpeg_to_gif(req,res)
})

                                                    /* mp4 to gif */
//sudo apt-get install ffmpeg
app.get('/mp4_to_gif',(req,res)=>{
    res.sendFile(pathToPublicFolder + '/mp4_to_gif/mp4_to_gif.html')
    updateCounter()
})

app.post('/mp4_to_gif/fileupload',(req,res)=>{
    mp4_to_gif(req,res)
})

                                                    /* mov to mp4 */
//sudo apt-get install ffmpeg
app.get('/mov_to_mp4',(req,res)=>{
    res.sendFile(pathToPublicFolder + '/mov_to_mp4/mov_to_mp4.html')
    updateCounter()
})

app.post('/mov_to_mp4/fileupload',(req,res)=>{
    mov_to_mp4(req,res)
})

                                                    /* mp4 to mp3 */
//sudo apt-get install ffmpeg
app.get('/mp4_to_mp3',(req,res)=>{
    res.sendFile(pathToPublicFolder + '/mp4_to_mp3/mp4_to_mp3.html')
    updateCounter()
})

app.post('/mp4_to_mp3/fileupload',(req,res)=>{
    mp4_to_mp3(req,res)
})

                                                    /* mp3 to wav */
//sudo apt-get install ffmpeg
app.get('/mp3_to_wav',(req,res)=>{
    res.sendFile(pathToPublicFolder + '/mp3_to_wav/mp3_to_wav.html')
    updateCounter()
})

app.post('/mp3_to_wav/fileupload',(req,res)=>{
    mp3_to_wav(req,res)
})

                                                    /* wav to mp3 */
//sudo apt-get install ffmpeg
app.get('/wav_to_mp3',(req,res)=>{
    res.sendFile(pathToPublicFolder + '/wav_to_mp3/wav_to_mp3.html')
    updateCounter()
})

app.post('/wav_to_mp3/fileupload',(req,res)=>{
    wav_to_mp3(req,res)
})

                                                    /* mkv to mp4 */
//sudo apt-get install ffmpeg
app.get('/mkv_to_mp4',(req,res)=>{
    res.sendFile(pathToPublicFolder + '/mkv_to_mp4/mkv_to_mp4.html')
    updateCounter()
})

app.post('/mkv_to_mp4/fileupload',(req,res)=>{
    mkv_to_mp4(req,res)
})

                                                    /* jpeg to text */
//sudo apt-get install tesseract-ocr
//sudo apt-get install imagemagick
app.get('/jpeg_to_text',(req,res)=>{
    res.sendFile(pathToPublicFolder + '/jpeg_to_text/jpeg_to_text.html')
    updateCounter()
})

app.post('/jpeg_to_text/fileupload',(req,res)=>{
    jpeg_to_text(req,res)
})

                                                    /* flv to mp4 */
//sudo apt-get install ffmpeg
app.get('/flv_to_mp4',(req,res)=>{
    res.sendFile(pathToPublicFolder + '/flv_to_mp4/flv_to_mp4.html')
    updateCounter()
})

app.post('/flv_to_mp4/fileupload',(req,res)=>{
    flv_to_mp4(req,res)
})

                                                    /* flv to mp3 */
//sudo apt-get install ffmpeg
app.get('/flv_to_mp3',(req,res)=>{
    res.sendFile(pathToPublicFolder + '/flv_to_mp3/flv_to_mp3.html')
    updateCounter()
})

app.post('/flv_to_mp3/fileupload',(req,res)=>{
    flv_to_mp3(req,res)
})

                                                    /* flac to mp3 */
//sudo apt-get install ffmpeg
app.get('/flac_to_mp3',(req,res)=>{
    res.sendFile(pathToPublicFolder + '/flac_to_mp3/flac_to_mp3.html')
    updateCounter()
})

app.post('/flac_to_mp3/fileupload',(req,res)=>{
    flac_to_mp3(req,res)
})

                                                    /* epub to pdf */
//sudo apt-get install calibre
app.get('/epub_to_pdf',(req,res)=>{
    res.sendFile(pathToPublicFolder + '/epub_to_pdf/epub_to_pdf.html')
    updateCounter()
})

app.post('/epub_to_pdf/fileupload',(req,res)=>{
    epub_to_pdf(req,res)
})

                                                    /* epub to mobi */
//sudo apt-get install calibre
app.get('/epub_to_mobi',(req,res)=>{
    res.sendFile(pathToPublicFolder + '/epub_to_mobi/epub_to_mobi.html')
    updateCounter()
})

app.post('/epub_to_mobi/fileupload',(req,res)=>{
    epub_to_mobi(req,res)
})

                                                    /* djvu to pdf */

app.get('/djvu_to_pdf',(req,res)=>{
    res.sendFile(pathToPublicFolder + '/djvu_to_pdf/djvu_to_pdf.html')
    updateCounter()
})

app.post('/djvu_to_pdf/fileupload',(req,res)=>{
    djvu_to_pdf(req,res)
})

                                                    /* merging two pdfs into one */
//download pdftk on system

app.get('/pdfs_merger',(req,res)=>{
    res.sendFile(pathToPublicFolder + '/pdfs_merger/pdfs_merger1.html')
    updateCounter()
})

app.post('/pdfs_merger/fileupload1',(req,res)=>{
    pdfs_merger1(req,res)
})

app.post('/pdfs_merger/fileupload2',(req,res)=>{
    pdfs_merger2(req,res)
})

                                                    /* removing a page range from a pdf */

app.get('/remove_pages',(req,res)=>{
    res.sendFile(pathToPublicFolder + '/remove_pages/remove_pages.html')
    updateCounter()
})

app.post('/remove_pages/fileupload',(req,res)=>{
    remove_pages(req,res)
})

                                                    /* rotate a page range by 90 cw degree in a pdf */

app.get('/rotate_90cw',(req,res)=>{
    res.sendFile(pathToPublicFolder + '/rotate_90cw/rotate_90cw.html')
    updateCounter()
})

app.post('/rotate_90cw/fileupload',(req,res)=>{
    rotate_90cw(req,res)
})

                                                    /* rotate a page range by 180 degree in a pdf */
//sudo apt install pdfjs-dist
app.get('/rotate_180',(req,res)=>{
    res.sendFile(pathToPublicFolder + '/rotate_180/rotate_180.html')
    updateCounter()
})

app.post('/rotate_180/fileupload',(req,res)=>{
    rotate_180(req,res)
})

                                                    /* rotate a page range by 90 acw degree in a pdf */

app.get('/rotate_90acw',(req,res)=>{
    res.sendFile(pathToPublicFolder + '/rotate_90acw/rotate_90acw.html')
    updateCounter()
})

app.post('/rotate_90acw/fileupload',(req,res)=>{
    rotate_90acw(req,res)
})

                                                    /* extract a page range from a pdf */

app.get('/extract_rangepdf',(req,res)=>{
    res.sendFile(pathToPublicFolder + '/extract_rangepdf/extract_rangepdf.html')
    updateCounter()
})

app.post('/extract_rangepdf/fileupload',(req,res)=>{
    extract_rangepdf(req,res)
})

app.listen(3000,()=>{
    console.log('server started on port 3000.')
})