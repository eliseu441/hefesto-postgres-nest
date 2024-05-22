import API from '../Api.js'

class EditProject
{
    insertProject = async (params) => {

        try
        {
            const response = await API.get(`/insertProject`, { params });
            if (response.status === 200)
            {
                const data = response.data;

                return data;
            }

            return [];

        } catch (err) {
            console.error('insertProject error:', err)
        }
    };
    insertProducts = async (params) => {

        try
        {
            const response = await API.get(`/insertProducts`, { params });
            console.log(response)
            if (response.status === 200){

                const data = response.data;
                return data;
            }

            return [];

        } catch (err) {
            console.error('insertProducts error:', err);
        }
    };
}

export default new EditProject();