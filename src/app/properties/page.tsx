



import { generateSEOMetadata } from '../../../lib/seometadata';
import PropertiesPage from './clientProperties';



export const generateMetadata = generateSEOMetadata;
export default function clientProperties() {
  return <PropertiesPage/>
}
