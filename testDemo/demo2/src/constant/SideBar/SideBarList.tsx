import React from 'react';

import InboxIcon from '@mui/icons-material/MoveToInbox';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import StarBorder from '@mui/icons-material/StarBorder';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import ThunderstormIcon from '@mui/icons-material/Thunderstorm';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';

export const SideBarList = {
    home: {
        id: 'home',
        i18nKey: 'home',
        apps: [{
            'i18nKey': 'home',
            'url': '/home',
            'icon': <HomeOutlinedIcon/>,
            'child': [],
            'expand': false,
            'active': false
        }, {
            'i18nKey': 'about',
            'url': '/about',
            'icon': <InboxIcon/>,
            'child': [],
            'expand': false,
            'active': false,
        }, {
            'i18nKey': 'Collapse',
            'url': '',
            'icon': <InboxIcon/>,
            'child': [{
                'i18nKey': 'Collapse',
                'url': '/collapse',
                icon: <FiberManualRecordIcon/>
            }],
            'expand': false,
            'active': false
        }],
    },


    exercises: {
        id: 'exercises',
        i18nKey: 'exercises',
        apps: [{
            'i18nKey': 'exercises',
            'url': '',
            'icon': <MenuBookIcon/>,
            'child': [
                {
                    'i18nKey': 'todo',
                    'url': '/todo',
                    icon: <FiberManualRecordIcon/>
                },
                {
                    'i18nKey': 'weather',
                    'url': '/weather',
                    icon: <FiberManualRecordIcon/>
                },
                {
                    'i18nKey': 'Collapse 2',
                    'url': '/collapse2',
                    icon: <FiberManualRecordIcon/>
                }

            ],
            'expand': false,
            'active': false
        }],
    }
}