import user from './user.r'
import post from './post.r';
import like from './like.r';

export default function routerSetup(app){
  app.use(user);
  app.use(post);
  app.use(like);
}