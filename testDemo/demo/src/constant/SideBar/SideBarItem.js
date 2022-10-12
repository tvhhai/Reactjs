import React from 'react';

import InboxIcon from '@mui/icons-material/MoveToInbox';
import HomeIcon from '@mui/icons-material/Home';
import StarBorder from '@mui/icons-material/StarBorder';

export const SideBarItem = [
    {
        'text': 'Home',
        'link': '/',
        'icon': <HomeIcon />,
        'level': 1,
        'nested': false,
        'child': [],
        'expand': false
    }, {
        'text': 'Test',
        'link': '/test',
        'icon': <InboxIcon />,
        'level': 1,
        'nested': false,
        'child': [],
        'expand': false

    }, {
        'text': 'About',
        'link': '/about',
        'icon': <InboxIcon />,
        'level': 1,
        'nested': false,
        'child': [],
        'expand': false

    }, {
        'text': 'Collapse',
        'link': '',
        'icon': <InboxIcon />,
        'level': 1,
        'nested': true,
        'child': [{
            'text': 'Collapse',
            'link': '/collapse',
            'icon': <StarBorder />,
            'level': 2
        }],
        'expand': false

    }, {
        'text': 'Collapse1',
        'link': '/about',
        'icon': <InboxIcon />,
        'level': 1,
        'nested': true,
        'child': [{
            'text': 'Collapse1',
            'link': '/collapse1',
            'icon': <StarBorder />,
            'level': 2
        }],
        'expand': false

    }, {
        'text': 'Collapse2',
        'link': '',
        'icon': <InboxIcon />,
        'level': 1,
        'nested': true,
        'child': [{
            'text': 'Collapse2',
            'link': '/collapse2',
            'icon': <StarBorder />,
            'level': 2
        }],
        'expand': false

    },
]