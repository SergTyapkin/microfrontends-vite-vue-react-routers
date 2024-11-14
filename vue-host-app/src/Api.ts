import REST_API from '@sergtyapkin/rest-api';

type Request = (url: string, data?: any) => Promise<{ data: any, status: number, ok: boolean}>

export default class API extends REST_API {
  declare get: Request;
  declare post: Request;
  declare put: Request;
  declare delete: Request;

  constructor(baseUrl = undefined) {
    super(baseUrl)
  }

  // Api configuration
  // getUser = () => this.get('/user');
}
