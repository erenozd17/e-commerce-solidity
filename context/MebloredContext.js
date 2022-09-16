import { createContext, useState, useEffect } from 'react'
import { useMoralis, useMoralisQuery } from 'react-moralis'

export const MebloredContext = createContext()

export const MebloredProvider = ({ children }) => {
    const [username, setUsername] = useState('')
    const [nickname, setNickname] = useState('')
    const [assets, setAssets] = useState([])

    const {
        authenticate,
        isAuthenticated,
        enableWeb3,
        isWeb3Enabled,
        Moralis,
        user,
    } = useMoralis()

    const {
        data: assetsData,
        error: assetsDataError,
        isLoading: assetsDataisLoading,
    } = useMoralisQuery('assets')

    useEffect(() => {
        ; (async () => {
            if (isAuthenticated) {
                const currentUsername = await user?.get('nickname')
                setUsername(currentUsername)
            }
        })()
    }, [isAuthenticated, user, username])

    useEffect(() => {
        ; (async () => {
            if (isWeb3Enabled) {
                await getAssets()
            }
        })()
    }, [isWeb3Enabled, assetsData, assetsDataisLoading])

    const handleSetUsername = () => {
        if (user) {
            if (nickname) {
                user.set('nickname', nickname)
                user.save()
                setNickname('')
            } else {
                console.log("Can't set empty nickname")
            }
        } else {
            console.log('No user')
        }
    }

    const getAssets = async () => {
        try {
            await enableWeb3()
            setAssets(assetsData)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <MebloredContext.Provider
            value={{
                isAuthenticated,
                username,
                setUsername,
                nickname,
                setNickname,
                handleSetUsername,
                assets,
            }}
        >
            {children}
        </MebloredContext.Provider>
    )
}