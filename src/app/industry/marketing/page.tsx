import React from 'react'
import MarketingPage from './clientMarketing'
import { generateSEOMetadata } from '../../../../lib/seometadata';

export const generateMetadata = generateSEOMetadata;


export default function page() {
  return <MarketingPage/>
}
