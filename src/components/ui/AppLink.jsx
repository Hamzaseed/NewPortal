import { Link, NavLink, useInRouterContext } from 'react-router-dom'

function resolveClassName(className, isActive) {
  if (typeof className === 'function') {
    return className({ isActive })
  }

  return className
}

export function AppLink({ to, className, children, ...props }) {
  const inRouter = useInRouterContext()

  if (!inRouter) {
    return (
      <a href={to} className={resolveClassName(className, false)} {...props}>
        {children}
      </a>
    )
  }

  return (
    <Link to={to} className={resolveClassName(className, false)} {...props}>
      {children}
    </Link>
  )
}

export function AppNavLink({ to, className, children, ...props }) {
  const inRouter = useInRouterContext()

  if (!inRouter) {
    return (
      <a href={to} className={resolveClassName(className, false)} {...props}>
        {children}
      </a>
    )
  }

  return (
    <NavLink to={to} className={className} {...props}>
      {children}
    </NavLink>
  )
}
