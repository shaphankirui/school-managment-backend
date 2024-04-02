import jwt_decode from "jsonwebtoken";

export function AuthSignIn(email: string, password: string): Promise<void | number> {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
        email: email,
        password: password,
    });

    const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
    };

    return fetch(
        `${process.env.NEXT_PUBLIC_BLOGS_URL_LOGIN}`,
        requestOptions
    )
        .then(response => {
            if (!response.ok) {
                // If response is not ok, throw an error with status code
                throw new Error(response.status.toString());
            }
            return response.json();
        })
        .then((data) => {
            if (data && data.access_token) {
                // Decode the JWT token
                const decodedToken = jwt_decode.decode(data.access_token);

                // Store access token in local storage
                localStorage.setItem("access_token", data.access_token);
                localStorage.setItem("loggedIn", "true");

                // Store decoded token data in local storage
                localStorage.setItem("user", JSON.stringify(decodedToken));
            } else {
                console.error("Access token is missing or invalid.");
            }
        })
        .catch(error => {
            console.error(error);
            return Promise.reject(error); // Propagate the error
        });
}



// AuthSignUp

export function AuthSignUp(email: string, password: string, firstName: string, lastName: string): Promise<void> {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
        email: email,
        password: password,
        firstName: firstName,
        lastName: lastName,
    });

    const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
    };

    return fetch(
        `${process.env.NEXT_PUBLIC_BLOGS_URL_REGISTER}`,
        requestOptions
    )
        .then((response) => response.json())
        .then((data) => {
            if (data && data.access_token) {
                localStorage.setItem("access_token", data.access_token);
                localStorage.setItem("loggedIn", "true");
            } else {
                console.error("Access token is missing or invalid.");
            }
        })
        .catch((error) => console.error(error));
}

// SignOut 

export function AuthSignOut(): void {
    localStorage.clear();
}
