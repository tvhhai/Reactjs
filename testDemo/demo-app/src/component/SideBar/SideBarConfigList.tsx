import React from 'react';

import InboxIcon from '@mui/icons-material/MoveToInbox';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import SettingsIcon from '@mui/icons-material/Settings';
import DashboardIcon from '@mui/icons-material/Dashboard';

export const SideBarConfigList = {
    dashboard: {
        id: 'dashboard',
        i18nKey: 'sidebar.dashboard',
        url: '/dashboard',
        icon: <DashboardIcon/>,
    },
    home: {
        id: 'home',
        i18nKey: 'sidebar.home',
        apps: [{
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
                // {
                //     i18nKey: 'sidebar.weather',
                //     url: '/weather'
                // },
                // {
                //     i18nKey: 'Counter',
                //     url: '/counter'
                // }
            ],
            expand: false,
            active: false
        }],
    },

    administration: {
        id: 'administration',
        i18nKey: 'sidebar.administration',
        apps: [{
            i18nKey: 'sidebar.preferences',
            url: '/preferences',
            icon: <SettingsIcon/>,
            expand: false,
            active: false,
            child: [
                {
                    i18nKey: 'sidebar.userSetting',
                    url: '/userSettings'
                },
                {
                    i18nKey: 'sidebar.systemSetting',
                    url: '/systemSettings'
                }
            ],
        }]
    }
}