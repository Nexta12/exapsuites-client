

import { Link } from 'react-router-dom';
import { ExapLogo } from './Logo';

const Footer = () => {
  return (

    <footer className='bg-primary py-12 relative ' >
         <div className="container mx-auto text-white flex-col lg:flex-row gap-4 justify-between">
          {/* Logo */}
          <Link to="/" className='mb-4'>
           <ExapLogo/>
          </Link>
         </div>
         <div className="w-full text-center text-white absolute bottom-0">
         <span className='text-xs'>Copyright &copy; {new Date().getFullYear()}. All rights reserved</span>

         </div>
    </footer>
  )
};

export default Footer;
