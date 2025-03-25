import { HStack } from '@chakra-ui/react'
import TalentGrid from './components/TalentGrid';

function App() {

  return (
    <>
      <HStack width="100%" justifyContent="center" mt={10}>
        {/* <Talent isSelected={false} isActive={true} /> */}
          <TalentGrid />
      </HStack>
    </>
  )
}

export default App
