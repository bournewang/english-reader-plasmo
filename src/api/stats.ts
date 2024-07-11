import { apiRequest } from './helper';
import type { ResponseData } from './helper';
import type { Stats} from './types'
// import type {ResponseData} from './helper' 

export const getStats = async (): Promise<ResponseData<Stats>> => {
    return apiRequest(`/stats/get`, 'GET');
};
