import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { getUser } from '../features/user/userSelectors';

const links = [
  { id: 1, url: '/', text: 'home' },
  { id: 2, url: 'about', text: 'about' },
  { id: 3, url: 'products', text: 'products' },
  { id: 4, url: 'cart', text: 'cart' },
  { id: 5, url: 'checkout', text: 'checkout', protected: true },
  { id: 6, url: 'orders', text: 'orders', protected: true },
];

export const NavLinks = () => {
  const user = useSelector(getUser);

  return (
    <>
      {links.map((link) => {
        if (link.protected && !user) return null;
        return (
          <li key={link.id}>
            <NavLink className='capitalize' to={link.url}>
              {link.text}
            </NavLink>
          </li>
        );
      })}
    </>
  );
};
