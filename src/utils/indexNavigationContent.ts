// ** Icon imports
import Profile from '@mui/icons-material/AccountCircleOutlined'
import About from '@mui/icons-material/Info'
import Dashboard from '@mui/icons-material/Dashboard'
import Settings from '@mui/icons-material/Settings'
import Summarize from '@mui/icons-material/Summarize'
import Portfolio from '@mui/icons-material/Folder'

export type NavLink = {
    path?: string
    title: string
    action?: string
    subject?: string
    disabled?: boolean
    badgeContent?: string
    externalLink?: boolean
    openInNewTab?: boolean
    icon?: string | string[] | any
    badgeColor?: 'default' | 'primary' | 'secondary' | 'success' | 'error' | 'warning' | 'info'
}


const navigationContent = (): NavLink[] => {
    return [
        {
            title: 'Dashboard',
            icon: Dashboard,
            path: '/admin/dashboard'
        },
        {
            title: 'Perfil',
            icon: Profile,
            path: '/admin/profile'
        },
        {
            title: 'Ajustes',
            icon: Settings,
            path: '/admin/settings'
        },
        {
            title: 'Resumen',
            icon: Summarize,
            path: '/admin/summarize'
        },
        {
            title: 'Acerca de',
            icon: About,
            path: '/admin/about'
        },
        {
            title: 'Portafolio',
            icon: Portfolio,
            path: '/admin/portfolio'
        },
    ]
}

export default navigationContent
