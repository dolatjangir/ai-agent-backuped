import { generateSEOMetadata } from '../../../lib/seometadata';
import FreeTrialPage from './clientStartFreeTrial'


export const generateMetadata = generateSEOMetadata;

export default function page() {
  return <FreeTrialPage/>
}
