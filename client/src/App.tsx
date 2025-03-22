import { HStack } from '@chakra-ui/react'
import TalentsFoundation from './components/TalentsFoundation'

function App() {

  return (
    <>
      <HStack width="100%" justifyContent="center" mt={10}>
        {/* <Talent isSelected={false} isActive={true} /> */}
        <TalentsFoundation />
      </HStack>
    </>
  )
}

export default App
