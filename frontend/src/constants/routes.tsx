const ROUTES = {
  HOME: '/',
  ABOUT: '/about',
  LOGIN: '/login',
  NOTFOUND: '/notfound',
  SIGNUP: {
    INDEX: '/signup',
    STEP1: '/signup/step1/:email/:name',
    STEP2: '/signup/step2',
    STEP3: '/signup/step3',
    COMPLETE: '/signup/complete',
  },
  MY_PAGE: '/my-page',
};

export default ROUTES;
