'use client'

import React, { useState, useEffect, useRef } from 'react'
import { Document, Page, Text, View, StyleSheet, pdf, Font } from '@react-pdf/renderer'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from '@/hooks/use-toast'
import * as pdfjsLib from 'pdfjs-dist'
import { GlobalWorkerOptions } from 'pdfjs-dist/build/pdf'
import 'pdfjs-dist/build/pdf.worker.entry'
import { ArrowLeft, Download, Wand2, ZoomIn, ZoomOut, RotateCw, CloudDownload, SaveIcon, Loader2 } from 'lucide-react'
import { chatSession } from '@/lib/GeminiAi'
import FileUpload from '@/app/dashboard/__components/file-upoad'
import { useParams, useRouter } from 'next/navigation'
import axios from 'axios'
import { useSession } from 'next-auth/react'

GlobalWorkerOptions.workerSrc = '/pdf.worker.js'

Font.register({
  family: 'Roboto',
  fonts: [
    { src: 'https://fonts.gstatic.com/s/roboto/v32/KFOmCnqEu92Fr1Me5WZLCzYlKw.ttf', fontWeight: 'normal' },
    { src: 'https://fonts.gstatic.com/s/roboto/v32/KFOlCnqEu92Fr1MmWUlvAx05IsDqlA.ttf', fontWeight: 'bold' },
    { src: 'https://fonts.gstatic.com/s/roboto/v32/KFOkCnqEu92Fr1Mu52xPKTM1K9nz.ttf', fontStyle: 'italic' },
  ]
})

const styles = StyleSheet.create({
  page: { padding: 72, fontFamily: 'Roboto' },
  header: { borderBottom: '1 solid black', paddingBottom: 5, marginBottom: 20 },
  name: { fontSize: 24, fontWeight: 'bold' },
  jobTitle: { fontSize: 14, color: '#4299e1', marginTop: 4 },
  contactInfo: { fontSize: 10, marginTop: 10, color: '#4a5568' },
  date: { fontSize: 10, position: 'absolute', top: 72, right: 72 },
  recipient: { fontSize: 10, marginTop: 20 },
  subject: { fontSize: 12, marginTop: 20 },
  body: { fontSize: 11, lineHeight: 1.5, marginTop: 20 },
  paragraph: { marginBottom: 15 },
  signature: { fontSize: 11, marginTop: 30 },
  email: { color: '#4299e1' },
})

const CoverLetterPDF = ({ formData }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.header}>
        <Text style={styles.name}>{formData.name.toUpperCase()}</Text>
        <Text style={styles.jobTitle}>{formData.jobTitle.toUpperCase()}</Text>
      </View>
      <Text style={styles.date}>{formData.date}</Text>
      <View style={styles.contactInfo}>
        <Text>{formData.address}</Text>
        <Text>{formData.city}, {formData.state} {formData.zip}</Text>
        <Text>{formData.country}</Text>
        <Text>{formData.phone}</Text>
        <Text style={styles.email}>{formData.email}</Text>
      </View>
      <View style={styles.recipient}>
        <Text>{formData.recipientName}</Text>
        <Text>{formData.companyName}</Text>
        <Text>{formData.companyAddress}</Text>
        <Text>{formData.companyCity}, {formData.companyState} {formData.companyZip}</Text>
      </View>
      <Text style={styles.subject}>Dear {formData.recipientName},</Text>
      <View style={styles.body}>
        {formData.paragraphs.map((paragraph, index) => (
          <Text key={index} style={styles.paragraph}>{paragraph}</Text>
        ))}
      </View>
      <Text style={styles.signature}>Sincerely,</Text>
      <Text style={{
        fontSize: 11,
        marginTop: 0
      }}>{formData.name}</Text>


    </Page>
  </Document>
)

