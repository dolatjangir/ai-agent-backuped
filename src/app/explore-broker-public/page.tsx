import React from 'react'
import ExploreBrokersPage from './clientExplorePublic'
import { generateSEOMetadata } from '../../../lib/seometadata';


export const generateMetadata = generateSEOMetadata;
export default function page() {
  return <ExploreBrokersPage/>
}
