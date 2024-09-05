"use client"

import React, { useEffect, useState } from 'react'
import { Bar, BarChart, CartesianGrid, Legend, Line, LineChart, Pie, PieChart, Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Tooltip, XAxis, YAxis, Cell } from 'recharts'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import axios from 'axios'
import { Award, Book, Briefcase, ChevronRight, Clock, MessageSquare, Users } from "lucide-react"
import { chatSession, chatSessions } from '@/lib/GeminiAi'

import {motion} from 'framer-motion'
import { Lightbulb, MessageCircle, Target, Trophy } from 'lucide-react'
import { Progress } from "@/components/ui/progress"

import confetti from "canvas-confetti";

import Link from 'next/link'
import Image from 'next/image'
import { Separator } from '@/components/ui/separator'

const MotionCard = motion(Card)

interface ImprovementSuggestion {
  suggestions: string[];
}

interface SectionBreakdown {
  score: number; // Percentage score for the section
  improvementSuggestions: string[]; // Suggestions for improvement in the section
}

interface StrengthOrWeakness {
  name: string; // Name of the strength or weakness
  score: number; // Score out of 100
  type: 'strength' | 'weakness'; // Type of the item
  actions: string[]; // Actions to enhance strengths or address weaknesses
}

interface BehavioralAnalysis {
  teamworkScore: number; // Score out of 100 for teamwork
  initiativeScore: number; // Score out of 100 for initiative
  conflictResolutionScore: number; // Score out of 100 for conflict resolution
  leadershipScore: number; // Score out of 100 for leadership
  adaptabilityScore: number; // Score out of 100 for adaptability
  suggestionsForImprovingBehavioralTraits: string[]; // Suggestions for improving behavioral traits
}

interface FinalSuggestions {
  personalizedLearningPath: string; // Suggested learning path
  mockInterviewFrequency: string; // Recommended frequency for mock interviews
  suitableJobRoles: string; // Suggested job roles based on current strengths
}

interface ComparisonToIndustryStandards {
  alignmentScore: number; // Score indicating alignment with industry standards
  recommendationsForAlignment: string[]; // Recommendations for alignment
}

interface ConfidenceLevel {
  score: number; // Confidence score out of 100
  suggestionsForBalancingConfidenceAndAccuracy: string[]; // Suggestions for balancing confidence and accuracy
}

