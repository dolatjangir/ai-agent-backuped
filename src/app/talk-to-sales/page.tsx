import React from 'react'
import TalkToSalesPage from './clientTalkToSales'
import { generateSEOMetadata } from '../../../lib/seometadata';

export const generateMetadata = generateSEOMetadata;

export default function page() {
  return <TalkToSalesPage/>
}
