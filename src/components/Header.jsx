import { useEffect, useState } from "react"
import { Link } from "react-router-dom";
import { paths } from "@routes/paths";
import { ExapLogo } from "./Logo";




const Header = () => {
  const [header, setHeader] = useState(false);

  useEffect(()=>{
    window.addEventListener('scroll', ()=>{
      window.scrollY > 50 ? setHeader(true) : setHeader(false)
    })
  },[])

  return (
    <header className={`${header ? 'bg-white py-6 shadow-lg' : 'bg-transparent py-8'} fixed z-50 w-full transition-all duration-500 `} >
      <div className="container mx-auto flex flex-col items-center gap-y-6 lg:flex-row lg:justify-between lg:gap-y-0">
        {/* Logo */}
        <Link to="/">
           {header ? <ExapLogo/> : <ExapLogo spanClass="text-white " TitleClass="text-yellow-500" /> }
        </Link>
        {/* nav */}
        <nav className={`${header ? 'text-primary' : 'text-white'} flex gap-x-4 font-tertiary tracking-[3px] text-[15px] items-center uppercase lg:gap-x-8`} >
          <Link to={paths.Index} className="hover:text-accent transition" >Home</Link>
          <Link to={paths.Rooms} className="hover:text-accent transition" >Rooms</Link>
          <Link to={paths.Contact} className="hover:text-accent transition" >Contacts</Link>
          <Link to={paths.Login} className="hover:text-accent transition" >Login</Link>
        </nav>
      </div>
    </header>
  )
}

export default Header