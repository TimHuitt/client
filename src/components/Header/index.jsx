import { Link } from 'react-router-dom'
import './Header.css'
import '../../index.css'

const headerImage =
  "https://media.istockphoto.com/photos/group-portrait-of-a-creative-business-team-standing-outdoors-three-picture-id1146473249?b=1&k=20&m=1146473249&s=612x612&w=0&h=-q1guVCuei7X3BFKwWC2bLUOX8BeIaC04pG5s_xfn_c=";
const brandImage = "https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png";

const Nav = () => {
  return (
    <nav className='Nav'>
      {/* {link component} */}
      <Link to="/"><img src={brandImage} /></Link>
      {/* {img -> clickable} */}
      <div className='text-amber-900'>People App</div>
    </nav>
  )
}

const Header = ({ heroImage }) => {
  return (
    <header style={{height: "360px", overflow: "hidden"}}>
      <Nav />
      <img style={{width: "100%"}} src={heroImage || headerImage} />
    </header>
  );
};

export default Header;