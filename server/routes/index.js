import ArticleRoutes from './ArticleRoutes';
import AuthorsRoures from './AuthorsRoutes';
import WebsiteRoutes from './WebsitesRoutes';

const Routes = {
  init () {
    const routes = {
      ArticleRoutes,
      AuthorsRoures,
      WebsiteRoutes,
    };
    Object.values(routes).forEach((route) => {
      route.init();
    });
  },
};

export default Routes;
