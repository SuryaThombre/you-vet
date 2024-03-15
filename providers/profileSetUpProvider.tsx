import React from 'react';
import { UserProfile } from "@/types";
import { PropsWithChildren, createContext, useContext, useState } from "react";
import { randomUUID } from "expo-crypto";

type UserProfileContextType = {
    userProfile: UserProfile,
    updateUserProfile: (key : string, value: string) => void,
    city: string | any,
    setCity: () => void
}


export const userProfileContext = createContext<UserProfileContextType>({
    userProfile: {
        userName: "",
        birthDate: '',
        gender: "",
        politicalPrefrence: "",
        RacialIdentity: "",
        Location: ""
    },
    updateUserProfile: function () { },
    city: '',
    setCity: () => {}
})


const UserProfileProvider = ({ children } : PropsWithChildren) => {
    const [userProfile, setUserProfile] = useState<UserProfile>({
        userName: "",
        birthDate: '',
        gender: "",
        politicalPrefrence: "",
        RacialIdentity: "",
        Location: ""
    })
    const [city, setCity] = useState<string>()

    const updateUserProfile = (key : string , value: string) => {

        const userKey = Object.keys(userProfile).find((item) => item === key ? item : false)
        userProfile[userKey] = value
        
    }

    return (
        <userProfileContext.Provider value={{ userProfile, updateUserProfile, city, setCity }} >
            { children }
        </userProfileContext.Provider>
    )
}

export default UserProfileProvider;

export const useUserProfile = () => useContext(userProfileContext);
