'use client'

import React, { useState, useEffect, useRef } from 'react';
import { Document, Page, Text, View, StyleSheet, pdf, Font, Link } from '@react-pdf/renderer';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ZoomIn, ZoomOut, Download, ChevronUp, ChevronDown, PlusCircle, Trash2, GripVertical } from 'lucide-react';
import { Tooltip, TooltipProvider, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";
import { motion, AnimatePresence } from "framer-motion";
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { Slider } from "@/components/ui/slider";
import { getDocument, GlobalWorkerOptions } from 'pdfjs-dist/build/pdf';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { useDebounce } from '@/hooks/useDebounce';

import 'pdfjs-dist/build/pdf.worker.entry';

GlobalWorkerOptions.workerSrc = '/pdf.worker.js';

// Register custom fonts
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
    flexDirection: 'column',
    backgroundColor: '#FFFFFF',
    padding: '0.5in',
  },
  name: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 4,
  },
  contact: {
    fontSize: 10,
    textAlign: 'center',
    marginBottom: 12,
  },
  link: {
    color: '#0000FF',
    textDecoration: 'none',
  },
  section: {
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    marginBottom: 4,
    textTransform: 'uppercase',
    borderBottomWidth: 1,
    borderBottomColor: '#000000',
    borderBottomStyle: 'solid',
  },
  content: {
    fontSize: 10,
    lineHeight: 1.2,
  },
  bold: {
    fontWeight: 'bold',
  },
  rightAligned: {
    textAlign: 'right',
  },
  columns: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  column: {
    width: '30%',
  },
  bullet: {
    width: 10,
  },
});

const ResumePDF = ({ data, settings }) => (
  <Document>
    <Page size="A4" style={{
      ...styles.page,
      fontFamily: settings.fontFamily,
      fontSize: settings.fontSize,
      lineHeight: settings.lineSpacing,
    }}>
      <Text style={{...styles.name, fontFamily: data.name.fontFamily || settings.fontFamily}}>{data.name.value.toUpperCase()}</Text>
      <Text style={{...styles.contact, fontFamily: settings.fontFamily}}>
        {data.phone} • {data.location}{'\n'}
        <Link src={`mailto:${data.email}`} style={styles.link}>{data.email}</Link> • 
        <Link src={`https://linkedin.com/company/${data.linkedin}`} style={styles.link}>{data.linkedin}</Link> • 
        <Link src={`https://${data.website}`} style={styles.link}>{data.website}</Link>
      </Text>

      {settings.sectionOrder.map((section) => {
        switch(section) {
          case 'objective':
            return (
              <View key={section} style={styles.section}>
                <Text style={{...styles.sectionTitle, fontFamily: settings.fontFamily}}>Objective</Text>
                <Text style={{...styles.content, fontFamily: data.objective.fontFamily || settings.fontFamily}}>{data.objective.value}</Text>
              </View>
            );
          case 'education':
            return (
              <View key={section} style={styles.section}>
                <Text style={{...styles.sectionTitle, fontFamily: settings.fontFamily}}>Education</Text>
                {data.education.map((edu, index) => (
                  <View key={index} style={styles.content}>
                    <View style={styles.columns}>
                      <Text style={{...styles.bold, fontFamily: edu.degree.fontFamily || settings.fontFamily}}>{edu.degree.value}, {edu.school.value}</Text>
                      <Text style={{...styles.rightAligned, fontFamily: edu.period.fontFamily || settings.fontFamily}}>{edu.period.value}</Text>
                    </View>
                    <Text style={{fontFamily: edu.courses.fontFamily || settings.fontFamily}}>Relevant Coursework: {edu.courses.value}</Text>
                  </View>
                ))}
              </View>
            );
          case 'skills':
            return (
              <View key={section} style={styles.section}>
                <Text style={{...styles.sectionTitle, fontFamily: settings.fontFamily}}>Skills</Text>
                {Object.entries(data.skills).map(([category, skills], index) => (
                  <View key={index} style={[styles.content, styles.columns]}>
                    <Text style={[styles.column, styles.bold, {fontFamily: skills.categoryFontFamily || settings.fontFamily}]}>{category}</Text>
                    <Text style={[styles.column, { width: '70%', fontFamily: skills.skillsFontFamily || settings.fontFamily }]}>{skills.value}</Text>
                  </View>
                ))}
              </View>
            );
          case 'experience':
            return (
              <View key={section} style={styles.section}>
                <Text style={{...styles.sectionTitle, fontFamily: settings.fontFamily}}>Experience</Text>
                {data.experience.map((exp, index) => (
                  <View key={index} style={styles.content}>
                    <View style={styles.columns}>
                      <Text style={{...styles.bold, fontFamily: exp.role.fontFamily || settings.fontFamily}}>{exp.role.value}</Text>
                      <Text style={{...styles.rightAligned, fontFamily: exp.period.fontFamily || settings.fontFamily}}>{exp.period.value}</Text>
                    </View>
                    <Text style={{ fontStyle: 'italic', fontFamily: exp.company.fontFamily || settings.fontFamily }}>{exp.company.value}, {exp.location.value}</Text>
                    {exp.achievements.map((achievement, i) => (
                      <View key={i} style={[styles.columns, { marginTop: 2 }]}>
                        <Text style={styles.bullet}>•</Text>
                        <Text style={{ width: '95%', fontFamily: achievement.fontFamily || settings.fontFamily }}>{achievement.value}</Text>
                      </View>
                    ))}
                  </View>
                ))}
              </View>
            );
          case 'projects':
            return (
              <View key={section} style={styles.section}>
                <Text style={{...styles.sectionTitle, fontFamily: settings.fontFamily}}>Projects</Text>
                {data.projects.map((project, index) => (
                  <View key={index} style={styles.content}>
                    <Text style={{...styles.bold, fontFamily: project.name.fontFamily || settings.fontFamily}}>{project.name.value}</Text>
                    <Text style={{fontFamily: project.description.fontFamily || settings.fontFamily}}>{project.description.value}</Text>
                    {project.link.value && <Link src={project.link.value} style={{...styles.link, fontFamily: project.link.fontFamily || settings.fontFamily}}>({project.link.value})</Link>}
                  </View>
                ))}
              </View>
            );
          case 'extraCurricular':
            return (
              <View key={section} style={styles.section}>
                <Text style={{...styles.sectionTitle, fontFamily: settings.fontFamily}}>Extra-Curricular Activities</Text>
                {data.extraCurricular.map((activity, index) => (
                  <View key={index} style={[styles.content, styles.columns, { marginTop: 2 }]}>
                    <Text style={styles.bullet}>•</Text>
                    <Text style={{ width: '95%', fontFamily: activity.fontFamily || settings.fontFamily }}>{activity.value}</Text>
                  </View>
                ))}
              </View>
            );
          case 'leadership':
            return (
              <View key={section} style={styles.section}>
                <Text style={{...styles.sectionTitle, fontFamily: settings.fontFamily}}>Leadership</Text>
                {data.leadership.map((item, index) => (
                  <View key={index} style={[styles.content, styles.columns, { marginTop: 2 }]}>
                    <Text style={styles.bullet}>•</Text>
                    <Text style={{ width: '95%', fontFamily: item.fontFamily || settings.fontFamily }}>{item.value}</Text>
                  </View>
                ))}
              </View>
            );
          default:
            return null;
        }
      })}
    </Page>
  </Document>
);

