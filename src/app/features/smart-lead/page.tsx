import React from 'react'
import LeadManagementPage from './clientSmartLead'


import { generateSEOMetadata } from '../../../../lib/seometadata';

export const generateMetadata = generateSEOMetadata;


export default function page() {
  return <LeadManagementPage/>
}
