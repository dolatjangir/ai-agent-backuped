import React from 'react'
import MarketingAutomationPage from './clientGrowthAutomation'

import { generateSEOMetadata } from '../../../../lib/seometadata';

export const generateMetadata = generateSEOMetadata;

export default function page() {
  return <MarketingAutomationPage/>
}
