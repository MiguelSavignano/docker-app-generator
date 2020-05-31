import React from 'react';
import AppModes from './config';
import { useStateValue, initializeFormData } from './state';

const modeLinks = [
  {
    name: 'rails',
    label: 'Rails',
  },
  {
    name: 'react-create-app',
    label: 'React',
  },
];

export const Navbar = () => {
  const [, dispatch] = useStateValue();
  return (
    <nav
      className="navbar is-fixed-top is-link"
      role="navigation"
      aria-label="main navigation"
    >
      <div className="navbar-brand">
        <a className="navbar-item" href="https://bulma.io">
          <img
            src="https://1067ec1jtn84131jsj2jmuv3-wpengine.netdna-ssl.com/wp-content/uploads/2017/11/icons-docker-lrg.png"
            width={50}
            height={50}
          />
        </a>
        <a
          role="button"
          className="navbar-burger burger"
          aria-label="menu"
          aria-expanded="false"
          data-target="navbarBasicExample"
        >
          <span aria-hidden="true" />
          <span aria-hidden="true" />
          <span aria-hidden="true" />
        </a>
      </div>
      <div id="navbarBasicExample" className="navbar-menu">
        <div className="navbar-start">
          {modeLinks.map(({ name, label }) => (
            <a
              className="navbar-item"
              onClick={() => {
                const form = initializeFormData(AppModes[name]);
                dispatch({ form, appMode: AppModes[name] });
              }}
            >
              {label}
            </a>
          ))}
        </div>
        <div className="navbar-end">
          <div className="navbar-item">
            <a
              class="github-fork-ribbon"
              href="https://github.com/MiguelSavignano"
              data-ribbon="Fork me on GitHub"
              title="Fork me on GitHub"
            >
              Fork me on GitHub
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};
