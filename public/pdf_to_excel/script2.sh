pdftotext -layout /home/vaibhavgakhreja/Desktop/conversions/src/input.pdf /home/vaibhavgakhreja/Desktop/conversions/src/input.txt
tr '\t' ',' < /home/vaibhavgakhreja/Desktop/conversions/src/input.txt > /home/vaibhavgakhreja/Desktop/conversions/src/output.csv
unix2dos /home/vaibhavgakhreja/Desktop/conversions/src/output.csv
ssconvert /home/vaibhavgakhreja/Desktop/conversions/src/output.csv /home/vaibhavgakhreja/Desktop/conversions/src/output.xls