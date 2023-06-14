export const registerUser = async (
    {email,
    password,
    name,
    last_name,
    tel, zipcode,
    address,
    city,
    province}) => {
        const response = await fetch(`${process.env.REACT_APP_BACKEND}/user`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': 'http://localhost:3000'
            },
            body: JSON.stringify({email,
                password,
                name,
                last_name,
                tel, zipcode,
                address,
                city,
                province})
        });

    const json = await response.json();
    // console.log(json);
    if(!response.ok){
        throw new Error(json.message);
    }
    }