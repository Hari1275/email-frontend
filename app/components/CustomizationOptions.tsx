import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';

interface CustomizationOptionsProps {
  emailTone: string;
  setEmailTone: (value: string) => void;
  emailLength: string;
  setEmailLength: (value: string) => void;
  includePortfolio: boolean;
  setIncludePortfolio: (value: boolean) => void;
  includeExperiences: boolean;
  setIncludeExperiences: (value: boolean) => void;
  emphasisPoints: string[];
  setEmphasisPoints: (value: string[]) => void;
}

export const CustomizationOptions: React.FC<CustomizationOptionsProps> = ({
  emailTone,
  setEmailTone,
  emailLength,
  setEmailLength,
  includePortfolio,
  setIncludePortfolio,
  includeExperiences,
  setIncludeExperiences,
  emphasisPoints,
  setEmphasisPoints,
}) => (
  <Card className='mb-8 bg-gray-50 shadow-lg rounded-xl'>
    <CardHeader>
      <CardTitle className='text-3xl font-bold text-gray-900'>
        Email Customization
      </CardTitle>
    </CardHeader>
    <CardContent>
      <div className='space-y-6'>
        <div className='grid grid-cols-2 gap-4'>
          <div>
            <label className='block text-sm font-medium text-gray-700 mb-1'>
              Tone:
            </label>
            <Select value={emailTone} onValueChange={setEmailTone}>
              <SelectTrigger className='w-full'>
                <SelectValue placeholder='Select tone' />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='professional'>Professional</SelectItem>
                <SelectItem value='friendly'>Friendly</SelectItem>
                <SelectItem value='enthusiastic'>Enthusiastic</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <label className='block text-sm font-medium text-gray-700 mb-1'>
              Length:
            </label>
            <Select value={emailLength} onValueChange={setEmailLength}>
              <SelectTrigger className='w-full'>
                <SelectValue placeholder='Select length' />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='short'>Short</SelectItem>
                <SelectItem value='medium'>Medium</SelectItem>
                <SelectItem value='long'>Long</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className='flex space-x-4'>
          <label className='flex items-center space-x-2 cursor-pointer'>
            <input
              type='checkbox'
              checked={includePortfolio}
              onChange={(e) => setIncludePortfolio(e.target.checked)}
              className='form-checkbox h-5 w-5 text-blue-600'
            />
            <span className='text-gray-700'>Include Portfolio Links</span>
          </label>
          <label className='flex items-center space-x-2 cursor-pointer'>
            <input
              type='checkbox'
              checked={includeExperiences}
              onChange={(e) => setIncludeExperiences(e.target.checked)}
              className='form-checkbox h-5 w-5 text-blue-600'
            />
            <span className='text-gray-700'>Include Specific Experiences</span>
          </label>
        </div>
        <div>
          <label className='block text-sm font-medium text-gray-700 mb-1'>
            Emphasis Points:
          </label>
          <Input
            placeholder='Enter emphasis points (comma-separated)'
            value={emphasisPoints.join(', ')}
            onChange={(e) =>
              setEmphasisPoints(
                e.target.value.split(',').map((point) => point.trim())
              )
            }
            className='w-full'
          />
        </div>
      </div>
    </CardContent>
  </Card>
);
