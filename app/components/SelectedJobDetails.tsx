import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { JobListing } from '../types';

interface SelectedJobDetailsProps {
  selectedJob: JobListing;
  addToComparison: (job: JobListing) => void;
  jobsToCompare: JobListing[];
}

export const SelectedJobDetails: React.FC<SelectedJobDetailsProps> = ({
  selectedJob,
  addToComparison,
  jobsToCompare,
}) => (
  <Card className='mb-8 bg-gray-50 shadow-lg rounded-xl'>
    <CardHeader>
      <CardTitle className='text-3xl font-bold text-gray-900'>
        {selectedJob.Title}
      </CardTitle>
    </CardHeader>
    <CardContent>
      <div className='space-y-3 text-gray-900'>
        <p>
          <strong>Company:</strong> {selectedJob.Company}
        </p>
        <p>
          <strong>Location:</strong> {selectedJob.Location}
        </p>
        <p>
          <strong>Employment Type:</strong> {selectedJob['Employment Type']}
        </p>
        <p>
          <strong>Experience:</strong> {selectedJob.Experience}
        </p>
        <p>
          <strong>Skills:</strong> {selectedJob.Skills}
        </p>
        <p>
          <strong>Description:</strong> {selectedJob.Description}
        </p>
        <div>
          <strong>Responsibilities:</strong>
          <ul className='list-disc pl-5 mt-2 space-y-1'>
            {selectedJob.Responsibilities.map((resp, index) => (
              <li key={index}>{resp}</li>
            ))}
          </ul>
        </div>
      </div>
      <Button
        variant='outline'
        size='sm'
        onClick={() => addToComparison(selectedJob)}
        disabled={jobsToCompare.length >= 2}
        className='mt-4 text-black border-white border-opacity-50 hover:bg-white hover:bg-opacity-10'
      >
        <Plus className='h-4 w-4 mr-1 text-black' />
        Add to Comparison
      </Button>
    </CardContent>
  </Card>
);
