import { useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea, Avatar, Grid } from '@mui/material';
import axios from 'axios';

const REACT_APP_BASE_URL = process.env.REACT_APP_BASE_URL
function EmpCardetails() {
    const [UserData, setUserData] = useState([])

    useEffect(() => {
        getAllEmpDetails();
    }, []);

    const getAllEmpDetails = async () => {
        await axios.get(`${REACT_APP_BASE_URL}/getRecords/getAllEmp`)
            .then(response => {
                setUserData(response.data.data);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    };

      


    return (
        <div>
            <Grid container spacing={2} justifyContent="center">
                {UserData.map((item) => (
                    <Grid item key={item._id}>
                        <Card key={item._id} sx={{ maxWidth: 250, m: 1, flexGrow: 1 }}>
                            <CardActionArea sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', py: 2 }}>
                                <Avatar
                                    alt="User Profile"
                                    src={item.picture}
                                    sx={{ width: 130, height: 130 }}
                                />
                                <CardContent sx={{ textAlign: 'center' }}>
                                    <Typography gutterBottom variant="h6" component="div" sx={{
                                        width: '200px',
                                        height: '30px',
                                        overflow: 'hidden',
                                        textOverflow: 'ellipsis',
                                        whiteSpace: 'nowrap',
                                        textAlign: 'center',
                                      
                                    }}>
                                        {`${item.firstName} ${item.lastName}`}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        Lizards are a widespread group of squamate reptiles, with over 6,000
                                        species, ranging across all continents except Antarctica
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    </Grid>
                ))}
            </Grid>

        </div>
    )
}

export default EmpCardetails
