import React from 'react'
import SalesMarketingPage from './clientSalesTeam'
import { generateSEOMetadata } from '../../../../lib/seometadata';

export const generateMetadata = generateSEOMetadata;


export default function page() {
  return <SalesMarketingPage/>
}
