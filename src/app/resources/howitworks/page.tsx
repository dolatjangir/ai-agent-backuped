
import HowItWorksPage from '@/components/howitworks/howItWorks'
import { generateSEOMetadata } from '../../../../lib/seometadata';


export const generateMetadata = generateSEOMetadata;

function page() {
  return <HowItWorksPage/>
  
}

export default page
