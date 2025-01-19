

import { Link } from 'react-router-dom';
import { ExapLogo } from './Logo';

const Footer = () => {
  return (

    <footer className='bg-primary py-12' >
         <div className="container mx-auto text-white flex justify-between">
          {/* Logo */}
          <Link to="/">
           <ExapLogo/>
          </Link>
          Copyright &copy; 2025. All rights reserved
         </div>
    </footer>
  )
};

export default Footer;
