export const discoverChilren = [
  {
    path: "/discover/recommend",
    name: "recommend",
    component: () => import("../components/Discover/Recommend/Recommend.vue"),
    meta: {
      role: 0,
    },
  },
  {
    path: "/discover/musiclist",
    name: "musiclist",
    component: () => import("../components/Discover/Musiclist/Musiclist.vue"),
    meta: {
      role: 0,
    },
  },
  {
    path: "/discover/ranking",
    name: "ranking",
    component: () => import("../components/Discover/Ranking/Ranking.vue"),
    meta: {
      role: 0,
    },
  },
  {
    path: "/discover/singer",
    name: "singer",
    component: () => import("../components/Discover/Singer/Singer.vue"),
    meta: {
      role: 0,
    },
  },
];