interface InterviewEvaluation {
  overallPerformanceScore: number; // Overall score out of 100
  overallImprovementSuggestions: ImprovementSuggestion[]; // Suggestions for overall improvement
  sectionWiseBreakdown: { [key: string]: SectionBreakdown }; // Breakdown by section
  strengthsAndWeaknesses: StrengthOrWeakness[]; // List of strengths and weaknesses
  comparisonToIndustryStandards: ComparisonToIndustryStandards; // Comparison to industry standards
  confidenceLevel: ConfidenceLevel; // Confidence level
  progressOverTime: {
    progressScore: number; // Score indicating progress over time
    suggestionsForMaintainingOrAcceleratingProgress: string[]; // Suggestions for maintaining or accelerating progress
  };
  behavioralAnalysis: BehavioralAnalysis; // Analysis of behavioral traits
  finalSuggestions: FinalSuggestions; // Final recommendations
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8']

export default function Component({params}) {
  const [data, setData] = useState<string | undefined>();

  // State for overall performance score
  const [overallPerformanceScore, setOverallPerformanceScore] = useState<number | null>(null);
  
  // State for overall improvement suggestions
  const [overallImprovementSuggestions, setOverallImprovementSuggestions] = useState<ImprovementSuggestion[]>([]);
  
  // State for section-wise breakdown
  const [sectionWiseBreakdown, setSectionWiseBreakdown] = useState<{ [key: string]: SectionBreakdown }>({});
  const [thoughtOnTheUserAnswer, setthoughtOnTheUserAnswer] = useState<string>()
  
  // State for strengths and weaknesses
  const [strengthsAndWeaknesses, setStrengthsAndWeaknesses] = useState<{
    strengths: StrengthOrWeakness[];
    weaknesses: StrengthOrWeakness[];
    actionsToEnhanceStrengths: string[];
    actionsToAddressWeaknesses: string[];
  }>({
    strengths: [],
    weaknesses: [],
    actionsToEnhanceStrengths: [],
    actionsToAddressWeaknesses: [],
  });
  
  // State for comparison to industry standards
  const [comparisonToIndustryStandards, setComparisonToIndustryStandards] = useState<ComparisonToIndustryStandards>({
    alignmentScore: 0,
    recommendationsForAlignment: [],
  });
  
  // State for confidence level
  const [confidenceLevel, setConfidenceLevel] = useState<ConfidenceLevel>({
    score: 0,
    suggestionsForBalancingConfidenceAndAccuracy: [],
  });
  
  // State for behavioral analysis
  const [behavioralAnalysis, setBehavioralAnalysis] = useState<BehavioralAnalysis>({
    teamworkScore: 0,
    initiativeScore: 0,
    conflictResolutionScore: 0,
    leadershipScore: 0,
    adaptabilityScore: 0,
    suggestionsForImprovingBehavioralTraits: [],
  });
  
  // State for final suggestions
  const [finalSuggestions, setFinalSuggestions] = useState<FinalSuggestions>({
    personalizedLearningPath: '',
    mockInterviewFrequency: '',
    suitableJobRoles: '',
  });


  
  const sectionWiseData = [
    { name: 'Technical Skills', value: sectionWiseBreakdown.technicalSkills?.score || 0},
    { name: 'Behavioral Skills', value: sectionWiseBreakdown.behavioralSkills?.score || 0},
    { name: 'Problem Solving', value: sectionWiseBreakdown.problemSolving?.score || 0 },
    { name: 'Communication', value: sectionWiseBreakdown.communication?.score || 0 },
  ]
  
 
  
  const strengthsData = [
    { subject: 'Conflict Resolution', A: behavioralAnalysis.conflictResolutionScore, fullMark: 100 },
    { subject: 'Leadership', A: behavioralAnalysis.leadershipScore, fullMark: 100 },
    { subject: 'Adaptability', A: behavioralAnalysis.adaptabilityScore, fullMark: 100 },
    { subject: 'Team Work', A: behavioralAnalysis.teamworkScore, fullMark: 100 },
    { subject: 'Initiative', A: behavioralAnalysis.initiativeScore, fullMark: 100 },
  ]
  
 
  
  
  
  
  const behavioralAnalysisData = [
    { name: 'Teamwork', value: behavioralAnalysis.teamworkScore || 1 ,fullMark: 100},
    { name: 'Conflict Resolution', value: behavioralAnalysis.conflictResolutionScore || 1, fullMark: 100 },
    { name: 'Leadership', value: behavioralAnalysis.leadershipScore || 1,fullMark: 100 },
    { name: 'Adaptability', value: behavioralAnalysis.adaptabilityScore || 1, fullMark: 100 },
    { name: 'Initiative', value: behavioralAnalysis.initiativeScore || 1, fullMark: 100 },
  ]



       async function GetUser() {
        const mockId = params.interviewId
        const response =  await axios.get('/api/getQNA', {
          params: {
            mockId: mockId
          }
        })
        console.log(response)

        setData(JSON.stringify(response.data.response))
       }

       useEffect(() => {
        GetUser()
       },[])
      


  const feedbackPrompt = `
You are a Senior Interviewer Expert tasked with evaluating the user's responses to a series of interview questions. Your assessment must be strict, objective, and consistent, reflecting the highest standards of performance evaluation. Provide a detailed analysis that includes rigorous scores and actionable feedback for each section. Ensure that your evaluation is unbiased, directly reflects the quality of the user's answers, and remains consistent across multiple assessments. Minor errors due to speech-to-text conversion, such as spelling errors or slight word mismatches, should be disregarded.
Use Predefined Scoring Criteria:
Please don't be random give me the precised score , be consistent with the score
Overall Performance Score: Provide an overall performance score out of 100 based on correctness, relevance, depth, and clarity of the user's responses.
Technical Skills: Score based on the correctness, depth, and relevance of the technical content. Deduct points for inaccuracies, lack of clarity, or superficial understanding.
Behavioral Skills: Evaluate based on the appropriateness of behavioral responses, alignment with expected professional conduct, and effectiveness in resolving scenarios.
Problem-Solving: Assess the logical structure, creativity, and efficiency of the proposed solutions.
Communication: Evaluate clarity, coherence, and conciseness of communication. Deduct points for verbosity, ambiguity, or failure to address the question directly.
Alignment with Industry Standards: Compare the user's performance with established industry benchmarks. Consider the expected proficiency level for similar roles.
Confidence Level: Score based on the balance between assertiveness and accuracy in responses.
Detailed Justifications:

Provide clear explanations for each score, referencing specific aspects of the user's answer. Highlight both strengths and weaknesses.
Consistency Check:

Cross-reference the scores with a baseline performance level for each section. Ensure the scores are consistent with similar previous assessments.
Actionable Feedback:

Give precise and actionable suggestions for improvement. Tailor feedback to the specific areas where the user needs to develop.
Structured Output:

Format the response in JSON, following the structure provided. Ensure that all sections are addressed and scores align with the analysis.
Assessment Structure:
Thought on the User Answer:

"Thought on the UserAnswer": Give your thoughts as if you are directly talking with the user. Be strict, harsh, and forthright. Highlight significant issues, inaccuracies, or lack of depth in their answers. Aim for 100-150 words.
Overall Performance Score:

Overall Performance Score: Provide an overall performance score out of 100 based on correctness, relevance, depth, and clarity of the user's responses.
Overall Improvement Suggestions: Include three precise and actionable suggestions for overall improvement. Be strict and harsh, and ensure they address specific shortcomings.
Section-wise Breakdown:

Technical Skills: Provide a percentage score out of 100.
Behavioral Skills: Provide a percentage score out of 100.
Problem-Solving: Provide a percentage score out of 100.
Communication: Provide a percentage score out of 100.
Improvement Suggestions: Offer three or more specific, actionable suggestions for improvement in each section. Address the exact shortcomings observed and be strict and harsh in your critique.
Comparison to Industry Standards:

Alignment Score: Provide a percentage score indicating how well the user's performance aligns with industry standards for similar roles.
Recommendations for Alignment: Offer three detailed recommendations for aligning the user's skills with industry expectations. Be strict and harsh in your recommendations.
Confidence Level:

Confidence Score: Assess the user's confidence level, providing a score out of 100.
Suggestions for Balancing Confidence and Accuracy: Include three suggestions for balancing confidence and accuracy in responses. Focus on improving relevance and correctness of answers, and be strict and harsh in your feedback.
Behavioral Analysis:

Behavioral Traits: Evaluate key behavioral traits such as teamwork, initiative, conflict resolution, leadership, and adaptability.
Scores for Each Trait: Provide a score for each trait out of 100.
Suggestions for Improving Behavioral Traits: Offer three specific suggestions for improving each behavioral trait. Address the exact issues observed and be strict and harsh in your critique.
Final Suggestions:

Personalized Learning Path: Recommend a personalized learning path based on the assessment. Write about 200-300 words. Provide platform names if possible.
Mock Interview Frequency: Suggest an appropriate frequency for mock interviews to ensure continuous improvement. Mention features available on AceYourInterview for this purpose.
Suitable Job Roles: Recommend suitable job roles based on the user's current strengths and overall performance. If the user is not suitable for the role, indicate that as well.
Questions and Answers:
${data} 

Sample Response:
{
  "thoughtOnTheUserAnswer" : "",
  "overallPerformanceScore": 0,
  "overallImprovementSuggestions": [
    "",
    "",
    ""
  ],
  "sectionWiseBreakdown": {
    "technicalSkills": {
      "score": 0,
      "improvementSuggestions": [
        "",
        "",
        "",
        "",
        ""
      ]
    },
    "behavioralSkills": {
      "score": 0,
      "improvementSuggestions": [
        "",
        "",
        "",
        "",
        ""
      ]
    },
    "problemSolving": {
      "score": 0,
      "improvementSuggestions": [
        "",
        "",
        "",
        "",
        ""
      ]
    },
    "communication": {
      "score": 0,
      "improvementSuggestions": [
        "",
        "",
        "",
        ""
      ]
    }
  },
  "behavioralAnalysis": {
    "teamworkScore": 0,
    "initiativeScore": 0,
    "conflictResolutionScore": 0,
    "leadershipScore": 0,
    "adaptabilityScore": 0,
    "suggestionsForImprovingBehavioralTraits": [
      "",
      "",
      ""
    ]
  },
  "finalSuggestions": {
    "personalizedLearningPath": "",
    "mockInterviewFrequency": "",
    "suitableJobRoles": ""
  }
}
 Strictly give reponse in JSON format.
  `

  async function getFeedback() {
    const response = await chatSessions.sendMessage(feedbackPrompt);
  
    // Processing the response from the Gemini API
    const feedback = await response.response.text();
    console.log(feedback)
    const feedbackJson = JSON.parse(feedback.replace('```json', '').replace('```', ''))

    setOverallPerformanceScore(feedbackJson.overallPerformanceScore);
      setOverallImprovementSuggestions(feedbackJson.overallImprovementSuggestions);
      setSectionWiseBreakdown(feedbackJson.sectionWiseBreakdown);
      setStrengthsAndWeaknesses(feedbackJson.strengthsAndWeaknesses);
      setComparisonToIndustryStandards(feedbackJson.comparisonToIndustryStandards);
      setConfidenceLevel(feedbackJson.confidenceLevel);
      setBehavioralAnalysis(feedbackJson.behavioralAnalysis);
      setFinalSuggestions(feedbackJson.finalSuggestions);
      setthoughtOnTheUserAnswer(feedbackJson.thoughtOnTheUserAnswer)
  }

  useEffect(() => {
   console.log(finalSuggestions.mockInterviewFrequency)
   console.log(comparisonToIndustryStandards.alignmentScore)
    console.log(sectionWiseBreakdown[0])
  },[finalSuggestions])

  useEffect(() => {
    console.log(data)
    if(data) {
      getFeedback()
    }
    
  },[data])

  const hurray = () => {
    const end = Date.now() + 4 * 1000; 
    const colors = ["#a786ff", "#fd8bbc", "#eca184", "#f8deb1"];
 
    const frame = () => {
      if (Date.now() > end) return;
 
      confetti({
        particleCount: 2,
        angle: 60,
        spread: 55,
        startVelocity: 60,
        origin: { x: 0, y: 0.5 },
        colors: colors,
      });
      confetti({
        particleCount: 2,
        angle: 120,
        spread: 55,
        startVelocity: 60,
        origin: { x: 1, y: 0.5 },
        colors: colors,
      });
 
      requestAnimationFrame(frame);
    };
 
    frame();
  };


useEffect(() => {
  hurray()
},[])

  return (

    <div className="min-h-screen bg-gray-100 text-gray-900">

        {/* Header */}
        <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <Link href="/dashboard" className="flex items-center gap-3">
            <Image src="/logo.png" height={40} width={40} alt="logo" />
            <h1 className="text-xl font-semibold text-gray-800">Ace Your Interview</h1>
          </Link>
        </div>
      </div>

    <div className="max-w-7xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6 text-center">Interview Performance Dashboard</h1>
      
      <div className="w-full lg:grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Overall Performance Score */}
        <Card className="w-full md:col-span-1 mb-4 lg:mb-0">
          <CardHeader className="flex items-center justify-between">
            <CardTitle className="text-lg">Overall Score</CardTitle>
            <Trophy className="w-6 h-6 text-blue-600" />
          </CardHeader>
          <CardContent className="flex justify-center items-center h-40">
            <div className="text-4xl font-bold text-blue-600">{overallPerformanceScore}%</div>
          </CardContent>
        </Card>

        {/* Thoughts on Answers */}
        <Card className="w-full md:col-span-1 lg:col-span-2 mb-4 lg:mb-0">
          <CardHeader className="flex items-center justify-between">
            <CardTitle className="text-lg">Thoughts on Your Answers</CardTitle>
            <MessageCircle className="w-6 h-6 text-green-600" />
          </CardHeader>
          <CardContent>
            <p className="text-sm">{thoughtOnTheUserAnswer}</p>
          </CardContent>
        </Card>

        {/* Section-wise Breakdown */}
        <Card className="col-span-1 lg:col-span-2 mb-4 lg:mb-0">
          <CardHeader>
            <CardTitle className="text-lg">Section-wise Breakdown</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col ">
              <div className="w-full  mb-4 lg:mb-0 lg:pr-2">
                <ResponsiveContainer width="100%" height={250}>
                  <PieChart>
                    <Pie
                      data={sectionWiseData}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, value }) => `${name}: ${value}`}
                    >
                      {sectionWiseData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className=" w-full lg:grid lg:grid-cols-2 lg:pl-2 space-y-6">
                {Object.entries(sectionWiseBreakdown).map(([name, { score, improvementSuggestions }]) => (
                  <div key={name} className="bg-gray-50 p-2  rounded">
                    <h4 className="font-semibold text-sm">{name} (Score: {score})</h4>
                    <ul className="list-disc list-inside text-xs text-gray-600">
                      {improvementSuggestions.map((suggestion, index) => (
                        <li key={index}>{suggestion}
                        <Separator />
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Behavioural Analysis */}
        <div className="col-start-3 row-start-2 lg:grid lg:grid-rows-5 gap-8">
          <Card className="h-fit lg:row-span-3 mb-4 lg:mb-0">
            <CardHeader>
              <CardTitle className="text-lg">Behavioural Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={250}>
                <RadarChart data={strengthsData}>
                  <PolarGrid stroke="#e2e8f0" />
                  <PolarAngleAxis dataKey="subject" tick={{ fill: '#4A5568', fontSize: 10 }} />
                  <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fill: '#4A5568', fontSize: 10 }} />
                  <Radar name="User" dataKey="A" stroke="#4F46E5" fill="#4F46E5" fillOpacity={0.6} />
                  <Tooltip />
                </RadarChart>
              </ResponsiveContainer>
              <div className="mt-4">
                <h4 className="font-semibold text-sm mb-2">Behavioral Suggestions</h4>
                <ul className="list-disc list-inside text-xs text-gray-600">
                  {behavioralAnalysis.suggestionsForImprovingBehavioralTraits.map((suggestion, index) => (
                    <li key={index}>{suggestion}
                    <Separator />
                    </li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Key Insights */}
          <Card className="h-fit lg:row-span-2">
            <CardHeader className="flex items-center justify-between">
              <CardTitle className="text-lg">Key Insights</CardTitle>
              <Lightbulb className="w-6 h-6 text-yellow-600" />
            </CardHeader>
            <CardContent>
              <ul className="list-disc list-inside space-y-2 text-sm">
                {overallImprovementSuggestions.map((suggestion, index) => (
                  <li key={index}>{suggestion}
                  <Separator />
                  </li>
                 
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Final Suggestions */}
        <Card className="col-span-1 md:col-span-3 mt-4">
          <CardHeader className="flex items-center justify-between">
            <CardTitle className="text-lg">Final Suggestions</CardTitle>
            <Target className="w-6 h-6 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
              <h3 className="font-semibold flex items-center gap-2">
              <Book className="h-5 w-5 text-primary" />
              Personalized Learning Path
            </h3>
              
                <p className="text-sm text-gray-600">{finalSuggestions.personalizedLearningPath}</p>
              </div>
              <Separator />
              <div>
              <h3 className="font-semibold flex items-center gap-2">
              <Clock className="h-5 w-5 text-primary" />
              Mock Interview Frequency
            </h3>
                <p className="text-sm text-gray-600">{finalSuggestions.mockInterviewFrequency}</p>
              </div>
              <Separator />
              <div>
              <h3 className="font-semibold flex items-center gap-2">
              <Briefcase className="h-5 w-5 text-primary" />
              Suitable Job Roles
            </h3>
                <p className="text-sm text-gray-600">{finalSuggestions.suitableJobRoles}</p>
              </div>
              
              <button className="w-full md:w-auto bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded transition duration-300 ease-in-out">
                Schedule Next Interview
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  </div>
  )
}