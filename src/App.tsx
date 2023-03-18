import React, { Suspense, useEffect, useRef, useState } from 'react'
import './App.css'
import { Canvas } from '@react-three/fiber'
import { getOneTheme, getSavedItems, getOneImage, saveItem, deleteItem } from './components/ApiCalls'
import { Theme, UserItem } from './Types'

import { ImageEffects } from './effects/motion'
import { UserSavedItems } from './components/SavedItems'
import { ThemeSound } from './effects/sound'

function App() {
  const [image, setImage] = useState('')
  const [fact, setFact] = useState('')
  const [theme, setTheme] = useState<Theme | null>(null)
  const [userItems, setUserItems] = useState<UserItem[]>([])

  const initialState = 0
  const [count, setCount] = useState(0)
  const updateNotificationRef = useRef<HTMLDivElement>(null)
  const userid = 'e6290cf6-c40c-11ed-afa1-0242ac120002'

  useEffect(() => {
    try {
      const data = async () => {
        const theme = await getOneTheme()
        const saveditems = await getSavedItems(userid)
        const image = await getOneImage(theme.data.images)

        const itemsArray = saveditems.data.saved
        const factsArray = theme.data.facts
        const randomfact = factsArray[Math.floor(Math.random() * factsArray.length)]

        setFact(randomfact)
        setTheme(theme.data)
        setUserItems(itemsArray)
        setImage(image.data.urls.full)
      }
      data()
    } catch (err) {
      console.log(err)
    }
  }, [])

  useEffect(() => {
    if (theme) {
      const interval = window.setInterval(() => {
        if (theme.facts.length > 1) {
          const factsArray = theme.facts
          const randomfact = factsArray[Math.floor(Math.random() * factsArray.length)]
          setFact(randomfact)
          setCount((c) => c + 1)
        }
      }, 10000)
      return () => clearInterval(interval)
    }
  }, [theme])

  useEffect(() => {
    if (count === initialState) {
      return
    }
    const animate: Animation = updateNotificationRef.current!.animate({ opacity: [0, 1, 0] }, 1000)
    animate.play()
  }, [count])

  const AddThemeItem = () => {
    let uuid = crypto.randomUUID()
    const item: UserItem = {
      id: uuid,
      category: theme!.category,
      fact: fact,
      image: image,
      themeid: theme!.themeid,
    }
    setUserItems((prevtheme) => {
      let nexttheme = [...prevtheme]
      nexttheme.push(item)
      return nexttheme
    })
    saveItem(item, userid)
  }

  const RemoveThemeItem = (event: any) => {
    event.stopPropagation()
    if (event.target.value && theme) {
      const itemid = event.target.value
      const itemIndex = userItems.findIndex((ele) => ele.id === itemid)
      setUserItems((prevtheme) => {
        let nexttheme = [...prevtheme]
        nexttheme.splice(itemIndex, 1)
        return nexttheme
      })
      deleteItem(userid, itemid)
    }
  }

  const DisplayThemeItem = (event: any) => {
    event.stopPropagation()
    if (event.target.value && theme) {
      const id = event.target.value
      const itemIndex = userItems.findIndex((ele) => ele.id === id)

      setFact(userItems[itemIndex].fact)
      setTheme({
        category: userItems[itemIndex].category,
        facts: [userItems[itemIndex].fact],
        images: [userItems[itemIndex].image],
        themeid: userItems[itemIndex].themeid,
      })
      setImage(userItems[itemIndex].image)
    }
  }

  return (
    <>
      <div className="refresh__container">
        <button onClick={() => window.location.reload()} className="facts__button">
          Refresh
        </button>
        <button onClick={() => ThemeSound(theme?.themeid)} className="facts__button">
          Sound
        </button>
      </div>
      <div className="facts__container" ref={updateNotificationRef} style={{ opacity: 1 }}>
        <h1 className="facts__title">{fact}</h1>
        <button onClick={AddThemeItem} className="facts__button">
          Add
        </button>
      </div>
      <Canvas>
        <Suspense fallback={null}>
          {theme?.themeid && image &&
            <ImageEffects themeid={theme.themeid} image={image}/>
          }
        </Suspense>
      </Canvas>
      <UserSavedItems userItems={userItems} DisplayThemeItem={DisplayThemeItem} RemoveThemeItem={RemoveThemeItem}/>
    </>
  )
}

export default App
