import {createDataProvider, CreateDataProviderOptions} from "@refinedev/rest";
import {BACKEND_BASE_URL} from "@/constants";
import {ListResponse} from "@/types";

if (!BACKEND_BASE_URL) throw new Error('BACKEND_BASE_URL is not configured')

const options: CreateDataProviderOptions = {
  getList:{
    getEndpoint: ({ resource }) => {
      if (resource === 'tiers') return 'words';
      return resource;
    },

    buildQueryParams: async ({ resource, pagination, filters }) => {
      const page = pagination?.currentPage ?? 1;
      const pageSize = pagination?.pageSize ?? 10;

      const params: Record<string, string|number> = { page, limit:pageSize }

      filters?.forEach((filter) =>{
        const field = 'field' in filter ? filter.field : ''

        const value = String(filter.value)

        if (resource == 'words'){
          if(field == 'name') params.search = value
        }
      })
      return params
    },

    mapResponse: async (response) => {
      const payload: ListResponse = await response.clone().json();

      return payload.data ?? [];
    },

    getTotalCount: async (response) =>{
      const payload: ListResponse = await response.clone().json();

      return payload.pagination?.total ?? payload.data?.length ?? 0;
    }
  }
}

const { dataProvider } = createDataProvider(BACKEND_BASE_URL, options);

export { dataProvider };