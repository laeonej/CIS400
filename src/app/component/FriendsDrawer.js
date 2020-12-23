import React, { useState } from 'react'
import { Divider, List, ListItem, Drawer, Button } from '@material-ui/core'


export default function FriendsDrawer() {

    const [state, setState] = useState({
        right: false
      });

    const toggleDrawer = (anchor, open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
          return;
        }
    
        setState({ ...state, anchor : open });
    };

    const friendList = (anchor) => (
        <div 
            style={{width: 250}} 
            role='presentation' 
            onClick={toggleDrawer(anchor, false)}
            onKeyDown={toggleDrawer(anchor, false)}
        >
            <List>
                <ListItem>
                    Hello
                </ListItem>
                <Divider />
                <ListItem>
                    World
                </ListItem>
                <Divider />
                <ListItem>
                    Long name
                </ListItem>
                <Divider />
                <ListItem>
                    Really long name
                </ListItem>
            </List>

        </div>
    )

    return(
        <div>
      {['left'].map((anchor) => (
        <React.Fragment key={anchor}>
          <Button onClick={toggleDrawer(anchor, true)}>{anchor}</Button>
          <Drawer anchor={anchor} open={state[anchor]} onClose={toggleDrawer(anchor, false)}>
            {friendList(anchor)}
          </Drawer>
        </React.Fragment>
      ))}
    </div>
    )

}