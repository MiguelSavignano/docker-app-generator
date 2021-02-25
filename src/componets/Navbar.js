/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react';
import classNames from 'classnames';
import AppModes from '../config';
import { useStateValue, initializeFormData } from '../state';
import '../assets/gh-fork-ribbon.css';
import logoImage from '../assets/docker-logo.png';

const Logo = () => (
  <img src={logoImage} alt="docker-logo" width={50} height={50} />
);

const Burger = (props) => (
  <a
    role="button"
    aria-label="menu"
    aria-expanded="false"
    data-target="navbarBasicExample"
    {...props}
  >
    <span aria-hidden="true" />
    <span aria-hidden="true" />
    <span aria-hidden="true" />
  </a>
);

const GithubRibbon = () => (
  <a
    className="github-fork-ribbon is-hidden-touch"
    href="https://github.com/MiguelSavignano/docker-app-generator"
    data-ribbon="Fork me on GitHub"
    title="Fork me on GitHub"
  >
    Fork me on GitHub
  </a>
);

export const Navbar = () => {
  const [{ appMode }, dispatch] = useStateValue();
  const [active, toogleNavbar] = useState(false);
  const [selectedItem, setSelectedItem] = useState(appMode.label);

  const onClickNavbatItem = ({ name, label }) => () => {
    const form = initializeFormData(AppModes[name]);
    setSelectedItem(label);
    dispatch({ form, appMode: AppModes[name] });
  };

  Object.entries(AppModes).forEach(([file, { name, label }]) =>
    console.log('NavbarItems', { name, label }),
  );
  return (
    <nav
      className="navbar is-fixed-top is-link test"
      role="navigation"
      aria-label="main navigation"
    >
      <div className="navbar-brand">
        <a className="navbar-item" href="/">
          <Logo />
        </a>
        <Burger
          className={classNames('navbar-burger burger', {
            'is-active': active,
          })}
          onClick={() => toogleNavbar(!active)}
        />
      </div>
      <div
        id="navbarBasicExample"
        className={classNames('navbar-menu', {
          'is-active': active,
        })}
      >
        <div className="navbar-start">
          {Object.entries(AppModes).map(([file, { name, label }]) => (
            <a
              key={label}
              className={classNames('navbar-item', {
                'is-active': selectedItem === label,
              })}
              onClick={onClickNavbatItem({ name, label })}
            >
              {label}
            </a>
          ))}
        </div>
      </div>
      <div className="navbar-end">
        <div className="navbar-item">
          <GithubRibbon />
        </div>
      </div>
    </nav>
  );
};
