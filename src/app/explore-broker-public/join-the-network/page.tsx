import React from 'react'
import JoinNetworkPage from './clientnetwork'
import { generateSEOMetadata } from '../../../../lib/seometadata';


export const generateMetadata = generateSEOMetadata;
export default function page() {
  return <JoinNetworkPage/>
}
