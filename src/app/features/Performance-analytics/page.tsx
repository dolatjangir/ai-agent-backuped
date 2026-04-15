import React from 'react'
import AnalyticsInsightsPage from './clientPerformance'

import { generateSEOMetadata } from '../../../../lib/seometadata';

export const generateMetadata = generateSEOMetadata;

export default function page() {
  return <AnalyticsInsightsPage/>
}
