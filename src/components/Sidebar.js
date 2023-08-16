import React, { useState } from 'react';
import { Sidebar as ProSidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Alert } from 'react-bootstrap';

function Sidebar() {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const { currentUser, logout } = useAuth();

  async function handleLogout() {
    setError("");

    try {
      await logout();
      navigate("/login");
    } catch (error) {
      // Handle any errors during logout
      setError('An error occurred during logout. Please try again.');
    }
  }

  function profileLink() {
    navigate('/profile');
  }

  function dashboardLink() {
    navigate('/');
  }

  function databaseLink() {
    navigate('/inventory');
  }

  return (
    <>
    <ProSidebar>
      <Menu>
        <MenuItem disabled style={{ color: 'black' }}>
          <h2 className='mt-2'>Informatik-AG</h2>
        </MenuItem>
        <MenuItem onClick={dashboardLink}> Dashboard </MenuItem>
        <MenuItem onClick={databaseLink}> Inventory </MenuItem>
        <div style={{ position: 'absolute', bottom: '0', left: '0', right: '0' }}>
          <SubMenu
            label={
              <div>
                {currentUser.displayName ? (
                  <button style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
                    {currentUser.displayName}
                  </button>
                ) : (
                  <button style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
                    {currentUser.email}
                  </button>
                )}
              </div>
            }
            style={{ marginTop: '100%' }}
          >
            <MenuItem onClick={profileLink}> My Profile </MenuItem>
            <MenuItem onClick={handleLogout}> Log Out </MenuItem>
          </SubMenu>
        </div>
      </Menu>
    </ProSidebar>
    <div style={{ padding: 10 }}>{error && <Alert variant='danger'>{error}</Alert>}</div>
    </>
  )
}

export default Sidebar;
