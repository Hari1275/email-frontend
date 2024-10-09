import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Loader2, Check, Copy } from 'lucide-react';
import { JobListing } from '../types';

interface EmailGeneratorProps {
  selectedJob: JobListing | null;
  pastedJobDescription: string;
  emailType: string;
  setEmailType: (type: string) => void;
  handleGenerateEmail: () => void;
  isGeneratingEmail: boolean;
  emailGenerationError: string | null;
  generatedEmail: string;
  handleCopyEmail: () => void;
  isCopied: boolean;
}

export const EmailGenerator: React.FC<EmailGeneratorProps> = ({
  selectedJob,
  pastedJobDescription,
  emailType,
  setEmailType,
  handleGenerateEmail,
  isGeneratingEmail,
  emailGenerationError,
  generatedEmail,
  handleCopyEmail,
  isCopied,
}) => (
  <Card className='mb-8 bg-gray-50 shadow-lg rounded-xl'>
    <CardHeader>
      <CardTitle className='text-3xl font-bold text-gray-900'>
        Generate Email for:{' '}
        {selectedJob ? selectedJob.Title : 'Pasted Job Description'}
      </CardTitle>
    </CardHeader>
    <CardContent>
      <div className='space-y-4'>
        <Select
          value={emailType}
          onValueChange={(value) => setEmailType(value)}
        >
          <SelectTrigger className='w-full bg-white bg-opacity-50 border-gray-300 text-gray-800'>
            <SelectValue placeholder='Select email type' />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value='job_application'>Job Application</SelectItem>
            {/* <SelectItem value='business_outreach'>Business Outreach</SelectItem> */}
          </SelectContent>
        </Select>
        <Button
          onClick={handleGenerateEmail}
          disabled={
            isGeneratingEmail || (!selectedJob && !pastedJobDescription)
          }
          className='w-full bg-blue-600 hover:bg-blue-700 text-white'
        >
          {isGeneratingEmail ? (
            <>
              <Loader2 className='mr-2 h-5 w-5 animate-spin' />
              Generating Email...
            </>
          ) : (
            <>
              <span className='mr-2'>✉️</span>
              Generate Email
            </>
          )}
        </Button>
        {emailGenerationError && (
          <p className='text-red-600 mt-2'>{emailGenerationError}</p>
        )}
      </div>
      {generatedEmail && (
        <motion.div
          className='mt-6'
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className='flex justify-between items-center mb-2'>
            <h3 className='text-xl font-semibold text-gray-900'>
              Generated Email:
            </h3>
            <Button
              onClick={handleCopyEmail}
              variant='outline'
              size='sm'
              className='text-black border-white border-opacity-50 hover:bg-white hover:bg-opacity-10'
            >
              {isCopied ? (
                <>
                  <Check className='mr-2 h-4 w-4' />
                  Copied!
                </>
              ) : (
                <>
                  <Copy className='mr-2 h-4 w-4' />
                  Copy
                </>
              )}
            </Button>
          </div>
          <div className='bg-white p-4 rounded-lg shadow-inner mt-2 whitespace-pre-wrap font-mono text-sm overflow-auto max-h-96 text-gray-900'>
            {generatedEmail.split('\n').map((line, index) => (
              <React.Fragment key={index}>
                {line}
                <br />
              </React.Fragment>
            ))}
          </div>
        </motion.div>
      )}
    </CardContent>
  </Card>
);
