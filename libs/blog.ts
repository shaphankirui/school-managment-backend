export function PostBlog(title: string, body: string, pictureUrl: string): Promise<void | number> {
    const accessToken = localStorage.getItem("access_token");

    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${accessToken}`);
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
        title: title,
        body: body,
        pictureUrl: pictureUrl,
    });

    const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
    };

    return fetch(`${process.env.NEXT_PUBLIC_BLOGS_URL_FETCH}`, requestOptions)
        .then(response => {
            if (!response.ok) {
                // If response is not ok, throw an error with status code
                throw new Error(response.status.toString());
            }
            return response.json();
        })
        .catch(error => {
            console.error(error);
            return Promise.reject(error); // Propagate the error
        });
}


// edit 

export function EditBlog(title: string, body: string, pictureUrl: string): Promise<void> {
    const accessToken = localStorage.getItem("access_token");

    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${accessToken}`);
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
        title: title,
        body: body,
        pictureUrl: pictureUrl,
    });

    const requestOptions = {
        method: "PUT",
        headers: myHeaders,
        body: raw,
    };

    return fetch(
        `${process.env.NEXT_PUBLIC_BLOGS_URL_EDIT}`,
        requestOptions
    )
        .then((response) => response.json())
        .catch((error) => console.error(error));
}

export function DeleteBlog(title: string, body: string, pictureUrl: string): Promise<void> {
    const accessToken = localStorage.getItem("access_token");

    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${accessToken}`);
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
        title: title,
        body: body,
        pictureUrl: pictureUrl,
    });

    const requestOptions = {
        method: "DELETE",
        headers: myHeaders,
        body: raw,
    };

    return fetch(
        `${process.env.NEXT_PUBLIC_BLOGS_URL_DELETE}`,
        requestOptions
    )
        .then((response) => response.json())
        .catch((error) => console.error(error));
}