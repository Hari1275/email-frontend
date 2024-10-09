import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Save } from 'lucide-react';
import { JobListing } from '../types';

interface JobListingsTabProps {
  jobListings: JobListing[];
  setSelectedJob: (job: JobListing) => void;
  handleSaveJob: (job: JobListing) => void;
}

export const JobListingsTab: React.FC<JobListingsTabProps> = ({
  jobListings,
  setSelectedJob,
  handleSaveJob,
}) => (
  <AnimatePresence>
    {jobListings.length > 0 ? (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3 }}
      >
        <Card className='mb-8 bg-gray-50 shadow-lg rounded-xl'>
          <CardHeader>
            <CardTitle className='text-3xl font-bold text-gray-900'>
              Job Listings
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className='space-y-3'>
              {jobListings.map((job, index) => (
                <li
                  key={index}
                  className='flex justify-between items-center bg-white p-4 rounded-lg shadow-sm'
                >
                  {job.Title !== 'Not specified' ? (
                    <>
                      <Button
                        variant='ghost'
                        onClick={() => setSelectedJob(job)}
                        className='text-left flex-grow mr-2 text-gray-800 hover:bg-gray-200'
                      >
                        <span className='font-medium'>{job.Title}</span>
                      </Button>
                      <Button
                        variant='ghost'
                        size='icon'
                        onClick={() => handleSaveJob(job)}
                        className='text-white hover:bg-white hover:bg-opacity-10'
                      >
                        <Save className='h-5 w-5 text-black' />
                      </Button>
                    </>
                  ) : (
                    <p className='text-yellow-300'>
                      Unable to retrieve job details
                    </p>
                  )}
                </li>
              ))}
            </ul>
            {jobListings.some((job) => job.Title === 'Not specified') && (
              <p className='text-yellow-300 mt-4'>
                Some job details couldn't be retrieved. Please ensure you're
                providing a direct link to a job details page.
              </p>
            )}
          </CardContent>
        </Card>
      </motion.div>
    ) : (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3 }}
      >
        <Card className='mb-8 bg-gray-50 shadow-lg rounded-xl'>
          <CardContent>
            <p className='text-gray-900 text-center py-4'>
              No job listings found. Please provide a URL that links directly to
              a job details page.
            </p>
          </CardContent>
        </Card>
      </motion.div>
    )}
  </AnimatePresence>
);
