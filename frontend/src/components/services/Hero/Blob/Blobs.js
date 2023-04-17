import { Hidden } from '@material-ui/core'
import * as React from 'react'
import { Blob } from 'react-blob'

export const Avatar = ({src, alt}) =>
  <Blob size="100px" src={src} alt={alt}/>

export const FunnyLinkButton = ({href, ...props}) =>
  <a href={href}><Blob size="2em" {...props}/></a>


export const HeroBlob = ({style, props}) =>
  <Blob size="60vh"
    style={{
        position: 'absolute',
        top: '15%',
        right: '55%',
        zIndex: 0,
        backgroundColor: '#FF0000',
        opacity: 0.2,
        fontSize: '50vh',
        overflow: 'hidden',
        '@media only screen and (min-width: 768px)': {
          display: 'none',
        },
    }}
    {...props}
  />
