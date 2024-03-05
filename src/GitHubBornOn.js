import { useState, useEffect } from "react";
import { get } from 'aws-amplify/api';

import LoadingText from "./LoadingText";

export default () => {

    const [creationDate, updateCreationDate] = useState([]);

    const fetchCreationDate = async() => {
        const getRequest = await get({
            apiName: 'coinapi',
            path: '/born'
        });
        const { body } = await getRequest.response;
        const json = await body.json();
        updateCreationDate(json.createdAt);
    };

    useEffect(() => {
        fetchCreationDate();
    }, []);

    return (
        <>
            {
            (typeof creationDate !== 'string')
            ? <LoadingText/>
            : 
                <span>
                    { creationDate }
                </span>
            }    
        </>
    )
};