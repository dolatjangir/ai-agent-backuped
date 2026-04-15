import React from 'react'
import ExploreAgentsPage from './clientExplore'
import { generateSEOMetadata } from '../../../lib/seometadata';



export const generateMetadata = generateSEOMetadata;


export default function page() {
  return <ExploreAgentsPage/>
}
