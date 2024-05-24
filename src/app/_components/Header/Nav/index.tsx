'use client'

import React from 'react'
import Link from 'next/link'

import { Header as HeaderType, User } from '../../../../payload/payload-types'
import { useAuth } from '../../../_providers/Auth'
import { CartLink } from '../../CartLink'
import { CMSLink } from '../../Link'

import classes from './index.module.scss'

export const HeaderNav: React.FC<{ header: HeaderType; personalClasses?: string }> = ({
  header,
  personalClasses,
}) => {
  const navItems = header?.navItems || []
  const { user } = useAuth()

  return (
    <nav
      className={[
        classes.nav,
        personalClasses,
        // fade the nav in on user load to avoid flash of content and layout shift
        // Vercel also does this in their own website header, see https://vercel.com
        user === undefined && classes.hide,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {navItems.map(({ link }, i) => {
        return <CMSLink className="!text-white" key={i} {...link} appearance="none" />
      })}
      <CartLink className="!text-white" />
      {user && (
        <Link className="!text-white" href="/account">
          Account
        </Link>
      )}
      {!user && (
        <React.Fragment>
          <Link className="!text-white" href="/login">
            Login
          </Link>
          <Link className="!text-white" href="/create-account">
            Create Account
          </Link>
        </React.Fragment>
      )}
    </nav>
  )
}
