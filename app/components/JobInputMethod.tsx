import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Loader2, Search } from 'lucide-react';

interface JobInputMethodProps {
  activeInputMethod: 'url' | 'paste' | null;
  setActiveInputMethod: (method: 'url' | 'paste' | null) => void;
  url: string;
  setUrl: (url: string) => void;
  pastedJobDescription: string;
  setPastedJobDescription: (description: string) => void;
  handleScrapeJobs: () => void;
  isScrapingJobs: boolean;
  scrapeError: string | null;
}

export const JobInputMethod: React.FC<JobInputMethodProps> = ({
  activeInputMethod,
  setActiveInputMethod,
  url,
  setUrl,
  pastedJobDescription,
  setPastedJobDescription,
  handleScrapeJobs,
  isScrapingJobs,
  scrapeError,
}) => (
  <>
    <Card className='mb-8 bg-gray-50 shadow-lg rounded-xl'>
      <CardHeader>
        <CardTitle className='text-3xl font-bold text-gray-900'>
          Job Input Method
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className='flex space-x-4'>
          <Button
            onClick={() => setActiveInputMethod('url')}
            className={`flex-1 ${
              activeInputMethod === 'url'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200'
            }`}
          >
            Enter URL
          </Button>
          <Button
            onClick={() => setActiveInputMethod('paste')}
            className={`flex-1 ${
              activeInputMethod === 'paste'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200'
            }`}
          >
            Paste Job Description
          </Button>
        </div>
      </CardContent>
    </Card>

    {activeInputMethod === 'url' && (
      <Card className='mb-8 bg-gray-50 shadow-lg rounded-xl'>
        <CardHeader>
          <CardTitle className='text-3xl font-bold text-gray-900'>
            Intelligent Job Finder
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className='flex space-x-2'>
            <Input
              type='text'
              placeholder="Enter company's career page URL"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className='flex-grow bg-white bg-opacity-50 border-gray-300 text-gray-800 placeholder-gray-500'
            />
            <Button
              onClick={handleScrapeJobs}
              disabled={isScrapingJobs || !url.trim()}
              className='bg-blue-600 hover:bg-blue-700 text-white'
            >
              {isScrapingJobs ? (
                <>
                  <Loader2 className='mr-2 h-5 w-5 animate-spin' />
                  Finding...
                </>
              ) : (
                <>
                  <Search className='mr-2 h-5 w-5' />
                  Submit
                </>
              )}
            </Button>
          </div>
          {scrapeError && <p className='text-red-600 mt-2'>{scrapeError}</p>}
        </CardContent>
      </Card>
    )}

    {activeInputMethod === 'paste' && (
      <Card className='mb-8 bg-gray-50 shadow-lg rounded-xl'>
        <CardHeader>
          <CardTitle className='text-3xl font-bold text-gray-900'>
            Paste Job Description
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Textarea
            placeholder='Paste the job description here...'
            value={pastedJobDescription}
            onChange={(e) => setPastedJobDescription(e.target.value)}
            className='w-full h-40 bg-white bg-opacity-50 border-gray-300 text-gray-800 placeholder-gray-500'
          />
        </CardContent>
      </Card>
    )}
  </>
);
