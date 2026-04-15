import React from 'react'
import BookDemoPage from './clientBookDemo'
import { generateSEOMetadata } from '../../../lib/seometadata';



export const generateMetadata = generateSEOMetadata;


export default function page() {
  return <BookDemoPage/>
}