export default function Component() {
  const [formData, setFormData] = useState({
    name: '',
    jobTitle: '',
    address: '',
    jobDescription: '',
    city: '',
    state: '',
    zip: '',
    country: '',
    phone: '',
    email: '',
    date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
    recipientName: '',
    companyName: '',
    companyAddress: '',
    companyCity: '',
    companyState: '',
    companyZip: '',
    paragraphs: ['', '', '', ''],
  })
  const params = useParams()
  const {resumeId} = params
  const [saving, setSaving] = useState(false)
  const session = useSession()

  async function getCoverLetterDetails() {
    
    const response = await axios.get(`/api/coverLetterById?id=${resumeId}`)

    setFormData(response.data.resume.resumeData)
    console.log(response.data.resume.resumeData)
  }
  

  useEffect(() => {
    getCoverLetterDetails()
  },[])

 async function updateCoverLetter() {
    setSaving(true)
    const response = await axios.put('/api/coverLetter', {
      id: resumeId,
      email: session.data?.user?.email,
      coverLetterData: formData
    })

    if(response.status == 200) {
     toast({
      title: "Saved Successfully"
     })
    }
    else {
      toast({
        title: "Error While Saving",
        variant: "destructive"
       })
    } 

    setSaving(false)

 }

  const [pdfBlob, setPdfBlob] = useState(null)
  const [scale, setScale] = useState(1.5)
  const [rotation, setRotation] = useState(0)
  const canvasRef = useRef(null)
  const { toast } = useToast()
  const [resume, setResume] = useState();

  const handleInputChange = (e, index) => {
    const { name, value } = e.target
    if (name === 'paragraph') {
      setFormData(prev => ({
        ...prev,
        paragraphs: prev.paragraphs.map((p, i) => i === index ? value : p)
      }))
    } else {
      setFormData(prev => ({ ...prev, [name]: value }))
    }
  }

  const generateAICoverLetter = async () => {
    const prompt = `
Write a professional, personalized, and natural-sounding 4-paragraph cover letter based on the following data. The cover letter should be concise and sound as if it was written by a real human. Each paragraph should flow well, feel conversational, and demonstrate an understanding of the job and company. Ensure the content is realistic, particularly if the applicant's experience doesn’t fully match the job description, by emphasizing transferable skills and eagerness to learn. The final cover letter should fit within a single A4 page.

**Job Details:**
- Job Title: ${formData.jobTitle}
- Company Name: ${formData.companyName}
- Job Description/Requirements: ${formData.jobDescription} (Includes key skills, qualifications, and job requirements.)
- Discovered Job Role From: Linkedin

**Resume Summary:**
- Career Overview: ${resume} (A brief summary of professional background, key skills, and experiences from the resume.)

### Cover Letter Content:

1. **Introduction**:
   - Mention your application for the [Job Title] role at [Company Name], specifying how you discovered the job (e.g., LinkedIn).
   - Express excitement about the opportunity, particularly focusing on the company’s reputation, mission, or field of work.
   - If you don’t have direct experience with some of the job requirements, express enthusiasm for learning and growing in those areas.

2. **Why You're a Fit**:
   - Highlight the relevant skills and experience you do have, and how they can be applied to the role.
   - If some of the required skills don’t fully match your experience, emphasize your transferable skills and your willingness to develop in those areas.
   - Provide examples of how you've applied these skills in other contexts, even if not directly related to the job description.

3. **Company Fit**:
   - Discuss your admiration for the company’s mission, products, or values, and why you want to work with them.
   - Explain how your goals align with the company’s mission, and how your background equips you to contribute to their continued success.
   - Be transparent if you lack experience in certain areas, but emphasize your drive to learn and adapt quickly.

4. **Call to Action**:
   - Politely express your desire to further discuss your qualifications and potential contributions.
   - Mention your availability for an interview and provide your preferred contact information.
   - Reiterate your enthusiasm for joining the team, even if some areas require learning or growth.

### JSON Output Format:
{
  "paragraph_1": "",
  "paragraph_2": "",
  "paragraph_3": "",
  "paragraph_4": ""
}

Ensure the cover letter feels authentic, warm, and balanced. It should demonstrate genuine interest and enthusiasm for the role and the company, while not overstating the candidate’s experience. If there’s a skills gap, focus on eagerness to learn, adaptability, and transferable skills.
Note: The word count should be  110-140 word.
`


    // Simulating AI generation
    

    const result = await chatSession.sendMessage(prompt);
    console.log(result)
      const MockJsonResponse = (result.response.text()).replace('```json', '').replace('```', '');
       
        const jsonResponse = JSON.parse(MockJsonResponse)
        console.log(jsonResponse)

        const aiGeneratedParagraphs = [
          `${jsonResponse.paragraph_1}`,
          `${jsonResponse.paragraph_2}`,
          `${jsonResponse.paragraph_3}`,
          `${jsonResponse.paragraph_4}`
        ]


    setFormData(prev => ({ ...prev, paragraphs: aiGeneratedParagraphs }))
    toast({
      title: "AI-Generated Cover Letter",
      description: "Your cover letter has been generated! You can now edit it as needed.",
    })
    
  }

  const generatePDF = async () => {
    try {
      const pdfDoc = <CoverLetterPDF formData={formData} />
      const blob = await pdf(pdfDoc).toBlob()
      setPdfBlob(blob)
      renderPDF(blob)
    } catch (error) {
      console.error("Error generating PDF:", error)
      toast({
        title: "Error",
        description: "There was an error generating the PDF. Please try again.",
        variant: "destructive",
      })
    }
  }

  const renderPDF = (blob) => {
    if (blob && canvasRef.current) {
      const url = URL.createObjectURL(blob)

      // if(canvasRef.current) {
      //   canvasRef.current.cancel()
      // }
      pdfjsLib.getDocument(url).promise.then(pdf => {


        pdf.getPage(1).then(page => {
          const viewport = page.getViewport({ scale, rotation })
          const canvas = canvasRef.current
          const context = canvas.getContext('2d')

          canvas.height = viewport.height
          canvas.width = viewport.width

          const renderContext = {
            canvasContext: context,
            viewport: viewport,
          }
          page.render(renderContext)
        })
      }).catch(error => {
        console.error("Error rendering PDF:", error)
        toast({
          title: "Error",
          description: "There was an error rendering the PDF preview. Please try again.",
          variant: "destructive",
        })
      })
    }
  }

  useEffect(() => {
    if (formData.name && formData.jobTitle && formData.companyName) {
      generatePDF()
    }
  }, [formData])

  useEffect(() => {
    if (pdfBlob) {
      renderPDF(pdfBlob)
    }
  }, [scale, rotation])

  const router = useRouter()

  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <header className="sticky top-0 z-10 bg-white shadow-md border-b p-4">
        <div className="container mx-auto flex justify-between items-center">
          <div>
          <Button onClick={() => {
            router.push('/dashboard/resume')
          }} variant="ghost" className="text-blue-600">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
          </div>
         
          <h1 className="text-2xl hidden sm:block font-bold text-blue-800">Advanced Cover Letter Builder</h1>
          <div className='flex justify-center items-center gap-5'>
          
             
            
           {saving ? (
              <>
              <Button disabled={saving} className='bg-green-200'>
                  <Loader2 className='w-4 h-4 mr-2 animate-spin' />
                  Saving..
              </Button>
              </>
           ) : (
            <>
              <Button className='bg-green-400 hover:bg-green-300 text-base' onClick={() => {
              updateCoverLetter()  
              }}>
              <SaveIcon className='w-4 h-4 mr-2 ' />
              Save
            </Button>
            </>
           )  }
          <Button 
            className="bg-blue-600 hover:bg-blue-700 text-white" 
            onClick={() => pdfBlob && window.open(URL.createObjectURL(pdfBlob))}
          >
            <Download className="mr-2 h-4 w-4" />
            Download PDF
          </Button>

          </div>
         
        </div>
      </header>

      <main className="flex-grow overflow-hidden">
        <div className="h-full grid grid-cols-1 lg:grid-cols-2 gap-8 px-8 pt-8  "> 
          <Card className="shadow-lg bg-white bg-opacity-90 backdrop-filter backdrop-blur-lg overflow-auto classy-scrollbar ">
            <CardHeader>
              <CardTitle className="text-blue-800">Cover Letter Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Input 
                name="name" 
                value={formData.name} 
                onChange={handleInputChange} 
                placeholder="Your Full Name"
              />
              <Input 
                name="jobTitle" 
                value={formData.jobTitle} 
                onChange={handleInputChange} 
                placeholder="Your Job Title"
              />
              <Input 
                name="address" 
                value={formData.address} 
                onChange={handleInputChange} 
                placeholder="Street Address"
              />
              <div className="grid grid-cols-3 gap-4">
                <Input 
                  name="city" 
                  value={formData.city} 
                  onChange={handleInputChange} 
                  placeholder="City"
                />
                <Input 
                  name="state" 
                  value={formData.state} 
                  onChange={handleInputChange} 
                  placeholder="State"
                />
                <Input 
                  name="zip" 
                  value={formData.zip} 
                  onChange={handleInputChange} 
                  placeholder="ZIP Code"
                />
              </div>
              <Input 
                name="country" 
                value={formData.country} 
                onChange={handleInputChange} 
                placeholder="Country"
              />
              <Input 
                name="phone" 
                value={formData.phone} 
                onChange={handleInputChange} 
                placeholder="Phone Number"
              />
              <Input 
                name="email" 
                value={formData.email} 
                onChange={handleInputChange} 
                placeholder="Email Address"
              />
              <Input 
                name="date" 
                type="date"
                value={formData.date} 
                onChange={handleInputChange} 
              />
              <Input 
                name="recipientName" 
                value={formData.recipientName} 
                onChange={handleInputChange} 
                placeholder="Recipient's Name"
              />
              <Input 
                name="companyName" 
                value={formData.companyName} 
                onChange={handleInputChange} 
                placeholder="Company Name"
              />
              <Input 
                name="companyAddress" 
                value={formData.companyAddress} 
                onChange={handleInputChange} 
                placeholder="Company Address"
              />
              <div className="grid grid-cols-3 gap-4">
                <Input 
                  name="companyCity" 
                  value={formData.companyCity} 
                  onChange={handleInputChange} 
                  placeholder="Company City"
                />
                <Input 
                  name="companyState" 
                  value={formData.companyState} 
                  onChange={handleInputChange} 
                  placeholder="Company State"
                />
                <Input 
                  name="companyZip" 
                  value={formData.companyZip} 
                  onChange={handleInputChange} 
                  placeholder="Company ZIP"
                />
              </div>
              <Textarea
                  name="jobDescription"
                  value={formData.jobDescription}
                  onChange={handleInputChange}
                  placeholder='Job Description'
                 rows={20}
                />
              <div className='w-full'>
                <h1>Upload Your Resume </h1>
                <FileUpload setResume={setResume} />
              </div>
             
              {formData.paragraphs.map((paragraph, index) => (
                <Textarea
                  key={index}
                  name="paragraph"
                  value={paragraph}
                  onChange={(e) => handleInputChange(e, index)}
                  placeholder={`Paragraph ${index + 1}`}
                  rows={4}
                />
              ))}
             
              <div className="flex justify-center mt-6">
                <Button 
                  onClick={generateAICoverLetter} 
                  className="bg-purple-500 hover:bg-purple-600 text-white"
                >
                  <Wand2 className="mr-2 h-4 w-4" />
                  Generate with AI
                </Button>
              </div>
            </CardContent>
          </Card>       
          <div className="w-full flex flex-col items-center justify-center rounded-lg shadow-lg overflow-hidden ">
            <div className="flex-grow w-full h-full overflow-auto classy-scrollbar p-4">
              <div className="max-w-[600px]  mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
                {pdfBlob ? (
                  <canvas ref={canvasRef} className="w-full h-auto" />
                ) : (
                  <div className="text-center text-gray-500  p-8">
                    <p className="text-xl font-semibold mb-2">PDF Preview</p>
                    <p>Fill in the form to see your cover letter</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}