
import Header from './clientHeader'
import { generateSEOMetadata } from '../../../lib/seometadata';



export const generateMetadata = generateSEOMetadata;



function page() {
  return <Header/>
}

export default page
