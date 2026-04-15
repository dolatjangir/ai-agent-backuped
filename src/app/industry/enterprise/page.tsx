
import { generateSEOMetadata } from '../../../../lib/seometadata';
import EnterpriseLanding from './clientEnterprise'

export const generateMetadata = generateSEOMetadata;

export default function page() {
  return <EnterpriseLanding/>
}
