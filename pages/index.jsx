import React from 'react'
import { createUseStyles } from 'react-jss'
import { mergeClassNames, theming } from '@mantine/core'
import Auth from '../components/Auth/Auth'
import { redirectIfUser } from '../utils/page'
import wave from '../assets/wave.svg'
import waveDarker from '../assets/wave_darker.svg'
import waveTop from '../assets/wave_top.svg'
import waveTopDarker from '../assets/wave_top_darker.svg'

const useStyles = createUseStyles(
  (theme) => ({
    container: {
      position: 'relative',
      height: '100vh',
      overflow: 'hidden',
    },
    contentWrap: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-end',
      maxWidth: 980,
      margin: '0 auto',
      padding: `300px ${theme.spacing.xl}px 0`,
    },
    waveTop: {
      position: 'absolute',
      top: -500,
      width: '100%',
      height: 1000,
      transform: 'rotate(180deg)',
      backgroundImage: `url(${waveTop.src})`,
      backgroundSize: 'cover',
      pointerEvents: 'none',
    },
    waveTopDarker: {
      position: 'absolute',
      top: -480,
      width: '100%',
      height: 1000,
      transform: 'rotate(180deg)',
      backgroundImage: `url(${waveTopDarker.src})`,
      backgroundSize: 'cover',
      pointerEvents: 'none',
    },
    wave: {
      position: 'absolute',
      bottom: -300,
      width: '100%',
      height: 1000,
      backgroundImage: `url(${wave.src})`,
      backgroundSize: 'cover',
      pointerEvents: 'none',
    },
    waveDarker: {
      position: 'absolute',
      bottom: -280,
      width: '100%',
      height: 1000,
      backgroundImage: `url(${waveDarker.src})`,
      backgroundSize: 'cover',
      pointerEvents: 'none',
    },
    title: {
      textAlign: 'right',
      marginBottom: theme.spacing.sm,
      fontSize: '4rem',
    },
    lead: {
      fontSize: theme.fontSizes.xl,
      marginBottom: 80,
    },
    startCta: {
      fontSize: theme.fontSizes.md,
      paddingRight: theme.spacing.xl,
    },
  }),
  { theming }
)

export default function Home() {
  const classes = useStyles()
  console.log(wave)

  return (
    <div className={classes.container}>
      <div className={classes.waveTopDarker} />
      <div className={classes.waveTop} />
      <div className={classes.contentWrap}>
        <div className={classes.title}>Candidately</div>
        <div className={classes.lead}>keep track of your job applications</div>
        <div>
          <span className={classes.startCta}>start now 👉</span>
          <Auth />
        </div>
      </div>
      <div className={classes.waveDarker} />
      <div className={classes.wave} />
    </div>
  )
}

export async function getServerSideProps({ req }) {
  return redirectIfUser(req)
}
