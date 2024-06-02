import React, { useCallback, useEffect, useState } from 'react';

import {
    Link,
    NavLink,
    useLocation,
    useNavigate,
    useSearchParams,
} from 'react-router-dom';

//mui component
import {
    AppBar,
    Box,
    Stack,
    Drawer as MuiDrawer,
    IconButton,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Divider,
    Avatar,
    Button,
    Grid,
    Toolbar,
    Typography,
    ListItemButton,
    Menu,
    Link as MuiLink,
    MenuItem,
    Modal,
    useTheme as useMuiTheme,
    Skeleton,
    LinearProgress,
    styled,
    useMediaQuery,
    FormControl,
    Select,
    Paper,
    BottomNavigation,
    BottomNavigationAction,
} from '@mui/material';

//mui icons
import AddIcon from '@mui/icons-material/Add';
import AppsIcon from '@mui/icons-material/Apps';
import SettingsIcon from '@mui/icons-material/SettingsOutlined';
import MenuIcon from '@mui/icons-material/Menu';

import CloudOutlinedIcon from '@mui/icons-material/CloudOutlined';
import { fileManager, yourWork } from '../services/sidebarLinks';

//react component
import Image from '../components/Image';

//services
import useMedia from '../hooks/useMedia';
import { useTheme } from '../style/theme';
import { useMenu } from '../hooks/useMenu';
import EditIcon from '@mui/icons-material/Edit';
import DoneIcon from '@mui/icons-material/Done';
import SearchBar from './SearchBar';
import axios from 'axios';
import { useMessage } from './Header';
import useModal from './../hooks/useModal';
import ActionIcon from './ActionIcon';
import { clearCookie } from '../utilities/cookies';
import { env, handleAxiosError, parseKB } from '../utilities/function';
import Feedback from './Feedback';
import MicrophoneIcon from './MicrophoneIcon';
import AddOrganization from '../pages/Organization/AddOrganization';
import Setting from './Setting';
import { authServer } from '../utilities/axiosPrototypes';

const drawerWidth = 260;
const appsWidth = 54;
const miniDrawerWidth = 72;

const openedMixin = theme => ({
    width: drawerWidth,
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
    backgroundColor: theme.palette.background.default,
    borderRight: 'none',
});

const closedMixin = theme => ({
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    backgroundColor: theme.palette.background.default,
    overflowX: 'hidden',
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up('sm')]: {
        width: `calc(${theme.spacing(8)} + 1px)`,
    },
    borderRight: 'none',
});

const Drawer = styled(MuiDrawer, {
    shouldForwardProp: prop => prop !== 'open',
})(({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,

    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
        ...openedMixin(theme),
        '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
        ...closedMixin(theme),
        '& .MuiDrawer-paper': closedMixin(theme),
    }),
}));

