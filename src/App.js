import './App.css';
import {Card, CardActionArea, CardContent, CardMedia, Chip, Container, Grid, Paper, Typography} from "@mui/material";
import {useEffect, useState} from "react";


function App() {





    const [data, setData] = useState([]);
    const [date, setDate] = useState('')

    const [chosenCategory, setChosenCategory] = useState([])
    const [newCategory,setNewCategory] = useState([])

    const removeCategory = (x) => {
        setChosenCategory(chosenCategory.filter(item => item.id !== x))
    }

    const handleClick = (id) => {
        let x = id
        if (chosenCategory.some(item => item.id === x)) {
            // console.log('already chosen')
            removeCategory(x)
            newCategory.pop()
            // console.log(newPlatforms)
            document.getElementById(id).style.backgroundColor = 'white';
        } else {
            document.getElementById(id).style.backgroundColor = 'green';
            setChosenCategory(chosenGenres => [...chosenGenres, {id: id}])
            newCategory.push(x)
            // console.log(chosenPlatforms)
            // console.log(newPlatforms)
        }


        // console.log(chosenGenres)
    }


    useEffect(() => {
            fetch('https://www.mocky.io/v2/5da99f9f31000036004e0a4e')
                .then((res) => res.json())
                .then((data) => setData(data))
                .then(() => console.log(data))
                .then(() => console.log('useffectrun length smaller than zero'))
    }, [chosenCategory]);


    return (

        <div>

            <Container>
                <Typography
                    color="textPrimary"
                    variant="h3"
                    align="center"
                    paragraph
                > Upcoming games{" "} </Typography>
                <Typography color="textPrimary"
                            variant="h4"
                            align="center"
                            paragraph>Track games!</Typography>


                <Grid container spacing={2}>
                    {data.map((game, index) => (
                        <Grid item xs={12} sm={3} key={index}>
                            <Card
                                sx={{
                                    display: 'block',
                                    maxWidth: 'auto',
                                    boxShadow: "0 5px 8px 0 rgba(0, 0, 0, 0.3)",
                                    backgroundColor: "#fafafa",
                                    height: 1,
                                    transition: "transform 0.15s ease-in-out",
                                    "&:hover": {transform: "scale3d(1.02, 1.02, 1)"},
                                    transformStyle: 'preserve-3d',
                                }}
                            >
                                <CardActionArea>
                                    <CardMedia   sx={{height: 426, width: 324}}
                                               image={"https://"+ game.gameThumbnail}
                                    />
                                </CardActionArea>
                                <CardContent>
                                    {game.gameName}
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}

                </Grid>
            </Container>
        </div>

    );
}

export default App;
