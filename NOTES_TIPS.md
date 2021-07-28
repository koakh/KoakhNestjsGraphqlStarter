Hello @jmcdo29 
quote @jmcdo29 > You need to have a USER_SERVICE provider as a part of your AuthModule. It can be a factory that injects the AUTH_MODULE_OPTIONS and pulls out the service
I already try so many things......I'm lost 
I have a USER_SERVICE provider as part of 
are you saying that Im must pass the UserService in AUTH_MODULE_OPTIONS?
currently I only have this in 
export interface AuthModuleOptions {
  secret: string;
  expiresIn: string;
}

and what is the property
export interface AuthModuleOptions {
  secret: string;
  expiresIn: string;
  userService: UserServiceAbstract;
}

export abstract class UserServiceAbstract {
  abstract findOneByField(field: string, value: string) : Promise<AuthUser | undefined>;
}
jmcdo29 — Hoje às 17:44
Right, so your options also needs to define a service to make use of, right?
koakh — Hoje às 17:44
I confess that I don't try it, maybe that is the solution
please can you check if above
export interface AuthModuleOptions {
  secret: string;
  expiresIn: string;
  userService: UserServiceAbstract;
}

is ok, to star another round!
jmcdo29 — Hoje às 17:46
Yeah, that part looks good. You'd pass the service on after injecting it via a class or factory, then in your auth module you use a separate factory to pull out just the user service
koakh — Hoje às 17:46
in fact I dont have any issues with AUTH_MODULE_OPTIONS only with USER_SERVICE, seems that can help a lot
jmcdo29 — Hoje às 17:46
My ogma module does something similar
koakh — Hoje às 17:46
do you have a link of one that is not too complex?
