
module.exports = _ => {

    const lowerCaseKeys = array => {

        try 
        {
            return array.map(item => {
                
                let mapped = {};

                for (let key in item) 
                { 
                    mapped[key.toLowerCase()] = item[key]; 
                }

                return mapped;
            });

        } catch(err) { 
            return array
        }
    };
    const upperCaseKeys = array => {

        try 
        {
            return array.map(item => {
                
                let mapped = {};

                for (let key in item) 
                { 
                    mapped[key.toUpperCase()] = item[key]; 
                }

                return mapped;
            });

        } catch(err) { 
            return array
        }
    };

    return {
        lowerCaseKeys,
        upperCaseKeys
    };
}