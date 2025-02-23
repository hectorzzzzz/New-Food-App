//file to create navigation bar

'use client'

import Link from 'next/link';
import React from 'react';
import { protectedRoutes } from '@/routes';
import { Container, Nav, Navbar } from 'react-bootstrap';

export default function Navigation() {
  return (
    <Navbar
      expand='xl'
      collapseOnSelect
      className='navbar navbar-vertical fixed-start navbar-light'>
      <Container fluid>
        <Navbar.Toggle
          style={{ width: '100%' }}
          data-bs-target='#sidebarCollapse'
          aria-controls='sidebarCollapse'
          data-bs-toggle='collapse'
        />
        <div
          className='navbar-collapse collapse'
          id='sidebarCollapse'>
          {protectedRoutes.map((route, index) => {
            if (route.hidden) {
              return <React.Fragment key={index}></React.Fragment>;
            }
            return (
              <ul
                className='navbar-nav'
                key={`${route.name}-${index}`}>
                <li className='nav-item'>
                  {route.children ? (
                    // With Children
                    <Nav.Link
                      className='nav-link-after'
                      href={`#sidebar${index}`}
                      data-bs-toggle='collapse'
                      role='button'
                      aria-expanded='false'
                      aria-controls={`sidebar${index}`}>
                      {route.icon ?? <></>}
                      {route.name}
                    </Nav.Link>
                  ) : (
                    // Without Children
                    <Link
                      className='nav-link'
                      href={route.path}>
                      {route.icon ?? <></>}
                      {route.name}
                    </Link>
                  )}
                  {/* Childrens */}
                  <div
                    className='collapse'
                    id={`sidebar${index}`}>
                    <ul className='nav nav-sm flex-column'>
                      {[route, ...(route.children || [])].map((child) => {
                        return (
                          <li
                            className='nav-item'
                            key={child.path}>
                            <Link
                              className='nav-link'
                              href={child.path}>
                              {child.name}
                            </Link>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </li>
              </ul>
            );
          })}
        </div>
      </Container>
    </Navbar>
  );
}