

import { Link } from 'react-router-dom';
import { ExapLogo } from './Logo';

const Footer = () => {
  return (

    <footer className='bg-primary py-12 ' >
         <div className="container mx-auto text-white flex-col lg:flex-row gap-4 justify-between">
          {/* Logo */}
          <Link to="/" className='mb-4'>
           <ExapLogo/>
          </Link>
          Copyright &copy; 2025. All rights reserved
         </div>
    </footer>
  )
};

export default Footer;
