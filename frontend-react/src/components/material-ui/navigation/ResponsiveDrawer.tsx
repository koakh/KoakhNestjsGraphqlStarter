import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { createStyles, makeStyles, Theme, useTheme } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import MenuIcon from '@material-ui/icons/Menu';
import React, { useCallback, useEffect, useState } from 'react';
import { Link, Route, Switch, useLocation } from 'react-router-dom';
import useDimensions from 'react-use-dimensions';
import { defaultDrawerListItemIcon, drawerWidth, routes } from '../../../app/config';
import { ActionType, useStateValue } from '../../../app/state';
import { DrawerListItem, DrawerSections } from '../../../types';

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
        width: drawerWidth,
        flexShrink: 0,
      },
    },
    appBar: {
      marginLeft: drawerWidth,
      [theme.breakpoints.up('sm')]: {
        width: `calc(100% - ${drawerWidth}px)`,
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
      width: drawerWidth,
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
    },
  }),
);

export const ResponsiveDrawer = (props: ResponsiveDrawerProps) => {
  // hooks
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [appBarRef, { width }] = useDimensions();
  const location = useLocation();
  // context state hook
  // eslint-disable-next-line
  const [state, dispatch] = useStateValue();
  // useCallback for optimization, could be omitted if child components don’t rely on shallow comparing.
  const setWidth = useCallback((width) => dispatch({ type: ActionType.SET_SHELL_WIDTH, payload: { width } }), [dispatch]);
  const { title, categories } = props;
  const drawerSections: DrawerListItem[][] = [];

  useEffect(() => {
    const margin: number = 48;
    if (!isNaN(width)) {
      const shellWidth: number = Math.trunc(mobileOpen ? width - drawerWidth - margin : width - margin);
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
    // check if currentSection changed
    if (currentSection !== section[0].section) {
      currentSection = section[0].section;
      listItems.push(<Divider key={sectionIndex} />);
    }
    // loop section categories
    section.forEach(category => {
      const icon: JSX.Element = (category.icon) ? category.icon : defaultDrawerListItemIcon;
      listItems.push(
        <ListItem button key={category.path} component={Link} to={category.path} selected={location.pathname === category.path} onClick={handleClickListItem}>
          <ListItemIcon>{icon}</ListItemIcon>
          <ListItemText primary={category.label} />
        </ListItem>
      );
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
      <CssBaseline />
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
        </Toolbar>
      </AppBar>
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
          {routes.map((route, i) => (
            <Route key={route.path} exact={route.exact} path={route.path} component={route.component} />
          ))}
        </Switch>
      </main>
    </div>
  );
}
