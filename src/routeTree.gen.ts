/* prettier-ignore-start */

/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file is auto-generated by TanStack Router

import { createFileRoute } from '@tanstack/react-router'

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as AdminImport } from './routes/_admin'
import { Route as AdminAdminStudentsIndexImport } from './routes/_admin/admin/students/index'

// Create Virtual Routes

const IndexLazyImport = createFileRoute('/')()
const AdminAdminIndexLazyImport = createFileRoute('/_admin/admin/')()

// Create/Update Routes

const AdminRoute = AdminImport.update({
  id: '/_admin',
  getParentRoute: () => rootRoute,
} as any)

const IndexLazyRoute = IndexLazyImport.update({
  path: '/',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/index.lazy').then((d) => d.Route))

const AdminAdminIndexLazyRoute = AdminAdminIndexLazyImport.update({
  path: '/admin/',
  getParentRoute: () => AdminRoute,
} as any).lazy(() =>
  import('./routes/_admin/admin/index.lazy').then((d) => d.Route),
)

const AdminAdminStudentsIndexRoute = AdminAdminStudentsIndexImport.update({
  path: '/admin/students/',
  getParentRoute: () => AdminRoute,
} as any).lazy(() =>
  import('./routes/_admin/admin/students/index.lazy').then((d) => d.Route),
)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      preLoaderRoute: typeof IndexLazyImport
      parentRoute: typeof rootRoute
    }
    '/_admin': {
      preLoaderRoute: typeof AdminImport
      parentRoute: typeof rootRoute
    }
    '/_admin/admin/': {
      preLoaderRoute: typeof AdminAdminIndexLazyImport
      parentRoute: typeof AdminImport
    }
    '/_admin/admin/students/': {
      preLoaderRoute: typeof AdminAdminStudentsIndexImport
      parentRoute: typeof AdminImport
    }
  }
}

// Create and export the route tree

export const routeTree = rootRoute.addChildren([
  IndexLazyRoute,
  AdminRoute.addChildren([
    AdminAdminIndexLazyRoute,
    AdminAdminStudentsIndexRoute,
  ]),
])

/* prettier-ignore-end */
