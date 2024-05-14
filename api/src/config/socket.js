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
    
            // clients.push(client)
    
            // console.log(clients)

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

    // NOTE: Regras de envio de notificações:
    // - Enviar para mesmo segmento do perfil do usuário logado.
    // - Sempre notificar Gestor N1 quando perfil do usuário logado for do tipo solicitante.
    // - Quando perfil do usuário logado for Gestor N1 notificar o Perfil solicitante de acordo com o seguimento da Ordem de Serviço. (Somente durante mudança de Status já que N1 não consegue alterar informações da Ordem de Serviço.)

    const sendNotification = (roomIds = [], payload) => {

        try
        {
            if (!roomIds || !payload) return;
            
            const socket = app.get('io')

            roomIds = [].concat(roomIds)

            if (roomIds.length > 0)
            {
                const { GESTOR_N1 } = app.root.workflow.enum.UserProfile;

                const found = roomIds.find(id => id == GESTOR_N1)

                if (!found) roomIds.push(GESTOR_N1)
            }

            roomIds.forEach(roomId => socket.to(`room-${ roomId }`).emit('notifications', payload))

        } catch (err) {
            console.error(err)
        }
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
        onDisconnect,
        sendNotification
    };
}