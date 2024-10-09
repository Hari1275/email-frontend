import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Minus } from 'lucide-react';
import { JobListing } from '../types';

interface JobComparisonProps {
  jobsToCompare: JobListing[];
  removeFromComparison: (job: JobListing) => void;
}

export const JobComparison: React.FC<JobComparisonProps> = ({
  jobsToCompare,
  removeFromComparison,
}) => (
  <Card className='mb-8 bg-gray-50 shadow-lg rounded-xl'>
    <CardHeader>
      <CardTitle className='text-3xl font-bold text-gray-900'>
        Job Comparison
      </CardTitle>
    </CardHeader>
    <CardContent>
      {jobsToCompare.length === 0 ? (
        <p className='text-gray-600'>Select jobs to compare (max 2)</p>
      ) : (
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
          {jobsToCompare.map((job, index) => (
            <motion.div
              key={index}
              className='bg-white p-4 rounded-lg shadow'
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
            >
              <h3 className='font-bold text-lg text-gray-800 mb-2'>
                {job.Title}
              </h3>
              <p className='text-gray-700'>
                <strong>Company:</strong> {job.Company}
              </p>
              <p className='text-gray-700'>
                <strong>Location:</strong> {job.Location}
              </p>
              <p className='text-gray-700'>
                <strong>Employment Type:</strong> {job['Employment Type']}
              </p>
              <Button
                variant='ghost'
                size='sm'
                onClick={() => removeFromComparison(job)}
                className='mt-3 text-red-500 hover:text-red-700'
              >
                <Minus className='h-4 w-4 mr-1' />
                Remove
              </Button>
            </motion.div>
          ))}
        </div>
      )}
    </CardContent>
  </Card>
);
