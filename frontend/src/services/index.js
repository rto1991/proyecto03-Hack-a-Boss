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
    }