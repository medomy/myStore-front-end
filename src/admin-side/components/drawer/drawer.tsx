import React from 'react';
import { Box, Drawer, Button, List, Divider, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { useNavigate } from 'react-router-dom';

interface props {
    isDrawer: boolean
}

const Admindrawer: React.FC<props> = ({ isDrawer }) => {
    const [drawer, setDrawer] = React.useState<boolean>(isDrawer);
    React.useEffect(()=>{
        setDrawer(isDrawer);
        console.log("drawer",drawer);
    },[isDrawer])
    const navigate = useNavigate();
    const openPages = (text : string)=>{
        navigate(`/admin/${text}`);

    }
    const toggleDrawer =
        (anchor: string, open: boolean) =>
            (event: React.KeyboardEvent | React.MouseEvent) => {
                if (
                    event.type === 'keydown' &&
                    ((event as React.KeyboardEvent).key === 'Tab' ||
                        (event as React.KeyboardEvent).key === 'Shift')
                ) {
                    return;
                }

                setDrawer(open);
            };
    const list = (anchor: string) => (
        <Box
            sx={{ width: 250 }}
            role="presentation"
            onClick={toggleDrawer('left', false)}
            onKeyDown={toggleDrawer('left', false)}
        >
            <h6>Admin area</h6>
            <List>
                {['categories','products'].map((text, index) => (
                    <ListItem button onClick={()=> openPages(text)} key={text}>
                        <ListItemText primary={text} />
                    </ListItem>
                ))}
            </List>
            <Divider />
            <List>
                {['users', 'orders'].map((text, index) => (
                    <ListItem button onClick={()=> openPages(text)} key={text}>
                        <ListItemText primary={text} />
                    </ListItem>
                ))}
            </List>
        </Box>
    );


    return (
        <>
            <Drawer
                anchor="left"
                open={drawer}
                onClose={toggleDrawer('left', false)}
            >
                {list('left')}
            </Drawer>
        </>
    )
}

export default Admindrawer;