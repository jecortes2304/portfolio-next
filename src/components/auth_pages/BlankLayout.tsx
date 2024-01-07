"use client"

import { styled } from '@mui/material/styles'
import Box, { BoxProps } from '@mui/material/Box'
import Grid from '@mui/material/Grid'

const BlankLayoutWrapper = styled(Box)<BoxProps>(({ theme }) => ({

  '& .content-center': {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.spacing(5)
  },

  '& .content-right': {
    display: 'flex',
    minHeight: '100vh',
    overflowX: 'hidden',
    position: 'relative'
  }
}))

export default function BlankLayout ({ children, }: { children: React.ReactNode }) {
  return (
    <BlankLayoutWrapper className='layout-wrapper'>
      <Grid>
        {children}
      </Grid>
    </BlankLayoutWrapper>
  )
}

