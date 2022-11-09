import React from 'react';

import InboxIcon from '@mui/icons-material/MoveToInbox';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import MenuBookIcon from '@mui/icons-material/MenuBook';

export const SideBarConfigList = {
    home: {
        id: 'home',
        i18nKey: 'home',
        apps: [{
            i18nKey: 'sidebar.home',
            url: '/home',
            icon: <HomeOutlinedIcon/>,
            child: [],
            expand: false,
            active: false
        }, {
            i18nKey: 'sidebar.about',
            url: '/about',
            icon: <InboxIcon/>,
            child: [],
            expand: false,
            active: false,
        }, {
            i18nKey: 'Collapse',
            url: '',
            icon: <InboxIcon/>,
            child: [{
                'i18nKey': 'Collapse',
                'url': '/collapse'
            }],
            expand: false,
            active: false
        }],
    },


    exercises: {
        id: 'exercises',
        i18nKey: 'sidebar.exercises',
        apps: [{
            i18nKey: 'sidebar.exercises',
            url: '',
            icon: <MenuBookIcon/>,
            child: [
                {
                    i18nKey: 'sidebar.todo',
                    url: '/todo'
                },
                {
                    i18nKey: 'sidebar.phone',
                    url: '/phone'
                },
                {
                    i18nKey: 'sidebar.weather',
                    url: '/weather'
                },
                {
                    i18nKey: 'Counter',
                    url: '/counter'
                }
            ],
            expand: false,
            active: false
        }],
    }
}