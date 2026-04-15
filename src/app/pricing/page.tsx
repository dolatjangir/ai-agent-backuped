import React from 'react'
import PricingSection from './clientPricing'
import { generateSEOMetadata } from '../../../lib/seometadata';

export const generateMetadata = generateSEOMetadata;

export default function page() {
  return <PricingSection/>
}
