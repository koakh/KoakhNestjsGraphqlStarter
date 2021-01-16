import AppBar from '@material-ui/core/AppBar';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { createStyles, makeStyles, Theme, useTheme } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuIcon from '@material-ui/icons/Menu';
import MoreIcon from '@material-ui/icons/MoreVert';
import React, { useCallback, useEffect, useState } from 'react';
import { Link, Route, Switch, useLocation } from 'react-router-dom';
import useDimensions from 'react-use-dimensions';
import { appConstants as c, setAccessToken } from '../../../app';
import { defaultDrawerListItemIcon, RouteKey, routes } from '../../../app/config';
import { ActionType, useStateValue } from '../../../app/state';
import { usePersonLogoutMutation } from '../../../generated/graphql';
import { DrawerListItem, DrawerSections, RouteItem } from '../../../types';
import { recordToArray } from '../../../utils';

interface ResponsiveDrawerProps {
  title: string;
  categories: DrawerListItem[];
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
    },
    drawer: {
      [theme.breakpoints.up('sm')]: {
        width: c.DRAWER_WIDTH,
        flexShrink: 0,
      },
    },
    appBar: {
      marginLeft: c.DRAWER_WIDTH,
      [theme.breakpoints.up('sm')]: {
        width: `calc(100% - ${c.DRAWER_WIDTH}px)`,
      },
    },
    menuButton: {
      marginRight: theme.spacing(2),
      [theme.breakpoints.up('sm')]: {
        display: 'none',
      },
    },
    toolbar: theme.mixins.toolbar,
    drawerPaper: {
      width: c.DRAWER_WIDTH,
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
    },
    // drawer menus
    grow: {
      flexGrow: 1,
    },
    sectionDesktop: {
      display: 'none',
      [theme.breakpoints.up('md')]: {
        display: 'flex',
      },
    },
    sectionMobile: {
      display: 'flex',
      [theme.breakpoints.up('md')]: {
        display: 'none',
      },
    },
  }),
);

