import { HStack } from '@chakra-ui/react'
import FoundationTalents from './components/FoudationTalents'

function App() {

  return (
    <>
      <HStack width="100%" justifyContent="center" mt={10}>
        {/* <Talent isSelected={false} isActive={true} /> */}
        <FoundationTalents />
      </HStack>
    </>
  )
}

export default App
