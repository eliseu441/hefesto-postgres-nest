import API from '../Api.js'

class EditProject
{
    getProjects = async (params) => {

        try
        {
            const response = await API.get(`/getProjects`, { params });
            if (response.status === 200)
            {
                const data = response.data;

                return data;
            }

            return [];

        } catch (err) {
            console.error('getProjects error:', err)
        }
    };
    getStatus = async (params) => {

        try
        {
            const response = await API.get(`/getStatus`, { params });
            if (response.status === 200)
            {
                const data = response.data;

                return data;
            }

            return [];

        } catch (err) {
            console.error('getStatus error:', err)
        }
    };
    getCards = async (params) => {

        try
        {
            const response = await API.get(`/getCards`, { params });
            if (response.status === 200)
            {
                const data = response.data;

                return data;
            }

            return [];

        } catch (err) {
            console.error('getCards error:', err)
        }
    };
    getClients = async (params) => {

        try
        {
            const response = await API.get(`/getClients`, { params });
            if (response.status === 200)
            {
                const data = response.data;

                return data;
            }

            return [];

        } catch (err) {
            console.error('getClients error:', err)
        }
    };
}

export default new EditProject();