export const ResponsiveDrawer = (props: ResponsiveDrawerProps) => {
  // hooks: theme and style
  const classes = useStyles();
  const theme = useTheme();
  // hooks apollo
  // access apollo client to clear cache store on logout
  const [logout, { client }] = usePersonLogoutMutation();
  // hooks: drawer
  const [mobileOpen, setMobileOpen] = useState(false);
  // menu and mobileMenu
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  // hooks useDimension
  const [appBarRef, { width }] = useDimensions();
  const location = useLocation();
  // context state hook
  // eslint-disable-next-line
  const [state, dispatch] = useStateValue();
  const [logoutDisabled, setLogoutDisabled] = useState(false);
  // useCallback for optimization, could be omitted if child components don’t rely on shallow comparing.
  const setWidth = useCallback((width) => dispatch({ type: ActionType.SET_SHELL_WIDTH, payload: { width } }), [dispatch]);
  const { title, categories } = props;
  const drawerSections: DrawerListItem[][] = [];

  useEffect(() => {
    // TODO: put in constants in both places
    const margin = 48;
    if (!isNaN(width)) {
      const shellWidth: number = Math.trunc(mobileOpen ? width - c.DRAWER_WIDTH - margin : width - margin);
      setWidth(shellWidth);
    }
    // cleanup
    return () => { };
  }, [mobileOpen, width, setWidth])

  // handlers
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const handleClickListItem = () => {
    // only false if open, never happens in non mobile
    if (mobileOpen) {
      setMobileOpen(false);
    }
  };

  // menu and mobileMenu handlers
  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };
  const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };
  const handleMenuSignOut = async () => {
    // disable button
    setLogoutDisabled(true);
    // fire logoutMutation
    await logout();
    // clear/reset apollo cache store
    // to prevent problems resetStore, like in the past don't use asyn/await, and use .then
    // with setAccessToken and dispatch inisde
    client.resetStore()
      .then((value) => {
        // clean inMemory accessToken
        setAccessToken('');
        // dispatch logout
        dispatch({ type: ActionType.SIGNED_OUT_USER });
      })
      .catch(error => {
        console.error(error);
      })
      .finally(() => {
        // dispatch logout
        dispatch({ type: ActionType.SIGNED_OUT_USER });
      });
  };

  // menu definition
  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      {/* <MenuItem onClick={handleMenuClose}>Profile</MenuItem> */}
      <MenuItem component={Link} to={routes[RouteKey.PROFILE].path}>Profile</MenuItem>
      {state.user.logged && (<MenuItem onClick={handleMenuSignOut} disabled={logoutDisabled}>Sign out</MenuItem>)}
      {/* show loading when we logout */}
      {/* TODO {logoutDisabled && <Loading />} */}
    </Menu>
  );

  // mobileMenu definition
  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      {/* <MenuItem>
        <IconButton aria-label="show 4 new mails" color="inherit">
          <Badge badgeContent={4} color="secondary">
            <MailIcon />
          </Badge>
        </IconButton>
        <p>Messages</p>
      </MenuItem>
      <MenuItem>
        <IconButton aria-label="show 11 new notifications" color="inherit">
          <Badge badgeContent={11} color="secondary">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem> */}
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Session</p>
      </MenuItem>
    </Menu>
  );

  // loop DrawerSections enum, and extract sections from categories
  Object.values(DrawerSections).forEach(e => {
    const cats: DrawerListItem[] = categories.filter(c => c.section && c.section === e);
    drawerSections.push(cats);
  });
  // special array to add React.Components, and populate listItems splitted with section dividers
  const listItems: JSX.Element[] = Array<JSX.Element>();
  // start with divider
  listItems.push(<Divider key={DrawerSections.SECTION0} />);
  // get current section from first section item
  let currentSection: DrawerSections | undefined = drawerSections[0][0].section;
  drawerSections.forEach((section, sectionIndex) => {
    // check if currentSection changed: IF CRASH here is because we loop a section without items, check if all sections has one item minimum
    if (currentSection !== section[0].section) {
      currentSection = section[0].section;
      listItems.push(<Divider key={sectionIndex} />);
    }
    // loop section categories
    section.forEach(category => {
      const icon: JSX.Element = (category.icon) ? category.icon : defaultDrawerListItemIcon;
      if (category.visible !== false) {
        listItems.push(
          <ListItem button key={category.path} component={Link} to={category.path} selected={location.pathname === category.path} onClick={handleClickListItem}>
            <ListItemIcon>{icon}</ListItemIcon>
            <ListItemText primary={category.label} />
          </ListItem>
        );
      }
    });
  });
  // compose final drawer
  const drawer = (
    <div>
      <div className={classes.toolbar} />
      {listItems}
    </div>
  );

  return (
    <div className={classes.root}>
      <AppBar position="fixed" className={classes.appBar} ref={appBarRef}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            {title}
          </Typography>
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            {/* <IconButton aria-label="show 4 new mails" color="inherit">
              <Badge badgeContent={4} color="secondary">
                <MailIcon />
              </Badge>
            </IconButton>
            <IconButton aria-label="show 17 new notifications" color="inherit">
              <Badge badgeContent={17} color="secondary">
                <NotificationsIcon />
              </Badge>
            </IconButton> */}
            <IconButton
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
          </div>
          <div className={classes.sectionMobile}>
            <IconButton
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
      <nav className={classes.drawer} aria-label="mailbox folders">
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Hidden smUp implementation="css">
          <Drawer
            container={null}
            variant="temporary"
            anchor={theme.direction === 'rtl' ? 'right' : 'left'}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              // Better open performance on mobile.
              keepMounted: true,
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Switch>
          {/* convert record to array, and create routes */}
          {recordToArray<RouteItem>(routes).map((route, i) => (
            <Route key={route.path} exact={route.exact} path={route.path} component={route.component} />
          ))}
        </Switch>
      </main>
    </div>
  );
}
