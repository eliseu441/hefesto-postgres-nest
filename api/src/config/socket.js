const jwt = require('jsonwebtoken')

// let clients = []

module.exports = app => {
    
    const onConnect = async (client, io) => {

        try
        {
            return
            const auth = await checkTokenJWT( client.handshake.auth.jwt )
            console.log(auth)
            
            if (!auth.ok) return;

            const { data: { user }} = auth;

            const { id_usuario, perfil } = user;

            client.join(`room-${ perfil.id }`)

            client.data = { id_usuario, id_perfil: perfil.id }

        } catch (err) {
            throw err;
        }
    };

    const onDisconnect = (client, io) => {

        client.on('disconnecting', () => console.log(client.rooms))

        client.on('disconnect', () => {
            console.log('disconnect')
            // const list = clients.filter(c => c.id !== client.id)            
            // clients = [...list]
        })
    };

    const checkTokenJWT = async token => {

        try 
        {

            const { usuario:user } = jwt.verify(token, { ignoreExpiration: true });

            return { ok: true, data: { user }};
            
        } catch (err) {
            return { ok: false, err };
        }
    };

    return {
        onConnect,
        onDisconnect
    };
}