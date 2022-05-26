import {Card, CardActionArea, CardMedia, createTheme, Grid, ThemeProvider} from "@mui/material";

export const Casino = (props) => {

    //Style

    const theme = createTheme({

        status: {
            danger: '#e53e3e',
        },
        palette: {
            primary: {
                main: '#2E3B55',
                darker: '#053e85',
            },
            neutral: {
                main: '#64748B',
                contrastText: '#fff',
            },
        },
    });

    return (
        <ThemeProvider theme={theme}>

            <Grid container spacing={3} style={{backgroundColor: '#2E3B55'}}>
                {props.props.map((game, index) => (
                        <Grid item key={index} container spacing={2} xs={3} style={{backgroundColor: '#2E3B55'}}>
                            <Card
                                sx={{
                                    boxShadow: "0 5px 8px 0 rgba(0, 0, 0, 0.3)",
                                    backgroundColor: "#2E3B55",
                                    transition: "transform 0.15s ease-in-out",
                                    "&:hover": {transform: "scale3d(1.02, 1.02, 1)"},
                                    transformStyle: 'preserve-3d',
                                }}
                            >
                                <CardActionArea href={game.gamePreviewUrl}>
                                    <CardMedia component="img"
                                               image={"https://" + game.gameThumbnail}/>
                                </CardActionArea>
                            </Card>
                        </Grid>
                    )
                )}
            </Grid>

        </ThemeProvider>

    );
}