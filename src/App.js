import './App.css';
import {Card, CardActionArea, CardMedia, Chip, Container, createTheme, Grid, ThemeProvider} from "@mui/material";
import {useEffect, useState} from "react";
import {Casino} from "./components/Casino";
import PrimarySearchAppBar from "./components/DenseAppBar";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";

function App() {


    //Stylings

    const theme = createTheme({

        status: {
            danger: '#e53e3e',
        }, palette: {
            primary: {
                main: '#2E3B55', darker: '#053e85',
            }, neutral: {
                main: '#64748B', contrastText: '#fff',
            },
        }, typography: {
            fontFamily: "Roboto",
        }, Chip: {
            backgroundColor: 'red'
        }

    });

//Constants

    const [data, setData] = useState([]);
    const [filteredData, setFilteredData] = useState(null);
    const [chosenCategory, setChosenCategory] = useState([])
    const [chosenGamesArray, setChosenGamesArray] = useState([])
    const [gameCategories, setGameCategories] = useState([{id: 1, game: "slots"}, {id: 2, game: "table games"}, {
        id: 3, game: "jackpots"
    }, {id: 4, game: "favourites"}, {id: 5, game: "newest"}, {id: 6, game: "instant win"}, {
        id: 7, game: "Daily Jackpots"
    }, {id: 8, game: "top games"}, {id: 9, game: "exciting games"}])
    const [activeButton, setActiveButton] = useState([])

    // Useffects

    //// This loads the initial data to the 'data' useState on page opening or when returning from a search or resetting categories

    useEffect(() => {
        initialData()
    }, [])

    //// This runs when categories are selected. Filters through the available categories and sets them into a state.

    useEffect(() => {
        if (chosenCategory.length >= 1) {
            const filterByCategoriesSet = new Set(chosenGamesArray);
            const result1 = data.filter((o) => o.categories.some((game) => filterByCategoriesSet.has(game)));
            setFilteredData(result1)
        }
    }, [chosenCategory]);

    //Functions

    //// Fetches the initial data.
    const initialData = () => {
        fetch('https://www.mocky.io/v2/5da99f9f31000036004e0a4e')
            .then((res) => res.json())
            .then((data) => setData(data))
            .catch(error => {
                console.log('Error getting data: ' + error);
            });
    }

    /////Category and game selector. Creates arrays and filters through them as necessary when user selects a category.
    const handleClick = (id, game) => {
        let x = id
        if (chosenCategory.some(item => item.id === x)) {
            removeCategory(x, game)
            setActiveButton(activeButton.filter(v => v !== id))
            if (chosenCategory.length === 1) {
                setFilteredData(null)
                initialData()
            }
        } else {
            setActiveButton(activeButton => [...activeButton, id])
            setChosenCategory(chosenCategory => [...chosenCategory, {id: id, game: game}])
            setChosenGamesArray(chosenGamesArray => [...chosenGamesArray, game])
        }

    }
    ////Removes games from category arrays.
    const removeCategory = (x, game) => {
        setChosenCategory(chosenCategory.filter(item => item.id !== x))
        setChosenGamesArray(chosenGamesArray.filter(v => v !== game))
    }


    return (<ThemeProvider theme={theme}>
        <div>
            <PrimarySearchAppBar Changedata={(filteredData) => setFilteredData(filteredData)}
                                 data={data}></PrimarySearchAppBar>
            <AppBar position="static">
                <Toolbar sx={{flexGrow: 1}}>
                    {gameCategories.map(({game, id}) => (<Chip color={activeButton.includes(id) ? 'success' : 'primary'}
                                                               clickable={true}
                                                               label={game.charAt(0).toUpperCase() + game.slice(1)}
                                                               id={id}
                                                               onClick={() => handleClick(id, game)}
                    />))}
                </Toolbar></AppBar>
            <Container maxWidth="xl" sx={{p: 6}}>
                {filteredData ? <Casino props={filteredData}></Casino> : <Grid container spacing={3}>
                    {data.map((game, index) => (<Grid item key={index} container spacing={2} xs={3}>
                        <Card
                            sx={{
                                boxShadow: "0 5px 8px 0 rgba(0, 0, 0, 0.3)",
                                backgroundColor: "#2E3B55",
                                transition: "transform 0.15s ease-in-out",
                                "&:hover": {transform: "scale3d(1.02, 1.02, 1)"},
                                transformStyle: 'preserve-3d',
                            }}>
                            <CardActionArea href={game.gamePreviewUrl}>

                                <CardMedia component="img"
                                           image={"https://" + game.gameThumbnail}
                                />
                            </CardActionArea>
                        </Card>

                    </Grid>))}
                </Grid>}
            </Container>
        </div>
    </ThemeProvider>);
}

export default App;
