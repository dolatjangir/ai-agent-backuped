import React from 'react'
import SmartCommunicationPage from './clientConversationalAI'
import { generateSEOMetadata } from '../../../../lib/seometadata';

export const generateMetadata = generateSEOMetadata;

export default function page() {
  return <SmartCommunicationPage/>
}
