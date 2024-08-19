import { NextRequest, NextResponse } from 'next/server'; // To handle the request and response
import { promises as fs } from 'fs'; // To save the file temporarily
import { v4 as uuidv4 } from 'uuid'; // To generate a unique filename
import PDFParser from 'pdf2json'; // To parse the pdf
import path from 'path';

export async function POST(req: NextRequest) {
  

  const formData: FormData = await req.formData();
  const uploadedFiles = formData.getAll('filepond');
  let fileName = '';
  let parsedText = '';

  if (uploadedFiles && uploadedFiles.length > 0) {
    const uploadedFile = uploadedFiles[1];
    console.log('Uploaded file:', uploadedFile);
        console.log(formData)
    // Check if uploadedFile is of type File
    if (uploadedFile instanceof File) {
      // Generate a unique filename
      fileName = uuidv4();

      // Convert the uploaded file into a temporary file
      const tempFilePath = path.join(process.cwd(), `${fileName}.pdf`) ;
      console.log(tempFilePath)
    
      const fileBuffer = Buffer.from(await uploadedFile.arrayBuffer());

      
      await fs.writeFile(tempFilePath, fileBuffer);

      // Parse the pdf using pdf2json. See pdf2json docs for more info.

      // The reason I am bypassing type checks is because
      // the default type definitions for pdf2json in the npm install
      // do not allow for any constructor arguments.
      // You can either modify the type definitions or bypass the type checks.
      // I chose to bypass the type checks.
      const pdfParser = new (PDFParser as any)(null, 1);

      // See pdf2json docs for more info on how the below works.
      const parsePDF = () =>
        new Promise<string>((resolve, reject) => {
          pdfParser.on('pdfParser_dataError', (errData: any) => {
            console.log(errData.parserError);
            reject(errData.parserError);
          });

          pdfParser.on('pdfParser_dataReady', () => {
            const parsedText = (pdfParser as any).getRawTextContent();
            console.log(parsedText);
            resolve(parsedText);
          });

          pdfParser.loadPDF(tempFilePath);
        });
      try {
        // Delete the temporary file
        parsedText = await parsePDF();
        await fs.unlink(tempFilePath);
        console.log('Temporary file deleted');
      } catch (error) {
        console.error('Error parsing PDF or deleting temporary file:', error);
      }

    } else {
      console.log('Uploaded file is not in the expected format.');
    }
  } else {
    console.log('No files found.');
  }

  const response = new NextResponse(parsedText);
  response.headers.set('FileName', fileName);
  console.log(response)
  return response;
}