export default function ResumeBuilder() {
  const [zoom, setZoom] = useState(1);
  const [pdfUrl, setPdfUrl] = useState('');
  const [numPages, setNumPages] = useState(1);
  const [pdfDimensions, setPdfDimensions] = useState({ width: 0, height: 0 });
  const [resumeData, setResumeData] = useState({
    name: { value: 'FIRSTNAME LASTNAME', fontFamily: 'Roboto' },
    phone: '+1(123) 456-7890',
    location: 'San Francisco, CA',
    email: 'contact@faangpath.com',
    linkedin: 'linkedin.com/company/faangpath',
    website: 'www.faangpath.com',
    objective: { value: 'Software Engineer with 2+ years of experience in XXX, seeking full-time XXX roles.', fontFamily: 'Roboto' },
    education: [
      {
        degree: { value: 'Master of Computer Science', fontFamily: 'Roboto' },
        school: { value: 'Stanford University', fontFamily: 'Roboto' },
        period: { value: 'Expected 2020', fontFamily: 'Roboto' },
        courses: { value: 'A, B, C, and D.', fontFamily: 'Roboto' }
      },
      {
        degree: { value: 'Bachelor of Computer Science', fontFamily: 'Roboto' },
        school: { value: 'Stanford University', fontFamily: 'Roboto' },
        period: { value: '2014 - 2017', fontFamily: 'Roboto' },
        courses: { value: '', fontFamily: 'Roboto' }
      }
    ],
    skills: {
      'Technical Skills': { value: 'A, B, C, D', categoryFontFamily: 'Roboto', skillsFontFamily: 'Roboto' },
      'Soft Skills': { value: 'A, B, C, D', categoryFontFamily: 'Roboto', skillsFontFamily: 'Roboto' },
      'XYZ': { value: 'A, B, C, D', categoryFontFamily: 'Roboto', skillsFontFamily: 'Roboto' }
    },
    experience: [
      {
        role: { value: 'Role Name', fontFamily: 'Roboto' },
        company: { value: 'Company Name', fontFamily: 'Roboto' },
        location: { value: 'San Francisco, CA', fontFamily: 'Roboto' },
        period: { value: 'Jan 2017 - Jan 2019', fontFamily: 'Roboto' },
        achievements: [
          { value: 'Achieved X% growth for XYZ using A, B, and C skills.', fontFamily: 'Roboto' },
          { value: 'Led XYZ which led to X% of improvement in ABC', fontFamily: 'Roboto' },
          { value: 'Developed XYZ that did A, B, and C using X, Y, and Z.', fontFamily: 'Roboto' }
        ]
      },
      {
        role: { value: 'Role Name', fontFamily: 'Roboto' },
        company: { value: 'Company Name', fontFamily: 'Roboto' },
        location: { value: 'San Francisco, CA', fontFamily: 'Roboto' },
        period: { value: 'Jan 2017 - Jan 2019', fontFamily: 'Roboto' },
        achievements: [
          { value: 'Achieved X% growth for XYZ using A, B, and C skills.', fontFamily: 'Roboto' },
          { value: 'Led XYZ which led to X% of improvement in ABC', fontFamily: 'Roboto' },
          { value: 'Developed XYZ that did A, B, and C using X, Y, and Z.', fontFamily: 'Roboto' }
        ]
      }
    ],
    projects: [
      {
        name: { value: 'Hiring Search Tool', fontFamily: 'Roboto' },
        description: { value: 'Built a tool to search for Hiring Managers and Recruiters by using ReactJS, NodeJS, Firebase and boolean queries. Over 25000 people have used it so far, with 5000+ queries being saved and shared, and search results even better than LinkedIn! (Try it here)', fontFamily: 'Roboto' },
        link: { value: 'Try it here', fontFamily: 'Roboto' }
      },
      {
        name: { value: 'Short Project Title', fontFamily: 'Roboto' },
        description: { value: 'Build a project that does something and had quantified success using A, B, and C. This project\'s description spans two lines and also won an award.', fontFamily: 'Roboto' },
        link: { value: '', fontFamily: 'Roboto' }
      }
    ],
    extraCurricular: [
      { value: 'Actively write blog posts and social media posts (TikTok, Instagram) viewed by over 20K+ job seekers per week to help people with best practices to land their dream jobs.', fontFamily: 'Roboto' },
      { value: 'Sample bullet point.', fontFamily: 'Roboto' }
    ],
    leadership: [
      { value: 'Admin for the FAANGPath Discord community with over 6000+ job seekers and industry mentors. Actively involved in facilitating online events, career conversations, and more alongside other admins and a team of volunteer moderators!', fontFamily: 'Roboto' }
    ]
  });

  const [expandedSections, setExpandedSections] = useState({
    objective: true,
    education: true,
    skills: true,
    experience: true,
    projects: true,
    extraCurricular: true,
    leadership: true
  });

  const [settings, setSettings] = useState({
    fontSize: 10,
    lineSpacing: 1.2,
    sectionOrder: ['objective', 'education', 'skills', 'experience', 'projects', 'extraCurricular', 'leadership'],
    fontFamily: 'Roboto',
    darkMode: false,
  });

  const handleInputChange = (e, section, index, field, subIndex) => {
    const { name, value } = e.target;
  
    setResumeData(prevData => {
      const newData = { ...prevData };
  
      if (section) {
        if (Array.isArray(newData[section])) {
          newData[section] = newData[section].map((item, i) => {
            if (i === index) {
              if (field === 'achievements' && subIndex !== undefined) {
                const newAchievements = [...item.achievements];
                newAchievements[subIndex] = { ...newAchievements[subIndex], value };
                return { ...item, achievements: newAchievements };
              }
              return { ...item, [field]: { ...item[field], value } };
            }
            return item;
          });
        } else if (typeof newData[section] === 'object') {
          if (section === 'skills') {
            newData[section] = { ...newData[section], [field]: { ...newData[section][field], value } };
          } else {
            newData[section] = { ...newData[section], value };
          }
        } else {
          newData[section] = value;
        }
      } else {
        if (typeof newData[name] === 'object' && newData[name] !== null) {
          newData[name] = { ...newData[name], value };
        } else {
          newData[name] = value;
        }
      } 
  
      return newData;
    });
  };
  const handleFontFamilyChange = (fontFamily, section, index, field, subIndex) => {
    setResumeData(prevData => {
      if (section) {
        const newData = { ...prevData };
        if (Array.isArray(newData[section])) {
          newData[section] = newData[section].map((item, i) => {
            if (i === index) {
              if (field === 'achievements' && subIndex !== undefined) {
                const newAchievements = [...item.achievements];
                newAchievements[subIndex] = { ...newAchievements[subIndex], fontFamily };
                return { ...item, achievements: newAchievements };
              }
              return { ...item, [field]: { ...item[field], fontFamily } };
            }
            return item;
          });
        } else if (typeof newData[section] === 'object') {
          if (section === 'skills') {
            newData[section] = { ...newData[section], [field]: { ...newData[section][field], [subIndex ? 'skillsFontFamily' : 'categoryFontFamily']: fontFamily } };
          } else {
            newData[section] = { ...newData[section], fontFamily };
          }
        }
        return newData;
      }
      return { ...prevData, [section]: { ...prevData[section], fontFamily } };
    });
  };

  const addItem = (section) => {
    const newItem = section === 'education' ? { degree: { value: '', fontFamily: 'Roboto' }, school: { value: '', fontFamily: 'Roboto' }, period: { value: '', fontFamily: 'Roboto' }, courses: { value: '', fontFamily: 'Roboto' } } :
                    section === 'experience' ? { role: { value: '', fontFamily: 'Roboto' }, company: { value: '', fontFamily: 'Roboto' }, location: { value: '', fontFamily: 'Roboto' }, period: { value: '', fontFamily: 'Roboto' }, achievements: [{ value: '', fontFamily: 'Roboto' }] } :
                    section === 'projects' ? { name: { value: '', fontFamily: 'Roboto' }, description: { value: '', fontFamily: 'Roboto' }, link: { value: '', fontFamily: 'Roboto' } } :
                    { value: '', fontFamily: 'Roboto' };
    setResumeData(prevData => ({
      ...prevData,
      [section]: Array.isArray(prevData[section]) ? [...prevData[section], newItem] : [newItem]
    }));
  };

  const addAchievement = (index) => {
    setResumeData(prevData => ({
      ...prevData,
      experience: prevData.experience.map((item, i) => 
        i === index ? { ...item, achievements: [...item.achievements, { value: '', fontFamily: 'Roboto' }] } : item
      )
    }));
  };

  const removeAchievement = (expIndex, achievementIndex) => {
    setResumeData(prevData => ({
      ...prevData,
      experience: prevData.experience.map((item, i) => 
        i === expIndex ? { ...item, achievements: item.achievements.filter((_, j) => j !== achievementIndex) } : item
      )
    }));
  };

  const removeItem = (section, index) => {
    setResumeData(prev => ({
      ...prev,
      [section]: prev[section].filter((_, i) => i !== index)
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
      const blob = await pdf(<ResumePDF data={resumeData} settings={settings} />).toBlob();
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

  useEffect(() => {
    const generatePDF = async () => {
      try {
        setLoading(true);
        const blob = await pdf(<ResumePDF data={debouncedResumeData} settings={debouncedSettings} />).toBlob();
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
  }, [debouncedResumeData, debouncedSettings]);

  const canvasRef = useRef([]);
  const [loading, setLoading] = useState(true);

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

  const renderSection = (title, section, fields) => (
    <Card className="mb-6 overflow-hidden shadow-lg">
      <CardHeader className="pb-3 bg-secondary">
        <div className="flex justify-between items-center">
          <CardTitle className="text-xl font-bold">{title}</CardTitle>
          <div className="flex space-x-2">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon" onClick={() => toggleSection(section)}>
                    {expandedSections[section] ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{expandedSections[section] ? 'Collapse' : 'Expand'} section</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            {section !== 'objective' && section !== 'skills' && (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="outline" size="icon" onClick={() => addItem(section)}>
                      <PlusCircle className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Add new item</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )}
          </div>
        </div>
      </CardHeader>
      <AnimatePresence>
        {expandedSections[section] && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <CardContent className="pt-4">
              {renderSectionContent(section, fields)}
            </CardContent>
          </motion.div>
        )}
      </AnimatePresence>
    </Card>
  );
  
  const renderSectionContent = (section, fields) => {
    const content = resumeData[section];
    
    if (Array.isArray(content)) {
      return content.map((item, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.2 }}
          className="bg-secondary/50 p-4 rounded-lg mb-4 relative group"
        >
          {renderFields(item, section, index, fields)}
          {renderRemoveButton(section, index)}
        </motion.div>
      ));
    } else if (typeof content === 'object' && section === 'skills') {
      return Object.entries(content).map(([category, skills], index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.2 }}
          className="bg-secondary/50 p-4 rounded-lg mb-4 relative group"
        >
          <div className="flex items-center space-x-2 mb-2">
            <Input
              value={category}
              onChange={(e) => handleInputChange(e, 'skills', null, e.target.value)}
              className="font-bold"
            />
            <Select
              value={skills.categoryFontFamily}
              onValueChange={(value) => handleFontFamilyChange(value, 'skills', null, category, false)}
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
          <div className="flex items-center space-x-2">
            <Input
              value={skills.value}
              onChange={(e) => handleInputChange(e, 'skills', null, category, e.target.value)}
            />
            <Select
              value={skills.skillsFontFamily}
              onValueChange={(value) => handleFontFamilyChange(value, 'skills', null, category, true)}
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
        </motion.div>
      ));
    } else {
      return (
        <div className="flex items-center space-x-2">
          <Textarea
            placeholder={section.charAt(0).toUpperCase() + section.slice(1)}
            value={content.value || ''}
            onChange={(e) => handleInputChange(e, section)}
            className="mb-2 flex-grow"
          />
          <Select
            value={content.fontFamily}
            onValueChange={(value) => handleFontFamilyChange(value, section)}
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
      );
    }
  };
  
  const renderFields = (item, section, index, fields) => {
    if (fields) {
      return fields.map(field => {
        if (field === 'achievements' && section === 'experience') {
          return (
            <div key={field} className="space-y-2">
              <Label>Achievements</Label>
              {item.achievements.map((achievement, achievementIndex) => (
                <div key={achievementIndex} className="flex items-center space-x-2">
                  <Textarea
                    placeholder={`Achievement ${achievementIndex + 1}`}
                    value={achievement.value}
                    onChange={(e) => handleInputChange(e, section, index, field, achievementIndex)}
                    className="flex-grow"
                  />
                  <Select
                    value={achievement.fontFamily}
                    onValueChange={(value) => handleFontFamilyChange(value, section, index, field, achievementIndex)}
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
                  <Button variant="outline" size="icon" onClick={() => removeAchievement(index, achievementIndex)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
              <Button variant="outline" size="sm" onClick={() => addAchievement(index)}>
                Add Achievement
              </Button>
            </div>
          );
        }
        return (
          <div key={field} className="space-y-2">
            <Label>{field.charAt(0).toUpperCase() + field.slice(1)}</Label>
            <div className="flex items-center space-x-2">
              <Input
                placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                value={item[field].value || ''}
                onChange={(e) => handleInputChange(e, section, index, field)}
                className="flex-grow"
              />
              <Select
                value={item[field].fontFamily}
                onValueChange={(value) => handleFontFamilyChange(value, section, index, field)}
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
        );
      });
    } else {
      return (
        <div className="flex items-center space-x-2">
          <Input
            placeholder={section}
            value={item.value || ''}
            onChange={(e) => handleInputChange(e, section, index)}
            className="mb-2 flex-grow"
          />
          <Select
            value={item.fontFamily}
            onValueChange={(value) => handleFontFamilyChange(value, section, index)}
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
      );
    }
  }
  
  const renderRemoveButton = (section, index) => (
    <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="destructive" size="icon" onClick={() => removeItem(section, index)}>
              <Trash2 className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Remove item</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );

  return (
    <div className={`flex flex-col h-screen lg:flex-row ${settings.darkMode ? 'dark' : ''}`}>
      <div className="lg:w-2/4 p-4 overflow-y-auto classy-scrollbar bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900">
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
                <div className="space-y-4">
                  <h3 className="text-2xl font-semibold">Personal Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              {['name', 'phone', 'location', 'email', 'linkedin', 'website'].map(field => (
                    <div key={field} className="flex items-center space-x-2">
                      <Input
                        name={field}
                        placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                        value={typeof resumeData[field] === 'object' ? resumeData[field].value : resumeData[field]}
                        onChange={(e) => handleInputChange(e)}
                        className="flex-grow"
                      />
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

                {renderSection('Objective', 'objective')}
                {renderSection('Education', 'education', ['degree', 'school', 'period', 'courses'])}
                {renderSection('Skills', 'skills')}
                {renderSection('Experience', 'experience', ['role', 'company', 'location', 'period', 'achievements'])}
                {renderSection('Projects', 'projects', ['name', 'description', 'link'])}
                {renderSection('Extra-Curricular Activities', 'extraCurricular')}
                {renderSection('Leadership', 'leadership')}
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
                                    <span>{section.charAt(0).toUpperCase() + section.slice(1)}</span>
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
  ) }
