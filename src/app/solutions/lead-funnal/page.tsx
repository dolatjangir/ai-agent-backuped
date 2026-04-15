import React from 'react'
import AILeadFunnelPage from './clientLeadFunnal'
import { generateSEOMetadata } from '../../../../lib/seometadata';

export const generateMetadata = generateSEOMetadata;

export default function page() {
  return <AILeadFunnelPage/>
}
