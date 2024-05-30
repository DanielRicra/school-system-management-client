/* prettier-ignore-start */

/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file is auto-generated by TanStack Router

import { createFileRoute } from '@tanstack/react-router'

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as AdminImport } from './routes/_admin'
import { Route as AdminAdminUsersIndexImport } from './routes/_admin/admin/users/index'
import { Route as AdminAdminStudentsIndexImport } from './routes/_admin/admin/students/index'
import { Route as AdminAdminRoomsIndexImport } from './routes/_admin/admin/rooms/index'
import { Route as AdminAdminUsersUserIdImport } from './routes/_admin/admin/users/$userId'
import { Route as AdminAdminRoomsRoomIdImport } from './routes/_admin/admin/rooms/$room-id'

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

const AdminAdminUsersIndexRoute = AdminAdminUsersIndexImport.update({
  path: '/admin/users/',
  getParentRoute: () => AdminRoute,
} as any)

const AdminAdminStudentsIndexRoute = AdminAdminStudentsIndexImport.update({
  path: '/admin/students/',
  getParentRoute: () => AdminRoute,
} as any).lazy(() =>
  import('./routes/_admin/admin/students/index.lazy').then((d) => d.Route),
)

const AdminAdminRoomsIndexRoute = AdminAdminRoomsIndexImport.update({
  path: '/admin/rooms/',
  getParentRoute: () => AdminRoute,
} as any).lazy(() =>
  import('./routes/_admin/admin/rooms/index.lazy').then((d) => d.Route),
)

const AdminAdminUsersUserIdRoute = AdminAdminUsersUserIdImport.update({
  path: '/admin/users/$userId',
  getParentRoute: () => AdminRoute,
} as any)

const AdminAdminRoomsRoomIdRoute = AdminAdminRoomsRoomIdImport.update({
  path: '/admin/rooms/$room-id',
  getParentRoute: () => AdminRoute,
} as any)

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
    '/_admin/admin/rooms/$room-id': {
      preLoaderRoute: typeof AdminAdminRoomsRoomIdImport
      parentRoute: typeof AdminImport
    }
    '/_admin/admin/users/$userId': {
      preLoaderRoute: typeof AdminAdminUsersUserIdImport
      parentRoute: typeof AdminImport
    }
    '/_admin/admin/rooms/': {
      preLoaderRoute: typeof AdminAdminRoomsIndexImport
      parentRoute: typeof AdminImport
    }
    '/_admin/admin/students/': {
      preLoaderRoute: typeof AdminAdminStudentsIndexImport
      parentRoute: typeof AdminImport
    }
    '/_admin/admin/users/': {
      preLoaderRoute: typeof AdminAdminUsersIndexImport
      parentRoute: typeof AdminImport
    }
  }
}

// Create and export the route tree

export const routeTree = rootRoute.addChildren([
  IndexLazyRoute,
  AdminRoute.addChildren([
    AdminAdminIndexLazyRoute,
    AdminAdminRoomsRoomIdRoute,
    AdminAdminUsersUserIdRoute,
    AdminAdminRoomsIndexRoute,
    AdminAdminStudentsIndexRoute,
    AdminAdminUsersIndexRoute,
  ]),
])

/* prettier-ignore-end */
