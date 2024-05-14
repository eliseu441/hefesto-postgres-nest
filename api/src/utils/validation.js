
module.exports = _ => {

    const errorMessage = field => `Parâmetro '${ field }' não foi informado ou não possui um valor válido.`;

    return { 
        errorMessage 
    };
}