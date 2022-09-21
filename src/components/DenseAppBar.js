import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import {alpha, Autocomplete, createTheme, Paper, styled, TextField, ThemeProvider} from "@mui/material";
import {useState} from "react";
import AdbIcon from '@mui/icons-material/Adb';
import SearchIcon from '@mui/icons-material/Search';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

export default function DenseAppBar(props) {


//Styles
    const theme = createTheme({

        status: {
            danger: '#e53e3e',
        }, palette: {
            primary: {
                main: '#2E3B55', darker: '#053e85',
            }, neutral: {
                main: '#64748B', contrastText: '#fff',
            },
        },
    });


    const SearchIconWrapper = styled('div')(({theme}) => ({
        padding: theme.spacing(0, 0),
        height: '100%',
        position: 'relative',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    }));

    //State/Constants

    const [searchValue, setSearchValue] = useState('');
    let searchOptions = props


    //// Takes in a searchvalue and filters through the data that was provided by the parent App.js, then returns filtered search results data to App.js.
    const searchItems = (searchValue) => {

        setSearchValue(searchValue)
        props.Changedata(searchValue)
        console.log(searchValue)

        function gameExists(searchValue) {
            return searchOptions.data.some(function (el) {
                return el.value === searchValue;
            });
        }

        if (searchValue === null) {

            console.log('wtf')
            props.Changedata(props.data)
        } else if (gameExists()) {
            console.log('search run')
            props.Changedata(searchOptions.data.filter(item => item.gameName === searchValue))
        }
    }


    return (<ThemeProvider theme={theme}>
        <Box sx={{flexGrow: 1}}>
            <AppBar position="static" style={{background: '#2E3B55'}}>
                <Toolbar variant="regular">
                    <AdbIcon sx={{display: {xs: 'none', md: 'flex'}, mr: 1}}/>
                    <Typography
                        variant="h6"
                        noWrap
                        component="a"
                        href="/"
                        sx={{
                            mr: 2,
                            display: {xs: 'none', md: 'flex'},
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        DroidVegas
                    </Typography>
                    <IconButton edge="start" color="inherit" aria-label="menu" sx={{mr: 2}}>
                        <MenuIcon/>
                    </IconButton>
                    <SearchIconWrapper style={{width: 'auto', paddingLeft: 0}}
                    ><SearchIcon/></SearchIconWrapper>
                    <Autocomplete
                        id="free-solo"
                        size={"small"}

                        options={searchOptions.data.map((option) => option.gameName)}
                        style={{width: 300, paddingLeft: 0}}
                        PaperComponent={({children}) => (<Paper style={{background: "white"}}>{children}</Paper>)}
                        onChange={(event, value) => searchItems(value)}
                        renderInput={params => <TextField
                            style={{background: alpha(theme.palette.common.white, 0.25)}} {...params} label={''}/>}>
                    </Autocomplete>
                </Toolbar>
            </AppBar>
        </Box>
    </ThemeProvider>);
}