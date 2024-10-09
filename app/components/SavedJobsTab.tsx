import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Trash2 } from 'lucide-react';
import { JobListing } from '../types';

interface SavedJobsTabProps {
  savedJobs: JobListing[];
  setSelectedJob: (job: JobListing) => void;
  handleRemoveSavedJob: (job: JobListing) => void;
}

export const SavedJobsTab: React.FC<SavedJobsTabProps> = ({
  savedJobs,
  setSelectedJob,
  handleRemoveSavedJob,
}) => (
  <Card className='mb-8 bg-gray-50 shadow-lg rounded-xl'>
    <CardHeader>
      <CardTitle className='text-3xl font-bold text-gray-900'>
        Saved Job Listings
      </CardTitle>
    </CardHeader>
    <CardContent>
      {savedJobs.length === 0 ? (
        <p className='text-gray-600'>No saved jobs yet.</p>
      ) : (
        <ul className='space-y-3'>
          {savedJobs.map((job, index) => (
            <motion.li
              key={index}
              className='flex justify-between items-center bg-white p-3 rounded-lg shadow'
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.3 }}
            >
              <Button
                variant='ghost'
                onClick={() => setSelectedJob(job)}
                className='text-left text-gray-800'
              >
                <span className='font-medium'>{job.Title}</span>
                <span className='text-sm text-gray-500 block'>
                  {job.Company}
                </span>
              </Button>
              <Button
                variant='ghost'
                size='icon'
                onClick={() => handleRemoveSavedJob(job)}
                className='text-red-500 hover:text-red-700'
              >
                <Trash2 className='h-5 w-5' />
              </Button>
            </motion.li>
          ))}
        </ul>
      )}
    </CardContent>
  </Card>
);
