import React from 'react'
import ExploreFeaturesPage from './clientExploreFeature'
import { generateSEOMetadata } from '../../../lib/seometadata';


export const generateMetadata = generateSEOMetadata;

export default function page() {
  return <ExploreFeaturesPage/>
}
