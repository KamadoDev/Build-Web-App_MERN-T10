import { Link } from 'react-router-dom';
import { RiProductHuntLine } from 'react-icons/ri';
import { FaAngleRight } from 'react-icons/fa';
import { Button } from '@mui/material';

const NavTab = ({ index, activeTab, isToggleSubmenu, setActiveTab, submenus, title }) => {
  return (
    <li>
      <Button
        className={`w-100 py-2 ${activeTab === index ? "active" : ""}`}
        onClick={() => setActiveTab(index)}
      >
        <RiProductHuntLine className="mr-1" />
        <span className="">{title}</span>
        <FaAngleRight
          className={`${activeTab === index && isToggleSubmenu ? "angleIcon" : ""} mr-1 ml-auto size-3`}
        />
      </Button>

      <div
        className={`submenuWrapper ${activeTab === index && isToggleSubmenu ? "colapse" : "colapsed"}`}
      >
        <div className="submenu">
          {submenus.map((submenu, idx) => (
            <Link key={idx} to={submenu.link}>
              <Button className="w-100">{submenu.label}</Button>
            </Link>
          ))}
        </div>
      </div>
    </li>
  );
};

export default NavTab;
