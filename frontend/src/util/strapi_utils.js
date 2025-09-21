import React from "react";

export const RUN_ENV = "local"; //local(build_and_run),dev(containers),prod(clusters)
export const STRAPI_LOCAL_URL = "http://localhost:1337"
export const STRAPI_DEV_URL =""
export const STRAPI_PROD_URL = ""
export const AUTH = "89ff02589b4eaf2fdc85d36d8a32912b0dd4f4bb591ee7bded328f56047fecf82eaea075ce10e8dcfbdb8d20df839d2b1b411009c7b383908bea3c0cc70e7bb06946b00fd5593816ee8cf1ddf2e77fba2a6ebc8a31536115b832bee98406a2bd4259f27b26a2362f4bd2f1260b920fec24687ab246ac1a35d7735ad32ebbfc37"
export const AUTH_WRITE = "035f233e8ca71739aa30459047b9c8819082eb930fdc86dc45efafe2b045943631486c476ef5bdae7ebd71600ad61005e5cc4ce3ed620d9fb2f2cdc4e89fc3cb8647dd77cc0d54a5e95358f46fec73a6c848a46d2f0480bdc66f80c65ff83c32b4e06e3183ed8b1ca21053312344ee9e20b2661f0e77abe18a5f6b89ead074a5"
export async function getStrapiData(path){
    const fetchResult = await fetch(path, {
        method: 'GET',
        headers: {
            'Authorization' : `bearer ${AUTH}`,
        }
    });
    return await fetchResult;
}

export async function postStrapiData(path,body,api_key=AUTH_WRITE) {
    const fetchResult = await fetch(path, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization' : `bearer ${api_key}`,
        },
        body: JSON.stringify(body),
    });
    return await fetchResult;
}

export function getStrapiDomain(){
    switch (RUN_ENV) {
        case "local" :
            return STRAPI_LOCAL_URL;
        case "dev" :
            return STRAPI_DEV_URL
        case "prod":
            return STRAPI_PROD_URL
    }   
}

export function getUserStrapiToken(){
    //TO-DO: Implement user login and return user specific token
    return AUTH_WRITE;
}