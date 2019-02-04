import React from 'react';
import PropTypes from 'prop-types';
import Menu from '@material-ui/core/Menu';
import SearchBar from 'components/SearchBar';
import Avatar from '@material-ui/core/Avatar';
import AppBar from '@material-ui/core/AppBar';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import MenuItem from '@material-ui/core/MenuItem';
import SearchIcon from '@material-ui/icons/Search';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import { withStyles } from '@material-ui/core/styles';

import SideDrawer from 'components/Drawer';
import { signOut } from 'helpers/auth_helper';

import styles from './styles';

class NavBar extends React.Component {
  static propTypes = {
    user: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired,
    courses: PropTypes.arrayOf(PropTypes.object)
  };

  state = {
    anchorEl: null,
    openDrawer: false
  };

  handleMenu = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  handleDrawer = () => {
    this.setState({ openDrawer: !this.state.openDrawer });
  };

  handleSignOut = async () => {
    await signOut();
    this.handleClose();
  };

  renderAuthBar = (open, anchorEl, user) => (
    <div>
      <IconButton
        aria-owns={open ? 'menu-appbar' : undefined}
        aria-haspopup="true"
        onClick={this.handleMenu}
        color="inherit"
      >
        <Avatar alt={user.displayName} src={user.photoURL} />
      </IconButton>
      <Menu
        id="menu-appbar"
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
        open={open}
        onClose={this.handleClose}
      >
        <MenuItem onClick={this.handleClose}>Profile</MenuItem>
        <MenuItem onClick={this.handleSignOut}>Sign Out</MenuItem>
      </Menu>
    </div>
  );

  render() {
    const { anchorEl, openDrawer } = this.state;
    const { user, courses, classes } = this.props;
    const open = Boolean(anchorEl);

    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              className={classes.menuButton}
              color="inherit"
              aria-label="Menu"
              onClick={() => this.handleDrawer()}
            >
              <MenuIcon />
            </IconButton>
            <Typography className={classes.title} variant="h6" color="inherit" noWrap>
              VIEW
            </Typography>
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <SearchBar courses={courses} />
            </div>
            <div className={classes.grow} />
            {this.renderAuthBar(open, anchorEl, user)}
          </Toolbar>
        </AppBar>
        <SideDrawer open={openDrawer} toggleDrawer={this.handleDrawer} />
      </div>
    );
  }
}

export default withStyles(styles)(NavBar);
