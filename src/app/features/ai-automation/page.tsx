import React from 'react'
import AIAutomationPage from './clientAIAutomation'
import { generateSEOMetadata } from '../../../../lib/seometadata';


export const generateMetadata = generateSEOMetadata;

export default function page() {
  return <AIAutomationPage/>
}
