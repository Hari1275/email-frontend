'use client';

import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { motion } from 'framer-motion';
import DashboardLayout from './components/DashboardLayout';
import { CustomizationOptions } from './components/CustomizationOptions';
import { SavedJobsTab } from './components/SavedJobsTab';
import { JobComparison } from './components/JobComparison';
import { JobInputMethod } from './components/JobInputMethod';
import { JobListingsTab } from './components/JobListingsTab';
import { SelectedJobDetails } from './components/SelectedJobDetails';
import { EmailGenerator } from './components/EmailGenerator';
import { JobListing } from './types';
import copy from 'clipboard-copy';

export default function Home() {
  const [url, setUrl] = useState('');
  const [jobListings, setJobListings] = useState<JobListing[]>([]);
  const [selectedJob, setSelectedJob] = useState<JobListing | null>(null);
  const [generatedEmail, setGeneratedEmail] = useState('');
  const [emailType, setEmailType] = useState('job_application');
  const [isScrapingJobs, setIsScrapingJobs] = useState(false);
  const [isGeneratingEmail, setIsGeneratingEmail] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  // State variables for customization options
  const [emailTone, setEmailTone] = useState('professional');
  const [emailLength, setEmailLength] = useState('medium');
  const [includePortfolio, setIncludePortfolio] = useState(true);
  const [includeExperiences, setIncludeExperiences] = useState(true);
  const [emphasisPoints, setEmphasisPoints] = useState<string[]>([]);

  // State for saved jobs
  const [savedJobs, setSavedJobs] = useState<JobListing[]>([]);
  const [jobsToCompare, setJobsToCompare] = useState<JobListing[]>([]);

  const [scrapeError, setScrapeError] = useState<string | null>(null);
  const [emailGenerationError, setEmailGenerationError] = useState<
    string | null
  >(null);

  // State for pasted job description
  const [pastedJobDescription, setPastedJobDescription] = useState('');

  // State to track the active input method
  const [activeInputMethod, setActiveInputMethod] = useState<
    'url' | 'paste' | null
  >(null);

  const handleScrapeJobs = async () => {
    setActiveInputMethod('url');
    setIsScrapingJobs(true);
    setScrapeError(null);
    try {
      const response = await fetch('http://localhost:9000/scrape_job', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url }),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      console.log('Scraped job data:', data);
      setJobListings(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Error scraping jobs:', error);
      setScrapeError(
        'Failed to scrape jobs. Please check the URL and try again.'
      );
      setJobListings([]);
    } finally {
      setIsScrapingJobs(false);
    }
  };

  const handleGenerateEmail = async () => {
    if (!selectedJob && !pastedJobDescription) return;
    setIsGeneratingEmail(true);
    setEmailGenerationError(null);
    try {
      const response = await fetch('http://localhost:9000/generate_email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          job_description: selectedJob
            ? JSON.stringify(selectedJob)
            : pastedJobDescription,
          template_name: emailType,
          email_tone: emailTone,
          email_length: emailLength,
          include_portfolio: includePortfolio,
          include_experiences: includeExperiences,
          emphasis_points: emphasisPoints,
        }),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setGeneratedEmail(data.email);
    } catch (error) {
      console.error('Error generating email:', error);
      setEmailGenerationError('Failed to generate email. Please try again.');
      setGeneratedEmail('');
    } finally {
      setIsGeneratingEmail(false);
    }
  };

  const handleCopyEmail = async () => {
    if (generatedEmail) {
      await copy(generatedEmail);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    }
  };

  const handleSaveJob = (job: JobListing) => {
    setSavedJobs((prevSavedJobs) => {
      if (!prevSavedJobs.some((savedJob) => savedJob.Title === job.Title)) {
        return [...prevSavedJobs, job];
      }
      return prevSavedJobs;
    });
  };

  const handleRemoveSavedJob = (job: JobListing) => {
    setSavedJobs((prevSavedJobs) =>
      prevSavedJobs.filter((savedJob) => savedJob.Title !== job.Title)
    );
  };

  const addToComparison = (job: JobListing) => {
    if (jobsToCompare.length < 2) {
      setJobsToCompare([...jobsToCompare, job]);
    }
  };

  const removeFromComparison = (job: JobListing) => {
    setJobsToCompare(jobsToCompare.filter((j) => j.Title !== job.Title));
  };

  return (
    <DashboardLayout>
      <div className='max-w-7xl mx-auto font-sans'>
        <h1 className='text-3xl font-bold mb-8 text-gray-900'>
          AI-Powered Outreach Email Generator
        </h1>

        <JobInputMethod
          activeInputMethod={activeInputMethod}
          setActiveInputMethod={setActiveInputMethod}
          url={url}
          setUrl={setUrl}
          pastedJobDescription={pastedJobDescription}
          setPastedJobDescription={setPastedJobDescription}
          handleScrapeJobs={handleScrapeJobs}
          isScrapingJobs={isScrapingJobs}
          scrapeError={scrapeError}
        />

        <Tabs defaultValue='jobListings' className='mb-8'>
          <TabsList className='bg-gray-100 rounded-xl p-1 shadow-sm border border-gray-200'>
            <TabsTrigger
              value='jobListings'
              className='px-4 py-2 text-sm font-medium text-gray-700 rounded-lg data-[state=active]:bg-white data-[state=active]:text-blue-600 data-[state=active]:shadow-sm hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200'
            >
              Job Listings
            </TabsTrigger>
            <TabsTrigger
              value='savedJobs'
              className='px-4 py-2 text-sm font-medium text-gray-700 rounded-lg data-[state=active]:bg-white data-[state=active]:text-blue-600 data-[state=active]:shadow-sm hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200'
            >
              Saved Jobs
            </TabsTrigger>
          </TabsList>
          <TabsContent value='jobListings' className='mt-4'>
            <JobListingsTab
              jobListings={jobListings}
              setSelectedJob={setSelectedJob}
              handleSaveJob={handleSaveJob}
            />
          </TabsContent>
          <TabsContent value='savedJobs' className='mt-4'>
            <SavedJobsTab
              savedJobs={savedJobs}
              setSelectedJob={setSelectedJob}
              handleRemoveSavedJob={handleRemoveSavedJob}
            />
          </TabsContent>
        </Tabs>

        <JobComparison
          jobsToCompare={jobsToCompare}
          removeFromComparison={removeFromComparison}
        />

        {(selectedJob || pastedJobDescription) && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className='text-gray-800'
          >
            {selectedJob && (
              <SelectedJobDetails
                selectedJob={selectedJob}
                addToComparison={addToComparison}
                jobsToCompare={jobsToCompare}
              />
            )}

            <CustomizationOptions
              emailTone={emailTone}
              setEmailTone={setEmailTone}
              emailLength={emailLength}
              setEmailLength={setEmailLength}
              includePortfolio={includePortfolio}
              setIncludePortfolio={setIncludePortfolio}
              includeExperiences={includeExperiences}
              setIncludeExperiences={setIncludeExperiences}
              emphasisPoints={emphasisPoints}
              setEmphasisPoints={setEmphasisPoints}
            />

            <EmailGenerator
              selectedJob={selectedJob}
              pastedJobDescription={pastedJobDescription}
              emailType={emailType}
              setEmailType={setEmailType}
              handleGenerateEmail={handleGenerateEmail}
              isGeneratingEmail={isGeneratingEmail}
              emailGenerationError={emailGenerationError}
              generatedEmail={generatedEmail}
              handleCopyEmail={handleCopyEmail}
              isCopied={isCopied}
            />
          </motion.div>
        )}
      </div>
    </DashboardLayout>
  );
}
