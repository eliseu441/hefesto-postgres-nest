import API from '../Api.js'

class pageEdit
{
    getVolume = async (params) => {

        try
        {
            const response = await API.get(`/getVolumeSites`, { params });

            if (response.status === 200)
            {
                const data = response.data;

                return data;
            }

            return [];

        } catch (err) {
            throw err;
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
            throw err;
        }
    };





    allSites = async (params) => {

        try
        {
            const response = await API.get(`/getData`, { params });

            if (response.status === 200)
            {
                const data = response.data;
                return data;
            }

            return [];

        } catch (err) {
            throw err.response;
        }
    };
    porcentagem = async (params) => {

        try
        {
            const response = await API.get(`/getPercent`, { params });

            if (response.status === 200)
            {
                const data = response.data;

                return data;
            }

            return [];

        } catch (err) {
            throw err.response;
        }
    };
    editSite = async (params) => {

        try
        {
            const response = await API.get(`/getEditarDadosSites?id_site=${params.id_site}`);

            if (response.status === 200)
            {
                const data = response.data;

                return data;
            }

            return [];

        } catch (err) {
            throw err;
        }
    };
    getProjeto = async () => {

        try
        {
            const response = await API.get(`/getProjeto`);

            if (response.status === 200)
            {
                const data = response.data;

                return data;
            }

            return [];

        } catch (err) {
            throw err;
        }
    };
    getSubprojeto = async (params) => {

        try
        {
            const response = await API.get(`/getSubprojeto`, { params });

            if (response.status === 200)
            {
                const data = response.data;

                return data;
            }

            return [];

        } catch (err) {
            throw err;
        }
    };
    getUF = async (params) => {

        try
        {
            const response = await API.get(`/getComboUF`, { params });

            if (response.status === 200)
            {
                const data = response.data;

                return data;
            }

            return [];

        } catch (err) {
            throw err;
        }
    };
    getRegional = async (params) => {

        try
        {
            const response = await API.get(`/getComboRegional`, { params });

            if (response.status === 200)
            {
                const data = response.data;

                return data;
            }

            return [];

        } catch (err) {
            throw err;
        }
    };
    getEtapas = async (params) => {

        try
        {
            const response = await API.get(`/getEtapas`, { params });

            if (response.status === 200)
            {
                const data = response.data;

                return data;
            }

            return [];

        } catch (err) {
            throw err;
        }
    };
    getMetasAno = async (params) => {

        try
        {
            const response = await API.get(`/getMetasAno`, { params });

            if (response.status === 200)
            {
                const data = response.data;

                return data;
            }

            return [];

        } catch (err) {
            throw err;
        }
    };
    getSites = async (params) => {

        try
        {
            const response = await API.get(`/getSites`, { params });

            if (response.status === 200)
            {
                const data = response.data;

                return data;
            }

            return [];

        } catch (err) {
            throw err;
        }
    };
    resumoMacro = async (params) => {

        try
        {
            const response = await API.get(`/resumoMacro`, { params });

            if (response.status === 200)
            {
                const data = response.data;

                return data;
            }

            return [];

        } catch (err) {
            throw err;
        }
    };
    subStatus = async (params) => {

        try
        {
            const response = await API.get(`/getSubstatus`, { params });

            if (response.status === 200)
            {
                const data = response.data;

                return data;
            }

            return [];

        } catch (err) {
            throw err;
        }
    };
    timeLine = async (params) => {

        try
        {
            const response = await API.get(`/getTimeline`, { params });

            if (response.status === 200)
            {
                const data = response.data;

                return data;
            }

            return [];

        } catch (err) {
            throw err;
        }
    };
    getPreviousSteps = async (params) => {

        try
            {
            const response = await API.get(`/getPreviousSteps`, { params });

            if (response.status === 200)
            {
                const data = response.data;

                return data;
            }

            return [];

        } catch (err) {
            throw err;
        }
    };
    

    
    
}

export default new pageEdit();