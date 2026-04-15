import React from 'react'
import AISEOContentPage from './clientAIContentSeoSolution'
import { generateSEOMetadata } from '../../../../lib/seometadata';

export const generateMetadata = generateSEOMetadata;

export default function page() {
  return <AISEOContentPage/>
}
