import axios from 'axios';
import React, { useCallback, useEffect, useState } from 'react';
import { getCookie } from '../utilities/cookies';
const AuthorizedImage = ({ component, src, ...rest }) => {
    const [profilePicture, setProfilePicture] = useState(null);
    const accessToken = getCookie('accessToken');
    const fetchProfilePicture = useCallback(
        async function () {
            try {
                if (!src) return;
                const res = await axios.get(
                    `https://api.files.clikkle.com/open/file/download/${src}`,

                    {
                        headers: {
                            Authorization: `Bearer ${accessToken}`,
                        },

                        responseType: 'blob',
                    }
                );

                const blob = new Blob([res.data], { type: 'image/jpeg' });
                const url = window.URL.createObjectURL(blob);

                setProfilePicture(url);
            } catch (e) {
                console.log(e);
            }
        },
        [setProfilePicture, src, accessToken]
    );

    useEffect(() => {
        fetchProfilePicture();
    }, [fetchProfilePicture]);

    return React.createElement(component, {
        src: profilePicture,
        ...rest,
    });
};
export default AuthorizedImage;
