// save login  reponse > (_id's name and token) to session storage
export const authenticate = (response, next) => {
    if (window !== 'undefined') {

        if(response.data.user.role == "client"){
            let dataUser = {
                "first_name": response.data.user.first_name,
                "last_name": response.data.user.last_name,
                "_id": response.data.user._id,
                "token": response.data.token,
                "email": response.data.user.email,
                "profile_pic": response.data.user?.profile_picture.url
        };

        localStorage.setItem('token', JSON.stringify(response.data.token));
        localStorage.setItem('_id', JSON.stringify(response.data.user._id));
        localStorage.setItem('role', JSON.stringify(response.data.user.role));
        localStorage.setItem('first_name', JSON.stringify(response.data.user.first_name));
        localStorage.setItem("userInformation", JSON.stringify(dataUser));
        }else{
            let dataUser = {
                "first_name": response.data.user.first_name,
                "last_name": response.data.user.last_name,
                "_id": response.data.user._id,
                "token": response.data.token,
                "email": response.data.user.email,
        };

        localStorage.setItem('token', JSON.stringify(response.data.token));
        localStorage.setItem('_id', JSON.stringify(response.data.user._id));
        localStorage.setItem('role', JSON.stringify(response.data.user.role));
        localStorage.setItem('first_name', JSON.stringify(response.data.user.first_name));
        localStorage.setItem("userInformation", JSON.stringify(dataUser));
        }
       
    }
    next();
};
export const getToken = () => {
    if (window !== 'undefined') {
        if (localStorage.getItem('token')) {
            return JSON.parse(localStorage.getItem('token'));
        } else {
            return false;
        }
    }
};
// access _id name from session storage
export const getUser = () => {
    if (window !== 'undefined') {
        if (localStorage.getItem('_id')) {
            return JSON.parse(localStorage.getItem('_id'));
        } else {
            return false;
        }
    }
};

export const getName = () => {
    if (window !== 'undefined') {
        if (localStorage.getItem('first_name')) {
            return JSON.parse(localStorage.getItem('first_name'));
        } else {
            return false;
        }
    }
};

export const getRole= () => {
    if (window !== 'undefined') {
        if (localStorage.getItem('role')) {
            return JSON.parse(localStorage.getItem('role'));
        } else {
            return false;
        }
    }
};

export const logout = next => {
    if (window !== 'undefined') {
        localStorage.removeItem('token');
        localStorage.removeItem('_id');
        localStorage.removeItem('role');
        localStorage.removeItem('first_name');
        localStorage.removeItem('userInformation');
    }
    next();
};