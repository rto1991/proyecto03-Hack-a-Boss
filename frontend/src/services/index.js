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
            method: "POST",
            body: JSON.stringify({ email, password, name, last_name, tel, zipcode, address, city, province }),
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "http://127.0.0.1:3000"
            },
        });

    const json = await response.json();
    // console.log(json);
    if(!response.ok){
        throw new Error(json.message);
    }
    }