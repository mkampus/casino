import './App.css';
import {
    Autocomplete,
    Card,
    CardActionArea,
    CardContent,
    CardMedia,
    Chip,
    Container,
    Grid,
    Paper,
    Stack, TextField,
    Typography
} from "@mui/material";
import {useEffect, useState} from "react";
import {Casino} from "./components/Casino";


function App() {

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [data, setData] = useState([]);
    const [filteredData, setFilteredData] = useState(null);
    const [date, setDate] = useState('')
    const [chosenCategory, setChosenCategory] = useState([])
    const [chosenGamesArray, setChosenGamesArray] = useState([])
    const [gameCategories, setGameCategories] = useState([{id: 1, game: "slots"}, {id: 2, game: "table games"}, {
        id: 3,
        game: "jackpots"
    }, {id: 4, game: "favourites"}, {id: 5, game: "newest"}, {id: 6, game: "instant win"},
        {id: 7, game: "Daily Jackpots"}, {id: 8, game: "top games"}, {id: 9, game: "exciting games"}])


    // const selected = data.filter(data => data.categories.includes(chosenCategory.game));
    // console.log(selected)




    const initialData = () => {
        let x = fetch('https://www.mocky.io/v2/5da99f9f31000036004e0a4e')
            .then((res) => res.json())
            .then((data) => setData(data))
            .then(() => console.log('getinitialuseffectrun'))
            .then(() => console.log(data))
            .catch(error => {
                console.log('Error getting data: ' + error);
            })
    }


    useEffect(() => {
        console.log('none chosen')
        initialData()
    }, [])


    const handleClick = (id, game) => {
        let x = id
        console.log(chosenCategory.length)

        if (chosenCategory.some(item => item.id === x)) {
            // console.log('already chosen')
            removeCategory(x, game)
            // console.log(chosenCategory)
            // console.log(newPlatforms)
            document.getElementById(id).style.backgroundColor = 'white';
            if (chosenCategory.length === 1) {
                console.log('nullified')
                setFilteredData(null)
                initialData()
            }

        } else {
            document.getElementById(id).style.backgroundColor = 'green';
            setChosenCategory(chosenCategory => [...chosenCategory, {id: id, game: game}])
            let x = chosenCategory.map(a => a.game);
            setChosenGamesArray(chosenGamesArray => [...chosenGamesArray, game])
            // console.log(chosenGamesArray)

            // let result = data.map((a) => ({
            //     gameName: a.gameName,
            //     gamePreviewUrl: a.gamePreviewUrl,
            //     gameThumbnail: a.gameThumbnail,
            //     language: a.language,
            //     slug: a.slug,
            //     game: a.categories}));

        }

    }

    const removeCategory = (x, game) => {
        setChosenCategory(chosenCategory.filter(item => item.id !== x))
        let f = chosenGamesArray
        setChosenGamesArray(f.filter(v => v !== game))
    }


    useEffect(() => {


        if (chosenCategory.length >= 1) {
            // let x = chosenCategory.map(a => a.game);
            // // console.log(x)
            // fetch('https://www.mocky.io/v2/5da99f9f31000036004e0a4e')
            //     .then((res) => res.json())
            //     .then((data) => setData(data))
            //     .then(() => console.log('useffectrun'))
            //     .then(() => console.log(data))

            const filterByCategories = chosenGamesArray
            const filterByCategoriesSet = new Set(filterByCategories);
            const result1 = data.filter((o) =>
                o.categories.some((game) => filterByCategoriesSet.has(game))
            );
            setFilteredData(result1)
        }
    }, [chosenCategory]);

    // useEffect(() => {
    //
    //     if (chosenCategory.length <= 1) {
    //         console.log('none chosen')
    //         fetch('https://www.mocky.io/v2/5da99f9f31000036004e0a4e')
    //             .then((res) => res.json())
    //             .then((data) => setData(data))
    //             .then(() => console.log('useffectrun'))
    //             // .then(() => console.log(data))
    //             .catch(error => {
    //                 console.log('Error getting data: ' + error);
    //             })
    //     } else {
    //         // let x = chosenCategory.map(a => a.game);
    //         // // console.log(x)
    //         // fetch('https://www.mocky.io/v2/5da99f9f31000036004e0a4e')
    //         //     .then((res) => res.json())
    //         //     .then((data) => setData(data))
    //         //     .then(() => console.log('useffectrun'))
    //         //     .then(() => console.log(data))
    //
    //         const filterByCategories = chosenGamesArray
    //         const filterByCategoriesSet = new Set(filterByCategories);
    //         const result1 = data.filter((o) =>
    //             o.categories.some((game) => filterByCategoriesSet.has(game))
    //         );
    //         setFilteredData(result1)
    //     }
    // }, [chosenCategory]);


    return (
        <div>

            <Typography
                color="textPrimary"
                variant="h4"
                align="center"
            > Casino{" "} </Typography>
            <Grid item xs={2}>
                <Grid sx={{
                    p: 1,
                    spacing: 1,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>
                    {gameCategories.map(({game, id}) => (
                        <Chip variant="outlined" clickable={true} label={game.toUpperCase()} id={id}
                              onClick={() => handleClick(id, game)}
                        />))}

                </Grid>
                <Container sx={{
                    p: 2,
                    spacing: 1,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>
                    <Stack spacing={1} sx={{ width: 300 }} >
                        <Autocomplete
                            id="free-solo-demo"
                            freeSolo
                            options={data.map((option) => option.gameName)}
                            renderInput={(params) => <TextField {...params} label="Search" />}
                        />
                    </Stack>
                </Container>

            </Grid>

            <Container maxWidth="xl" >

                {filteredData ? <Casino props={filteredData}></Casino> :
                    <Grid container spacing={3}>
                        {data.map((game, index) => (
                                <Grid item key={index} container spacing={2} xs={3}>
                                    <Card
                                        sx={{
                                            boxShadow: "0 5px 8px 0 rgba(0, 0, 0, 0.3)",
                                            backgroundColor: "#fafafa",
                                            transition: "transform 0.15s ease-in-out",
                                            "&:hover": {transform: "scale3d(1.02, 1.02, 1)"},
                                            transformStyle: 'preserve-3d',
                                        }}>
                                        <CardActionArea>
                                            <CardMedia component="img"
                                                       image={"https://" + game.gameThumbnail}/>
                                        </CardActionArea>
                                    </Card>
                                </Grid>
                            )
                        )}
                    </Grid>}
            </Container>

            }}

            {/*<Container maxWidth="xl">*/}
            {/*    {filteredData ? <Grid container spacing={3}>*/}
            {/*        {filteredData.map((game, index) => (*/}
            {/*                <Grid item key={index} container spacing={2} xs={3}>*/}
            {/*                    <Card*/}
            {/*                        sx={{*/}
            {/*                            boxShadow: "0 5px 8px 0 rgba(0, 0, 0, 0.3)",*/}
            {/*                            backgroundColor: "#fafafa",*/}
            {/*                            transition: "transform 0.15s ease-in-out",*/}
            {/*                            "&:hover": {transform: "scale3d(1.02, 1.02, 1)"},*/}
            {/*                            transformStyle: 'preserve-3d',*/}
            {/*                        }}*/}
            {/*                    >*/}
            {/*                        <CardActionArea>*/}
            {/*                            <CardMedia component="img"*/}
            {/*                                       image={"https://" + game.gameThumbnail}/>*/}
            {/*                        </CardActionArea>*/}
            {/*                        /!*<div>*!/*/}
            {/*                        /!*    {game.categories.filter(games => games.includes('table games')).map(filteredName => (*!/*/}
            {/*                        /!*        <li>*!/*/}
            {/*                        /!*            {filteredName}*!/*/}
            {/*                        /!*        </li>*!/*/}
            {/*                        /!*    ))}*!/*/}
            {/*                        /!*</div>*!/*/}
            {/*                    </Card>*/}
            {/*                </Grid>*/}
            {/*            )*/}
            {/*        )}*/}
            {/*    </Grid> : <Grid container spacing={3}>*/}
            {/*        {data.map((game, index) => (*/}
            {/*                <Grid item key={index} container spacing={2} xs={3}>*/}
            {/*                    <Card*/}
            {/*                        sx={{*/}
            {/*                            boxShadow: "0 5px 8px 0 rgba(0, 0, 0, 0.3)",*/}
            {/*                            backgroundColor: "#fafafa",*/}
            {/*                            transition: "transform 0.15s ease-in-out",*/}
            {/*                            "&:hover": {transform: "scale3d(1.02, 1.02, 1)"},*/}
            {/*                            transformStyle: 'preserve-3d',*/}
            {/*                        }}*/}
            {/*                    >*/}
            {/*                        <CardActionArea>*/}
            {/*                            <CardMedia component="img"*/}
            {/*                                       image={"https://" + game.gameThumbnail}/>*/}
            {/*                        </CardActionArea>*/}
            {/*                        /!*<div>*!/*/}
            {/*                        /!*    {game.categories.filter(games => games.includes('table games')).map(filteredName => (*!/*/}
            {/*                        /!*        <li>*!/*/}
            {/*                        /!*            {filteredName}*!/*/}
            {/*                        /!*        </li>*!/*/}
            {/*                        /!*    ))}*!/*/}
            {/*                        /!*</div>*!/*/}
            {/*                    </Card>*/}
            {/*                </Grid>*/}
            {/*            )*/}
            {/*        )}*/}
            {/*    </Grid>}*/}

            {/*</Container>*/}
        </div>

    );
}

export default App;
