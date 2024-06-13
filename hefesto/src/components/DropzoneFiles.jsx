import React, { useEffect, useCallback, useMemo } from "react";
import { useDropzone } from "react-dropzone";
import {
    baseStyle,
    activeStyle,
    acceptStyle,
    rejectStyle,
    thumbsContainer,
    thumb,
    thumbInner,
    img
} from './DropzoneFilesStyles'
import './DropzoneFiles.css'

import getFileIcon from "../helpers/fileIconHelper";
import { formatBytes } from "../helpers/convertHelper";
const DropzoneFiles = ({
    files,
    setFiles,
    maxSizeMB = 50,
    maxFilesToUpload = 5,
    showTitle = true,
    extOnlyAccept = [],
    titulo
}) => {


    useEffect(() => {

        // Make sure to revoke the data uris to avoid memory leaks
        return () => files.forEach(file => URL.revokeObjectURL(file.preview));

    }, [])

    const onDropAccepted = useCallback(acceptedFiles => {

        let acceptedFile = acceptedFiles.map(
            (file, idx) => Object.assign(file, {
                id: idx + files.length + 1, preview: URL.createObjectURL(file)
            })
        );

        const restAvailableSize = maxFilesToUpload - files.length;

        if (acceptedFile.length > maxFilesToUpload || acceptedFiles.length > restAvailableSize) {
            const message = `Alguns arquivos não foram anexados. É permitido anexar apenas ${maxFilesToUpload} arquivo(s) por vez.`;

          //sucesstoast
            acceptedFile = acceptedFile.slice(0, restAvailableSize)
        }

        setFiles([...files, ...acceptedFile])

    }, [files]);

    const onDropRejected = useCallback(rejectedFiles => {

        for (const rejected of rejectedFiles) {
            const { errors } = rejected;

            errors &&
                errors.forEach(err => 
                    //errortoast
                    {return}
                    )
        }

    }, [files]);

    const customValidator = file => {

        if (files.length >= maxFilesToUpload)
            return {
                code: 'file-limit-exceeded',
                message: `É permitido anexar apenas ${maxFilesToUpload} arquivos por vez.`
            }

        if (file.size > (maxSizeMB * 1000 * 1000)) // default 50 MB
            return {
                code: 'size-limit-exceeded',
                message: 'O tamanho do arquivo não pode ser maior que 50MB.'
            }
        if (files.filter(f => f.path === file.path).length > 0)
            return {
                code: 'file-already-exists',
                message: 'Arquivo duplicado: ' + file.path
            }

        if (file.path.includes('.exe') || file.path.includes('.apk') || file.path.includes('.sh')) {
            return {
                code: 'file-extension-invalid',
                message: 'Extensão de Arquivo inválida.'
            }
        }

        if (extOnlyAccept.length > 0) {
            const filtered = extOnlyAccept.filter(ext => {
                return ext === ''.concat(file.path).slice((file.path.length - ext.length), file.path.length)
            });

            if (filtered.length === 0) {
                const msg = extOnlyAccept.map(e => e.toUpperCase()).join(' ')

                return {
                    code: 'file-extension-not-accept',
                    message: `Não é permitido anexar aquivos com essa extensão. Extensões válidas: ${msg}`
                };
            }
        }

        return null;
    };

    const {
        getRootProps,
        getInputProps,
        isDragActive,
        isDragAccept,
        isDragReject
    } = useDropzone({
        // onDrop
        onDropAccepted,
        onDropRejected,
        accept: ['image/*', 'text/*', 'application/*'],
        multiple: true,
        validator: customValidator
    });

    const style = useMemo(() => ({
        ...baseStyle,
        ...(isDragActive ? activeStyle : {}),
        ...(isDragAccept ? acceptStyle : {}),
        ...(isDragReject ? rejectStyle : {})
    }), [
        isDragActive,
        isDragReject,
        isDragAccept
    ]);
    const handleDelete = id => setFiles(files.filter(e => e.id !== id));

    return (
        <div className="row col-12 mt-3">
            <div className="col-12">

                <div className="card files">
                    {
                        (showTitle === true) && (

                            <div className="card-body">
                                <div className="d-flex">
                                    <h1 style={{ height: '0px', width: '100%' }} className="card-title">
                                        <span className="lstick"></span>
                                        {titulo ? titulo : 'Anexar arquivos'}
                                    </h1>
                                </div>

                                <hr className="mb-0" />
                            </div>
                        )
                    }
                    <div className="card-body pt-0">

                        <div className="row">
                            <div className="col-lg-12 col-md-12 col-sm-12">

                                <section className="p-0 cursor">

                                    <div {...getRootProps({ style })}>
                                        <input {...getInputProps()} />
                                        <h4>Selecione ou arraste seus arquivos para esta área.</h4>
                                        <i className="fa fa-cloud-upload fa-4x m-t-20"></i>
                                    </div>

                                    <aside style={thumbsContainer}>
                                        {
                                            files.map(file => {

                                                let source = ''

                                                if (file.type.includes('image')) {
                                                    source = file.preview
                                                }
                                                else {
                                                    source = getFileIcon(file.name)
                                                }

                                                return (
                                                    <div key={file.name} className="m-t-20 position-relative col-12 ">

                                                        <div style={thumb} key={file.name} class=''>
                                                            <div style={thumbInner}>
                                                                <img src={source} style={img} alt={file.name} title={file.name} />
                                                            </div>
                                                        </div>

                                                        <div className="info-dropzoneFiles ">

                                    

                                                            <button
                                                                type="button"
                                                                className="btn deleteDate mt-3 "
                                                                aria-label='Excluir Anexo'
                                                                data-balloon-pos="right"
                                                                onClick={_ => handleDelete(file.id)}>
                                                                     <i class="bi bi-trash-fill"></i>
                                                            </button>
                                                        </div>

                                                    </div>

                                                )
                                            })
                                        }
                                    </aside>

                                </section>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
}


export default DropzoneFiles;
