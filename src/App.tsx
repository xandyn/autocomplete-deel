import { useState } from 'react'
import { fetchData } from '~/api'
import { Autocomplete, OptionItem } from '~/shared/ui/Autocomplete'
import './App.css'

function App() {
  const [option, setOption] = useState<OptionItem | null>(null)

  return (
    <div className="App">
      <Autocomplete
        placeholder="Choose a city"
        selectedOption={option}
        onSelect={setOption}
        onFetch={fetchData}
      />
    </div>
  )
}

export default App
