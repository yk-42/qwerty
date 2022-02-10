/* eslint-disable react/prop-types */
import React from 'react'
import { Route } from 'react-router-dom'

import { RequireAuth } from '../components/security/RequireAuth'

/**
 * takes a certain route object,
 * enroll its element inside its required ancestors
 *  > i.e: RequireAuth if it is a private route
 * have its children rendered as-well
 * @param {*} param Object of the `routes/index.js` appRouting
 * @returns {JSXElement}
 */
export const RenderRouteUtil = ({
  name,
  nestedRoutes,
  private: isPrivate,
  ...other
}) => {
  let NestedRoutes = null
  if (nestedRoutes) {
    NestedRoutes = <>{nestedRoutes.map(RenderRouteUtil)}</>
  }
  const pureProps = { children: NestedRoutes, ...other }
  if (pureProps.element) {
    pureProps.element = (
      <React.Suspense fallback={<>...</>}>{pureProps.element}</React.Suspense>
    )
  }
  if (isPrivate) {
    pureProps.element = <RequireAuth>{pureProps.element}</RequireAuth>
  }
  const RouteComponent = <Route key={name} {...pureProps} />

  return RouteComponent
}
