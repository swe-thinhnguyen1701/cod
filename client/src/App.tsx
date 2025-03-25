import { HStack } from '@chakra-ui/react'
import FoundationTalents from './components/FoudationTalents'
import TalentGrid from './components/TalentGrid';

function App() {

  return (
    <>
      <HStack width="100%" justifyContent="center" mt={10}>
        {/* <Talent isSelected={false} isActive={true} /> */}
          <TalentGrid />
          <FoundationTalents />
      </HStack>
    </>
  )
}

export default App
