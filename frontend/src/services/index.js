export const registerUser = async (
    {email,
    password,
    name,
    last_name,
    tel, zipcode,
    addres,
    city,
    province}) => {
        const response = await fetch(`${process.env.REACT_APP_BACKEND}/user`, {
            method: "POST",
            body: JSON.stringify({ email, password, name, last_name, tel, zipcode, addres, city, province }),
            headers: {
                "Content-Type": "application/json",
            },
        });

    const json = await response.json();
    // console.log(json);
    if(!response.ok){
        throw new Error(json.message);
    }

    return json.message;

    // Verificar si acá habría que meter el envío de los emails.
}

export const loginService = async ({email, password}) => {
    const response = await fetch(`${process.env.REACT_APP_BACKEND}/login`, {
        method: "POST",
        body: JSON.stringify({ email, password }),
        headers: {
            "Content-Type": "application/json",
        },
    });

    const json = await response.json();
    // console.log(json);
    if(!response.ok){
        throw new Error(json.message);
    }

    // if(response){
    //     return json.message;
    // }

    return json.token;
    
}

export const loginServiceId = async ({email, password}) => {
    const response = await fetch(`${process.env.REACT_APP_BACKEND}/login`, {
        method: "POST",
        body: JSON.stringify({ email, password }),
        headers: {
            "Content-Type": "application/json",
        },
    });

    const json = await response.json();

    if(!response.ok){
        throw new Error(json.message);
    }

    // if(response){
    //     return json.message;
    // }

    return json.id;
    
}

export const getUserData = async ({token, id}) => {
    const response = await fetch(`${process.env.REACT_APP_BACKEND}/loginuser`, {
        method: "GET",
        headers: {
            Authorization: token,
        },
    });

    const json = await response.json();
    console.log(token);
    console.log(id);

    if(!response.ok){
        throw new Error(json.message);
    }

    return json.info;

}