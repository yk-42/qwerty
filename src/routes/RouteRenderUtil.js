/* eslint-disable react/prop-types */
import React from 'react'
import { Route } from 'react-router-dom'
import { RequireAuth } from '../components/security/RequireAuth'

export const RenderRouteUtil = ({
  name,
  route,
  element,
  nestedRoutes,
  private: isPrivate,
  ...other
}) => {
  let NestedRoutes = null
  if (nestedRoutes) {
    NestedRoutes = <>{nestedRoutes.map(RenderRouteUtil)}</>
  }
  const pureProps = { route, element, children: NestedRoutes, ...other }
  const RouteComponent = <Route key={name} {...pureProps} />

  if (isPrivate) {
    return <RequireAuth>{RouteComponent}</RequireAuth>
  }
  return RouteComponent
}
