mkdir ./odgFiles
libreoffice --convert-to odg input.pdf
mv -f input.odg ./odgFiles
tar -zcf output.tar.gz odgFiles