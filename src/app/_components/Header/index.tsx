{
  /* eslint-disable @next/next/no-img-element */
}

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

import { Header } from '../../../payload/payload-types'
import { fetchHeader } from '../../_api/fetchGlobals'
import { Gutter } from '../Gutter'
import { Button } from '../ui/button'
import { HeaderNav } from './Nav'

import classes from './index.module.scss'

export async function Header() {
  let header: Header | null = null

  try {
    header = await fetchHeader()
  } catch (error) {
    // When deploying this template on Payload Cloud, this page needs to build before the APIs are live
    // So swallow the error here and simply render the header without nav items if one occurs
    // in production you may want to redirect to a 404  page or at least log the error somewhere
    // console.error(error)
  }

  return (
    <>
      <header className={`${classes.header} bg-gray-900`}>
        <Gutter className={classes.wrap}>
          <Link href="/">
            <Image
              src={'/sevenmates/logo_white.png'}
              alt="Sevenmates logo"
              width={200}
              height={70}
            />
          </Link>
          <HeaderNav header={header} />
        </Gutter>
      </header>
    </>
  )
}
