import user from './user.r'
import post from './post.r';

export default function routerSetup(app){
  app.use(user);
  app.use(post);
}