export default function Navbar(props) {
    const links = [
        { logo: 'ads/logo/2023/ads.png', name: 'Ads' },
        { logo: 'cmail/logo/2023/cmail.png', name: 'Cmail' },
        { logo: 'hr/logo/2023/hr.png', name: 'Hr' },
        { logo: 'campaigns/logo/2023/campaigns.png', name: 'Campaigns' },
        { logo: 'e-sign/logo/2023/e-sign.png', name: 'E-sign' },
        { logo: 'files/logo/2023/files.png', name: 'Files' },
        { logo: 'host/logo/2023/host.png', name: 'Host' },
        { logo: 'pitch/logo/2023/pitch.png', name: 'Pitch' },
        { logo: 'launch/logo/2023/launch.png', name: 'Launch' },
    ];
    const { children } = props;
    const navigate = useNavigate();
    const [mobileOpen, setMobileOpen] = useState(false);
    const smLayout = useMedia('(min-width: 576px)');
    const [sidebarApps] = useState(links);
    const [editable] = useState(false);
    const [collapseDrawer, setCollapseDrawer] = useState(true);
    const [drawerHover, setDrawerHover] = useState(false);
    const [stats, setStats] = useState(null);
    // const organizationId = '1333231231';
    // const setOrganizationId = useSetOrganizationId();
    const [organizationId, setOrganizationId] = useState(null);
    const setSearchParams = useSearchParams()[1];
    const [value, setValue] = React.useState(0);

    const {
        state: feedbackState,
        openModal: openFeedback,
        closeModal: closeFeedback,
    } = useModal();

    const {
        state: organizationState,
        openModal: openOrganizationState,
        closeModal: closeOrganizationState,
    } = useModal();

    const { showError } = useMessage();
    const location = useLocation();
    // const user = useUser();
    const user = null;

    const matches = useMediaQuery('(min-width:1024px)', { noSsr: true });

    const { toggleTheme, mode } = useTheme();
    const theme = useMuiTheme();

    // useMenu
    const {
        anchorEl: anchorElProfile,
        openMenu: openProfileMenu,
        closeMenu: closeProfileMenu,
    } = useMenu();

    const {
        anchorEl: anchorElSettings,
        openMenu: openSettingsMenu,
        closeMenu: closeSettingsMenu,
    } = useMenu();

    const fetchOgranizations = useCallback(async function () {
        try {
            await authServer.get(`/organization`);
        } catch (e) {
            console.log(e);
        }
    }, []);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const handleDrawerOpen = () => {
        setCollapseDrawer(!collapseDrawer);
    };

    const getStorage = useCallback(
        async id => {
            try {
                const response = await axios.get(`/open/stats/${id}`, {
                    baseURL: env('FILES_SERVER'),
                });

                const { success, errors, stats } = response.data;
                if (!success) return showError(errors);

                setStats(stats);
            } catch (e) {
                handleAxiosError(e, showError);
            }
        },
        [setStats, showError]
    );

    const signOut = () => {
        clearCookie('accessToken');
        clearCookie('role');
        clearCookie('setupCompleted');
        clearCookie('accessToken-projects');

        const redirectTo =
            env('AUTHENTICATION_CLIENT') +
            '/login?redirectto=' +
            encodeURIComponent(env('DOMAIN'));
        window.location.replace(redirectTo);
    };

    useEffect(() => {
        if (location.pathname === '/') {
            setValue(0);
        }

        if (location.pathname === '/projects') {
            setValue(1);
        }

        if (location.pathname === '/your-work') {
            setValue(2);
        }
        if (location.pathname === '/team') {
            setValue(3);
        }
    }, [setValue, location.pathname]);

    useEffect(() => {
        setMobileOpen(false);
    }, [location.pathname, location.hash]);

    useEffect(() => {
        user && getStorage(user._id);
    }, [user, getStorage]);

    // useEffect(() => {
    //     user && getPlatforms();
    // }, [user, getPlatforms]);

    useEffect(() => {
        fetchOgranizations();
    }, [fetchOgranizations]);

    const handleChangeOption = e => {
        const value = e.target.value;
        if (value) {
            setOrganizationId(value);
            setSearchParams(
                params => {
                    params.set('org', value);
                    return params;
                },
                { replace: true }
            );
            navigate(`/?org=${value}`);
            window.location.reload();
        }
    };

    useEffect(() => {
        setSearchParams(
            params => {
                params.set('org', organizationId);
                return params;
            },
            { replace: true }
        );
    }, [organizationId, setSearchParams]);

    const drawer = (
        <Box
            minHeight='100dvh'
            color='text.secondary'
            display='flex'
            flexDirection='column'>
            <Box
                display='flex'
                alignItems='center'
                justifyContent='center'
                position='relative'
                component={Link}
                to='/'
                sx={{ textDecoration: 'none', color: 'text.primary', py: 1 }}>
                <Image
                    cdn='projects/logo/2023/projects-text.png'
                    sx={{ height: '50px' }}
                />
                <Typography
                    color='text.secondary'
                    variant='body2'
                    fontWeight='bold'
                    sx={{ position: 'absolute', bottom: 4, left: '27%' }}>
                    Beta
                </Typography>
            </Box>

            <Box
                sx={{
                    overflowY: 'auto',
                    overflowX: 'hidden',
                    height: 'calc(100dvh - 90px)',
                    flexGrow: 1,
                    '::-webkit-scrollbar': { display: 'none' },
                }}>
                <Box pl={3} mt={1.5}>
                    <FormControl sx={{ minWidth: '100%' }}>
                        <Select
                            name='selectOrganization'
                            value={organizationId}
                            onChange={handleChangeOption}
                            sx={{
                                fontSize: '14px',
                                boxShadow: 'none',

                                '.MuiSelect-select.MuiInputBase-input.MuiOutlinedInput-input':
                                    {
                                        p: 0,
                                    },

                                '.MuiOutlinedInput-notchedOutline': {
                                    border: 0,
                                },
                                '&.MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline':
                                    {
                                        border: 0,
                                    },
                                '&.MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline':
                                    {
                                        border: 0,
                                    },
                            }}>
                            <MenuItem
                                value='All Organization'
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                }}>
                                <Typography
                                    variant='body2'
                                    fontSize='14px'
                                    color='text.secondary'
                                    fontWeight={500}>
                                    All Organization
                                </Typography>
                            </MenuItem>

                            <Button
                                fullWidth
                                onClick={openOrganizationState}
                                startIcon={<AddIcon fontSize='small' />}
                                size='small'
                                sx={{
                                    fontSize: '11px',
                                }}>
                                Create organization
                            </Button>
                            <Link to='/organizations'>
                                <Button
                                    fullWidth
                                    // onClick={openOrganizationState}

                                    size='small'
                                    sx={{
                                        fontSize: '11px',
                                    }}>
                                    View all organization
                                </Button>
                            </Link>
                        </Select>
                    </FormControl>
                </Box>
                {/* <Typography
                    variant='body2'
                    pl={3}
                    pt={0.5}
                    fontSize='14px'
                    fontWeight={500}
                >
                    Projects
                </Typography> */}
                <List sx={{ px: 3, pt: 0.5 }}>
                    {fileManager.map(link => (
                        <NavLink
                            to={link.to}
                            key={link.name}
                            style={{
                                textDecoration: 'none',
                                color: 'inherit',
                            }}>
                            {({ isActive }) => (
                                <ListItem disablePadding>
                                    <ListItemButton
                                        selected={isActive}
                                        disableRipple
                                        disableTouchRipple
                                        variant='sidebarButton'>
                                        <ListItemIcon
                                            sx={{
                                                minWidth: '35px',
                                                color: 'text.secondary',
                                            }}>
                                            {link.icon}
                                        </ListItemIcon>
                                        <ListItemText primary={link.name} />
                                    </ListItemButton>
                                </ListItem>
                            )}
                        </NavLink>
                    ))}
                </List>
                <Divider variant='middle' />
                <Typography
                    variant='body2'
                    pl={3}
                    mt={1.5}
                    fontSize='14px'
                    fontWeight={500}>
                    Your work
                </Typography>
                <List sx={{ px: 3 }}>
                    {yourWork.map(link => (
                        <NavLink
                            to={link.to}
                            key={link.name}
                            style={{
                                textDecoration: 'none',
                                color: 'inherit',
                            }}>
                            {({ isActive }) => (
                                <ListItem disablePadding>
                                    <ListItemButton
                                        selected={isActive}
                                        disableRipple
                                        disableTouchRipple
                                        variant='sidebarButton'>
                                        <ListItemIcon
                                            sx={{
                                                minWidth: '35px',
                                                color: 'text.secondary',
                                            }}>
                                            {link.icon}
                                        </ListItemIcon>
                                        <ListItemText primary={link.name} />
                                    </ListItemButton>
                                </ListItem>
                            )}
                        </NavLink>
                    ))}
                </List>
            </Box>

            <Box>
                <Divider variant='middle' />
                {stats ? (
                    <>
                        <Typography
                            variant='body2'
                            pl={3}
                            mt={1.5}
                            fontSize='14px'
                            fontWeight={500}>
                            Storage
                        </Typography>

                        <Box px={3} pb={3}>
                            <LinearProgress
                                variant='determinate'
                                value={(stats.used / stats.storage) * 100}
                                color='primary'
                                sx={{ borderRadius: '2px', mt: 1 }}
                            />
                            <Typography
                                variant='caption'
                                component='div'
                                mt={1}
                                color='primary.main'>
                                {parseKB(stats.used)} used of{' '}
                                {parseKB(stats.storage)}
                            </Typography>
                            <Button
                                variant='contained'
                                color='primary'
                                startIcon={
                                    <CloudOutlinedIcon fontSize='small' />
                                }
                                sx={{ mt: 1, color: 'white' }}
                                href={env('MY_ACCOUNT')}
                                fullWidth>
                                Upgrade storage
                            </Button>
                        </Box>
                    </>
                ) : null}
                <Divider
                    variant='middle'
                    sx={{ display: { xs: 'block', sm: 'none' } }}
                />
                <List sx={{ px: 1, display: { xs: 'block', sm: 'none' } }}>
                    <ListItem
                        disablePadding
                        onClick={openSettingsMenu}
                        sx={{
                            '&:hover': {
                                backgroundColor: 'custom.cardHover',
                                borderRadius: '8px',
                            },
                        }}>
                        <ListItemButton
                            disableRipple
                            disableTouchRipple
                            variant='sidebarButton'>
                            <ListItemIcon
                                sx={{
                                    minWidth: '30px',
                                    color: 'text.secondary',
                                }}>
                                <SettingsIcon fontSize='small' />
                            </ListItemIcon>
                            <ListItemText
                                primary='Settings'
                                primaryTypographyProps={{ fontSize: 14 }}
                            />
                        </ListItemButton>
                    </ListItem>
                </List>

                <Stack
                    direction='row'
                    justifyContent='center'
                    my={1}
                    sx={{ display: { xs: 'none', sm: 'flex' } }}>
                    <MuiLink
                        display='inline-flex'
                        alignItems='center'
                        color='text.secondary'
                        sx={{ cursor: 'pointer' }}
                        onClick={openFeedback}>
                        <MicrophoneIcon />
                        <Typography variant='caption' fontWeight='bold'>
                            Give feedback
                        </Typography>
                    </MuiLink>
                </Stack>
            </Box>
        </Box>
    );
    const miniDrawer = (
        <Box
            minHeight='100dvh'
            color='text.secondary'
            display='flex'
            flexDirection='column'>
            <Box
                display='flex'
                alignItems='center'
                justifyContent='center'
                component={Link}
                mb={3}
                to='/'
                sx={{ textDecoration: 'none', color: 'text.primary', py: 1 }}>
                <Image
                    cdn='projects/logo/2023/projects.png'
                    sx={{ height: '50px' }}
                />
            </Box>

            <Box
                sx={{
                    overflowY: 'auto',
                    overflowX: 'hidden',
                    height: 'calc(100dvh - 90px)',
                    flexGrow: 1,
                }}>
                <List sx={{ px: 1, pb: 0 }}>
                    {fileManager.map(link => (
                        <NavLink
                            to={link.to}
                            key={link.name}
                            style={{
                                textDecoration: 'none',
                                color: 'inherit',
                            }}>
                            {({ isActive }) => (
                                <ListItem disablePadding>
                                    <ListItemButton
                                        selected={isActive}
                                        disableRipple
                                        disableTouchRipple
                                        variant='sidebarButton'
                                        sx={{ height: '45px', my: '2px' }}>
                                        <ListItemIcon
                                            sx={{
                                                // minWidth: '35px',
                                                color: 'text.secondary',
                                            }}>
                                            {link.icon}
                                        </ListItemIcon>
                                    </ListItemButton>
                                </ListItem>
                            )}
                        </NavLink>
                    ))}
                </List>
                <List sx={{ px: 1, pt: 0 }}>
                    {yourWork.map(link => (
                        <NavLink
                            to={link.to}
                            key={link.name}
                            style={{
                                textDecoration: 'none',
                                color: 'inherit',
                            }}>
                            {({ isActive }) => (
                                <ListItem disablePadding>
                                    <ListItemButton
                                        selected={isActive}
                                        disableRipple
                                        disableTouchRipple
                                        variant='sidebarButton'
                                        sx={{ height: '45px', my: '2px' }}>
                                        <ListItemIcon
                                            sx={{
                                                minWidth: '35px',
                                                color: 'text.secondary',
                                            }}>
                                            {link.icon}
                                        </ListItemIcon>
                                    </ListItemButton>
                                </ListItem>
                            )}
                        </NavLink>
                    ))}
                </List>
            </Box>
        </Box>
    );

    return (
        <Box
            sx={{
                bgcolor: 'background.default',
                px: { xs: 0.5, xm: 0 },
                height: '100dvh',
                overflow: 'hidden',
            }}>
            <AppBar
                elevation={0}
                component={Box}
                position='sticky'
                sx={{
                    width: {
                        xs: '100%',
                        xm:
                            collapseDrawer && !drawerHover
                                ? `calc(100% - ${drawerWidth}px)`
                                : `calc(100% - ${miniDrawerWidth}px )`,
                    },
                    ml: {
                        xm:
                            collapseDrawer && !drawerHover
                                ? `${drawerWidth}px`
                                : `${miniDrawerWidth}px`,
                    },
                    backgroundColor: 'background.default',

                    borderBottom: '1px solid custom.border',
                    // borderBottomColor: 'custom.border',
                    color: 'text.primary',
                    transition: 'ease-in-out 225ms, background-color 0s',
                }}>
                <Toolbar
                    sx={{
                        flexDirection: 'column',
                        justifyContent: 'center',
                        position: 'relative',
                        '&': {
                            minHeight: '64px',
                            px: 1,
                        },
                    }}>
                    <Grid container alignItems='center' columnSpacing={1}>
                        <Grid item>
                            <IconButton
                                onClick={
                                    matches
                                        ? handleDrawerOpen
                                        : handleDrawerToggle
                                }
                                edge='start'
                                sx={{
                                    ml: 0.2,
                                    mr: 1,
                                    // display: { xs: 'none', sm: 'inline-flex' },
                                }}>
                                <MenuIcon sx={{ fontSize: '30px' }} />
                            </IconButton>
                        </Grid>

                        <Grid item xs md={5} alignItems='start'>
                            <SearchBar />
                        </Grid>
                        <Grid item xs display={{ xs: 'none', sm: 'block' }}>
                            <Stack
                                direction='row'
                                alignItems='center'
                                justifyContent='flex-end'
                                spacing={0}>
                                <IconButton onClick={openSettingsMenu}>
                                    <SettingsIcon />
                                </IconButton>
                                <Menu
                                    anchorEl={anchorElSettings}
                                    open={Boolean(anchorElSettings)}
                                    onClose={closeSettingsMenu}
                                    transformOrigin={{
                                        horizontal: 'right',
                                        vertical: 'top',
                                    }}
                                    anchorOrigin={{
                                        horizontal: 'right',
                                        vertical: 'bottom',
                                    }}>
                                    <Setting
                                        mode={mode}
                                        toggleTheme={toggleTheme}
                                        closeSettingsMenu={closeSettingsMenu}
                                    />
                                </Menu>

                                <Link to='http://apps.clikkle.com/'>
                                    <IconButton>
                                        <AppsIcon />
                                    </IconButton>
                                </Link>
                            </Stack>
                        </Grid>
                        <Grid item>
                            {smLayout ? (
                                <IconButton
                                    onClick={openProfileMenu}
                                    sx={{
                                        borderWidth: '2px',
                                        borderStyle: 'solid',
                                        borderColor: 'primary.main',
                                        p: '3px',
                                    }}>
                                    <Avatar
                                        alt='Remy Sharp'
                                        src={`https://api.files.clikkle.com/open/file/preview/${user?.photo}`}
                                        // src={user.localImage}
                                        sx={{
                                            cursor: 'pointer',

                                            width: 30,
                                            height: 30,
                                        }}
                                    />
                                </IconButton>
                            ) : (
                                <Link to='http://apps.clikkle.com/'>
                                    <IconButton
                                        sx={{
                                            borderWidth: '2px',
                                            borderStyle: 'solid',
                                            borderColor: 'primary.main',
                                            p: '3px',
                                        }}>
                                        <Avatar
                                            alt='Remy Sharp'
                                            src={`https://api.files.clikkle.com/open/file/preview/${user?.photo}`}
                                            sx={{
                                                cursor: 'pointer',

                                                width: 30,
                                                height: 30,
                                            }}
                                        />
                                    </IconButton>
                                </Link>
                            )}

                            <Menu
                                anchorEl={anchorElProfile}
                                open={Boolean(anchorElProfile)}
                                onClose={closeProfileMenu}
                                sx={{
                                    '.MuiPaper-root.MuiMenu-paper.MuiPopover-paper':
                                        {
                                            width: 'min(100%, 320px)',
                                            boxShadow:
                                                'rgba(0, 0, 0, 0.1) 0px 20px 25px -5px, rgba(0, 0, 0, 0.04) 0px 10px 10px -5px',
                                            border: '1px solid #00000017',
                                            bgcolor: 'custom.menu',
                                            px: 0.5,
                                            pt: 1.5,
                                        },
                                }}>
                                <Grid
                                    container
                                    spacing={2}
                                    alignItems='center'
                                    flexWrap='nowrap'>
                                    <Grid item>
                                        <>
                                            <Box
                                                sx={{
                                                    position: 'absolute',
                                                    bottom: 0,
                                                    left: 70,
                                                    top: 75,
                                                    zIndex: '1200',
                                                }}>
                                                <Link to='https://myaccount.clikkle.com/'>
                                                    <IconButton
                                                        disableFocusRipple
                                                        disableRipple
                                                        disablePadding
                                                        sx={{
                                                            p: 0.4,
                                                            background:
                                                                '#EFF0F0',
                                                        }}>
                                                        <EditIcon
                                                            fontSize='small'
                                                            sx={{
                                                                color: 'black',
                                                                '&:hover': {
                                                                    color: 'black',
                                                                },
                                                            }}
                                                        />
                                                    </IconButton>
                                                </Link>
                                            </Box>
                                            <Avatar
                                                alt='Remy Sharp'
                                                src={`https://api.files.clikkle.com/open/file/preview/${user?.photo}`}
                                                sx={{
                                                    cursor: 'pointer',
                                                    position: 'relative',
                                                    width: 100,
                                                    height: 100,
                                                }}
                                            />
                                        </>
                                    </Grid>
                                    <Grid item xs={8}>
                                        <Typography
                                            variant='substitle1'
                                            component='div'
                                            fontWeight={600}
                                            sx={{
                                                whiteSpace: 'nowrap',
                                                overflow: 'hidden',
                                                textOverflow: 'ellipsis',
                                            }}>
                                            {user?.firstName +
                                                ' ' +
                                                user?.lastName}
                                        </Typography>
                                        <Typography
                                            variant='caption'
                                            component='div'
                                            sx={{
                                                overflow: 'hidden',
                                                textOverflow: 'ellipsis',
                                                whiteSpace: 'nowrap',
                                            }}>
                                            {user?.email}
                                        </Typography>
                                        <Typography
                                            variant='caption'
                                            component='a'
                                            href='#'
                                            color='primary.main'
                                            display='block'>
                                            My Clikkle account
                                        </Typography>
                                        <Link
                                            to='/profile'
                                            sx={{
                                                textDecoration: 'none',
                                                color: 'inherit',
                                            }}>
                                            <Typography
                                                variant='caption'
                                                component='a'
                                                href='#'
                                                color='primary.main'
                                                display='block'>
                                                My Profile
                                            </Typography>
                                        </Link>
                                    </Grid>
                                </Grid>
                                <Stack direction='row' mt={2}>
                                    <Button variant='text' fullWidth>
                                        Add account
                                    </Button>
                                    <Button
                                        variant='text'
                                        onClick={signOut}
                                        fullWidth>
                                        Sign out
                                    </Button>
                                </Stack>
                            </Menu>
                        </Grid>
                    </Grid>
                </Toolbar>

                <Box
                    sx={{
                        width: appsWidth,
                        display: { xs: 'none', xm: 'block' },
                        backgroundColor: 'background.default',
                        zIndex: '1200',
                        position: 'absolute',
                        right: 0,
                        top: 65,
                        height: 'calc(100vh - 85px)',
                        overflowY: 'auto',
                        '::-webkit-scrollbar': { display: 'none' },
                    }}>
                    <Stack
                        direction='column'
                        justifyContent='center'
                        alignItems='center'
                        spacing={1}
                        overflow='hidden'
                        px={0.8}>
                        {sidebarApps ? (
                            sidebarApps.map((app, i) => (
                                <ActionIcon
                                    title={app.name}
                                    href={app.url}
                                    src={app.logo}
                                    key={i}
                                    sx={{
                                        mt: 0.8,
                                        width: 'auto',
                                    }}
                                    imageSx={{
                                        filter:
                                            editable &&
                                            `drop-shadow(0px 2px 2px ${theme.palette.primary.main})`,
                                    }}
                                />
                            ))
                        ) : (
                            <Box mt={2}>
                                {Array(8)
                                    .fill(0)
                                    .map((_, i) => (
                                        <Skeleton
                                            variant='circular'
                                            animation='wave'
                                            key={i}
                                            width={35}
                                            height={35}
                                            sx={{ mb: 2 }}
                                        />
                                    ))}
                            </Box>
                        )}

                        <Divider
                            variant='middle'
                            sx={{ my: 2, width: '80%' }}
                        />
                        {editable ? (
                            <ActionIcon
                                title='Save'
                                icon={<DoneIcon fontSize='small' />}
                            />
                        ) : (
                            <ActionIcon
                                title='Edit'
                                icon={<EditIcon fontSize='small' />}
                            />
                        )}
                    </Stack>
                </Box>
            </AppBar>

            <Box
                component='nav'
                sx={{
                    width: { xm: drawerWidth },
                    flexShrink: { sm: 0 },
                    bgcolor: 'custom.menu',
                }}>
                {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
                <MuiDrawer
                    variant='temporary'
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{
                        keepMounted: true, // Better open performance on mobile.
                    }}
                    sx={{
                        display: { xs: 'block', xm: 'none' },
                        '& .MuiDrawer-paper': {
                            boxSizing: 'border-box',
                            width: drawerWidth,
                            bgcolor: 'custom.menu',
                        },
                    }}>
                    {drawer}
                </MuiDrawer>
                <Drawer
                    variant='permanent'
                    open={collapseDrawer}
                    hover={drawerHover}
                    onMouseOver={() => {
                        if (!collapseDrawer) {
                            setCollapseDrawer(true);
                            setDrawerHover(true);
                        }
                    }}
                    onMouseLeave={() => {
                        if (drawerHover) {
                            setCollapseDrawer(false);
                            setDrawerHover(false);
                        }
                    }}
                    sx={{
                        display: { xs: 'none', xm: 'block' },
                        p: 0,
                        '& .MuiDrawer-paper': {
                            boxShadow: drawerHover
                                ? 'rgba(149, 157, 165, 0.2) 0px 8px 24px'
                                : 'none',
                        },
                    }}>
                    {collapseDrawer ? drawer : miniDrawer}
                </Drawer>
            </Box>
            <Paper
                sx={{
                    width: '100%',
                    display: { sm: 'none', xs: 'block' },
                    flexBasis: '100%',
                    position: 'fixed',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    zIndex: 1200,
                }}>
                <BottomNavigation
                    showLabels
                    value={value}
                    onChange={(event, newValue) => {
                        setValue(newValue);
                    }}>
                    {fileManager.map(menu => (
                        <BottomNavigationAction
                            component={Link}
                            label={menu.name}
                            to={menu.to}
                            icon={menu.icon}
                        />
                    ))}
                    {yourWork.map(menu => (
                        <BottomNavigationAction
                            component={Link}
                            label={menu.name}
                            to={menu.to}
                            icon={menu.icon}
                        />
                    ))}
                </BottomNavigation>
            </Paper>

            <Box
                component='main'
                id='main'
                sx={{
                    width: {
                        xs: '100%',
                        xm:
                            collapseDrawer && !drawerHover
                                ? `calc(100% - ${drawerWidth + appsWidth}px)`
                                : `calc(100% - ${
                                      appsWidth + miniDrawerWidth
                                  }px )`,
                    },
                    ml: {
                        xm:
                            collapseDrawer && !drawerHover
                                ? `${drawerWidth}px`
                                : `${miniDrawerWidth}px`,
                    },
                    mt: 1,

                    height: { xs: 'calc(100dvh - 90px)' },
                    backgroundColor: 'background.main',
                    borderRadius: '12px',
                    // overflow: 'auto',
                }}>
                {children}
            </Box>

            <Modal
                open={feedbackState}
                onClose={closeFeedback}
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'flex-start',
                }}>
                <>
                    <Feedback closeModal={closeFeedback} />
                </>
            </Modal>
            <Modal
                open={organizationState}
                onClose={closeOrganizationState}
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                <>
                    <AddOrganization
                        closeModal={closeOrganizationState}
                        fetchOgranizations={fetchOgranizations}
                    />
                </>
            </Modal>
            {/* <Modal
                sx={{
                    overflowY: 'scroll',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
                open={profileEdit}
                onClose={closeProfile}
            >
                <EditProfile user={user} closeProfile={closeProfile} />
            </Modal> */}
        </Box>
    );
}
