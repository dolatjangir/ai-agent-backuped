import React from 'react'
import AIEngagementPage from './clientAiCustomerEngage'
import { generateSEOMetadata } from '../../../../lib/seometadata';


export const generateMetadata = generateSEOMetadata;

export default function page() {
  return <AIEngagementPage/>
}
