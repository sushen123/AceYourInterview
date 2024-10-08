'use client'

import React, { useState, useEffect, useRef } from 'react';
import { Document, Page, Text, View, StyleSheet, pdf, Font, Link } from '@react-pdf/renderer';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ZoomIn, ZoomOut, Download, ChevronUp, ChevronDown, PlusCircle, Trash2, GripVertical, ArrowLeft, Eye, EyeOff, SaveIcon, Loader2 } from 'lucide-react';
import { Tooltip, TooltipProvider, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";
import { motion, AnimatePresence } from "framer-motion";
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { Slider } from "@/components/ui/slider";
import { getDocument, GlobalWorkerOptions } from 'pdfjs-dist/build/pdf';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { useDebounce } from '@/hooks/useDebounce';
import dynamic from 'next/dynamic';
import 'pdfjs-dist/build/pdf.worker.entry';
import 'react-quill/dist/quill.snow.css';
import { useParams, useRouter } from 'next/navigation';
import axios from 'axios';
import { useToast } from '@/hooks/use-toast';
import { useSession } from 'next-auth/react';

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

GlobalWorkerOptions.workerSrc = '/pdf.worker.js';

Font.register({
  family: 'Roboto',
  fonts: [
    { src: 'https://fonts.gstatic.com/s/roboto/v32/KFOmCnqEu92Fr1Me5WZLCzYlKw.ttf', fontWeight: 'normal' },
    { src: 'https://fonts.gstatic.com/s/roboto/v32/KFOlCnqEu92Fr1MmWUlvAx05IsDqlA.ttf', fontWeight: 'bold' },
    { src: 'https://fonts.gstatic.com/s/roboto/v32/KFOkCnqEu92Fr1Mu52xPKTM1K9nz.ttf', fontStyle: 'italic' },
  ]
});

Font.register({
  family: 'NotoSerif',
  fonts: [
    { src: 'https://fonts.gstatic.com/s/notoserif/v23/ga6iaw1J5X9T9RW6j9bNVls-hfgvz8JcMofYTa32J4wsL2JAlAhZqFCjwM0Lhq_Szw.ttf', fontWeight: 'normal' },
    { src: 'https://fonts.gstatic.com/s/notoserif/v23/ga6iaw1J5X9T9RW6j9bNVls-hfgvz8JcMofYTa32J4wsL2JAlAhZT1ejwM0Lhq_Szw.ttf', fontWeight: 'bold' },
    { src: 'https://fonts.gstatic.com/s/notoserif/v23/ga6saw1J5X9T9RW6j9bNfFIMZhhWnFTyNZIQD1-_FXP0RgnaOg9MYBNLg8cPpKrCzyUi.ttf', fontStyle: 'italic' },
  ]
});

Font.register({
  family: 'Maven Pro',
  fonts: [
    { src: 'https://fonts.gstatic.com/s/mavenpro/v36/7Auup_AqnyWWAxW2Wk3swUz56MS91Eww8SX25nCpozp5GvU.ttf', fontWeight: 'normal' },
    { src: 'https://fonts.gstatic.com/s/mavenpro/v36/7Auup_AqnyWWAxW2Wk3swUz56MS91Eww8cLx5nCpozp5GvU.ttf', fontWeight: 'bold' },
  ]
});

Font.register({
  family: 'Libre Baskerville',
  fonts: [
    { src: 'https://fonts.gstatic.com/s/librebaskerville/v14/kmKnZrc3Hgbbcjq75U4uslyuy4kn0pNeYRI4CN2V.ttf', fontWeight: 'normal' },
    { src: 'https://fonts.gstatic.com/s/librebaskerville/v14/kmKiZrc3Hgbbcjq75U4uslyuy4kn0qviTjYwI8Gcw6Oi.ttf', fontWeight: 'bold' },
    { src: 'https://fonts.gstatic.com/s/librebaskerville/v14/kmKhZrc3Hgbbcjq75U4uslyuy4kn0qNcaxYaDc2V2ro.ttf', fontStyle: 'italic' },
  ]
});

const fontFamilies = {
  'Roboto': 'Roboto',
  'Noto Serif': 'NotoSerif',
  'Maven Pro': 'Maven Pro',
  'Libre Baskerville': 'Libre Baskerville',
};

const styles = StyleSheet.create({
  page: {
    fontFamily: 'Roboto',
    fontSize: 12,
    padding: 40,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  contact: {
    fontSize: 10,
    marginBottom: 10,
  },
  jobTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  summary: {
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 15,
    marginBottom: 5,
    textTransform: 'uppercase',
  },
  subSectionTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 5,
  },
  companyInfo: {
    fontSize: 12,
    marginBottom: 5,
  },
  bulletPoint: {
    flexDirection: 'row',
    marginBottom: 5,
  },
  bullet: {
    width: 10,
  },
  bulletText: {
    flex: 1,
  },
  link: {
    color: 'blue',
    textDecoration: 'none',
  },
});

const ResumePDF = ({ data, settings, hiddenFields }) => (
  
  <Document>
    <Page size="A4" style={{
      ...styles.page,
      fontFamily: settings.fontFamily,
      fontSize: settings.fontSize,
      lineHeight: settings.lineSpacing,
    }}>
      {!hiddenFields.name && <Text style={{...styles.name, fontFamily: data.name.fontFamily || settings.fontFamily}}>{data.name.value}</Text>}
      <Text style={styles.contact}>
        {!hiddenFields.phone && `${data.phone} • `}
        {!hiddenFields.location && `${data.location}`}
        {(!hiddenFields.phone || !hiddenFields.location) && '\n'}
        {!hiddenFields.email && <Link src={`mailto:${data.email}`} style={styles.link}>{data.email}</Link>}
        {!hiddenFields.email && ' • '}
        {!hiddenFields.linkedin && <Link src={`https://linkedin.com/in/${data.linkedin}`} style={styles.link}>{data.linkedin}</Link>}
      </Text>

      {!hiddenFields.jobTitle && <Text style={{...styles.jobTitle, fontFamily: data.jobTitle.fontFamily || settings.fontFamily}}>{data.jobTitle.value}</Text>}
      {!hiddenFields.summary && <Text style={{...styles.summary, fontFamily: data.summary.fontFamily || settings.fontFamily}}>{data.summary.value}</Text>}

      {settings.sectionOrder.map((sectionKey) => {
        const section = data.sections[sectionKey];
        if (hiddenFields[sectionKey]) return null;
      
        return (
          <View key={sectionKey}>
            <Text style={{...styles.sectionTitle, fontFamily: section.fontFamily || settings.fontFamily}}>{section.title}</Text>
            {section.items.map((item, index) => (
              <View key={index}>
                {console.log(item.fontFamily, "hello")}
                {item.title && <Text style={{...styles.subSectionTitle, fontFamily: item.fontFamily || settings.fontFamily}}>{item.title}</Text>}
                {item.subtitle && <Text style={{...styles.companyInfo, fontFamily: item.fontFamily || settings.fontFamily}}>{item.subtitle}</Text>}
                {item.description && <Text style={{fontFamily: item.fontFamily || settings.fontFamily}}>{item.description}</Text>}
                {item.bullets && item.bullets.map((bullet, bulletIndex) => (
                  <View key={bulletIndex} style={styles.bulletPoint}>
                    <Text style={styles.bullet}>• </Text>
                    <Text style={{...styles.bulletText, fontFamily: bullet.fontFamily || settings.fontFamily}}>{bullet.value}</Text>
                  </View>
                ))}
              </View>
            ))}
          </View>
        );
      })}
    </Page>
  </Document>
)

export default function ResumeBuilder() {
  const [zoom, setZoom] = useState(1);
  const [pdfUrl, setPdfUrl] = useState('');
  const [numPages, setNumPages] = useState(1);
  const [pdfDimensions, setPdfDimensions] = useState({ width: 0, height: 0 });
  const [resumeData, setResumeData] = useState({
    name: { value: 'FIRSTNAME LASTNAME', fontFamily: 'Libre Baskerville' },
    phone: '+111234567',
    location: 'United States',
    email: 'email@gmail.com',
    linkedin: 'LinkedIn',
    jobTitle: { value: 'Job Title', fontFamily: 'Libre Baskerville' },
    summary: { value: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.', fontFamily: 'Roboto' },
    sections: {
      skills: {
        title: 'SKILLS',
        items: [
          { description: 'React, Next.Js, React Native, Redux, Redux-Saga, HTML, SCSS, React Testing Library, Jest', fontFamily: 'Libre Baskerville' }
        ]
      },
      experience: {
        title: 'EXPERIENCE',
        items: [
          {
            title: 'Job Title',
            subtitle: 'Company • City, United States • 01/2022 — Present',
            bullets: [
              { value: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', fontFamily: 'Roboto' },
              { value: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.', fontFamily: 'Roboto' },
              { value: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.', fontFamily: 'Roboto' }
            ]
          },
          {
            title: 'Job Title',
            subtitle: 'Company • City, United States • 12/2019 — 12/2021',
            bullets: [
              { value: 'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', fontFamily: 'Libre Baskerville' },
            ]
          }
        ]
      },
      projects: {
        title: 'PROJECTS',
        items: [
          {
            title: 'Project Title',
            description: 'Brief project description',
            bullets: [
              { value: 'Key achievement or feature of the project', fontFamily: 'Roboto' },
            ]
          }
        ]
      },
      education: {
        title: 'EDUCATION',
        items: [
          {
            title: 'Degree in Field of Study',
            subtitle: 'University • 06/2015 — 06/2019',
            description: 'Relevant Coursework: Course 1, Course 2, Course 3',
          }
        ]
      },
    }
  });

  const [expandedSections, setExpandedSections] = useState({
    skills: true,
    experience: true,
    projects: true,
    education: true,
  });

  const [settings, setSettings] = useState({
    fontSize: 12,
    lineSpacing: 1.2,
    sectionOrder: ['skills', 'experience', 'projects', 'education'],
    fontFamily: 'Roboto',
    darkMode: false,
  });

  const [hiddenFields, setHiddenFields] = useState({});
  const [loading, setLoading] = useState(true);
  const canvasRef = useRef([]);
  const router = useRouter();

  const toggleFieldVisibility = (field) => {
    setHiddenFields(prev => ({
      ...prev,
      [field]: !prev[field]
    }));
  };

  const handleInputChange = (e, sectionKey, itemIndex, bulletIndex) => {
    const { name, value } = e.target;
  
    setResumeData(prevData => {
      const newData = { ...prevData };
      if (['name', 'jobTitle', 'summary'].includes(name)) {
        newData[name].value = value;
      } else if (name === 'sectionTitle') {
        newData.sections[sectionKey].title = value;
      } else if (sectionKey && itemIndex !== undefined) {
        if (bulletIndex !== undefined) {
          newData.sections[sectionKey].items[itemIndex].bullets[bulletIndex].value = value;
        } else if (name === 'title' || name === 'subtitle' || name === 'description') {
          newData.sections[sectionKey].items[itemIndex][name] = value;
        }
      } else {
        newData[name] = value;
      }
      return newData;
    });
  };

  const handleFontFamilyChange = (fontFamily, sectionKey, itemIndex, bulletIndex) => {
    setResumeData(prevData => {
      const newData = { ...prevData };
      if (['name', 'jobTitle', 'summary'].includes(sectionKey)) {
        newData[sectionKey].fontFamily = fontFamily;
      } else if (sectionKey && itemIndex === undefined) {
        newData.sections[sectionKey].fontFamily = fontFamily;
      } else if (sectionKey && itemIndex !== undefined) {
        if (bulletIndex !== undefined) {
          newData.sections[sectionKey].items[itemIndex].bullets[bulletIndex].fontFamily = fontFamily;
        } else {
          newData.sections[sectionKey].items[itemIndex].fontFamily = fontFamily;
        }
      }
      return newData;
    });
  }

  const addItem = (sectionKey) => {
    setResumeData(prevData => {
      const newData = { ...prevData };
      const newItem = { title: '', subtitle: '', description: '', bullets: [] };
      newData.sections[sectionKey].items.push(newItem);
      return newData;
    });
  };

  const addBullet = (sectionKey, itemIndex) => {
    setResumeData(prevData => {
      const newData = { ...prevData };
      newData.sections[sectionKey].items[itemIndex].bullets.push({ value: '', fontFamily: 'Roboto' });
      return newData;
    });
  };

  const removeItem = (sectionKey, itemIndex) => {
    setResumeData(prevData => {
      const newData = { ...prevData };
      newData.sections[sectionKey].items.splice(itemIndex, 1);
      return newData;
    });
  };

  const removeBullet = (sectionKey, itemIndex, bulletIndex) => {
    setResumeData(prevData => {
      const newData = { ...prevData };
      newData.sections[sectionKey].items[itemIndex].bullets.splice(bulletIndex, 1);
      return newData;
    });
  };

  const addSection = () => {
    const sectionKey = `customSection${Object.keys(resumeData.sections).length + 1}`;
    setResumeData(prevData => ({
      ...prevData,
      sections: {
        ...prevData.sections,
        [sectionKey]: {
          title: 'New Section',
          items: []
        }
      }
    }));
    setSettings(prevSettings => ({
      ...prevSettings,
      sectionOrder: [...prevSettings.sectionOrder, sectionKey]
    }));
    setExpandedSections(prevExpanded => ({
      ...prevExpanded,
      [sectionKey]: true
    }));
  };

  const removeSection = (sectionKey) => {
    setResumeData(prevData => {
      const newData = { ...prevData };
      delete newData.sections[sectionKey];
      return newData;
    });
    setSettings(prevSettings => ({
      ...prevSettings,
      sectionOrder: prevSettings.sectionOrder.filter(key => key !== sectionKey)
    }));
  };

  const toggleSection = (section) => {
    setExpandedSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  const onDragEnd = (result) => {
    if (!result.destination) {
      return;
    }

    const items = Array.from(settings.sectionOrder);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setSettings(prevSettings => ({
      ...prevSettings,
      sectionOrder: items
    }));
  };

  const handleZoomIn = () => {
    setZoom(prevZoom => Math.min(prevZoom + 0.1, 2));
  };

  const handleZoomOut = () => {
    setZoom(prevZoom => Math.max(prevZoom - 0.1, 0.5));
  };
  
  const handleDownloadPDF = async () => {
    try {
      const blob = await pdf(<ResumePDF data={resumeData} settings={settings} hiddenFields={hiddenFields} />).toBlob();
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'resume.pdf';
      link.click();
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('An error occurred while generating the PDF. Please try again.');
    }
  };

  const debouncedResumeData = useDebounce(resumeData, 300);
  const debouncedSettings = useDebounce(settings, 300);
  const debouncedHiddenFields = useDebounce(hiddenFields, 300);

  useEffect(() => {
    const generatePDF = async () => {
      try {
        setLoading(true);
        const blob = await pdf(<ResumePDF data={debouncedResumeData} settings={debouncedSettings} hiddenFields={debouncedHiddenFields} />).toBlob();
        const url = URL.createObjectURL(blob);
        setPdfUrl(url);
        return () => URL.revokeObjectURL(url);
      } catch (error) {
        console.error('Error generating PDF preview:', error);
        setPdfUrl('');
      } finally {
        setLoading(false);
      }
    };
    generatePDF();
  }, [debouncedResumeData, debouncedSettings, debouncedHiddenFields]);

  useEffect(() => {
    const loadPDF = async () => {
      if (!pdfUrl) return;

      try {
        const loadingTask = getDocument({ url: pdfUrl });
        const pdf = await loadingTask.promise;
        setNumPages(pdf.numPages);

        for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
          const page = await pdf.getPage(pageNum);
          const canvas = canvasRef.current[pageNum - 1];
          const context = canvas.getContext('2d');

          const dpr = window.devicePixelRatio || 1;
          const viewport = page.getViewport({ scale: zoom * dpr });

          canvas.height = viewport.height;
          canvas.width = viewport.width;

          canvas.style.height = `${viewport.height / dpr}px`;
          canvas.style.width = `${viewport.width / dpr}px`;

          const renderContext = {
            canvasContext: context,
            viewport: viewport,
          };

          await page.render(renderContext).promise;

          if (pageNum === 1) {
            setPdfDimensions({ width: viewport.width / dpr, height: viewport.height / dpr });
          }
        }
      } catch (error) {
        console.error('Error loading PDF:', error);
      } finally {
        setLoading(false);
      }
    };

    loadPDF();
  }, [pdfUrl, zoom]);

  const params = useParams()
  const {resumeId} = params;
  const {toast} = useToast()
  const [saving, setSaving] = useState(false)
  const session = useSession()

  async function getCoverLetterDetails() {
    
    const response = await axios.get(`/api/resumeDetailsById?id=${resumeId}`)
    console.log(response.data.resume)
    if(response.data.resume.resumeData) {
      setResumeData(response.data.resume.resumeData)
    }
   
    
  }
  

  useEffect(() => {
    getCoverLetterDetails()
    updateResumeDetails()
  },[])

 async function updateResumeDetails() {
    setSaving(true)
    const response = await axios.put('/api/resumeData', {
      id: resumeId,
      email: session.data?.user?.email,
      resumeData: resumeData
    })

    if(response.status == 200) {
     toast({
      title: "Updated Successfully",
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

  const renderInputWithEyeIcon = (field, value, onChange, placeholder) => (
    <div className="relative flex items-center space-x-2">
      <Input
        name={field}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="flex-grow pr-10"
      />
      <button
        type="button"
        onClick={() => toggleFieldVisibility(field)}
        className="absolute right-2 top-1/2 transform -translate-y-1/2"
      >
        {hiddenFields[field] ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
      </button>
    </div>
  );

  return (
    <div className={`flex flex-col h-screen lg:flex-row ${settings.darkMode ? 'dark' : ''}`}>
      <div className='h-16 w-full fixed top-0 bg-white dark:bg-gray-900 shadow-md z-10'>
        <div className='flex justify-between items-center'>
          <div>
            <ArrowLeft onClick={() => {
              router.push('/dashboard/resume')
            }}  className='ml-4 cursor-pointer  active:bg-slate-300 active:rounded-full'  />
          </div>
          <div className="flex justify-between items-center mt-2 mb-4">
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
              updateResumeDetails()
              }}>
              <SaveIcon className='w-4 h-4 mr-2 ' />
              Save
            </Button>
            </>
           )  }
            <Button onClick={handleDownloadPDF} variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Download PDF
            </Button>
          </div>
        </div>
      </div>
      <div className="lg:w-2/4 mt-16 p-4 overflow-y-auto classy-scrollbar bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900">
        <Card className="w-full max-w-5xl mx-auto">
          <CardHeader className="bg-primary text-primary-foreground">
            <CardTitle className="text-3xl font-bold text-center">Ultimate Resume Builder</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <Tabs defaultValue="content" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="content">Content</TabsTrigger>
                <TabsTrigger value="settings">Settings</TabsTrigger>
              </TabsList>
              <TabsContent value="content" className="space-y-6">
                {/* Personal Information */}
                <div className="space-y-4">
                  <h3 className="text-2xl font-semibold">Personal Information</h3>
                  <div className="grid grid-cols-1  gap-4">
                    {['name', 'phone', 'location', 'email', 'linkedin'].map(field => (
                      <div key={field} className="flex items-center space-x-2 ">
                        {renderInputWithEyeIcon(
                          field,
                          typeof resumeData[field] === 'object' ? resumeData[field].value : resumeData[field],
                          (e) => handleInputChange(e),
                          field.charAt(0).toUpperCase() + field.slice(1)
                        )}
                        {field === 'name' && (
                          <Select 
                            value={resumeData[field].fontFamily}
                            onValueChange={(value) => handleFontFamilyChange(value, field)}
                          >
                            <SelectTrigger className="w-[180px]">
                              <SelectValue placeholder="Select font" />
                            </SelectTrigger>
                            <SelectContent>
                              {Object.entries(fontFamilies).map(([name, value]) => (
                                <SelectItem key={value} value={value}>{name}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Job Title */}
                <div className="space-y-4">
                  <h3 className="text-2xl font-semibold">Job Title</h3>
                  <div className="flex items-center space-x-2">
                    {renderInputWithEyeIcon(
                      'jobTitle',
                      resumeData.jobTitle.value,
                      (e) => handleInputChange(e),
                      "Job Title"
                    )}
                    <Select
                      value={resumeData.jobTitle.fontFamily}
                      onValueChange={(value) => handleFontFamilyChange(value, 'jobTitle')}
                    >
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Select font" />
                      </SelectTrigger>
                      <SelectContent>
                        {Object.entries(fontFamilies).map(([name, value]) => (
                          <SelectItem key={value} value={value}>{name}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Summary */}
                <div className="space-y-4">
                  <h3 className="text-2xl font-semibold">Summary</h3>
                  <div className="flex items-center space-x-2">
                    <div className="relative flex-grow">
                      <Textarea
                        name="summary"
                        placeholder="Professional Summary"
                        value={resumeData.summary.value}
                        onChange={(e) => handleInputChange(e)}
                        className="pr-10"
                      />
                      <button
                        type="button"
                        onClick={() => toggleFieldVisibility('summary')}
                        className="absolute right-2 top-2"
                      >
                        {hiddenFields.summary ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                    <Select
                      value={resumeData.summary.fontFamily}
                      onValueChange={(value) => handleFontFamilyChange(value, 'summary')}
                    >
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Select font" />
                      </SelectTrigger>
                      <SelectContent>
                        {Object.entries(fontFamilies).map(([name, value]) => (
                          <SelectItem key={value} value={value}>{name}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Sections */}
                {settings.sectionOrder.map(sectionKey => (
                  <Card className="mb-6 overflow-hidden shadow-lg" key={sectionKey}>
                    <CardHeader className="pb-3 bg-secondary">
                      <div className="flex justify-between items-center">
                        <CardTitle className="text-xl font-bold">
                          <Input
                            value={resumeData.sections[sectionKey].title}
                            onChange={(e) => handleInputChange(e, sectionKey, undefined, undefined)}
                            name="sectionTitle"
                            className="font-bold text-xl"
                          />
                        </CardTitle>
                        <div className="flex space-x-2">
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button variant="ghost" size="icon" onClick={() => toggleFieldVisibility(sectionKey)}>
                                  {hiddenFields[sectionKey] ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>{hiddenFields[sectionKey] ? 'Show' : 'Hide'} section</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button variant="ghost" size="icon" onClick={() => toggleSection(sectionKey)}>
                                  {expandedSections[sectionKey] ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>{expandedSections[sectionKey] ? 'Collapse' : 'Expand'} section</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button variant="outline" size="icon" onClick={() => addItem(sectionKey)}>
                                  <PlusCircle className="h-4 w-4" />
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>Add new item</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button variant="destructive" size="icon" onClick={() => removeSection(sectionKey)}>
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>Remove section</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        </div>
                      </div>
                    </CardHeader>
                    <AnimatePresence>
                      {expandedSections[sectionKey] && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <CardContent className="pt-4">
                            {resumeData.sections[sectionKey].items.map((item, itemIndex) => (
                              <div key={itemIndex} className="mb-4 p-4 bg-secondary/50 rounded-lg relative group">
                                <Input
                                  value={item.title}
                                  onChange={(e) => handleInputChange(e, sectionKey, itemIndex)}
                                  name="title"
                                  placeholder="Title"
                                  className="mb-2 font-semibold"
                                />
                                <Input
                                  value={item.subtitle}
                                  onChange={(e) => handleInputChange(e, sectionKey, itemIndex)}
                                  name="subtitle"
                                  placeholder="Subtitle"
                                  className="mb-2"
                                />
                                <Textarea
                                  value={item.description}
                                  onChange={(e) => handleInputChange(e, sectionKey, itemIndex)}
                                  name="description"
                                  placeholder="Description"
                                  className="mb-2"
                                />
                                {item.bullets && item.bullets.map((bullet, bulletIndex) => (
                                  <div key={bulletIndex} className="flex items-center space-x-2 mb-2">
                                    <Textarea
                                      value={bullet.value}
                                      onChange={(e) => handleInputChange(e, sectionKey, itemIndex, bulletIndex)}
                                      placeholder="Bullet point"
                                      className="flex-grow"
                                    />
                                    <Select
                                      value={bullet.fontFamily}
                                      onValueChange={(value) => handleFontFamilyChange(value, sectionKey, itemIndex, bulletIndex)}
                                    >
                                      <SelectTrigger className="w-[180px]">
                                        <SelectValue placeholder="Select font" />
                                      </SelectTrigger>
                                      <SelectContent>
                                        {Object.entries(fontFamilies).map(([name, value]) => (
                                          <SelectItem key={value} value={value}>{name}</SelectItem>
                                        ))}
                                      </SelectContent>
                                    </Select>
                                    <Button variant="outline" size="icon" onClick={() => removeBullet(sectionKey, itemIndex, bulletIndex)}>
                                      <Trash2 className="h-4 w-4" />
                                    </Button>
                                  </div>
                                ))}
                                <Button variant="outline" size="sm" onClick={() => addBullet(sectionKey, itemIndex)}>
                                  Add Bullet Point
                                </Button>
                                <Button variant="destructive" size="icon" className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity" onClick={() => removeItem(sectionKey, itemIndex)}>
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            ))}
                          </CardContent>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </Card>
                ))}

                <Button onClick={addSection} variant="outline" className="w-full">
                  Add New Section
                </Button>
              </TabsContent>
              <TabsContent value="settings" className="space-y-6">
                <div className="grid gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="font-family">Default Font Family</Label>
                    <Select
                      value={settings.fontFamily}
                      onValueChange={(value) => setSettings(prev => ({ ...prev, fontFamily: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select a font family" />
                      </SelectTrigger>
                      <SelectContent>
                        {Object.entries(fontFamilies).map(([name, value]) => (
                          <SelectItem key={value} value={value}>{name}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="font-size">Font Size: {settings.fontSize}px</Label>
                    <Slider
                      id="font-size"
                      min={8}
                      max={16}
                      step={0.5}
                      value={[settings.fontSize]}
                      onValueChange={(value) => setSettings(prev => ({ ...prev, fontSize: value[0] }))}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="line-spacing">Line Spacing: {settings.lineSpacing}</Label>
                    <Slider
                      id="line-spacing"
                      min={1}
                      max={2}
                      step={0.1}
                      value={[settings.lineSpacing]}
                      onValueChange={(value) => setSettings(prev => ({ ...prev, lineSpacing: value[0] }))}
                    />
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="dark-mode"
                      checked={settings.darkMode}
                      onCheckedChange={(checked) => setSettings(prev => ({ ...prev, darkMode: checked }))}
                    />
                    <Label htmlFor="dark-mode">Dark Mode</Label>
                  </div>
                  <div className="grid gap-2">
                    <Label>Section Order</Label>
                    <DragDropContext onDragEnd={onDragEnd}>
                      <Droppable droppableId="sections">
                        {(provided) => (
                          <div {...provided.droppableProps} ref={provided.innerRef}>
                            {settings.sectionOrder.map((section, index) => (
                              <Draggable key={section} draggableId={section} index={index}>
                                {(provided) => (
                                  <div
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                    className="flex items-center space-x-2 p-2 bg-secondary rounded-md mb-2"
                                  >
                                    <GripVertical className="h-5 w-5" />
                                    <span>{resumeData.sections[section].title}</span>
                                  </div>
                                )}
                              </Draggable>
                            ))}
                            {provided.placeholder}
                          </div>
                        )}
                      </Droppable>
                    </DragDropContext>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
      <div className="lg:w-2/4 p-4 overflow-y-auto classy-scrollbar bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-800">
        <div className="flex justify-between items-center mb-4">
          <div className="flex space-x-2">
            <Button onClick={handleZoomOut} variant="outline" size="icon">
              <ZoomOut className="h-4 w-4" />
            </Button>
            <Button onClick={handleZoomIn} variant="outline" size="icon">
              <ZoomIn className="h-4 w-4" />
            </Button>
          </div>
          <Button onClick={handleDownloadPDF} variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Download PDF
          </Button>
        </div>
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 1 }}
            animate={{ opacity: loading ? 0.5 : 1 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex flex-col items-center">
              {Array.from({ length: numPages }, (_, i) => (
                <canvas
                  key={i}
                  ref={el => canvasRef.current[i] = el}
                  className="mb-4 shadow-lg"
                  style={{
                    width: `${pdfDimensions.width * zoom}px`,
                    height: `${pdfDimensions.height * zoom}px`
                  }}
                />
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}