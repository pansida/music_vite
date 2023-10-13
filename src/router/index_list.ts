import {discoverChilren} from "./discoverChilren"

export default [
  {
    path: "/discover",
    name: "discover",
    component: () => import("../components/Discover/Discover.vue"),
    children: discoverChilren,
    meta: {
      role: 0,
    },
  },
  {
    path: "/video",
    name: "video",
    component: () => import("../components/Video/Video.vue"),
    meta: {
      role: 1,
    },
  },
  {
    path: "/favorites",
    name: "favorites",
    component: () => import("../components/Favorites/Favorites.vue"),
    meta: {
      role: 1,
    },
  },
  {
    path: "/recommendmusic",
    name: "recommendmusic",
    component: () => import("../components/Recommendmusic/Recommendmusic.vue"),
    meta: {
      role: 1,
    },
  },
  {
    path: "/personal/:id",
    name: "personal",
    component: () => import("../components/Personal/Personal.vue"),
    meta:{
      role:1
    }
  },
  {
    path: "/musiclistdetail/:id",
    name: "musiclistdetail",
    component: () => import("../components/Musiclistdetail/Musiclistdetail.vue"),
    meta:{
      role:0
    }
  }
];
