import API from './Api'

class UploadFilesService
{
    upload = async (context, { data, files, contextUpload }, onUploadProgress) => {

        let formData = new FormData();
        
        files.forEach(file => formData.append('file', file))
        formData.append('json', JSON.stringify(data));


        const response = await API.post(`${context}/${contextUpload}`, formData, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'multipart/form-data',
            },
            onUploadProgress
        });
        if (response.status === 200)
        {
            return response.data;
        }

        return {
            ok: false, 
            message: 'Algo deu errado durante o upload dos arquivos. Tente novamente mais tarde ou contate o administrador do sistema.'
        }
    }

    uploadPhoto = async (context, { data, uploadFiles: files }, onUploadProgress) => {

        let formData = new FormData();

        formData.append('json', JSON.stringify(data));

        // File req.body
        files.forEach(file => formData.append('file', JSON.stringify(file)))

        // File req.files
        files.forEach(file => {formData.append('file', file)})

        const response = await API.post(`${ context }/upload/photo`, formData, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'multipart/form-data',
            },
            onUploadProgress
        });

        if (response.status === 200)
        {
            return response.data;
        }

        return {
            ok: false, 
            message: 'Algo deu errado durante o upload dos arquivos. Tente novamente mais tarde ou contate o administrador do sistema.'
        }
    }

    uploadPhotoVistory = async (context, { data, files }, onUploadProgress) => {

        let formData = new FormData();

        formData.append('json', JSON.stringify(data));

        // File req.body
        files.forEach(file => formData.append('file', JSON.stringify(file)))

        // File req.files
        files.forEach(file => {formData.append('file', file)})

        const response = await API.post(`${ context }/upload/photo`, formData, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'multipart/form-data',
            },
            onUploadProgress
        });

        if (response.status === 200)
        {
            return response.data;
        }

        return {
            ok: false, 
            message: 'Algo deu errado durante o upload dos arquivos. Tente novamente mais tarde ou contate o administrador do sistema.'
        }
    }
}

export default new UploadFilesService();