import React, { useState } from 'react';
interface IUserDetail {
    email: string,
    id?: string | number
}
interface IContext {
    userDetails: IUserDetail | undefined,
    setUserDetails: React.Dispatch<React.SetStateAction<IUserDetail | undefined>>,
    isLoggedIn: boolean,
    setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>
}
export const UserDetailContext = React.createContext<IContext>({} as IContext);


function UserContext({
    children
}: {
    children: JSX.Element
}) {
    const [userDetails, setUserDetails] = useState<IUserDetail>();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    return (
        <UserDetailContext.Provider value={{
            userDetails,
            isLoggedIn,
            setIsLoggedIn,
            setUserDetails
        }}>
            {children}
        </UserDetailContext.Provider>
    );
}

export default UserContext;