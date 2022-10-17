import React from 'react';

import InboxIcon from '@mui/icons-material/MoveToInbox';
import HomeIcon from '@mui/icons-material/Home';
import StarBorder from '@mui/icons-material/StarBorder';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import MenuBookIcon from '@mui/icons-material/MenuBook';


export const SideBarItem = [
    {
        'text': 'Home',
        'link': '/home',
        'icon': <HomeIcon/>,
        'nested': false,
        'child': [],
        'expand': false
    }, {
        'text': 'Test',
        'link': '/test',
        'icon': <InboxIcon/>,
        'nested': false,
        'child': [],
        'expand': false

    }, {
        'text': 'About',
        'link': '/about',
        'icon': <InboxIcon/>,
        'nested': false,
        'child': [],
        'expand': false

    }, {
        'text': 'Collapse',
        'link': '',
        'icon': <InboxIcon/>,
        'nested': true,
        'child': [{
            'text': 'Collapse',
            'link': '/collapse',
            'icon': <StarBorder/>,
        }],
        'expand': false

    }, {
        'text': 'Exercise',
        'link': '',
        'icon': <MenuBookIcon/>,
        'nested': true,
        'child': [
            {
                'text': 'Collapse 1',
                'link': '/collapse1',
                'icon': <StarBorder/>,
            },
            {
                'text': 'Collapse 2',
                'link': '/collapse2',
                'icon': <StarBorder/>,
            }
            ,
            {
                'text': 'Todo',
                'link': '/todo',
                'icon': <FormatListBulletedIcon/>,
            }
        ],
        'expand': false

    },
    // {
    //     'text': 'Todo',
    //     'link': '/todo',
    //     'icon': <InboxIcon/>,
    //     'nested': false,
    //     'child': [],
    //     'expand': false
    //
    // },
]