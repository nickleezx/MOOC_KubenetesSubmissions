import { use, Suspense } from 'react'
import { getImagePromise } from './services/imageService'

const ImageFromBackend = () => {
  const imageUrl = use(getImagePromise)
  
  return <img src={imageUrl} alt="Random image" style={{height: "30%", width: "30%"}}/>
}

function App() {

  return (
    <>
      <h1>The project</h1>

      <Suspense fallback={<div>loading image...</div>}>
        <ImageFromBackend/>
      </Suspense>
    </>
  )
}

export default App
