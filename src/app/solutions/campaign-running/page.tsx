import React from 'react'
import AICampaignPage from './clientCampaign'
import { generateSEOMetadata } from '../../../../lib/seometadata';

export const generateMetadata = generateSEOMetadata;

export default function page() {
  return <AICampaignPage/>
}
