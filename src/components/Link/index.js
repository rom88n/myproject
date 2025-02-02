import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { useRouter } from 'next/router'
import NextLink from 'next/link'
import MuiLink from '@material-ui/core/Link'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles({
  link: {
    '&:hover': {
      textDecoration: 'none',
      color: 'unset'
    }
  }
})

const NextComposed = React.forwardRef((props, ref) => {
  const { as, href, prefetch, ...other } = props
  const router = useRouter()

  // const handleClick = (event) => {
  //   router.push(href)
  //   event.preventDefault()
  // }

  return (
    <NextLink href={href} prefetch={prefetch} as={as}>
      {/* eslint-disable-next-line jsx-a11y/anchor-has-content */}
      <a ref={ref} {...other} />
    </NextLink>
  )
})

NextComposed.propTypes = {
  as: PropTypes.string,
  href: PropTypes.string,
  prefetch: PropTypes.bool,
}

function Link(props) {
  const {
    activeClassName = 'active',
    className: classNameProps,
    innerRef,
    naked,
    ...other
  } = props
  const router = useRouter()
  const classes = useStyles()

  const className = classNames(classes.link, classNameProps, {
    [activeClassName]: router.pathname === props.href && activeClassName,
  })

  if (naked) {
    return <NextComposed className={className} ref={innerRef} {...other} />
  }

  return <MuiLink component={NextComposed} className={className} ref={innerRef} {...other} />
}

Link.propTypes = {
  activeClassName: PropTypes.string,
  as: PropTypes.string,
  className: PropTypes.string,
  href: PropTypes.string,
  innerRef: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
  naked: PropTypes.bool,
  onClick: PropTypes.func,
  prefetch: PropTypes.bool,
}

export default React.forwardRef((props, ref) => <Link {...props} innerRef={ref}/>)
